import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '14px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
}));

const Dashboard = () => {
  const [registeredAdmins, setRegisteredAdmins] = useState([]);
  const [registeredEmployees, setRegisteredEmployees] = useState([]);
  const [adminsLoading, setAdminsLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('');
  const [adminRows, setAdminRows] = useState([]);
  const [employeeRows, setEmployeeRows] = useState([]);

  const adminColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', type: 'string', width: 200 },
    { field: 'password', headerName: 'Password', type: 'string', width: 120 },
    { field: 'role', headerName: 'Role', type: 'string', width: 120 },
    { field: 'gender', headerName: 'Gender', type: 'string', width: 120 },
    { field: 'dob', headerName: 'DOB', type: 'string', width: 120 },
    { field: 'department', headerName: 'Department', type: 'string', width: 120 },
  ];

  const employeeColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', type: 'string', width: 200 },
    { field: 'password', headerName: 'Password', type: 'string', width: 120 },
    { field: 'role', headerName: 'Role', type: 'string', width: 120 },
    { field: 'gender', headerName: 'Gender', type: 'string', width: 120 },
    { field: 'dob', headerName: 'DOB', type: 'string', width: 120 },
    { field: 'department', headerName: 'Department', type: 'string', width: 120 },
  ];

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3030/admin/fetch');
        const admins = response.data.allData;
        setRegisteredAdmins(admins);
        setAdminsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3030/employee/fetch');
        const employees = response.data.allData;
        setRegisteredEmployees(employees);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdmins();
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filteredAdminRows = registeredAdmins
      .filter((admin) => admin.role === 'admin')
      .map((admin) => ({
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        password: admin.password,
        role: admin.role,
        gender: admin.gender,
        dob: admin.dob,
        department: admin.department,
      }));

    const filteredEmployeeRows = registeredEmployees
      .filter((employee) => employee.role === 'employee')
      .map((employee) => ({
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        password: employee.password,
        role: employee.role,
        gender: employee.gender,
        dob: employee.dob,
        department: employee.department,
      }));

    setAdminRows(filteredAdminRows);
    setEmployeeRows(filteredEmployeeRows);
  }, [registeredAdmins, registeredEmployees]);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper
            elevation={3}
            onClick={() => handleSectionSelect('admins')}
            sx={{ backgroundColor: selectedSection === 'admins' ? '#f5f5f5' : 'inherit' }}
          >
            <Typography variant="h6">Registered Admins ({adminRows.length})</Typography>
          </StyledPaper>
          {selectedSection === 'admins' && (
            <div style={{ height: '400px', width: '100%' }}>
              <DataGrid
                rows={adminRows}
                columns={adminColumns}
                autoHeight={false}
                pageSize={5}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper
            elevation={3}
            onClick={() => handleSectionSelect('employees')}
            sx={{ backgroundColor: selectedSection === 'employees' ? '#f5f5f5' : 'inherit' }}
          >
            <Typography variant="h6">Registered Employees ({employeeRows.length})</Typography>
          </StyledPaper>
          {selectedSection === 'employees' && (
            <div style={{ height: '400px', width: '100%' }}>
              <DataGrid
                rows={employeeRows}
                columns={employeeColumns}
                autoHeight={false}
                pageSize={5}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
