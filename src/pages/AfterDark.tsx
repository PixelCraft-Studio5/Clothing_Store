import { useEffect, useState } from "react";
import OrangeDivider from "../components/OrangeDivider";
import DropButton from "../components/DropButton";

import "../styles/after-dark.css";

interface ReleaseCountdown {
  releaseAt: number;
  remainingMs: number;
}

const getNextReleaseTime = (now: Date) => {
  const release = new Date(now);
  const daysUntilFriday = (5 - now.getDay() + 7) % 7;
  release.setDate(now.getDate() + daysUntilFriday);
  release.setHours(22, 0, 0, 0);

  if (release.getTime() <= now.getTime()) {
    release.setDate(release.getDate() + 7);
  }

  return release.getTime();
};

const formatCountdown = (milliseconds: number) => {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(days).padStart(2, "0")}D ${String(hours).padStart(2, "0")}H ${String(minutes).padStart(2, "0")}M ${String(seconds).padStart(2, "0")}S`;
};

const AfterDark = () => {
  const [countdown, setCountdown] = useState<ReleaseCountdown | null>(null);
  const releaseAt = countdown?.releaseAt;

  useEffect(() => {
    if (releaseAt === undefined) return;

    const intervalId = window.setInterval(() => {
      setCountdown((current) => {
        if (!current) return current;

        return {
          ...current,
          remainingMs: Math.max(0, releaseAt - Date.now()),
        };
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [releaseAt]);

  const startCountdown = () => {
    const releaseAt = getNextReleaseTime(new Date());
    setCountdown({
      releaseAt,
      remainingMs: Math.max(0, releaseAt - Date.now()),
    });
  };

  return (
    <main className="after-dark-page" id="drop02">

      {/* TOP PAGE BREAKER */}
      <OrangeDivider />

      {/* MAIN DROP SECTION */}
      <section className="after-dark-hero">

        {/* HUGE BACKGROUND TEXT */}
        <div
          className="after-dark-background"
          aria-hidden="true"
        >
          DROP 02
        </div>

        {/* CONTENT */}
        <div className="after-dark-content">

          {/* DROP LABEL */}
          <div className="after-dark-label">
            SS/26&nbsp;&nbsp;·&nbsp;&nbsp;DROP 02
          </div>

          {/* TITLE */}
          <h1 className="after-dark-title">

            <span className="title-white">
              AFTER
            </span>

            <span className="title-orange">
              DARK
            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="after-dark-description">
            Reflective graphics. Dark colourways.
            <br />
            Oversized fits. A 48-piece release
            <br />
            inspired by the night-time worlds of
            <br />
            anime.
          </p>

          {/* RELEASE TIME */}
          <div className="after-dark-date">
            FRIDAY&nbsp;&nbsp;·&nbsp;&nbsp;22:00
          </div>

          {/* BUTTON */}
          <DropButton
            countdown={
              countdown
                ? formatCountdown(countdown.remainingMs)
                : undefined
            }
            isReleased={countdown?.remainingMs === 0}
            onClick={startCountdown}
          >
            SHOP THE DROP
          </DropButton>

          {/* STATS */}
          <div className="after-dark-stats">

            <div className="after-dark-stat">
              <strong>22:00</strong>

              <span>
                RELEASE
              </span>
            </div>

            <div className="after-dark-stat">
              <strong>48</strong>

              <span>
                PIECES
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* BOTTOM PAGE BREAKER */}
      <OrangeDivider />

    </main>
  );
};

export default AfterDark;