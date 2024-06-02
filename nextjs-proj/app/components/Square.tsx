"use client";

import { useEffect, useState } from "react";
import { getRandomColor, getRandomInterval } from "../../helpers";

interface SquareProps {
  width: number;
  height: number;
}

export const Square = ({ width, height }: SquareProps) => {
  const [color, setColor] = useState("#FFFFFF");

  useEffect(() => {
    const changeColor = () => {
      setColor(getRandomColor());
    };

    const interval = setInterval(changeColor, getRandomInterval());

    return () => clearInterval(interval);
  }, []);

  return <div style={{ width, height, backgroundColor: color }} />;
};
