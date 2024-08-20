import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/css/Login.css";

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { handleSubmit } = useForm<FormData>();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/users/login',
                {
                    email,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );


            if (response.status === 200) {
                const { userId } = response.data;
                localStorage.setItem("userId", userId);

                // Navigate to the dashboard or another URL on successful login
                navigate(`/dashboard`);

                // Show success message
                toast.success('Login successful!');
            } else {
                // Handle unsuccessful login (e.g., show an error message)
                console.error('Login failed');
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred during login.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-header">
                    <div className="login-logo">
                        <img src="images/Logo.png" alt="loginlogo" />
                    </div>
                    <div className="login-text">
                        <h1>Login</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="login-body">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="login-footer">
                        <div className="login-forgot">
                            <label>
                                <input type="checkbox" name="remember_me" /> Remember me
                            </label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <div className="login-btn">
                            <button type="submit">Login</button>
                        </div>
                        <div className="login-link">
                            <label>Don't have an account?</label>
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
