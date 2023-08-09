import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpen(false);
    // Perform logout logic here
    navigate('/');
  };

  const handleContinue = () => {
    setOpen(false);
    // Continue to stay within the admin page logic
  };

  return (
    <div>
      {/* Sidebar content */}
      <MenuItem onClick={() => setOpen(true)}>Logout</MenuItem>

      {/* Logout dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContinue} color="primary">
            Continue
          </Button>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
