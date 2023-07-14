import React from "react";
import "./SnakeHead.css";

const SnakeHead = ({ headPosition, snakeDirection }) => {
  return (
    <div
      className="map-snake"
      style={{
        top: `${headPosition[1] * 28}px`,
        left: `${headPosition[0] * 28}px`,
      }}
    >
      <div className={`snake-eye left ${snakeDirection}`}></div>
      <div className={`snake-eye right ${snakeDirection}`}></div>
    </div>
  );
};

export default SnakeHead;
