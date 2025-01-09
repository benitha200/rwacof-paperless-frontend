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
  Person as DriverIcon,
  Edit as EditIcon,
  History as HistoryIcon,
  Close as CloseIcon,
  Add as AddIcon
} from '@mui/icons-material';
import API_URL from '../../constants/Constants';
import { color } from 'framer-motion';

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [editingDriver, setEditingDriver] = useState(null);
  const [newDriver, setNewDriver] = useState({
    firstName: '',
    lastName: '',
    licenseNumber: '',
    phoneNumber: '',
    address: '',
    status: 'ACTIVE'
  });
  const [isAddingDriver, setIsAddingDriver] = useState(false);
  const [historyModalDriver, setHistoryModalDriver] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  // Fetch drivers from API
  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/driver`);

      if (!response.ok) {
        throw new Error('Failed to fetch drivers');
      }
      const data = await response.json();
      console.log(data);
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };



  const handleEditDriver = (driver) => {
    setEditingDriver({ ...driver });
  };

  const handleUpdateDriver = async () => {
    if (!editingDriver) return;

    try {
      const response = await fetch(`${API_URL}/api/driver/${editingDriver.id}`, {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: editingDriver.firstName,
          lastName: editingDriver.lastName,
          licenseNumber: editingDriver.licenseNumber,
          phoneNumber: editingDriver.phoneNumber,
          address: editingDriver.address,
          status: editingDriver.status
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update driver');
      }

      // Refresh the driver list
      fetchDrivers();
      setEditingDriver(null);
    } catch (error) {
      console.error('Error updating driver:', error);
    }
  };

  const handleAddDriver = async () => {
    try {
      const response = await fetch(`${API_URL}/api/driver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDriver)
      });

      if (!response.ok) {
        throw new Error('Failed to add driver');
      }

      // Refresh the driver list
      fetchDrivers();

      // Reset new driver form and close dialog
      setNewDriver({
        firstName: '',
        lastName: '',
        licenseNumber: '',
        phoneNumber: '',
        address: '',
        status: 'ACTIVE'
      });
      setIsAddingDriver(false);
    } catch (error) {
      console.error('Error adding driver:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'SUPERVISOR_APPROVED':
        return 'info';
      case 'ASSIGNED':
        return 'success';
      case 'REJECTED':
        return 'error';
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'error';
      case 'SUSPENDED':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleViewHistory = (driver) => {
    const history = [
      {
        date: driver.createdAt,
        action: 'Created',
        details: 'Driver added to the system'
      },
      ...(driver.updatedAt !== driver.createdAt ? [{
        date: driver.updatedAt,
        action: 'Updated',
        details: 'Driver details modified'
      }] : [])
    ];

    setHistoryModalDriver({ ...driver, history });
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
            <DriverIcon sx={{ marginRight: 2 }} />
            <Typography variant="h6">Drivers</Typography>
          </div>
          {userRole !== "EMPLOYEE" && (
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ color: "white" }} color='white' />}
              onClick={() => setIsAddingDriver(true)}
            >
              Add Driver
            </Button>
          )}
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>First Name</strong></TableCell>
                <TableCell><strong>Last Name</strong></TableCell>
                <TableCell><strong>License Number</strong></TableCell>
                <TableCell><strong>Phone Number</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                {userRole !== "EMPLOYEE" && (
                  <TableCell><strong>Actions</strong></TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id} hover>
                  <TableCell>{driver.firstName}</TableCell>
                  <TableCell>{driver.lastName}</TableCell>
                  <TableCell>{driver.licenseNumber}</TableCell>
                  <TableCell>{driver.phoneNumber}</TableCell>
                  <TableCell>
                    {/* <Chip
                      label={driver.status}
                      color={getStatusColor(driver.status)}
                      size="small"
                      sx={{ color: 'white' }}
                    /> */}
                    <Chip
                      label={driver.status}
                      // color={getStatusColor(driver.status)}
                      size="small"
                    // sx={{ color: 'white' }}
                    />
                  </TableCell>
                  {userRole !== "EMPLOYEE" && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        size="small"
                        onClick={() => handleEditDriver(driver)}
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>
                      {/* <Button
                        variant="outlined"
                        startIcon={<HistoryIcon />}
                        size="small"
                        onClick={() => handleViewHistory(driver)}
                      >
                        History
                      </Button> */}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Driver Dialog */}
        <Dialog
          open={!!editingDriver}
          onClose={() => setEditingDriver(null)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Edit Driver Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update information for {editingDriver?.firstName} {editingDriver?.lastName}
            </DialogContentText>
            {editingDriver && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextField
                  label="First Name"
                  value={editingDriver.firstName}
                  onChange={(e) => setEditingDriver({ ...editingDriver, firstName: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  value={editingDriver.lastName}
                  onChange={(e) => setEditingDriver({ ...editingDriver, lastName: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="License Number"
                  value={editingDriver.licenseNumber}
                  onChange={(e) => setEditingDriver({ ...editingDriver, licenseNumber: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Phone Number"
                  value={editingDriver.phoneNumber}
                  onChange={(e) => setEditingDriver({ ...editingDriver, phoneNumber: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Address"
                  value={editingDriver.address}
                  onChange={(e) => setEditingDriver({ ...editingDriver, address: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <Select
                  value={editingDriver.status}
                  onChange={(e) => setEditingDriver({ ...editingDriver, status: e.target.value })}
                  fullWidth
                >
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="INACTIVE">Inactive</MenuItem>
                  <MenuItem value="SUSPENDED">Suspended</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateDriver}
                  fullWidth
                >
                  Save Changes
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Driver Dialog */}
        <Dialog
          open={isAddingDriver}
          onClose={() => setIsAddingDriver(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Add New Driver</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter details for the new driver
            </DialogContentText>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextField
                label="First Name"
                value={newDriver.firstName}
                onChange={(e) => setNewDriver({ ...newDriver, firstName: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                value={newDriver.lastName}
                onChange={(e) => setNewDriver({ ...newDriver, lastName: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="License Number"
                value={newDriver.licenseNumber}
                onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                value={newDriver.phoneNumber}
                onChange={(e) => setNewDriver({ ...newDriver, phoneNumber: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                value={newDriver.address}
                onChange={(e) => setNewDriver({ ...newDriver, address: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Select
                value={newDriver.status}
                onChange={(e) => setNewDriver({ ...newDriver, status: e.target.value })}
                fullWidth
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
                <MenuItem value="SUSPENDED">Suspended</MenuItem>
              </Select>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddDriver}
                fullWidth
              >
                Add Driver
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Driver History Modal */}
        <Dialog
          open={!!historyModalDriver}
          onClose={() => setHistoryModalDriver(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Driver History for {historyModalDriver?.firstName} {historyModalDriver?.lastName}
              <IconButton onClick={() => setHistoryModalDriver(null)}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {historyModalDriver?.history.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    padding: '12px 0',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(entry.date).toLocaleString()}
                    </Typography>
                    <Chip label={entry.action} size="small" color="secondary" />
                  </div>
                  <Typography variant="body2">{entry.details}</Typography>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </Paper>
    </ThemeProvider>
  );
};

export default Drivers;