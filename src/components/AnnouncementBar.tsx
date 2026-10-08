const announcements = [
  "MEMBERS GET EARLY ACCESS",
  "FREE SHIPPING OVER R 3,500",
  "DROP 02 — AFTERDARK · LIVE NOW",
  "NUMBERED RUNS · ZERO RESTOCKS",
];

const AnnouncementBar = () => (
  <div className="announcement-bar" aria-label="Store announcements">
    <div className="announcement-track">
      {[0, 1].map((copy) => (
        <div className="announcement-group" key={copy} aria-hidden={copy === 1}>
          {announcements.map((announcement) => (
            <span className="announcement-item" key={announcement}>
              {announcement}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default AnnouncementBar;
