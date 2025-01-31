import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Grid,
  Alert,
  Box
} from '@mui/material';
import {
  Add as AddIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

const theme = createTheme();

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  
  const [employeeForm, setEmployeeForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    employeeNumber: '',
    departmentId: '',
    designation: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    address: '',
    joinDate: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    bankAccountNumber: '',
    panNumber: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [employeesRes, departmentsRes] = await Promise.all([
        fetch('https://cherryapp.sucafina.com:8012/api/employees'),
        fetch('https://cherryapp.sucafina.com:8012/api/departments')
      ]);
      
      const employeesData = await employeesRes.json();
      const departmentsData = await departmentsRes.json();
      
      setEmployees(employeesData);
      setDepartments(departmentsData);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://cherryapp.sucafina.com:8012/api/users/register-employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeForm)
      });

      if (!response.ok) throw new Error('Failed to create employee');
      
      setSuccess('Employee created successfully!');
      fetchData();
      setOpenDialog(false);
      setEmployeeForm({
        email: '',
        firstName: '',
        lastName: '',
        employeeNumber: '',
        departmentId: '',
        designation: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        address: '',
        joinDate: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        bankAccountNumber: '',
        panNumber: '',
        status: 'ACTIVE'
      });
    } catch (error) {
      setError('Failed to create employee');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography>Loading...</Typography>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3, maxWidth: 'xl', mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Employee Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Employee
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{`${emp.user.firstName} ${emp.user.lastName}`}</TableCell>
                    <TableCell>{emp.department?.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={emp.status}
                        color={getStatusColor(emp.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogContent>
            <form onSubmit={handleEmployeeSubmit}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={employeeForm.email}
                    onChange={(e) => setEmployeeForm({...employeeForm, email: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Employee Number"
                    value={employeeForm.employeeNumber}
                    onChange={(e) => setEmployeeForm({...employeeForm, employeeNumber: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={employeeForm.firstName}
                    onChange={(e) => setEmployeeForm({...employeeForm, firstName: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={employeeForm.lastName}
                    onChange={(e) => setEmployeeForm({...employeeForm, lastName: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    value={employeeForm.departmentId}
                    onChange={(e) => setEmployeeForm({...employeeForm, departmentId: e.target.value})}
                    displayEmpty
                    label="Department"
                  >
                    <MenuItem value="" disabled>Select Department</MenuItem>
                    {departments.map((dept) => (
                      <MenuItem key={dept.id} value={dept.id.toString()}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Designation"
                    value={employeeForm.designation}
                    onChange={(e) => setEmployeeForm({...employeeForm, designation: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date of Birth"
                    value={employeeForm.dateOfBirth.split('T')[0]}
                    onChange={(e) => setEmployeeForm({...employeeForm, dateOfBirth: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    value={employeeForm.gender}
                    onChange={(e) => setEmployeeForm({...employeeForm, gender: e.target.value})}
                    displayEmpty
                    label="Gender"
                  >
                    <MenuItem value="" disabled>Select Gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={employeeForm.phoneNumber}
                    onChange={(e) => setEmployeeForm({...employeeForm, phoneNumber: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={employeeForm.address}
                    onChange={(e) => setEmployeeForm({...employeeForm, address: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Join Date"
                    value={employeeForm.joinDate.split('T')[0]}
                    onChange={(e) => setEmployeeForm({...employeeForm, joinDate: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact Name"
                    value={employeeForm.emergencyContactName}
                    onChange={(e) => setEmployeeForm({...employeeForm, emergencyContactName: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact Phone"
                    value={employeeForm.emergencyContactPhone}
                    onChange={(e) => setEmployeeForm({...employeeForm, emergencyContactPhone: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Bank Account Number"
                    value={employeeForm.bankAccountNumber}
                    onChange={(e) => setEmployeeForm({...employeeForm, bankAccountNumber: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="PAN Number"
                    value={employeeForm.panNumber}
                    onChange={(e) => setEmployeeForm({...employeeForm, panNumber: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    value={employeeForm.status}
                    onChange={(e) => setEmployeeForm({...employeeForm, status: e.target.value})}
                    label="Status"
                  >
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="INACTIVE">Inactive</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => setOpenDialog(false)} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Create Employee
                </Button>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default EmployeeManagement;

