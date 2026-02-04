import { useCallback, useRef } from "react";

const useMobileManagerNavDrag = ({
  onClose,
  disabled,
}: {
  onClose: () => void;
  disabled?: boolean;
}) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef(0);
  const deltaXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastVelocityRef = useRef(0);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled || !isDraggingRef.current || !navRef.current) {
        return;
      }

      const navWidth = navRef.current.offsetWidth;
      const resistanceStart = navWidth * 0.5;
      const resistanceFactor = 0.5;

      let delta = Math.min(0, event.clientX - startXRef.current);

      if (Math.abs(delta) > resistanceStart) {
        const excess = Math.abs(delta) - resistanceStart;
        delta = -(resistanceStart + excess * resistanceFactor);
      }

      deltaXRef.current = delta;
      navRef.current.style.setProperty(
        "transform",
        `translateX(${delta}px)`,
        "important"
      );

      const now = performance.now();
      const timeDelta = now - lastTimeRef.current;
      if (timeDelta > 0) {
        lastVelocityRef.current =
          (lastXRef.current - event.clientX) / timeDelta;
      }
      lastXRef.current = event.clientX;
      lastTimeRef.current = now;
    },
    [disabled]
  );

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled || !isDraggingRef.current) {
        return;
      }

      navRef.current?.releasePointerCapture(event.pointerId);
      const nav = navRef.current;
      if (!nav) {
        return;
      }

      const navWidth = nav.offsetWidth;
      const closeByDistance = Math.abs(deltaXRef.current) > navWidth * 0.35;
      const closeByVelocity = lastVelocityRef.current > 0.6;

      nav.classList.remove("dragging");

      if (closeByDistance || closeByVelocity) {
        nav.style.transition = "transform 160ms ease-in";
        nav.style.animation = "none";
        requestAnimationFrame(() => {
          nav.style.transform = `translateX(-${navWidth}px)`;
        });
        nav.addEventListener(
          "transitionend",
          () => {
            onClose();
          },
          { once: true }
        );
      } else {
        nav.style.transition = "transform 180ms ease-out";
        requestAnimationFrame(() => {
          nav.style.transform = "translateX(0px)";
        });
        nav.addEventListener(
          "transitionend",
          () => {
            nav.style.removeProperty("transform");
            nav.style.removeProperty("transition");
          },
          { once: true }
        );
      }

      isDraggingRef.current = false;
    },
    [disabled, onClose]
  );

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (
        disabled ||
        (event.pointerType === "mouse" && event.button !== 0) ||
        (event.target as HTMLElement).closest("button, a, input, textarea")
      ) {
        return;
      }

      startXRef.current = event.clientX;
      lastXRef.current = event.clientX;
      lastTimeRef.current = performance.now();
      lastVelocityRef.current = 0;
      deltaXRef.current = 0;
      navRef.current?.setPointerCapture(event.pointerId);
      navRef.current?.classList.add("dragging");

      isDraggingRef.current = true;
    },
    [disabled]
  );

  return {
    navRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  };
};

export default useMobileManagerNavDrag;
