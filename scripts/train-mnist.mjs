/**
 * MNIST CNN Training Script (pure JS — no native bindings)
 * Trains a small CNN on MNIST dataset and exports to TF.js format.
 * Run: node scripts/train-mnist.mjs
 */
import * as tf from '@tensorflow/tfjs';
import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { get } from 'https';
import { createGunzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', '.mnist-data');
const MODEL_DIR = join(__dirname, '..', 'public', 'models', 'mnist');

const MNIST_URLS = {
  trainImages: 'https://storage.googleapis.com/cvdf-datasets/mnist/train-images-idx3-ubyte.gz',
  trainLabels: 'https://storage.googleapis.com/cvdf-datasets/mnist/train-labels-idx1-ubyte.gz',
  testImages: 'https://storage.googleapis.com/cvdf-datasets/mnist/t10k-images-idx3-ubyte.gz',
  testLabels: 'https://storage.googleapis.com/cvdf-datasets/mnist/t10k-labels-idx1-ubyte.gz',
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (existsSync(dest)) { resolve(); return; }
    const file = createWriteStream(dest);
    get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(createGunzip()).pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

function loadImages(filepath, numImages) {
  const buf = readFileSync(filepath);
  const data = new Float32Array(numImages * 28 * 28);
  for (let i = 0; i < numImages * 28 * 28; i++) {
    data[i] = buf[16 + i] / 255.0;
  }
  return tf.tensor4d(data, [numImages, 28, 28, 1]);
}

function loadLabels(filepath, numLabels) {
  const buf = readFileSync(filepath);
  const labels = new Int32Array(numLabels);
  for (let i = 0; i < numLabels; i++) {
    labels[i] = buf[8 + i];
  }
  return tf.oneHot(tf.tensor1d(labels, 'int32'), 10).toFloat();
}

/** Save model to filesystem without tfjs-node */
function fileSaveHandler(dir) {
  return tf.io.withSaveHandler(async (artifacts) => {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const modelJSON = {
      format: 'layers-model',
      generatedBy: 'TensorFlow.js train-mnist.mjs',
      convertedBy: null,
      modelTopology: artifacts.modelTopology,
      weightsManifest: [{
        paths: ['group1-shard1of1.bin'],
        weights: artifacts.weightSpecs,
      }],
    };
    writeFileSync(join(dir, 'model.json'), JSON.stringify(modelJSON));
    writeFileSync(
      join(dir, 'group1-shard1of1.bin'),
      Buffer.from(artifacts.weightData)
    );
    console.log(`  model.json + group1-shard1of1.bin written`);
    return { modelArtifactsInfo: { dateSaved: new Date(), modelTopologyType: 'JSON' } };
  });
}

async function main() {
  console.log('Downloading MNIST data...');
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

  await Promise.all([
    download(MNIST_URLS.trainImages, join(DATA_DIR, 'train-images')),
    download(MNIST_URLS.trainLabels, join(DATA_DIR, 'train-labels')),
    download(MNIST_URLS.testImages, join(DATA_DIR, 'test-images')),
    download(MNIST_URLS.testLabels, join(DATA_DIR, 'test-labels')),
  ]);
  console.log('Data downloaded.');

  const trainImages = loadImages(join(DATA_DIR, 'train-images'), 60000);
  const trainLabels = loadLabels(join(DATA_DIR, 'train-labels'), 60000);
  const testImages = loadImages(join(DATA_DIR, 'test-images'), 10000);
  const testLabels = loadLabels(join(DATA_DIR, 'test-labels'), 10000);

  console.log('Building model...');
  const model = tf.sequential();
  model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1], filters: 32, kernelSize: 3, activation: 'relu',
  }));
  model.add(tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }));
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(tf.layers.dropout({ rate: 0.25 }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
  model.add(tf.layers.dropout({ rate: 0.5 }));
  model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));

  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  model.summary();

  console.log('Training (pure JS CPU — this takes a few minutes)...');
  await model.fit(trainImages, trainLabels, {
    epochs: 5,
    batchSize: 128,
    validationData: [testImages, testLabels],
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`  Epoch ${epoch + 1}/5: loss=${logs.loss.toFixed(4)}, acc=${logs.acc.toFixed(4)}, val_acc=${logs.val_acc.toFixed(4)}`);
      },
    },
  });

  await model.save(fileSaveHandler(MODEL_DIR));
  console.log(`Model saved to ${MODEL_DIR}`);

  trainImages.dispose();
  trainLabels.dispose();
  testImages.dispose();
  testLabels.dispose();
}

main().catch(console.error);
