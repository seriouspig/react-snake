import React, { useEffect, useState } from "react";
import "./Food.css";

const Food = ({ headPosition, increaseSnakeLength, grid, bodyChain }) => {
  const [foodPosition, setFoodPosition] = useState([0, 0]);

  useEffect(() => {
    // const posY = Math.floor(Math.random() * grid.length);
    // const posX = Math.floor(Math.random() * grid[0].length);
    // setFoodPosition([posX, posY]);
    resetFoodPosition()
  }, []);

  const checkIfFoodOnBody = (posY, posX) => {
    bodyChain.some((position) => {
      return position[0] === posX && position[1] === posY;
    });
  }

  useEffect(() => {
    console.log(bodyChain[1])
  }, [headPosition])

  const resetFoodPosition = () => {
    var posY;
    var posX;

    posY = Math.floor(Math.random() * grid.length);
    posX = Math.floor(Math.random() * grid[0].length);

    if (grid[posY][posX] !== 0 || checkIfFoodOnBody(posY, posX) ) {
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
