// src/pages/Home.js
import React, { useState } from 'react';
import MatrixDisplay from '../components/layout/MatrixDisplay';
import SnakeGame from '../components/layout/SnakeGame'; // Nhập SnakeGame

function Home() {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleRun = () => {
    setDisplayText(inputText.toUpperCase());
  };

  return (
    <div style={{ padding: '20px', background: '#000', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập dòng chữ (VD: HOÀI NAM)"
          style={{ padding: '10px', fontSize: '18px', width: '300px' }}
        />
        <button
          onClick={handleRun}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
        >
          Chạy
        </button>
      </div>

      <MatrixDisplay text={displayText} />
      <SnakeGame />
    </div>
  );
}

export default Home;
