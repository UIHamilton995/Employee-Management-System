import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dashboard from '../Pages/Admin/Dashboard';
import Employees from '../Pages/Admin/Employee'; 
import Logout from '../Pages/Admin/Logout'

const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    display: 'flex',
    height: '100vh',
  },
  sidebar: {
    backgroundColor: '#76b6e3',
    color: theme.palette.primary.contrastText,
    width: '240px',
    padding: theme.spacing(2),
  },
  content: {
    flex: 1,
    padding: theme.spacing(2),
  },
  header: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  listItem: {
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#439bde',
    },
  },
  listItemText: {
    fontWeight: 'bold',
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.sidebar}>
        <h1 className={classes.header}>iHub</h1>
        <List component="nav">
          <ListItem
            button
            className={classes.listItem}
            onClick={() => handleItemClick('dashboard')}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className={classes.listItemText} />
          </ListItem>
          <ListItem
            button
            className={classes.listItem}
            onClick={() => handleItemClick('employees')}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" className={classes.listItemText} />
          </ListItem>
          <ListItem
            button
            className={classes.listItem}
            onClick={() => handleItemClick('profile')}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" className={classes.listItemText} />
          </ListItem>
          <ListItem
            button
            className={classes.listItem}
            onClick={() => handleItemClick('logout')}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" className={classes.listItemText} />
          </ListItem>
        </List>
      </div>
      <div className={classes.content}>
        {selectedItem === 'dashboard' && <Dashboard />}
        {selectedItem === 'employees' && <Employees />} {/* Render the Employees component */}
        {selectedItem === 'logout' && <Logout />} {/* Render the Employees component */}
      </div>
    </div>
  );
};

export default Sidebar;
