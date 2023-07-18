import React, { useEffect, useState } from "react";
import grid from "./grid";
import "./Game.css";
import Snake from "./Snake";
import Food from "./Food";

// MAIN GAMEPLAY

var snakeDir;

const Game = () => {
  const [gameState, setGameState] = useState("start");
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
  const [speed, setSpeed] = useState(300);
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)

  const endGame = () => {
        setGameState("end");
        setSpeed(1000000000000);
  }

  const reset = () => {
    setHeadPosition([5, 5]);
    setSnakeLength(4);
    setSnakeDirection("E");
    setBodyChain([
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
    ]);
    setScore(0);
    setLevel(1);
    setSpeed(300);
    setGameState("play");
  };

  const increaseSnakeLength = () => {
    console.log("INCREASING SNAKE LENGTH");

    var currentLength = snakeLength;

    setSnakeLength(currentLength + 1);
    var newScore = score;
    newScore= newScore + 10;

    setScore(newScore);
  };

  useEffect(() => {
    var headY = headPosition[1];
    var headX = headPosition[0];
    setPreviousHeadPosition([headX, headY]);
  }, [headPosition]);

  // -------------------- GAME OVER ----------------------

  useEffect(() => {
    if (
      headPosition[1] < 0 ||
      headPosition[0] < 0 ||
      headPosition[1] > grid.length - 1 ||
      headPosition[0] > grid[0].length - 1
    ) {
      endGame();
    }
  }, [headPosition]);

  function checkCollision(headPosition, bodyChain) {
    return bodyChain.some((position) => {
      return position[0] === headPosition[0] && position[1] === headPosition[1];
    });
  }

  useEffect(() => {
    if (checkCollision(headPosition, bodyChain)) {
      endGame()
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
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [headPosition, gameState]);

  useEffect(() => {
    snakeDir = snakeDirection;
  }, [snakeDirection]);

  // useEffect(() => {
  //   if (gameState === "play") {
  //     reset()
  //   }
  // }, [gameState])

  // -------------------- END OF HEAD MOVEMENT --------------------

  // -------------------- KEYBOARD CONTROLS --------------------

  useEffect(() => {
    const handleKeyDown = (event) => {
      // console.log("KEY PRESSED")
      console.log("SNAKE DIR: " + snakeDir);
      switch (event.keyCode) {
        case 38: // Up arrow key
        case 87: // W key
          if (snakeDirection !== "S") {
            setSnakeDirection("N");
          }
          break;
        case 40: // Down arrow key
        case 83: // S key
          if (snakeDirection !== "N") {
            setSnakeDirection("S");
          }
          break;
        case 37: // Left arrow key
        case 65: // A key
          if (snakeDirection !== "E") {
            setSnakeDirection("W");
          }
          break;
        case 39: // Right arrow key
        case 68: // D key
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
      {/* {gameState === "end" && (
        <div>
          GAME OVER
          <button onClick={() => setGameState("play")}>Try Again</button>
        </div>
      )} */}
      {gameState === "start" && (
        <div className="menu-container">
          {grid.map((row, index) => {
            return (
              <div className="map-row" key={index}>
                {row.map((cell, index) => {
                  return <div className={`map-cell`} key={index}></div>;
                })}
              </div>
            );
          })}
          <div className="game-menu">
            <div className="menu-title">WELCOME TO REACT SNAKE</div>
            <button onClick={() => setGameState("play")}>START</button>
            <p>Use Arrow Keys or WASD to control the snake</p>
          </div>
        </div>
      )}
      {(gameState === "play" || gameState === "end") && (
        <>
          <div className="game-menu">
            <div className="score-container">
              <div className="menu-score">SCORE: {score}</div>
              <div className="menu-level">LEVEL: {level}</div>
            </div>
          </div>

          {gameState === "end" && (
            <div className="game-menu">
              <div className="menu-title">GAME OVER</div>
              <button onClick={() => reset()}>TRY AGAIN</button>
            </div>
          )}

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
