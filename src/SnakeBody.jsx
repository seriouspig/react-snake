import React, { useEffect, useState } from "react";
import "./SnakeBody.css";

const SnakeBody = ({
  headPosition,
  snakeDirection,
  previousHeadPosition,
  bodyChain,
  chainIndex,
}) => {
  const [Xpos, setXpos] = useState(bodyChain[bodyChain.length - 1][0]);
  const [Ypos, setYpos] = useState(bodyChain[bodyChain.length - 1][1]);

  useEffect(() => {

    if (typeof bodyChain[chainIndex] === "undefined") {
          bodyChain[bodyChain.length - 1][0];
          bodyChain[bodyChain.length - 1][1];
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
      {/* {chainIndex} */}
    </div>
  );
};

export default SnakeBody;
