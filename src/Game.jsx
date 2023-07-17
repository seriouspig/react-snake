import React, { useEffect, useState } from "react";
import grid from "./grid";
import "./Game.css";
import Snake from "./Snake";
import Food from "./Food";

// MAIN GAMEPLAY

var snakeDir;

const Game = () => {
  const [gameState, setGameState] = useState("end");
  const [snakeDirection, setSnakeDirection] = useState("E");
  const [headPosition, setHeadPosition] = useState([5, 5]);
  const [previousHeadPosition, setPreviousHeadPosition] = useState([
    headPosition[0],
    headPosition[1],
  ]);
  const [snakeLength, setSnakeLength] = useState(4);

  const [bodyChain, setBodyChain] = useState([
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
  ]);

  const reset = () => {
    console.log("OUUUUUUCCCCHHHHH !!!");
    setGameState("end");
    setHeadPosition([5, 5]);
    setSnakeLength(4);
    setSnakeDirection("E");
    setBodyChain([
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
    ]);
  };

  const increaseSnakeLength = () => {
    console.log("INCREASING SNAKE LENGTH");

    var currentLength = snakeLength;

    setSnakeLength(currentLength + 1);
  };

  useEffect(() => {
    var headY = headPosition[1];
    var headX = headPosition[0];
    setPreviousHeadPosition([headX, headY]);
  }, [headPosition]);

  // -------------------- GAME OVER ----------------------

  useEffect(() => {
    if (headPosition[1] < 0 || headPosition[0] < 0 || headPosition[1] > grid.length - 1 || headPosition[0] > grid[0].length - 1) {
      reset()
      
    }
  }, [headPosition]);

  // -------------------- END OF GAME OVER ----------------------

  // -------------------- HEAD MOVEMENT --------------------

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState === "play") {
        // console.log("CALLING SET INTERVAL !!!!!!!!!!")
        var headY = headPosition[1];
        var headX = headPosition[0];
        setPreviousHeadPosition([headX, headY]);
        console.log(snakeDir);

        switch (snakeDir) {
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

        if (oldBodyChain.length === snakeLength) {
          oldBodyChain.shift();
        }

        oldBodyChain.push(headPosition);

        setBodyChain(oldBodyChain);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [headPosition, gameState]);

  useEffect(() => {
    snakeDir = snakeDirection;
  }, [snakeDirection]);

  // -------------------- END OF HEAD MOVEMENT --------------------

  // -------------------- KEYBOARD CONTROLS --------------------

  useEffect(() => {
    const handleKeyDown = (event) => {
      // console.log("KEY PRESSED")
      console.log("SNAKE DIR: " + snakeDir);
      switch (event.keyCode) {
        case 38: // Up arrow key
          if (snakeDirection !== "S") {
            setSnakeDirection("N");
          }
          break;
        case 40: // Down arrow key
          if (snakeDirection !== "N") {
            setSnakeDirection("S");
          }
          break;
        case 37: // Left arrow key
          if (snakeDirection !== "E") {
            setSnakeDirection("W");
          }
          break;
        case 39: // Right arrow key
          if (snakeDirection !== "W") {
            setSnakeDirection("E");
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [headPosition]);

  // -------------------- END OF KEYBOARD CONTROLS --------------------

  return (
    <div className="map-container">
      {gameState === "end" && (
        <div>
          GAME OVER
          <button onClick={() => setGameState("play")}>Try Again</button>
        </div>
      )}
      {gameState === "start" && (
        <div>
          <button onClick={() => setGameState("play")}>Start the game</button>
        </div>
      )}
      {gameState === "play" && (
        <>
          <Food
            headPosition={headPosition}
            increaseSnakeLength={increaseSnakeLength}
          />
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
        </>
      )}
    </div>
  );
};

export default Game;
