import { useEffect, useState } from "react";

export const useMarquee = (speed = 30) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setOffset((previous) => {
        const next = previous - speed / 100;

        return next <= -100 ? 0 : next;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [speed]);

  return offset;
};