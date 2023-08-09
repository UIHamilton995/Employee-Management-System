import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, Chip, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(true); // Toggle for admin/employee login form
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (email === '' || password === '') {
                setErrorMessage('Please enter your email and password.');
                return;
            }
            // Send login request to the backend for authentication
            const response = await axios.post('http://localhost:3030/admin/login', {
                email,
                password
            });

            // Store the token in local storage
            localStorage.setItem('token', response.data.token);

            // Simulating successful login
            if (isAdmin) {
                navigate('/admin');
                return; // Add this line to prevent executing the next line
            } else {
                navigate('/employee');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred during login. Please try again later.');
            }
        }
    };


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleToggleChange = () => {
        setIsAdmin(!isAdmin);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundImage: 'url(\'your-background-image.jpg\')',
                backgroundSize: 'cover',
                padding: '20px',
                backgroundColor: '#a5c2f2'
            }}
        >
            <Container maxWidth="sm">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    style={{
                        borderRadius: '10px',
                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
                        backgroundColor: '#ffffff',
                        padding: '20px'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                        <Switch checked={isAdmin} onChange={handleToggleChange} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <Chip label={isAdmin ? 'Admin Login' : 'Employee Login'} />
                    </Box>
                    <TextField
                        label="Email"
                        fullWidth
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        name="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        sx={{ marginBottom: '10px' }}
                    />
                    <Button type="submit" variant="contained" onClick={handleLogin} sx={{ marginTop: '10px' }}>
                        Login
                    </Button>
                    {errorMessage && (
                        <Typography sx={{ marginTop: '10px', textAlign: 'center', color: 'red' }}>
                            {errorMessage}
                        </Typography>
                    )}
                </form>
            </Container>
        </Box>
    );
};

export default Login;
