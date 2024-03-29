import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../../assets/css/style.css';
import WoodInput from '../../components/WoodInput';
import woodPlate from '../../assets/images/wooden-plate.png';

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      // Basic client-side validation
      if (!email || !password) {
        console.log('Please fill in all fields');
        return;
      }

      // Make API call to login the teacher
      const response = await axios.post('/api/teacher/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful');

        // Extract the token from the response data
        const token = response.data.token; // Assumes the token is included in the response data
        const userId = response.data.userId;


        // Save the token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId',userId);
        
        // Handle success, e.g., redirect to another page
        navigate('/TeacherPortal');
      } else {
        console.log('Login failed:', response.data.message);
        // Handle failure, e.g., display an error message
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="bg-forest">
      <div className="heading-container">
        <img src={woodPlate} alt="" className="heading-plate" />
        <div className="wooden-text">
          <div>Teacher</div>
          <div className="small">Login</div>
        </div>
      </div>

      {/* Code generation field and button  */}
      <div className='input-div'>
        <WoodInput
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter Email"
        />
        <WoodInput
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter Password"
          style={{ marginTop: '20px' }}
        />

        <input type="button" className="wood-button" value="Login" style={{ marginTop: '20px' }} onClick={handleLogin} />

        <p style={{ marginTop: '20px' }}>
          New Teacher? <Link to="/TeacherRegister">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default TeacherLogin;
