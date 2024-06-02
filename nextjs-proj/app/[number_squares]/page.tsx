"use client";
import { useEffect, useRef, useState } from "react";
import { Square } from "../components/Square";

export default function Page({
  params,
}: {
  params: { number_squares: number };
}) {
  const [numSquares, setNumSquares] = useState(Number(params.number_squares));
  const [renderTime, setRenderTime] = useState<number | null>(null);
  const [fps, setFPS] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const frameCount = useRef<number>(0);
  const lastTime = useRef<number>(performance.now());
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial window size
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    return () => {
      // Remove event listener on cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderSquares = () => {
    if (windowSize.width === 0 || windowSize.height === 0) {
      // If window size is not available yet, return null or loading indicator
      return null;
    }

    const squareSize = Math.min(
      windowSize.width / numSquares,
      windowSize.height / numSquares,
    );

    const squares = [];
    for (let i = 0; i < numSquares; i++) {
      for (let j = 0; j < numSquares; j++) {
        squares.push(
          <Square key={`${i}-${j}`} width={squareSize} height={squareSize} />,
        );
      }
    }
    return squares;
  };

  useEffect(() => {
    const animate = () => {
      frameCount.current += 1;
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime.current;

      if (deltaTime >= 1000) {
        const currentFPS = (frameCount.current / deltaTime) * 1000;
        setFPS(parseFloat(currentFPS.toFixed(2)));
        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const addSquares = () => {
    const startTime = performance.now();
    setNumSquares(numSquares + 100);
    setRenderTime(null); // Reset render time
    // Wait for the next render cycle to measure the time after squares are rendered
    requestAnimationFrame(() => {
      const endTime = performance.now();
      setRenderTime(endTime - startTime); // Calculate render time
    });
  };

  return (
    <main>
      <button onClick={addSquares}>Add Squares</button>

      <p>FPS: {fps}</p>
      <p>
        Render Time:{" "}
        {renderTime !== null ? `${renderTime.toFixed(2)}ms` : "N/A"}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numSquares}, 1fr)`,
          gridTemplateRows: `repeat(${numSquares}, 1fr)`,
          width: "100vw",
          height: "100vh",
        }}
      >
        {renderSquares()}
      </div>
    </main>
  );
}
