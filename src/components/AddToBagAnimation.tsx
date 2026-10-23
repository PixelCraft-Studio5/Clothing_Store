import { useLayoutEffect, useRef, useState } from "react";
import { Check, ShoppingBag, X } from "lucide-react";
import { gsap } from "gsap";
import "../styles/AddToBagAnimation.css";

export type AnimeCollection = "jujutsu-kaisen" | "one-piece" | "dragon-ball" | "demon-slayer" | "naruto";
interface AddToBagAnimationProps { collection: AnimeCollection; productName: string; onFinish: () => void; onViewBag: () => void }
const details: Record<AnimeCollection, { title: string; subtitle: string; mark: string; steps: string[] }> = {
  "jujutsu-kaisen": { title: "CURSED ITEM ACQUIRED", subtitle: "THE CURSE HAS CONSUMED YOUR DROP.", mark: "呪", steps: ["CURSED ENERGY GATHERS", "THE MOUTH OPENS", "THE CURSE SWALLOWS THE DROP"] },
  "one-piece": { title: "TREASURE CLAIMED", subtitle: "ANOTHER PIECE FOR THE CREW.", mark: "☠", steps: ["THE DROP IS READY", "GUM-GUM SNATCH!", "PULLED INTO THE CREW'S BAG"] },
  "dragon-ball": { title: "POWER LEVEL INCREASED", subtitle: "YOUR POWER JUST WENT UP.", mark: "亀", steps: ["KI ENERGY BUILDS", "POWER SURGES", "THE ITEM LAUNCHES INTO THE BAG"] },
  "demon-slayer": { title: "ITEM SEALED", subtitle: "THE MISSION IS COMPLETE.", mark: "滅", steps: ["BREATH OF THE SUN", "THE BLADE CUTS THROUGH", "EMBER TRAIL SPIRALS TO THE BAG"] },
  naruto: { title: "MISSION COMPLETE", subtitle: "THE SHINOBI HAS SECURED THE DROP.", mark: "忍", steps: ["SMOKE BURSTS", "THE SHADOW GRABS THE DROP", "VANISHES IN A PUFF"] },
};

export default function AddToBagAnimation({ collection, productName, onFinish, onViewBag }: AddToBagAnimationProps) {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const copy = details[collection];

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(node);
      const timeline = gsap.timeline();
      const labelStep = (index: number) => () => setStep(index);
      const stage = q(".add-scene__stage");
      const particles = q(".anime-particle");
      const burst = q(".add-scene__burst");
      const product = q(".add-scene__product");
      const aura = q(".add-scene__aura");
      const mouth = q(".curse-mouth");
      const arm = q(".rubber-arm");
      const armAndProduct = [...arm, ...product];
      const hat = q(".straw-hat");
      const ki = q(".ki-charge");
      const blade = q(".sun-breath__blade");
      const trail = q(".sun-breath__trail");
      const embers = q(".sun-breath__embers");
      const smoke = q(".shinobi-smoke__cloud");
      const shadow = q(".shinobi-smoke__shadow");
      const puff = q(".shinobi-smoke__puff");
      const flash = q(".add-scene__flash");
      const bag = q(".add-scene__bag");
      const result = q(".add-scene__result");
      const initiallyHidden = [
        ...mouth, ...arm, ...hat, ...ki, ...blade, ...trail, ...embers,
        ...smoke, ...shadow, ...puff, ...flash, ...bag, ...result,
      ];

      gsap.set(initiallyHidden, { autoAlpha: 0 });
      gsap.set(burst, { autoAlpha: 0, scale: 0.35 });
      gsap.set(particles, { autoAlpha: 0, x: 0, y: 0, scale: 0.1, transformOrigin: "center" });
      gsap.set(product, { autoAlpha: 0, x: 0, y: 32, z: -130, scale: 0.76, rotateX: 14, rotateY: -24, transformOrigin: "50% 55%" });
      gsap.set(aura, { autoAlpha: 0.25, scale: 0.6 });
      gsap.set(mouth, { scaleY: 0.08, transformOrigin: "center" });
      gsap.set(arm, { scaleX: 0, transformOrigin: "left center", rotation: -10 });
      gsap.set(hat, { scale: 0.45, rotation: -18 });
      gsap.set(ki, { scale: 0.12 });
      gsap.set(blade, { x: -115, y: 105, rotation: 62 });
      gsap.set(trail, { scaleX: 0, transformOrigin: "left center", rotation: -24 });
      gsap.set(embers, { scale: 0.25, rotation: -30 });
      gsap.set(smoke, { scale: 0.45 });
      gsap.set(shadow, { x: -65, scale: 0.76 });
      gsap.set(puff, { scale: 0.2 });

      timeline.fromTo(".add-scene__card", { autoAlpha: 0, y: 18, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" })
        .to(product, { autoAlpha: 1, y: 0, z: 0, scale: 1, rotateX: 0, rotateY: 0, duration: 0.85, ease: "back.out(1.5)" })
        .to(aura, { autoAlpha: 1, scale: 1.25, duration: 0.75, ease: "power2.out" }, "<")
        .to(product, { rotateY: 7, rotateX: -4, duration: 0.45, yoyo: true, repeat: 1, ease: "sine.inOut" }, "<0.2")
        .to(aura, { scale: 1.06, duration: 0.65, ease: "sine.inOut" });

      const sprayParticles = (radius: number, duration: number) => ({
        autoAlpha: 1,
        x: (index: number) => Math.cos((index / particles.length) * Math.PI * 2) * radius,
        y: (index: number) => Math.sin((index / particles.length) * Math.PI * 2) * radius * 0.72,
        scale: 1.25,
        duration,
        stagger: { each: 0.018, from: "random" as const },
        ease: "power2.out",
      });
      const shakeStage = (amount: number) => ({
        x: amount,
        y: amount * -0.45,
        duration: 0.045,
        repeat: 5,
        yoyo: true,
        ease: "power1.inOut",
        clearProps: "x,y",
      });

      if (collection === "jujutsu-kaisen") {
        timeline.call(labelStep(0))
          .to(aura, { scale: 1.42, autoAlpha: 1, duration: 0.65, ease: "power2.inOut" })
          .to(burst, { autoAlpha: 0.7, scale: 1.25, duration: 0.45, ease: "power2.out" }, "<")
          .call(labelStep(1))
          .to(mouth, { autoAlpha: 1, scaleY: 1, duration: 0.7, ease: "back.out(1.7)" })
          .to(product, { y: -9, scale: 1.08, duration: 0.4, yoyo: true, repeat: 1, ease: "power1.inOut" }, "<")
          .call(labelStep(2))
          .to(mouth, { scaleY: 0.24, duration: 0.45, ease: "power3.in" })
          .to(product, { z: -35, rotationY: 12, duration: 0.28, ease: "power2.in" }, "<")
          .to(particles, sprayParticles(135, 0.72), "<")
          .to(stage, shakeStage(5), "<")
          .to(particles, { autoAlpha: 0, scale: 0, duration: 0.28, stagger: { each: 0.012, from: "random" } }, "<0.38")
          .to(product, { autoAlpha: 0, scale: 0.04, y: 8, duration: 0.75, ease: "power4.in" }, "<0.05")
          .to(mouth, { autoAlpha: 0, duration: 0.55 }, "<0.2");
      } else if (collection === "one-piece") {
        timeline.call(labelStep(0))
          .to(product, { scale: 1.05, duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" })
          .call(labelStep(1))
          .to(arm, { autoAlpha: 1, scaleX: 1, duration: 0.65, ease: "power3.out" })
          .to(product, { x: -16, rotation: -7, duration: 0.22, yoyo: true, repeat: 1 }, "<0.25")
          .to(hat, { autoAlpha: 1, scale: 1, rotation: 8, duration: 0.4, ease: "back.out(2)" }, "<0.15")
          .to(particles, sprayParticles(95, 0.58), "<0.1")
          .to(particles, { autoAlpha: 0, scale: 0, duration: 0.25, stagger: { each: 0.01, from: "random" } }, "<0.3")
          .call(labelStep(2))
          .to(armAndProduct, { x: (i) => i === 0 ? 440 : 390, z: (i) => i === 1 ? 110 : 0, duration: 0.9, ease: "power3.in" })
          .to([...armAndProduct, ...hat], { autoAlpha: 0, duration: 0.2 }, "<0.7");
      } else if (collection === "dragon-ball") {
        timeline.call(labelStep(0))
          .to(ki, { autoAlpha: 1, scale: 0.82, duration: 1, ease: "power2.in" })
          .to(aura, { scale: 1.55, duration: 0.6, ease: "power2.inOut" }, "<0.25")
          .call(labelStep(1))
          .to(ki, { scale: 1.45, duration: 0.5, ease: "expo.out" })
          .to(flash, { autoAlpha: 0.92, duration: 0.12, yoyo: true, repeat: 1 }, "<0.35")
          .to(particles, sprayParticles(185, 0.72), "<0.3")
          .to(stage, shakeStage(7), "<")
          .to(particles, { autoAlpha: 0, scale: 0, duration: 0.3, stagger: { each: 0.012, from: "random" } }, "<0.38")
          .call(labelStep(2))
          .to(product, { x: 310, y: -145, z: 180, scale: 0.18, rotateX: 26, rotation: 28, duration: 0.8, ease: "power4.in" })
          .to(ki, { autoAlpha: 0, scale: 1.9, duration: 0.45 }, "<0.1");
      } else if (collection === "demon-slayer") {
        timeline.call(labelStep(0))
          .to(blade, { autoAlpha: 1, duration: 0.12 })
          .call(labelStep(1))
          .to([blade, trail], { autoAlpha: 1, duration: 0.05 })
          .to(blade, { x: 90, y: -150, rotation: 15, duration: 0.72, ease: "power2.inOut" })
          .to(trail, { scaleX: 1, duration: 0.34, ease: "power2.out" }, "<")
          .to(product, { filter: "brightness(2.5)", scale: 1.08, duration: 0.18, yoyo: true, repeat: 1 }, "<0.25")
          .call(labelStep(2))
          .to(product, { autoAlpha: 0, scale: 0.22, x: 85, y: -55, rotation: 24, filter: "blur(8px)", duration: 0.58, ease: "power2.in" })
          .to(embers, { autoAlpha: 1, scale: 1.35, rotation: 90, duration: 0.8, ease: "power2.out" }, "<0.2")
          .to(particles, sprayParticles(155, 0.85), "<")
          .to(stage, shakeStage(4), "<0.08")
          .to(particles, { x: 250, y: 115, autoAlpha: 0, scale: 0, duration: 0.75, stagger: { each: 0.015, from: "random" }, ease: "power2.in" }, "<0.42")
          .to(embers, { x: 250, y: 115, scale: 0.18, rotation: 240, autoAlpha: 0, duration: 0.9, ease: "power2.in" });
      } else {
        timeline.call(labelStep(0))
          .to(smoke, { autoAlpha: 1, scale: 1.25, duration: 0.6, ease: "back.out(1.4)" })
          .to(product, { autoAlpha: 0.45, duration: 0.2 }, "<0.15")
          .call(labelStep(1))
          .to(shadow, { autoAlpha: 1, x: 0, scale: 1, duration: 0.55, ease: "power2.out" })
          .to(product, { x: 30, scale: 0.88, duration: 0.35, ease: "power2.in" }, "<0.12")
          .call(labelStep(2))
          .to(puff, { autoAlpha: 0.95, scale: 8, duration: 0.55, ease: "power2.out" })
          .to(particles, sprayParticles(165, 0.7), "<")
          .to(particles, { autoAlpha: 0, scale: 0, duration: 0.3, stagger: { each: 0.012, from: "random" } }, "<0.38")
          .to([shadow, product], { autoAlpha: 0, scale: 0.08, duration: 0.3 }, "<0.18")
          .to(smoke, { autoAlpha: 0, scale: 1.65, duration: 0.55 }, "<0.1");
      }

      timeline.to(bag, { autoAlpha: 1, scale: 1.12, duration: 0.3, ease: "back.out(2)" })
        .to(bag, { scale: 1, duration: 0.18 })
        .to(result, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" })
        .to({}, { duration: 1.9 });
      timeline.play();
    }, root);

    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onFinish(); };
    document.addEventListener("keydown", onKeyDown);
    return () => { ctx.revert(); document.removeEventListener("keydown", onKeyDown); };
  }, [collection, onFinish]);

  return <div ref={root} className={`add-scene add-scene--${collection}`} role="dialog" aria-modal="true" aria-label={`${copy.title}: ${productName}`} onClick={onFinish}>
    <section className="add-scene__card" onClick={(event) => event.stopPropagation()}>
      <button className="add-scene__close" type="button" aria-label="Close animation" onClick={onFinish}><X size={20} /></button>
      <header className="add-scene__header"><span>PIXEL <small>ANIME DROP</small></span><i>ADD TO BAG / {collection.replaceAll("-", " ").toUpperCase()}</i></header>
      <div className="add-scene__stage" aria-hidden="true">
        <div className="add-scene__aura" />
        <div className="add-scene__fx">
          <div className="add-scene__particles">{Array.from({ length: 16 }, (_, index) => <i className="anime-particle" key={index} />)}</div>
          {collection === "jujutsu-kaisen" && <><div className="add-scene__burst" /><div className="curse-mouth"><i /><b /><em /></div></>}
          {collection === "one-piece" && <><div className="rubber-arm"><i className="rubber-arm__fist"><b /><b /><b /><b /></i></div><div className="straw-hat"><i /></div></>}
          {collection === "dragon-ball" && <div className="ki-charge"><i /><b /><b /><b /></div>}
          {collection === "demon-slayer" && <div className="sun-breath"><i className="sun-breath__blade" /><i className="sun-breath__trail" /><b className="sun-breath__embers" /></div>}
          {collection === "naruto" && <div className="shinobi-smoke"><i className="shinobi-smoke__cloud" /><i className="shinobi-smoke__shadow" /><i className="shinobi-smoke__puff" /></div>}
          <div className="add-scene__flash" />
        </div>
        <div className="add-scene__product"><div className="add-scene__hoodie"><span>{copy.mark}</span></div><small>PIXEL / LIMITED DROP</small><strong>{productName}</strong></div>
        <div className="add-scene__bag"><ShoppingBag size={34} /><span>+1</span></div>
      </div>
      <div className="add-scene__caption" aria-live="polite">{copy.steps[step] ?? copy.steps[0]}</div>
      <div className="add-scene__result"><p><Check size={14} /> BAG UPDATED</p><h1>{copy.title}</h1><span>{copy.subtitle}</span>
        <button type="button" onClick={onViewBag}>VIEW BAG <ShoppingBag size={16} /></button>
        <button className="add-scene__continue" type="button" onClick={onFinish}>CONTINUE SHOPPING</button>
      </div>
    </section>
  </div>;
}
