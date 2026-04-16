"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  cellSize = 56,
  className,
  interactive = false,
  ambient = true,
  ambientIntervalMs = 1800,
  captureViewportClicks = false,
}: {
  cellSize?: number;
  className?: string;
  interactive?: boolean;
  ambient?: boolean;
  ambientIntervalMs?: number;
  captureViewportClicks?: boolean;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [gridSize, setGridSize] = useState({ rows: 0, cols: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  const triggerRippleAtPoint = useCallback(
    (clientX: number, clientY: number) => {
      const container = ref.current;
      if (!container || gridSize.rows === 0 || gridSize.cols === 0) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const gridWidth = gridSize.cols * cellSize;
      const gridHeight = gridSize.rows * cellSize;
      const gridLeft = rect.left + (rect.width - gridWidth) / 2;
      const gridTop = rect.top + (rect.height - gridHeight) / 2;

      const clampedX = Math.min(
        Math.max(clientX - gridLeft, 0),
        Math.max(gridWidth - 1, 0),
      );
      const clampedY = Math.min(
        Math.max(clientY - gridTop, 0),
        Math.max(gridHeight - 1, 0),
      );

      const col = Math.min(gridSize.cols - 1, Math.max(0, Math.floor(clampedX / cellSize)));
      const row = Math.min(gridSize.rows - 1, Math.max(0, Math.floor(clampedY / cellSize)));

      setClickedCell({ row, col });
      setRippleKey((key) => key + 1);
    },
    [cellSize, gridSize.cols, gridSize.rows],
  );

  useEffect(() => {
    const container = ref.current;
    if (!container) return undefined;

    const updateGrid = () => {
      const rect = container.getBoundingClientRect();
      const rows = Math.max(1, Math.ceil(rect.height / cellSize) + 2);
      const cols = Math.max(1, Math.ceil(rect.width / cellSize) + 2);
      setGridSize({ rows, cols });
    };

    updateGrid();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            updateGrid();
          })
        : null;

    observer?.observe(container);

    return () => {
      observer?.disconnect();
    };
  }, [cellSize]);

  useEffect(() => {
    if (!ambient || gridSize.rows === 0 || gridSize.cols === 0) {
      return undefined;
    }

    const triggerRipple = () => {
      const row = Math.floor(Math.random() * gridSize.rows);
      const col = Math.floor(Math.random() * gridSize.cols);
      setClickedCell({ row, col });
      setRippleKey((key) => key + 1);
    };

    triggerRipple();
    const interval = window.setInterval(triggerRipple, ambientIntervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [ambient, ambientIntervalMs, gridSize.cols, gridSize.rows]);

  useEffect(() => {
    if (!interactive || !captureViewportClicks) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) {
        return;
      }

      triggerRippleAtPoint(event.clientX, event.clientY);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [captureViewportClicks, interactive, triggerRippleAtPoint]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        "[--cell-border-color:var(--background-ripple-border)] [--cell-fill-color:var(--background-ripple-fill)] [--cell-shadow-color:var(--background-ripple-shadow)]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <DivGrid
          key={`base-${rippleKey}`}
          className="mask-radial-from-20% mask-radial-at-top opacity-[0.96]"
          cols={gridSize.cols}
          rows={gridSize.rows}
          cellSize={cellSize}
          clickedCell={clickedCell}
          fillColor="var(--cell-fill-color)"
          borderColor="var(--cell-border-color)"
          interactive={interactive}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((key) => key + 1);
          }}
        />
      </div>
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // in pixels
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    height: rows * cellSize,
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: cols * cellSize,
  };

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0; // ms
        const duration = 200 + distance * 80; // ms

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.75px] opacity-[0.62] transition-opacity duration-150 will-change-transform hover:opacity-[0.94] dark:shadow-[0px_0px_58px_2px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none",
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};
