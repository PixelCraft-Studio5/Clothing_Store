interface DropButtonProps {
  children: React.ReactNode;
  countdown?: string;
  isReleased?: boolean;
  onClick: () => void;
}

const DropButton = ({
  children,
  countdown,
  isReleased = false,
  onClick,
}: DropButtonProps) => {
  return (
    <button
      className={`drop-button ${countdown !== undefined ? "is-counting" : ""}`}
      type="button"
      onClick={onClick}
      aria-live="polite"
      aria-label={
        countdown !== undefined
          ? isReleased
            ? "After Dark is live"
            : `Time until After Dark release: ${countdown}`
          : undefined
      }
    >
      {countdown === undefined ? (
        children
      ) : isReleased ? (
        <span className="drop-countdown">DROP IS LIVE</span>
      ) : (
        <span className="drop-countdown" role="timer">{countdown}</span>
      )}
    </button>
  );
};

export default DropButton;