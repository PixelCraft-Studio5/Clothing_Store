interface OrangeDividerProps {
  className?: string;
}

const OrangeDivider = ({
  className = "",
}: OrangeDividerProps) => {
  return (
    <div
      className={`orange-divider ${className}`}
      aria-hidden="true"
    />
  );
};

export default OrangeDivider;