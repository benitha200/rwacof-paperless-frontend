// import React, { useState, useEffect } from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import {
//   Box,
//   Button,
//   Chip,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   Alert,
//   IconButton,
//   FormControl,
//   InputLabel,
//   TablePagination,
//   Skeleton
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
//   Search as SearchIcon
// } from '@mui/icons-material';
// import API_URL from '../../constants/Constants';
// import { CloudUpload, DownloadIcon } from 'lucide-react';

// const theme = createTheme();

// const AllEmployeeManagement = () => {
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState('');
//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogMode, setDialogMode] = useState('add');
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   // Pagination state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Search state
//   const [searchTerm, setSearchTerm] = useState('');

//   const [employeeForm, setEmployeeForm] = useState({
//     email: '',
//     firstName: '',
//     lastName: '',
//     employeeNumber: '',
//     departmentId: '',
//     designation: '',
//     dateOfBirth: '',
//     gender: '',
//     phoneNumber: '',
//     address: '',
//     status: 'ACTIVE'
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Update filtered employees when search term or employees change
//   useEffect(() => {
//     const filtered = employees.filter(emp =>
//       emp.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emp.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emp.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emp.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emp.department?.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredEmployees(filtered);
//     setPage(0); // Reset to first page when search changes
//   }, [employees, searchTerm]);

//   const fetchData = async () => {
//     try {
//       const [employeesRes, departmentsRes] = await Promise.all([
//         fetch(`${API_URL}/api/employees`),
//         fetch(`${API_URL}/api/departments`)
//       ]);

//       const employeesData = await employeesRes.json();
//       const departmentsData = await departmentsRes.json();

//       setEmployees(employeesData);
//       setDepartments(departmentsData);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch data');
//       setLoading(false);
//     }
//   };

//   // Pagination handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };


//   const handleEmployeeSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = dialogMode === 'edit'
//         ? `${API_URL}/api/users/employee/${selectedEmployee.id}`
//         : `${API_URL}/api/users/register-employee`;

//       const method = dialogMode === 'edit' ? 'PUT' : 'POST';

//       // Include the ID in the form data for updates
//       const formData = {
//         ...employeeForm,
//         id: dialogMode === 'edit' ? selectedEmployee.id : undefined
//       };

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) throw new Error(`Failed to ${dialogMode} employee`);

//       setSuccess(`Employee ${dialogMode === 'edit' ? 'updated' : 'created'} successfully!`);
//       fetchData();
//       handleCloseDialog();
//     } catch (err) {
//       setError(`Failed to ${dialogMode} employee`);
//     }
//   };


//   const handleDeleteEmployee = async (employeeId) => {
//     if (!window.confirm('Are you sure you want to delete this employee?')) return;

//     try {
//       const response = await fetch(`${API_URL}/api/employee/${employeeId}`, {
//         method: 'DELETE'
//       });

//       if (!response.ok) throw new Error('Failed to delete employee');

//       setSuccess('Employee deleted successfully!');
//       fetchData();
//     } catch (err) {
//       setError('Failed to delete employee');
//     }
//   };

//   const handleOpenDialog = (mode, employee = null) => {
//     setDialogMode(mode);
//     if (employee) {
//       setSelectedEmployee(employee);
//       setEmployeeForm({
//         email: employee.user.email,
//         firstName: employee.user.firstName,
//         lastName: employee.user.lastName,
//         employeeNumber: employee.employeeNumber,
//         departmentId: employee.departmentId,
//         designation: employee.designation,
//         dateOfBirth: employee.dateOfBirth?.split('T')[0] || '',
//         gender: employee.gender,
//         phoneNumber: employee.phoneNumber,
//         address: employee.address,
//         status: employee.status
//       });
//     } else {
//       setSelectedEmployee(null);
//       setEmployeeForm({
//         email: '',
//         firstName: '',
//         lastName: '',
//         employeeNumber: '',
//         departmentId: '',
//         designation: '',
//         dateOfBirth: '',
//         gender: '',
//         phoneNumber: '',
//         address: '',
//         status: 'ACTIVE'
//       });
//     }
//     setOpenDialog(true);
//   };



//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedEmployee(null);
//     setEmployeeForm({
//       email: '',
//       firstName: '',
//       lastName: '',
//       employeeNumber: '',
//       departmentId: '',
//       designation: '',
//       dateOfBirth: '',
//       gender: '',
//       phoneNumber: '',
//       address: '',
//       status: 'ACTIVE'
//     });
//   };

//   if (loading) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Skeleton variant="text" width={200} height={40} />
//           <Skeleton variant="rectangular" width={150} height={40} />
//         </Box>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 {['Employee ID', 'Full Name', 'Email', 'Department', 'Status', 'Actions'].map((header) => (
//                   <TableCell key={header}>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {[...Array(5)].map((_, index) => (
//                 <TableRow key={index}>
//                   {[1, 2, 3, 4, 5, 6].map((cell) => (
//                     <TableCell key={cell}>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     );
//   }


//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h4">Employees</Typography>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => handleOpenDialog('add')}
//           >
//             Add Employee
//           </Button>
//         </Box>

//         {/* Search Input */}
//         <Box sx={{ display: 'flex', mb: 2 }}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search employees"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: <SearchIcon sx={{ mr: 1 }} />,
//             }}
//           />
//         </Box>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}

//         {success && (
//           <Alert severity="success" sx={{ mb: 2 }}>
//             {success}
//           </Alert>
//         )}


//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Employee ID</TableCell>
//                 <TableCell>Full Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Department</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {(rowsPerPage > 0
//                 ? filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 : filteredEmployees
//               ).map((emp) => (
//                 <TableRow key={emp.id}>
//                   <TableCell>{emp.employeeNumber}</TableCell>
//                   <TableCell>{`${emp.user.firstName} ${emp.user.lastName}`}</TableCell>
//                   <TableCell>{emp.user.email}</TableCell>
//                   <TableCell>{emp.department?.name}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={emp.status}
//                       color={emp.status === 'ACTIVE' ? 'success' : 'error'}
//                       size="small"
//                       sx={{
//                         color: 'white',
//                         '& .MuiChip-label': {
//                           color: 'white',
//                         }
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <IconButton onClick={() => handleOpenDialog('view', emp)} size="small">
//                       <VisibilityIcon />
//                     </IconButton>
//                     <IconButton onClick={() => handleOpenDialog('edit', emp)} size="small">
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton onClick={() => handleDeleteEmployee(emp.id)} size="small">
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filteredEmployees.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>

//         <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//           <DialogTitle>
//             {dialogMode === 'add' ? 'Add New Employee' :
//               dialogMode === 'edit' ? 'Edit Employee' : 'View Employee'}
//           </DialogTitle>
//           <DialogContent>
//             <Box component="form" onSubmit={handleEmployeeSubmit} sx={{ mt: 2 }}>
//               <Grid container spacing={2}>
//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Email"
//                     type="email"
//                     value={employeeForm.email}
//                     onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
//                     disabled={dialogMode === 'view'}
//                     required
//                   />
//                 </Grid>
//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullWidth
//                     label="First Name"
//                     value={employeeForm.firstName}
//                     onChange={(e) => setEmployeeForm({ ...employeeForm, firstName: e.target.value })}
//                     disabled={dialogMode === 'view'}
//                     required
//                   />
//                 </Grid>
//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Last Name"
//                     value={employeeForm.lastName}
//                     onChange={(e) => setEmployeeForm({ ...employeeForm, lastName: e.target.value })}
//                     disabled={dialogMode === 'view'}
//                     required
//                   />
//                 </Grid>
//                 <Grid item md={6} xs={12}>
//                   <FormControl fullWidth>
//                     <InputLabel>Department</InputLabel>
//                     <Select
//                       value={employeeForm.departmentId}
//                       onChange={(e) => setEmployeeForm({ ...employeeForm, departmentId: e.target.value })}
//                       disabled={dialogMode === 'view'}
//                       label="Department"
//                     >
//                       {departments.map((dept) => (
//                         <MenuItem key={dept.id} value={dept.id.toString()}>
//                           {dept.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Designation"
//                     value={employeeForm.designation}
//                     onChange={(e) => setEmployeeForm({ ...employeeForm, designation: e.target.value })}
//                     disabled={dialogMode === 'view'}
//                     required
//                   />
//                 </Grid>
//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullWidth
//                     type="date"
//                     label="Date of Birth"
//                     value={employeeForm.dateOfBirth}
//                     onChange={(e) => setEmployeeForm({ ...employeeForm, dateOfBirth: e.target.value })}
//                     disabled={dialogMode === 'view'}
//                     InputLabelProps={{ shrink: true }}
//                     required
//                   />
//                 </Grid>
//                 <Grid item md={6} xs={12}>
//                   <FormControl fullWidth>
//                     <InputLabel>Gender</InputLabel>
//                     <Select
//                       value={employeeForm.gender}
//                       onChange={(e) => setEmployeeForm({ ...employeeForm, gender: e.target.value })}
//                       disabled={dialogMode === 'view'}
//                       label="Gender"
//                     >
//                       <MenuItem value="Male">Male</MenuItem>
//                       <MenuItem value="Female">Female</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Phone Number"
//                     value={employeeForm.phoneNumber}
//                     onChange={(e) => setEmployeeForm({ ...employeeForm, phoneNumber: e.target.value })}
//                     disabled={dialogMode === 'view'}
//                     required
//                   />
//                 </Grid>
//                 <Grid item md={6} xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Address"
//                     value={employeeForm.address}
//                     onChange={(e) => setEmployeeForm({ ...employeeForm, address: e.target.value })}
//                     disabled={dialogMode === 'view'}
//                     required
//                   />
//                 </Grid>
//                 <Grid item md={6} xs={12}>
//                   <FormControl fullWidth>
//                     <InputLabel>Status</InputLabel>
//                     <Select
//                       value={employeeForm.status}
//                       onChange={(e) => setEmployeeForm({ ...employeeForm, status: e.target.value })}
//                       disabled={dialogMode === 'view'}
//                       label="Status"
//                     >
//                       <MenuItem value="ACTIVE">Active</MenuItem>
//                       <MenuItem value="INACTIVE">Inactive</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//               </Grid>

//               {dialogMode !== 'view' && (
//                 <DialogActions sx={{ mt: 3 }}>
//                   <Button onClick={handleCloseDialog}>
//                     Cancel
//                   </Button>
//                   <Button type="submit" variant="contained">
//                     {dialogMode === 'edit' ? 'Update' : 'Create'} Employee
//                   </Button>
//                 </DialogActions>
//               )}
//             </Box>
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// };

// // export default EmployeeManagement;

// const enhanceEmployeeManagement = (OriginalComponent) => {
//   return (props) => {
//     const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
//     const [uploadFile, setUploadFile] = useState(null);

//     const handleFileUpload = async () => {
//       if (!uploadFile) return;

//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet);

//         try {
//           const response = await fetch(`${API_URL}/api/employees/bulk-upload`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(jsonData)
//           });

//           if (!response.ok) throw new Error('Bulk upload failed');

//           // Refresh employee data after upload
//           props.fetchData();
//           setUploadDialogOpen(false);
//         } catch (error) {
//           console.error('Upload error:', error);
//         }
//       };
//       reader.readAsArrayBuffer(uploadFile);
//     };

//     const downloadTemplate = async () => {
//       try {
//         const [departmentsResponse] = await Promise.all([
//           fetch(`${API_URL}/api/departments`)
//         ]);

//         const departments = await departmentsResponse.json();

//         // Create template workbook
//         const worksheet = XLSX.utils.json_to_sheet([
//           {
//             email: '',
//             firstName: '',
//             lastName: '',
//             department: departments.map(d => d.name).join('|'), // Dropdown validation
//             designation: '',
//             dateOfBirth: 'YYYY-MM-DD',
//             gender: 'Male|Female',
//             phoneNumber: '',
//             address: '',
//             status: 'ACTIVE|INACTIVE'
//           }
//         ]);

//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'EmployeeTemplate');
//         XLSX.writeFile(workbook, 'employee_upload_template.xlsx');
//       } catch (error) {
//         console.error('Template download error:', error);
//       }
//     };

//     return (
//       <>
//         <OriginalComponent 
//           {...props} 
//           extraActions={
//             <>
//               <Button 
//                 variant="outlined" 
//                 startIcon={<CloudUpload />}
//                 onClick={() => setUploadDialogOpen(true)}
//                 sx={{ mr: 2 }}
//               >
//                 Bulk Upload
//               </Button>
//               <Button 
//                 variant="outlined" 
//                 startIcon={<DownloadIcon />}
//                 onClick={downloadTemplate}
//               >
//                 Download Template
//               </Button>
//             </>
//           }
//         />

//         <Dialog 
//           open={uploadDialogOpen} 
//           onClose={() => setUploadDialogOpen(false)}
//         >
//           <DialogTitle>Bulk Employee Upload</DialogTitle>
//           <DialogContent>
//             <input 
//               type="file" 
//               accept=".xlsx, .xls"
//               onChange={(e) => setUploadFile(e.target.files[0])}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
//             <Button 
//               onClick={handleFileUpload} 
//               variant="contained"
//               disabled={!uploadFile}
//             >
//               Upload
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </>
//     );
//   };
// };

// export const EmployeeManagement = enhanceEmployeeManagement(AllEmployeeManagement);

// export default EmployeeManagement;


import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  TablePagination,
  Skeleton
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { CloudUpload, DownloadIcon } from 'lucide-react';
import * as XLSX from 'xlsx';
import API_URL from '../../constants/Constants';

const theme = createTheme();

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');


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
    status: 'ACTIVE'
  });

  useEffect(() => {
    fetchData();
  }, []);

  // Update filtered employees when search term or employees change
  useEffect(() => {
    const filtered = employees.filter(emp =>
      emp.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setPage(0); // Reset to first page when search changes
  }, [employees, searchTerm]);

  const fetchData = async () => {
    try {
      const [employeesRes, departmentsRes] = await Promise.all([
        fetch(`${API_URL}/api/employees`),
        fetch(`${API_URL}/api/departments`)
      ]);

      const employeesData = await employeesRes.json();
      const departmentsData = await departmentsRes.json();

      setEmployees(employeesData);
      setDepartments(departmentsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = dialogMode === 'edit'
        ? `${API_URL}/api/users/employee/${selectedEmployee.id}`
        : `${API_URL}/api/users/register-employee`;

      const method = dialogMode === 'edit' ? 'PUT' : 'POST';

      // Include the ID in the form data for updates
      const formData = {
        ...employeeForm,
        id: dialogMode === 'edit' ? selectedEmployee.id : undefined
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error(`Failed to ${dialogMode} employee`);

      setSuccess(`Employee ${dialogMode === 'edit' ? 'updated' : 'created'} successfully!`);
      fetchData();
      handleCloseDialog();
    } catch (err) {
      setError(`Failed to ${dialogMode} employee`);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      const response = await fetch(`${API_URL}/api/employee/${employeeId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete employee');

      setSuccess('Employee deleted successfully!');
      fetchData();
    } catch (err) {
      setError('Failed to delete employee');
    }
  };

  const handleFileUpload = async () => {
    if (!uploadFile) {
      setUploadError('Please select a file to upload');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
        // Convert phone number to string
        const processedData = jsonData.map(entry => ({
          ...entry,
          phoneNumber: String(entry.phoneNumber), // Convert phone number to string
          dateOfBirth: entry.dateOfBirth ? new Date(
            Date.parse('1900-01-01') + (entry.dateOfBirth - 1) * 24 * 60 * 60 * 1000
          ).toISOString().split('T')[0] : null // Convert Excel date to proper date format
        }));
  
        const response = await fetch(`${API_URL}/api/users/employee/bulk-upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(processedData)
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Bulk upload failed');
        }
  
        // Success handling
        setSuccess('Employees uploaded successfully!');
        fetchData();
        setUploadDialogOpen(false);
        setUploadError('');
      } catch (error) {
        console.error('Upload error:', error);
        setUploadError(error.message || 'Bulk upload failed');
      }
    };
  
    reader.readAsArrayBuffer(uploadFile);
  };

  // const handleFileUpload = async () => {
  //   if (!uploadFile) {
  //     setUploadError('Please select a file to upload');
  //     return;
  //   }

  //   // Validate file type
  //   const allowedTypes = [
  //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  //     'application/vnd.ms-excel' // .xls
  //   ];

  //   if (!allowedTypes.includes(uploadFile.type)) {
  //     setUploadError('Please upload a valid Excel file (.xlsx or .xls)');
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = async (e) => {
  //     try {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: 'array' });
  //       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //       const jsonData = XLSX.utils.sheet_to_json(worksheet);

  //       // Optional: Add validation for required columns
  //       const requiredColumns = ['email', 'firstName', 'lastName'];
  //       const missingColumns = requiredColumns.filter(col => 
  //         !Object.keys(jsonData[0] || {}).includes(col)
  //       );

  //       if (missingColumns.length > 0) {
  //         setUploadError(`Missing required columns: ${missingColumns.join(', ')}`);
  //         return;
  //       }

  //       const response = await fetch(`${API_URL}/api/users/employee/bulk-upload`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(jsonData)
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.message || 'Bulk upload failed');
  //       }

  //       // Success handling
  //       setSuccess('Employees uploaded successfully!');
  //       fetchData();
  //       setUploadDialogOpen(false);
  //       setUploadError('');
  //     } catch (error) {
  //       console.error('Upload error:', error);
  //       setUploadError(error.message || 'Bulk upload failed');
  //     }
  //   };

  //   reader.readAsArrayBuffer(uploadFile);
  // };

  const downloadTemplate = async () => {
    try {
      const departmentsResponse = await fetch(`${API_URL}/api/departments`);
      const departments = await departmentsResponse.json();

      // Create template workbook
      const worksheet = XLSX.utils.json_to_sheet([
        {
          email: '',
          firstName: '',
          lastName: '',
          department: departments.map(d => d.name).join('|'), // Dropdown validation
          designation: '',
          dateOfBirth: 'YYYY-MM-DD',
          gender: 'Male|Female',
          phoneNumber: '',
          address: '',
          status: 'ACTIVE|INACTIVE'
        }
      ]);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'EmployeeTemplate');
      XLSX.writeFile(workbook, 'employee_upload_template.xlsx');
    } catch (error) {
      console.error('Template download error:', error);
      setError('Failed to download template');
    }
  };

  const handleOpenDialog = (mode, employee = null) => {
    setDialogMode(mode);
    if (employee) {
      setSelectedEmployee(employee);
      setEmployeeForm({
        email: employee.user.email,
        firstName: employee.user.firstName,
        lastName: employee.user.lastName,
        employeeNumber: employee.employeeNumber,
        departmentId: employee.departmentId,
        designation: employee.designation,
        dateOfBirth: employee.dateOfBirth?.split('T')[0] || '',
        gender: employee.gender,
        phoneNumber: employee.phoneNumber,
        address: employee.address,
        status: employee.status
      });
    } else {
      setSelectedEmployee(null);
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
        status: 'ACTIVE'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployee(null);
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
      status: 'ACTIVE'
    });
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="rectangular" width={150} height={40} />
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {['Employee ID', 'Full Name', 'Email', 'Department', 'Status', 'Actions'].map((header) => (
                  <TableCell key={header}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  {[1, 2, 3, 4, 5, 6].map((cell) => (
                    <TableCell key={cell}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Employees</Typography>
          <Box>
            <Button
              variant="outlined"
              startIcon={<CloudUpload />}
              onClick={() => setUploadDialogOpen(true)}
              sx={{ mr: 2 }}
            >
              Bulk Upload
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={downloadTemplate}
              sx={{ mr: 2 }}
            >
              Download Template
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('add')}
            >
              Add Employee
            </Button>
          </Box>
        </Box>

        {/* Search Input */}
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search employees"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
          />
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredEmployees
              ).map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.employeeNumber}</TableCell>
                  <TableCell>{`${emp.user.firstName} ${emp.user.lastName}`}</TableCell>
                  <TableCell>{emp.user.email}</TableCell>
                  <TableCell>{emp.department?.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={emp.status}
                      color={emp.status === 'ACTIVE' ? 'success' : 'error'}
                      size="small"
                      sx={{
                        color: 'white',
                        '& .MuiChip-label': {
                          color: 'white',
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpenDialog('view', emp)} size="small">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDialog('edit', emp)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteEmployee(emp.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredEmployees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        {/* Employee bulk upload Dialog */}
        <Dialog 
        open={uploadDialogOpen} 
        onClose={() => {
          setUploadDialogOpen(false);
          setUploadError('');
          setUploadFile(null);
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Bulk Employee Upload</DialogTitle>
        <DialogContent>
          <input 
            type="file" 
            accept=".xlsx, .xls"
            onChange={(e) => {
              setUploadFile(e.target.files[0]);
              setUploadError('');
            }}
            style={{ width: '100%', marginBottom: '16px' }}
          />
          {uploadError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {uploadError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleFileUpload} 
            variant="contained"
            disabled={!uploadFile}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* employee dialog */}

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {dialogMode === 'add' ? 'Add New Employee' :
              dialogMode === 'edit' ? 'Edit Employee' : 'View Employee'}
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleEmployeeSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={employeeForm.email}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                    disabled={dialogMode === 'view'}
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={employeeForm.firstName}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, firstName: e.target.value })}
                    disabled={dialogMode === 'view'}
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={employeeForm.lastName}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, lastName: e.target.value })}
                    disabled={dialogMode === 'view'}
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={employeeForm.departmentId}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, departmentId: e.target.value })}
                      disabled={dialogMode === 'view'}
                      label="Department"
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept.id} value={dept.id.toString()}>
                          {dept.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Designation"
                    value={employeeForm.designation}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, designation: e.target.value })}
                    disabled={dialogMode === 'view'}
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date of Birth"
                    value={employeeForm.dateOfBirth}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, dateOfBirth: e.target.value })}
                    disabled={dialogMode === 'view'}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={employeeForm.gender}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, gender: e.target.value })}
                      disabled={dialogMode === 'view'}
                      label="Gender"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={employeeForm.phoneNumber}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, phoneNumber: e.target.value })}
                    disabled={dialogMode === 'view'}
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={employeeForm.address}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, address: e.target.value })}
                    disabled={dialogMode === 'view'}
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={employeeForm.status}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, status: e.target.value })}
                      disabled={dialogMode === 'view'}
                      label="Status"
                    >
                      <MenuItem value="ACTIVE">Active</MenuItem>
                      <MenuItem value="INACTIVE">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {dialogMode !== 'view' && (
                <DialogActions sx={{ mt: 3 }}>
                  <Button onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    {dialogMode === 'edit' ? 'Update' : 'Create'} Employee
                  </Button>
                </DialogActions>
              )}
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default EmployeeManagement;