interface SlideProps {
  children: React.ReactNode;
  className?: string;
  dataBackground?: string;
  dataBackgroundColor?: string;
  dataTransition?: string;
}

export default function Slide({
  children,
  className = '',
  dataBackground,
  dataBackgroundColor,
  dataTransition,
}: SlideProps) {
  return (
    <section
      className={className}
      data-background={dataBackground}
      data-background-color={dataBackgroundColor}
      data-transition={dataTransition}
    >
      {children}
    </section>
  );
}
