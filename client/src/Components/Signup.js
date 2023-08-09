import React, { useState } from 'react';
import { TextField, Button, Typography, Link, Container, MenuItem } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        gender: '',
        DOB: '',
        department: ''
    });
    const [signupSuccess, setSignupSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Save user data to the MongoDB database
            await axios.post('http://localhost:3030/admin/create', user);
            setSignupSuccess(true);
            // Delay navigation to login page for better user experience
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" align="center" gutterBottom style={{ color: 'black' }}>
                Sign up
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    fullWidth
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    fullWidth
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Password"
                    fullWidth
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    select
                    label="Role"
                    fullWidth
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                </TextField>
                <TextField
                    select
                    label="Gender"
                    fullWidth
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </TextField>
                {user.gender === 'other' && (
                    <TextField
                        label="Specify Gender"
                        fullWidth
                        name="genderOther"
                        value={user.genderOther}
                        onChange={handleChange}
                        margin="normal"
                    />
                )}
                <TextField
                    label="Date of Birth"
                    fullWidth
                    name="DOB"
                    type="date"
                    value={user.DOB}
                    onChange={handleChange}
                    margin="normal"
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign up
                </Button>
            </form>
            {signupSuccess && (
                <Typography variant="body2" align="center" color="success" sx={{ marginTop: '10px' }}>
                    Sign up successful!
                </Typography>
            )}
            <Typography
                variant="body2"
                align="center"
                sx={{ marginTop: '10px', color: 'black' }}
            >
                Already have an account?{' '}
                <Link component={RouterLink} to="/login">
                    Log in
                </Link>
            </Typography>
        </Container>
    );
};

export default SignupForm;
