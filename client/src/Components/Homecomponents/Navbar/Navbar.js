import React, { useState } from 'react';
import { Typography, AppBar, Toolbar, Tabs, Tab, Button, useTheme, useMediaQuery } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import DrawerComp from '../../../Components/DrawerComp';
import { useNavigate } from 'react-router-dom';

const PAGES = ["Home", "Services", "About", "Contact"]

const Navbar = () => {
    const [value, setValue] = useState();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const handleJoinClick = () => {
        // Perform any desired action here before navigating
        console.log('Join button clicked');
        // Navigate to the signup page
        navigate('/signup');
    };

    return (
        <React.Fragment>
            <AppBar sx={{ background: '##061d2e' }}>
                <Toolbar>
                    <InventoryIcon />
                    {isMatch ? (
                        <>
                            <Typography sx={{ fontSize: '2rem', marginLeft: '10%' }}>iHub</Typography>
                            <DrawerComp />
                        </>
                    ) : (
                        <>
                            <Tabs sx={{ marginLeft: 'auto' }} textColor='white' value={value} onChange={(e, value) => setValue(value)} indicatorColor='secondary'>
                                {PAGES.map((page, index) => (
                                    <Tab key={index} label={page} />
                                ))}
                            </Tabs>
                            <Button variant='contained' sx={{ marginLeft: 'auto' }} onClick={handleJoinClick}>Join</Button>
                            {/* <Button variant='contained' sx={{ marginLeft: '10px' }}>Sign Up</Button> */}
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default Navbar;
