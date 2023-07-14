import React from "react";
import SnakeBody from "./SnakeBody";
import SnakeHead from "./SnakeHead";

const Snake = ({
  headPosition,
  snakeDirection,
  previousHeadPosition,
  snakeLength,
  bodyChain
}) => {
  const renderSnakeBody = () => {
    const snakeBody = [];
    for (let i = 0; i < snakeLength; i++) {
    // get previous position and pass it on to SnakeBody as a prop

      snakeBody.push(
        <SnakeBody
          key={i}
          headPosition={headPosition}
          snakeDirection={snakeDirection}
          previousHeadPosition={previousHeadPosition}
          bodyChain={bodyChain}
          chainIndex={i}
        />
      );
    }
    return snakeBody;
  };

  return (
    <div>
      <SnakeHead headPosition={headPosition} snakeDirection={snakeDirection} />
      {renderSnakeBody()}
    </div>
  );
};

export default Snake;
