import React, { useState } from 'react'
import './Login.css'
import '../../App.css'
import {Link, useNavigate} from 'react-router-dom'

import video from '../../LoginAssets/video.mp4'
import image from '../../LoginAssets/photo.png'

import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/slices/userSlice'

const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { error, isAuthenticated } = useSelector(state => state.auth)
    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const result = await dispatch(loginUser({ email: username, password }));
    //     // Check if login is successful
    //     if (loginUser.fulfilled.match(result)) {
    //         console.log("Is Authenticated:", isAuthenticated);
    //         navigate('/dashboard'); // Navigate only if login was successful
    //     } else {
    //         console.error("Login failed, cannot navigate.");
    //     }
    
    //     console.log("hello"); // This will be logged after the login attempt
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser({ email: username, password }));
        navigate('/dashboard');
    };

    // useEffect(() => {
    //     navigate('/dashboard'); // Navigate when user is authenticated
    // }, [isAuthenticated, navigate]); // Re-run effect when isAuthenticated changes
    

  return (
    <div className='loginPage flex'>
        <div className='container flex'>
            <div className='videoDiv'>
                <video src={video} autoPlay muted loop></video>
                <div className='textDiv'>
                    <h2 className='title'>Manage you Expenses here!</h2>
                    <p>Easy way to keep a track on your expenses.</p>
                </div>

                <div className='footerDiv flex'>
                <span className='text'>Don't have an account?</span>
                <Link to={'/register'}>
                <button className='btn'>Sign Up</button>
                </Link>
                </div>
            </div>

            <div className='formDiv flex'>
                <div className='headerDiv'>
                    <img src={image} alt="Logo Image"></img>
                    <h3>Welcome Back!</h3>
                </div>

                <form onSubmit={handleSubmit} className='form grid'>
                    {error && <p className="error">{error}</p>} {/* Display error if exists */}
                    <div className='inputDiv'>
                        <label htmlFor='username'>Username</label>
                        <div className='input flex'>
                            <FaUserShield className="icon"/>
                            <input type="text" id="username" placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                        </div>
                    </div>

                    <div className='inputDiv'>
                        <label htmlFor='password'>Password</label>
                        <div className='input flex'>
                            <BsFillShieldLockFill className="icon"/>
                            <input type="password" id="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                        </div>
                    </div>

                    <button type="submit" className='btn flex'>
                        <span>Login</span>
                        <AiOutlineSwapRight className="icon"/>
                    </button>

                    <span className='forgetPassword'>
                        Forget your password? <a href="">Click Here</a>
                    </span>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login
