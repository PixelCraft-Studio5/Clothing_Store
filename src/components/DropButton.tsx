interface DropButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const DropButton = ({
  children,
  onClick,
}: DropButtonProps) => {
  return (
    <button
      className="drop-button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DropButton;