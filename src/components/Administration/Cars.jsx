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
  DirectionsCar as CarFrontIcon,
  Edit as EditIcon,
  History as HistoryIcon,
  Close as CloseIcon,
  Add as AddIcon
} from '@mui/icons-material';
import API_URL from '../../constants/Constants';

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
  },
});

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCars: 0
  });
  const [editingCar, setEditingCar] = useState(null);
  const [newCar, setNewCar] = useState({
    make: '',
    model: '',
    licensePlate: '',
    year: '',
    mileage: '',
    status: 'AVAILABLE'
  });
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [historyModalCar, setHistoryModalCar] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  // Fetch cars from API
  useEffect(() => {
    fetchCars();
  }, []);

  // const fetchCars = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}/api/car`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch cars');
  //     }
  //     const data = await response.json();
  //     setCars(data);
  //   } catch (error) {
  //     console.error('Error fetching cars:', error);
  //   }
  // };

  const fetchCars = async () => {
    try {
      const response = await fetch(`${API_URL}/api/car`);
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();

      // Update cars with the cars array from the response
      setCars(data.cars);

      // Update pagination information
      setPagination({
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        totalCars: data.pagination.totalCars
      });
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE': return 'info';
      case 'IN_USE': return 'error';
      case 'MAINTENANCE': return 'secondary';
      default: return 'default';
    }
  };

  const handleEditCar = (car) => {
    setEditingCar({ ...car });
  };

  // const handleUpdateCar = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}/api/car/${editingCar.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         make: editingCar.make,
  //         model: editingCar.model,
  //         licensePlate: editingCar.licensePlate,
  //         year: parseInt(editingCar.year),
  //         mileage: parseInt(editingCar.mileage),
  //         status: editingCar.status
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update car');
  //     }

  //     // Refresh the car list
  //     fetchCars();
  //     setEditingCar(null);
  //   } catch (error) {
  //     console.error('Error updating car:', error);
  //   }
  // };

  // const handleAddCar = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}/api/car`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newCar)
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to add car');
  //     }

  //     // Refresh the car list
  //     fetchCars();

  //     // Reset new car form and close dialog
  //     setNewCar({
  //       make: '',
  //       model: '',
  //       licensePlate: '',
  //       year: '',
  //       mileage: '',
  //       status: 'AVAILABLE'
  //     });
  //     setIsAddingCar(false);
  //   } catch (error) {
  //     console.error('Error adding car:', error);
  //   }
  // };


  const handleAddCar = async () => {
    try {
      const response = await fetch(`${API_URL}/api/car`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newCar,
          year: parseInt(newCar.year),
          mileage: parseInt(newCar.mileage)
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add car');
      }
  
      // Refresh the car list
      fetchCars();
  
      // Reset new car form and close dialog
      setNewCar({
        make: '',
        model: '',
        licensePlate: '',
        year: '',
        mileage: '',
        status: 'AVAILABLE'
      });
      setIsAddingCar(false);
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };
  
  const handleUpdateCar = async () => {
    try {
      const response = await fetch(`${API_URL}/api/car/${editingCar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          make: editingCar.make,
          model: editingCar.model,
          licensePlate: editingCar.licensePlate,
          year: parseInt(editingCar.year),
          mileage: parseInt(editingCar.mileage),
          status: editingCar.status
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update car');
      }
  
      // Refresh the car list
      fetchCars();
      setEditingCar(null);
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleViewHistory = (car) => {
    const history = [
      {
        date: car.createdAt,
        action: 'Created',
        details: 'Car added to the system'
      },
      ...(car.updatedAt !== car.createdAt ? [{
        date: car.updatedAt,
        action: 'Updated',
        details: 'Car details modified'
      }] : [])
    ];
  
    setHistoryModalCar({ ...car, history });
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
            <CarFrontIcon sx={{ marginRight: 2 }} />
            <Typography variant="h6">Cars</Typography>
          </div>
          {userRole !== "EMPLOYEE" && (
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ color: "white" }} color='white' />}
              onClick={() => setIsAddingCar(true)}
            >
              Add Car
            </Button>
          )}
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Make</strong></TableCell>
                <TableCell><strong>Model</strong></TableCell>
                <TableCell><strong>License Plate</strong></TableCell>
                <TableCell><strong>Year</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                {userRole !== "EMPLOYEE" && (
                  <TableCell><strong>Actions</strong></TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id} hover>
                  <TableCell>{car.make}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.licensePlate}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>
                    <Chip
                      label={car.status}
                      // color={getStatusColor(car.status)}
                      size="small"
                    />
                  </TableCell>
                  {userRole !== "EMPLOYEE" && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        size="small"
                        onClick={() => handleEditCar(car)}
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>
                      {/* <Button
                        variant="outlined"
                        startIcon={<HistoryIcon />}
                        size="small"
                        onClick={() => handleViewHistory(car)}
                      >
                        History 
                      </Button>*/}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Car Dialog */}
        <Dialog
          open={!!editingCar}
          onClose={() => setEditingCar(null)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Edit Car Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update information for {editingCar?.licensePlate}
            </DialogContentText>
            {editingCar && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextField
                  label="Make"
                  value={editingCar.make}
                  onChange={(e) => setEditingCar({ ...editingCar, make: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Model"
                  value={editingCar.model}
                  onChange={(e) => setEditingCar({ ...editingCar, model: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="License Plate"
                  value={editingCar.licensePlate}
                  onChange={(e) => setEditingCar({ ...editingCar, licensePlate: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Year"
                  type="number"
                  value={editingCar.year}
                  onChange={(e) => setEditingCar({ ...editingCar, year: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Mileage"
                  type="number"
                  value={editingCar.mileage}
                  onChange={(e) => setEditingCar({ ...editingCar, mileage: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <Select
                  value={editingCar.status}
                  onChange={(e) => setEditingCar({ ...editingCar, status: e.target.value })}
                  fullWidth
                >
                  <MenuItem value="AVAILABLE">Available</MenuItem>
                  <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
                  <MenuItem value="UNAVAILABLE">Unavailable</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateCar}
                  fullWidth
                >
                  Save Changes
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Car Dialog */}
        <Dialog
          open={isAddingCar}
          onClose={() => setIsAddingCar(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Add New Car</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter details for the new car
            </DialogContentText>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextField
                label="Make"
                value={newCar.make}
                onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Model"
                value={newCar.model}
                onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="License Plate"
                value={newCar.licensePlate}
                onChange={(e) => setNewCar({ ...newCar, licensePlate: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Year"
                type="number"
                value={newCar.year}
                onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mileage"
                type="number"
                value={newCar.mileage}
                onChange={(e) => setNewCar({ ...newCar, mileage: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Select
                value={newCar.status}
                onChange={(e) => setNewCar({ ...newCar, status: e.target.value })}
                fullWidth
              >
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
                <MenuItem value="UNAVAILABLE">Unavailable</MenuItem>
              </Select>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCar}
                fullWidth
              >
                Add Car
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Car History Modal */}
        <Dialog
          open={!!historyModalCar}
          onClose={() => setHistoryModalCar(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Car History for {historyModalCar?.licensePlate}
              <IconButton onClick={() => setHistoryModalCar(null)}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {historyModalCar?.history.map((entry, index) => (
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

export default Cars;