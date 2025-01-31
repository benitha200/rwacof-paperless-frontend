import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme
} from '@mui/material/styles';
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
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import API_URL from '../../constants/Constants';

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_URL}/api/departments`);
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleAddDepartment = async () => {
    try {
      const response = await fetch(`${API_URL}/api/departments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDepartment)
      });

      if (!response.ok) {
        throw new Error('Failed to add department');
      }

      // Refresh the department list
      fetchDepartments();

      // Reset form and close dialog
      setNewDepartment({
        name: '',
        description: '',
        status: 'ACTIVE'
      });
      setIsAddingDepartment(false);
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'INACTIVE': return 'error';
      default: return 'default';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BusinessIcon sx={{ marginRight: 2 }} />
            <Typography variant="h6">Departments</Typography>
          </div>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddingDepartment(true)}
          >
            Add Department
          </Button>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id} hover>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={department.status}
                      color={getStatusColor(department.status)}
                      size="small"
                      sx={{
                        color: 'white',
                        '& .MuiChip-label': {
                          color: 'white',
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Department Dialog */}
        <Dialog
          open={isAddingDepartment}
          onClose={() => setIsAddingDepartment(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Add New Department</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter details for the new department
            </DialogContentText>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <TextField
                label="Name"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={newDepartment.description}
                onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Select
                value={newDepartment.status}
                onChange={(e) => setNewDepartment({ ...newDepartment, status: e.target.value })}
                fullWidth
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
              </Select>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddDepartment}
                fullWidth
              >
                Add Department
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Paper>
    </ThemeProvider>
  );
};

export default DepartmentManagement;