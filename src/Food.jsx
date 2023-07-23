import React, { useEffect, useState } from "react";
import "./Food.css";

const Food = ({ headPosition, increaseSnakeLength, grid }) => {
  const [foodPosition, setFoodPosition] = useState([0, 0]);

  useEffect(() => {
    // const posY = Math.floor(Math.random() * grid.length);
    // const posX = Math.floor(Math.random() * grid[0].length);
    // setFoodPosition([posX, posY]);
    resetFoodPosition()
  }, []);

  const resetFoodPosition = () => {
    var posY;
    var posX;

    posY = Math.floor(Math.random() * grid.length);
    posX = Math.floor(Math.random() * grid[0].length);

    if (grid[posY][posX] !== 0) {
      resetFoodPosition();
    } else {
      setFoodPosition([posX, posY]);
    }
  };

  useEffect(() => {
    if (
      headPosition[0] === foodPosition[0] &&
        headPosition[1] === foodPosition[1]
    ) {
      resetFoodPosition();
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
