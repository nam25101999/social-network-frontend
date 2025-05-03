import React, { useState, useEffect } from 'react';

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const boardSize = 20; // Mở rộng kích thước bảng thành 20x20

  // Hàm di chuyển rắn
  const moveSnake = () => {
    const newSnake = [...snake];
    let head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    newSnake.unshift(head); // Thêm đầu rắn
    newSnake.pop(); // Loại bỏ đuôi rắn

    // Kiểm tra nếu rắn ăn được thức ăn
    if (head.x === food.x && head.y === food.y) {
      newSnake.push({ x: food.x, y: food.y }); // Rắn dài thêm
      setScore(score + 1);
      generateFood(); // Tạo thức ăn mới
    }

    // Kiểm tra va chạm với tường hoặc chính mình
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || isCollision(newSnake)) {
      setGameOver(true);
      setIsRunning(false);
      clearInterval(intervalId); // Dừng game
    }

    setSnake(newSnake);
  };

  // Kiểm tra va chạm với chính mình
  const isCollision = (newSnake) => {
    const head = newSnake[0];
    for (let i = 1; i < newSnake.length; i++) {
      if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
        return true;
      }
    }
    return false;
  };

  // Tạo thức ăn mới, đảm bảo thức ăn không trùng với rắn
  const generateFood = () => {
    let newFood;
    let isFoodOnSnake = true;
    
    // Kiểm tra xem thức ăn có trùng với vị trí rắn không
    while (isFoodOnSnake) {
      newFood = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };

      // Kiểm tra nếu thức ăn không nằm trên thân rắn
      isFoodOnSnake = snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
    }

    setFood(newFood);
  };

  // Lắng nghe sự kiện bàn phím
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);

  // Di chuyển rắn mỗi 100ms nếu đang chạy
  useEffect(() => {
    if (isRunning && !gameOver) {
      const id = setInterval(() => {
        moveSnake();
      }, 100);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [isRunning, snake, direction, gameOver]);

  // Bắt đầu trò chơi
  const startGame = () => {
    setSnake([{ x: 0, y: 0 }]);
    setDirection('RIGHT');
    setFood({ x: 5, y: 5 });
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
  };

  // Tạm dừng trò chơi
  const pauseGame = () => {
    setIsRunning(false);
    clearInterval(intervalId);
  };

  // Vẽ trò chơi
  const renderBoard = () => {
    const board = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null));

    snake.forEach((segment) => {
      board[segment.y][segment.x] = 'S';
    });
    board[food.y][food.x] = 'F';

    return board.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: 'flex' }}>
        {row.map((cell, cellIndex) => (
          <div
            key={cellIndex}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: cell === 'S' ? 'green' : cell === 'F' ? 'red' : 'lightgray',
              border: '1px solid #ccc',
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', color: '#fff' }}>
      <h2>Điểm: {score}</h2>
      <div>{renderBoard()}</div>
      {gameOver && <h3 style={{ color: 'red' }}>Game Over!</h3>}
      <div style={{ marginTop: '20px' }}>
        {!isRunning ? (
          <button
            onClick={startGame}
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Bắt đầu
          </button>
        ) : (
          <button
            onClick={pauseGame}
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              backgroundColor: '#ffc107',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Tạm dừng
          </button>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
