import React, { useEffect, useState } from "react";
import "./SnakeBody.css";

const SnakeBody = ({
  headPosition,
  snakeDirection,
  previousHeadPosition,
  bodyChain,
  chainIndex,
}) => {
  const [Xpos, setXpos] = useState(0);
  const [Ypos, setYpos] = useState(0);

  useEffect(() => {

    console.log(bodyChain)

    if (typeof bodyChain[chainIndex] === "undefined") {
          setXpos(0);
          setYpos(0);
    } else {
          setXpos(bodyChain[chainIndex][0]);
          setYpos(bodyChain[chainIndex][1]);
    }

  }, [headPosition])

  return (
    <div
      className="map-snake-body"
      style={{
        top: `${Ypos * 28}px`,
        left: `${Xpos * 28}px`,
      }}
    >
      {chainIndex}
    </div>
  );
};

export default SnakeBody;
