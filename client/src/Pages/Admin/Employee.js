import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
} from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

const EmployeeComponent = () => {
    const [registeredEmployees, setRegisteredEmployees] = useState([]);
    const [employeesLoading, setEmployeesLoading] = useState(true);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        gender: '',
        DOB: null,
        department: '',
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'email', headerName: 'Email', type: 'string', width: 150 },
        { field: 'password', headerName: 'Password', type: 'string', width: 120 },
        { field: 'role', headerName: 'Role', type: 'string', width: 90 },
        { field: 'gender', headerName: 'Gender', type: 'string', width: 120 },
        { field: 'DOB', headerName: 'DOB', type: 'string', width: 120 },
        { field: 'department', headerName: 'Department', type: 'string', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const filteredEmployees = registeredEmployees.filter((employee) => employee.role === 'employee');

    const rows = filteredEmployees.map((employee) => ({
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        password: employee.password,
        role: employee.role,
        gender: employee.gender,
        DOB: employee.DOB,
        department: employee.department,
    }));

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3030/employee/fetch');
                const employees = response.data;
                setRegisteredEmployees(employees.allData);
                setEmployeesLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmployees();
    }, []);

    const handleEdit = async (employeeId) => {
        try {
            const response = await axios.put(`http://localhost:3030/employee/${employeeId}`);
            const employeeData = response.data;
            setEditingEmployee(employeeData);
            setOpenDialog(true);
            setNewEmployee(employeeData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (employeeId) => {
        if (employeeId) {
            try {
                const response = await axios.delete(`http://localhost:3030/employee/delete/${employeeId}`);
                const { message } = response.data;
                if (response.status === 200) {
                    const updatedEmployees = registeredEmployees.filter((employee) => employee.id !== employeeId);
                    setRegisteredEmployees(updatedEmployees);
                    setSelectedEmployeeId(null);
                } else {
                    console.log(message); // Optionally display an error message
                }
            } catch (error) {
                console.error(error);
            }
        }
    };


    const handleCreateEmployee = async () => {
        try {
            await axios.post('http://localhost:3030/employee/create', newEmployee);
            const response = await axios.get('http://localhost:3030/employee/fetch');
            const employees = response.data;
            setRegisteredEmployees(employees.allData);
            setOpenDialog(false);
            setNewEmployee({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                role: '',
                gender: '',
                DOB: null,
                department: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingEmployee(null);
        setNewEmployee({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: '',
            gender: '',
            DOB: null,
            department: '',
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setNewEmployee((prevEmployee) => ({
            ...prevEmployee,
            DOB: date,
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3030/employee/update/${editingEmployee._id}`, newEmployee);
            const response = await axios.get('http://localhost:3030/employee/fetch');
            const employees = response.data;
            setRegisteredEmployees(employees.allData);
            setOpenDialog(false);
            setEditingEmployee(null);
            setNewEmployee({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                role: '',
                gender: '',
                DOB: null,
                department: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom style={{ color: 'black' }}>
                Employee Dashboard
            </Typography>
            {/* Add Employee Form */}
            <div>
                <><Typography variant="h6" gutterBottom>
                    Add Employee
                </Typography><Button variant="outlined" color="primary" onClick={handleOpenDialog}>
                        Add Employee
                    </Button>
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={newEmployee.firstName}
                                onChange={handleChange}
                                fullWidth />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={newEmployee.lastName}
                                onChange={handleChange}
                                fullWidth />
                            <TextField
                                label="Email"
                                name="email"
                                value={newEmployee.email}
                                onChange={handleChange}
                                fullWidth />
                            <TextField
                                label="Password"
                                name="password"
                                value={newEmployee.password}
                                onChange={handleChange}
                                fullWidth />
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    name="role"
                                    value={newEmployee.role}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="employee">Employee</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    name="gender"
                                    value={newEmployee.gender}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Date of Birth"
                                name="DOB"
                                type="date"
                                value={newEmployee.DOB}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth />
                            <TextField
                                label="Department"
                                name="department"
                                value={newEmployee.department}
                                onChange={handleChange}
                                fullWidth />
                        </DialogContent>
                        <DialogActions>
                            {editingEmployee && (
                                <Button onClick={handleSave} color="primary">
                                    Save Changes
                                </Button>
                            )}
                            {!editingEmployee && (
                                <Button onClick={handleCreateEmployee} color="primary">
                                    Add
                                </Button>
                            )}
                            <Button onClick={handleCloseDialog} color="secondary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog></>
            </div>
            {/* Employee List */}
            <div style={{ height: 400, width: '100%', marginTop: '2rem' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    loading={employeesLoading}
                    onRowClick={(params) => setSelectedEmployeeId(params.row.id)}
                />
            </div>
        </Container>
    );
};

export default EmployeeComponent;