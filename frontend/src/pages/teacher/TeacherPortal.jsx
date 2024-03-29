import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';
import woodPlate from '../../assets/images/wooden-plate.png';
import axios from 'axios';

const TeacherPortal = () => {
  const [gameCode, setGameCode] = useState('Game Code');
  const [buttonStyle, setButtonStyle] = useState({ cursor: 'not-allowed', color: 'gray' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };


  const generateRandomCode = async () => {
    setIsLoading(true);
    try {
      const randomCode = Math.floor(100000 + Math.random() * 900000);
      const response = await axios.post('/api/game-codes/create', { code: randomCode, teacherId: userId},{headers});

      if (response.status === 201) {
        setGameCode(randomCode.toString());
        setButtonStyle({ cursor: 'pointer', color: 'black' });
        setIsLoading(false);
        setErrorMessage('');
        localStorage.setItem('teachersGameCode',randomCode);
        console.log('Code submitted successfully!');
      } else {
        setIsLoading(false);
        setErrorMessage(response.data.message || 'An unknown error occurred.');
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
      console.error('Error submitting code:', error);
    }
  };

  return (
    <div className="bg-forest">
      <div className="heading-container">
        <img src={woodPlate} alt="" className='heading-plate' />
        <div className="wooden-text">
          <div>Teacher</div>
          <div className="small">Portal</div>
        </div>
      </div>

      {/* Code generation field and button  */}
      <div className='input-div'>
        <input type="text" className='wood-border' value={gameCode} style={{ maxWidth: '30vw', cursor: 'not-allowed' }} />
        {isLoading ? (
          <span className="loading-indicator">Generating code...</span>
        ) : (
          <input type="button" className="wood-button" value="Generate Code" onClick={generateRandomCode} />
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="arrow-btn">
        <p className="arrow-text">
          {gameCode !== 'Game Code' && (
            <Link to={'/StudentList'} style={buttonStyle}>Start Quiz</Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default TeacherPortal;
