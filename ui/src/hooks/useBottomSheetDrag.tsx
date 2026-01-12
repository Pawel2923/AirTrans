import React, { useCallback, useRef } from "react";

const useBottomSheetDrag = ({
  onClose,
  disabled,
}: {
  onClose: () => void;
  disabled?: boolean;
}) => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const startYRef = useRef(0);
  const deltaYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastVelocityRef = useRef(0);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled || !isDraggingRef.current || !sheetRef.current) {
        return;
      }

      const sheetHeight = sheetRef.current.offsetHeight;
      const resistanceStart = sheetHeight * 0.5;
      const resistanceFactor = 0.5;

      let delta = Math.max(0, event.clientY - startYRef.current);

      if (delta > resistanceStart) {
        const excess = delta - resistanceStart;
        delta = resistanceStart + excess * resistanceFactor;
      }

      deltaYRef.current = delta;
      sheetRef.current.style.setProperty(
        "transform",
        `translateY(${delta}px)`,
        "important"
      );

      const now = performance.now();
      const timeDelta = now - lastTimeRef.current;
      if (timeDelta > 0) {
        lastVelocityRef.current =
          (event.clientY - lastYRef.current) / timeDelta;
      }
      lastYRef.current = event.clientY;
      lastTimeRef.current = now;
    },
    [disabled]
  );

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled || !isDraggingRef.current) {
        return;
      }

      sheetRef.current?.releasePointerCapture(event.pointerId);
      const sheet = sheetRef.current;
      if (!sheet) {
        return;
      }

      const sheetHeight = sheet.offsetHeight;
      const closeByDistance = deltaYRef.current > sheetHeight * 0.35;
      const closeByVelocity = lastVelocityRef.current > 0.6;

      sheet.classList.remove("dragging");

      if (closeByDistance || closeByVelocity) {
        sheet.style.transition = "transform 160ms ease-in";
        sheet.style.animation = "none";
        requestAnimationFrame(() => {
          sheet.style.transform = `translateY(${sheetHeight}px)`;
        });
        sheet.addEventListener(
          "transitionend",
          () => {
            onClose();
          },
          { once: true }
        );
      } else {
        sheet.style.transition = "transform 180ms ease-out";
        requestAnimationFrame(() => {
          sheet.style.transform = "translateY(0px)";
        });
        sheet.addEventListener(
          "transitionend",
          () => {
            sheet.style.removeProperty("transform");
            sheet.style.removeProperty("transition");
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

      startYRef.current = event.clientY;
      lastYRef.current = event.clientY;
      lastTimeRef.current = performance.now();
      lastVelocityRef.current = 0;
      deltaYRef.current = 0;
      sheetRef.current?.setPointerCapture(event.pointerId);
      sheetRef.current?.classList.add("dragging");

      isDraggingRef.current = true;
    },
    [disabled]
  );

  return {
    sheetRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  };
};

export default useBottomSheetDrag;
