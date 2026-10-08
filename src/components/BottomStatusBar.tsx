const BottomStatusBar = () => {
  return (
    <footer className="bottom-status">
      <span>CAPE TOWN 22:00 SAST</span>

      <div className="status-lines">
        {Array.from({ length: 35 }).map((_, index) => (
          <i key={index} />
        ))}
      </div>

      <span>SS/26 — DROP 02</span>

      <div className="status-lines">
        {Array.from({ length: 25 }).map((_, index) => (
          <i key={index} />
        ))}
      </div>

      <span>EST. DELIVERY 2–4 DAYS</span>
    </footer>
  );
};

export default BottomStatusBar;
