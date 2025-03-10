// import React, { useState, useEffect } from 'react';
// import {
//   ThemeProvider,
//   createTheme
// } from '@mui/material/styles';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   TextField,
//   Select,
//   MenuItem,
//   Chip,
//   Skeleton,
//   TablePagination
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Business as BusinessIcon,
//   Search as SearchIcon
// } from '@mui/icons-material';
// import API_URL from '../../constants/Constants';

// // Create a custom theme
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//   },
// });

// const DepartmentManagement = () => {
//   const [departments, setDepartments] = useState([]);
//   const [filteredDepartments, setFilteredDepartments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAddingDepartment, setIsAddingDepartment] = useState(false);
//   const [newDepartment, setNewDepartment] = useState({
//     name: '',
//     description: '',
//     status: 'ACTIVE'
//   });

//   // Pagination state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Search state
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   // Update filtered departments when search term or departments change
//   useEffect(() => {
//     const filtered = departments.filter(dept => 
//       dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       dept.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredDepartments(filtered);
//     setPage(0); // Reset to first page when search changes
//   }, [departments, searchTerm]);

//   const fetchDepartments = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${API_URL}/api/departments`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch departments');
//       }
//       const data = await response.json();
//       setDepartments(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//       setIsLoading(false);
//     }
//   };

//   const handleAddDepartment = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/departments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newDepartment)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add department');
//       }

//       // Refresh the department list
//       fetchDepartments();

//       // Reset form and close dialog
//       setNewDepartment({
//         name: '',
//         description: '',
//         status: 'ACTIVE'
//       });
//       setIsAddingDepartment(false);
//     } catch (error) {
//       console.error('Error adding department:', error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'ACTIVE': return 'success';
//       case 'INACTIVE': return 'error';
//       default: return 'default';
//     }
//   };

//   const renderSkeletonRows = () => {
//     return [...Array(rowsPerPage)].map((_, index) => (
//       <TableRow key={index}>
//         <TableCell>
//           <Skeleton variant="text" width="80%" />
//         </TableCell>
//         <TableCell>
//           <Skeleton variant="text" width="60%" />
//         </TableCell>
//         <TableCell>
//           <Skeleton variant="rectangular" width={80} height={24} />
//         </TableCell>
//       </TableRow>
//     ));
//   };

//   // Pagination change handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: '16px',
//           borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <BusinessIcon sx={{ marginRight: 2 }} />
//             <Typography variant="h6">Departments</Typography>
//           </div>
//           <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
//             <TextField
//               placeholder="Search departments"
//               variant="outlined"
//               size="small"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 startAdornment: <SearchIcon style={{ marginRight: 8 }} />,
//               }}
//             />
//             <Button
//               variant="contained"
//               startIcon={<AddIcon style={{color:'white'}}/>}
//               onClick={() => setIsAddingDepartment(true)}
//             >
//               Add Department
//             </Button>
//           </div>
//         </div>

//         <TableContainer>
//         <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <TableCell><strong>Name</strong></TableCell>
//                 <TableCell><strong>Description</strong></TableCell>
//                 <TableCell><strong>Status</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {isLoading ? renderSkeletonRows() : filteredDepartments
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((department) => (
//                   <TableRow key={department.id} hover>
//                     <TableCell>{department.name}</TableCell>
//                     <TableCell>{department.description}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={department.status}
//                         color={getStatusColor(department.status)}
//                         size="small"
//                         sx={{
//                           color: 'white',
//                           '& .MuiChip-label': {
//                             color: 'white',
//                           }
//                         }}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredDepartments.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />

//         {/* Add Department Dialog */}
//         <Dialog
//           open={isAddingDepartment}
//           onClose={() => setIsAddingDepartment(false)}
//           maxWidth="xs"
//           fullWidth
//         >
//           <DialogTitle>Add New Department</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               Enter details for the new department
//             </DialogContentText>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
//               <TextField
//                 label="Name"
//                 value={newDepartment.name}
//                 onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Description"
//                 value={newDepartment.description}
//                 onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
//                 fullWidth
//                 margin="normal"
//               />
//               <Select
//                 value={newDepartment.status}
//                 onChange={(e) => setNewDepartment({ ...newDepartment, status: e.target.value })}
//                 fullWidth
//               >
//                 <MenuItem value="ACTIVE">Active</MenuItem>
//                 <MenuItem value="INACTIVE">Inactive</MenuItem>
//               </Select>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAddDepartment}
//                 fullWidth
//               >
//                 Add Department
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </Paper>
//     </ThemeProvider>
//   );
// };

// export default DepartmentManagement;

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
  Skeleton,
  TablePagination,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Divider,
  useMediaQuery
} from '@mui/material';
import {
  Add as AddIcon,
  Business as BusinessIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Menu as MenuIcon
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
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    status: 'ACTIVE'
  });

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Update filtered departments when search term or departments change
  useEffect(() => {
    const filtered = departments.filter(dept => 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(filtered);
    setPage(0); // Reset to first page when search changes
  }, [departments, searchTerm]);

  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/departments`);
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }
      const data = await response.json();
      setDepartments(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setIsLoading(false);
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

  const renderSkeletonRows = () => {
    return [...Array(rowsPerPage)].map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton variant="text" width="80%" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width="60%" />
        </TableCell>
        <TableCell>
          <Skeleton variant="rectangular" width={80} height={24} />
        </TableCell>
      </TableRow>
    ));
  };

  const renderMobileSkeletons = () => {
    return [...Array(rowsPerPage)].map((_, index) => (
      <Box key={index} mb={2}>
        <Skeleton variant="rectangular" height={100} width="100%" />
      </Box>
    ));
  };

  // Pagination change handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Mobile card view for departments
  const renderMobileCards = () => {
    if (isLoading) {
      return renderMobileSkeletons();
    }
    
    return (
      <Stack spacing={2}>
        {filteredDepartments
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((department) => (
            <Card key={department.id} variant="outlined">
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" component="div">
                    {department.name}
                  </Typography>
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
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {department.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Stack>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isTablet ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isTablet ? 'stretch' : 'center',
            padding: '16px',
            gap: 2,
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BusinessIcon sx={{ marginRight: 2 }} />
            <Typography variant="h6">Departments</Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2, 
            width: isMobile ? '100%' : 'auto' 
          }}>
            <TextField
              placeholder="Search departments"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth={isMobile}
              InputProps={{
                startAdornment: <SearchIcon style={{ marginRight: 8 }} />,
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon style={{color:'white'}}/>}
              onClick={() => setIsAddingDepartment(true)}
              fullWidth={isMobile}
            >
              Add Department
            </Button>
          </Box>
        </Box>

        {!isMobile ? (
          // Table view for larger screens
          <>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? renderSkeletonRows() : filteredDepartments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((department) => (
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
          </>
        ) : (
          // Card view for mobile screens
          <Box sx={{ p: 2 }}>
            {renderMobileCards()}
          </Box>
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredDepartments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Name"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Description"
                value={newDepartment.description}
                onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                fullWidth
                margin="dense"
                multiline
                rows={3}
              />
              <Select
                value={newDepartment.status}
                onChange={(e) => setNewDepartment({ ...newDepartment, status: e.target.value })}
                fullWidth
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
              </Select>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddDepartment}
                  fullWidth
                >
                  Add Department
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
    </ThemeProvider>
  );
};

export default DepartmentManagement;