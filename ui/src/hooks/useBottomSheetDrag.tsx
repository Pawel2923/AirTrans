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

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled || !isDraggingRef.current || !sheetRef.current) {
        return;
      }

      const sheetHeight = sheetRef.current.offsetHeight;
      const resistanceStart = sheetHeight * 0.5;
      const resistanceFactor = 0.5;

      let delta = Math.max(0, event.clientY - startYRef.current);
      deltaYRef.current = delta;

      if (delta > resistanceStart) {
        const excess = delta - resistanceStart;
        delta = resistanceStart + excess * resistanceFactor;
      }

      sheetRef.current.style.setProperty(
        "transform",
        `translateY(${delta}px)`,
        "important"
      );

      const now = performance.now();
      lastYRef.current = event.clientY;
      lastTimeRef.current = now;
    },
    [disabled]
  );

  //TODO: fix jumping and flickering when releasing the drag
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

      const timeDelta = performance.now() - lastTimeRef.current;
      const velocity = timeDelta > 0 ? deltaYRef.current / timeDelta : 0;

      const closeByVelocity = velocity > 0.6;

      if (closeByDistance || closeByVelocity) {
        sheet.classList.remove("dragging");
        sheet.style.removeProperty("transform");

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            onClose();
          });
        });
      } else {
        sheet.style.removeProperty("transform");
        sheet.classList.remove("dragging");
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
