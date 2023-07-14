import React, { useEffect, useState } from "react";
import grid from "./grid";
import "./Game.css";
import Snake from "./Snake";

// MAIN GAMEPLAY

const Game = () => {
  const directions = ["N", "E", "S", "W", "none"];

  const [directionIndex, setDirectionIndex] = useState(1);
  const [snakeDirection, setSnakeDirection] = useState(
    directions[directionIndex]
  );
  const [headPosition, setHeadPosition] = useState([5, 5]);
  const [previousHeadPosition, setPreviousHeadPosition] = useState([
    headPosition[0],
    headPosition[1],
  ]);
  const [snakeLength, setSnakeLength] = useState(4);

  const [bodyChain, setBodyChain] = useState([[1, 5], [(2, 5)], [3, 5], [4, 5]]);
  const [previousBodyChain, setPreviousBodyChain] = useState([
    [4, 5],
    [3, 5],
    [2, 5],
  ]);

  useEffect(() => {
    setSnakeDirection(directions[directionIndex]);
  }, [directionIndex]);

  useEffect(() => {
    var headY = headPosition[1];
    var headX = headPosition[0];
    setPreviousHeadPosition([headX, headY]);
  }, []);

  // -------------------- HEAD MOVEMENT --------------------

  useEffect(() => {
    const interval = setInterval(() => {
      var headY = headPosition[1];
      var headX = headPosition[0];
      setPreviousHeadPosition([headX, headY]);
      switch (snakeDirection) {
        case "N":
          setHeadPosition([headX, headY - 1]);
          break;
        case "E":
          setHeadPosition([headX + 1, headY]);
          break;
        case "S":
          setHeadPosition([headX, headY + 1]);
          break;
        case "W":
          setHeadPosition([headX - 1, headY]);
          break;
        default:
          break;
      }

      var oldBodyChain = bodyChain;

      if(oldBodyChain.length === snakeLength) {
          oldBodyChain.shift()
      }

      oldBodyChain.push(headPosition)

      setBodyChain(oldBodyChain)
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [headPosition, snakeDirection]);

  // -------------------- END OF HEAD MOVEMENT --------------------

  // -------------------- KEYBOARD CONTROLS --------------------

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.keyCode) {
        case 38: // Up arrow key
          setDirectionIndex(0);
          break;
        case 40: // Down arrow key
          setDirectionIndex(2);
          break;
        case 37: // Left arrow key
          setDirectionIndex(3);
          break;
        case 39: // Right arrow key
          setDirectionIndex(1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // -------------------- END OF KEYBOARD CONTROLS --------------------

  const checkCell = (cell) => {
    if (cell === 1) {
      return "wall";
    }
  };

  return (
    <div className="map-container">
      <Snake
        headPosition={headPosition}
        snakeDirection={snakeDirection}
        snakeLength={snakeLength}
        previousHeadPosition={previousHeadPosition}
        bodyChain={bodyChain}
      />
      {grid.map((row, index) => {
        return (
          <div className="map-row" key={index}>
            {row.map((cell, index) => {
              return <div className={`map-cell`} key={index}></div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Game;
