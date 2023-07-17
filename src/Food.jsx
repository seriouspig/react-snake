import React, { useEffect, useState } from "react";
import "./Food.css";
import grid from "./grid";

const Food = ({ headPosition, increaseSnakeLength }) => {
  const [foodPosition, setFoodPosition] = useState([0, 0]);

  useEffect(() => {
    const posY = Math.floor(Math.random() * grid.length);
    const posX = Math.floor(Math.random() * grid[0].length);

    setFoodPosition([posX, posY]);
  }, []);

  useEffect(() => {
    if (
      headPosition[0] === foodPosition[0] &&
      headPosition[1] === foodPosition[1]
    ) {
      const posY = Math.floor(Math.random() * grid.length);
      const posX = Math.floor(Math.random() * grid[0].length);

      setFoodPosition([posX, posY]);
      increaseSnakeLength();
    }
  }, [headPosition]);

  return (
    <div
      className="map-food"
      style={{
        top: `${foodPosition[1] * 28}px`,
        left: `${foodPosition[0] * 28}px`,
      }}
    ></div>
  );
};

export default Food;
