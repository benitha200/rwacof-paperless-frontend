// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import { Home, Package, FileText, DollarSign, Users, Settings, Menu as MenuIcon, File } from 'lucide-react';
// import {
//   Box, VStack, HStack, Heading, Text, Button, Image, Icon,
//   useColorModeValue, ChakraProvider, Flex, Menu, MenuButton, MenuList, MenuItem,
//   Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
//   useDisclosure, Avatar, Tooltip, useBreakpointValue
// } from "@chakra-ui/react";
// import { extendTheme } from "@chakra-ui/react";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ShipmentList from './components/Logistics/ShipmentList';
// import ShipmentForm from './components/Logistics/ShipmentForm';
// import ContainerList from './components/Logistics/ContainerList';
// import ShipmentInfo from './components/Logistics/Shipment/ShipmentInfo';
// import logo from './../assets/img/logo.png';
// import Login from './components/Auth/Login';
// import GRN from './components/Finance/GRN/GRN'
// import Payments from './components/Finance/Payments'
// import FinancialReports from './components/Finance/FinancialReports'
// import UserManagment from './components/Admin/UserManagment';
// import SystemSettings from './components/Admin/SystemSettings';
// import GrnList from './components/Finance/GRN/GrnList';
// import GrnView from './components/Finance/GRN/GrnView';
// import DashboardFinance from './components/Finance/FinanceDashboard';
// import LogisticsDashboard from './components/Logistics/LogisticsDashboard';
// import AdminDashboard from './components/Admin/AdminDashboard';
// import WeightBridgeManagerDashboad from './components/Production/WeightBridgeManagerDashboad';
// import ManagingDirectorDashboard from './components/ManagingDirector/ManagingDirectorDashboard';
// import QualityManagerDashboard from './components/Quality/QualityManagerDashboard';
// import CooDashboard from './components/COO/CooDashboard';
// import LoadingTallySheet from './components/Logistics/LoadingTallySheet/LoadingTallySheet';
// import ShipmentUpdate from './components/Logistics/Shipment/ShipmentUpdate';
// import ContractList from './components/Logistics/Contract/ContractList';
// import ContractForm from './components/Logistics/Contract/ContractForm';
// import ContractDetails from './components/Logistics/Contract/ContractDetails';
// import AdministrationDashboard from './components/Administration/AdministrationDashboard';
// import Cars from './components/Administration/Cars';
// import Drivers from './components/Administration/Drivers';
// import Trips from './components/Administration/Trips';
// import EmployeeDashboard from './components/Employee/EmployeeDashboard';
// import MyTrips from './components/Employee/MyTrips';
// import ReceptionistDashboard from './components/Receptionist/ReceptionistDashboard';
// import FinishTripPage from './components/Receptionist/FinishTripPage';
// import EmployeeTrips from './components/Employee/EmployeeTrips';
// import TripForm from './components/Employee/TripForm';
// import CreateTrip from './components/Receptionist/CreateTrip';
// import HRDashboard from './components/HR/HRDashboard';
// import EmployeeManagement from './components/HR/EmployeeManagment';
// import DepartmentManagement from './components/HR/DepartmentManagement';

// // Custom theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#115e59', // teal-800
//       light: '#0f766e', // teal-700
//       dark: '#134e4a', // teal-900
//       contrastText: '#ffffff',
//     },
//   },
// });

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const bgColor = useColorModeValue("gray.50", "gray.900");
//   const cardBgColor = useColorModeValue("white", "gray.800");
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const isMobile = useBreakpointValue({ base: true, md: false });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const storedUserRole = localStorage.getItem('userRole')?.toUpperCase();
//     if (token && storedUserRole) {
//       setIsAuthenticated(true);
//       setUserRole(storedUserRole);
//     }
//   }, []);

//   const handleLogin = (role) => {
//     setIsAuthenticated(true);
//     setUserRole(role);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('firstName');
//     localStorage.removeItem('lastName');
//     localStorage.removeItem('email');
//     localStorage.removeItem('userId');
//     setIsAuthenticated(false);
//     setUserRole(null);
//   };

//   const NavItem = ({ to, icon, text }) => (
//     <Link to={to}>
//       <Button variant="ghost" leftIcon={<Icon as={icon} />} fontWeight="medium" justifyContent="flex-start">
//         {text}
//       </Button>
//     </Link>
//   );

//   const MenuContent = () => {
//     const menuItems = {
//       ADMIN: [
//         { to: "/", icon: Home, text: "Dashboard" },
//         { to: "/shipments", icon: Package, text: "Shipments" },
//         { to: "/containers", icon: Package, text: "Containers" },
//         { to: "/users", icon: Users, text: "User Management" },
//         { to: "/settings", icon: Settings, text: "System Settings" },
//       ],
//       FINANCE: [
//         { to: "/", icon: Home, text: "Dashboard" },
//         { to: "/allgrns", icon: FileText, text: "GRN" },
//         { to: "/payments", icon: DollarSign, text: "Payments" },
//         { to: "/financial-reports", icon: FileText, text: "Financial Reports" },
//       ],
//       WEIGHTBRIDGEMANAGER: [
//         { to: "/", icon: Home, text: "Dashboard" },
//         { to: "/grn", icon: FileText, text: "GRN" },
//         { to: "/allgrns", icon: FileText, text: "ALL GRNS" },
//       ],
//       QUALITYMANAGER: [
//         { to: "/", icon: Home, text: "Dashboard" },
//         { to: "/allgrns", icon: FileText, text: "ALL GRNS" },
//       ],
//       COO: [
//         { to: "/", icon: Home, text: "Dashboard" },
//         { to: "/grn", icon: FileText, text: "GRN" },
//         { to: "/allgrns", icon: FileText, text: "ALL GRNS" },
//       ],
//       MANAGINGDIRECTOR: [
//         { to: "/", icon: Home, text: "Dashboard" },
//         // { to: "/grn", icon: FileText, text: "GRN" },
//         { to: "/allgrns", icon: FileText, text: "ALL GRNS" },
//       ],
//       LOGISTICS: [
//         { to: "/", icon: Home, text: "Dashboard" },
//         { to: "/shipments", icon: Package, text: "Shipments" },
//         { to: "/contracts", icon: File, text: "Contracts" },
//         // { to: "/loading-tally-sheet", icon: SheetIcon, text: "Loading List" },
//       ],
//       ADMINISTRATION: [
//         { to: "/", icon: Home, text: "Dashboard" },
//         { to: "/cars", icon: Package, text: "Cars" },
//         { to: "/drivers", icon: File, text: "Drivers" },
//         { to: "/trips", icon: File, text: "Trips" },
//       ],
//       EMPLOYEE: [
//         { to: "/", icon: Home, text: "Dashboard" },
//         {
//           to: localStorage.getItem('userId') === '17'
//             ? "/trips/employee-requests"
//             : "/trips/employee",
//           icon: File,
//           text: "Trips"
//         },
//       ],
//       RECEPTIONIST: [
//         { to: "/", icon: Home, text: "Dashboard" },
//         { to: "/ongoing/trips", icon: Package, text: "Trips" },
//       ],
//       HR: [
//         { to: "/", icon: Home, text: "Dashboard" },
//         { to: "/employees", icon: Package, text: "Employee" },
//         { to: "/departments", icon: Package, text: "Department" },
//       ],
//     };

//     return (
//       <>
//         {menuItems[userRole]?.map((item, index) => (
//           <NavItem key={index} to={item.to} icon={item.icon} text={item.text} />
//         ))}
//       </>
//     );
//   };

//   const Welcome = () => {
//     // switch ((userRole || '').toUpperCase()){
//     switch (localStorage.getItem('userRole')?.toUpperCase()) {
//       case 'FINANCE':
//         return <DashboardFinance />;
//       case 'LOGISTICS':
//         return <LogisticsDashboard />;
//       case 'ADMIN':
//         return <AdminDashboard />;
//       case 'WEIGHTBRIDGEMANAGER':
//         return <WeightBridgeManagerDashboad />
//       case 'MANAGINGDIRECTOR':
//         return <ManagingDirectorDashboard />
//       case 'QUALITYMANAGER':
//         return <QualityManagerDashboard />
//       case 'COO':
//         return <CooDashboard />
//       case 'ADMINISTRATION':
//         return <AdministrationDashboard />
//       case 'EMPLOYEE':
//         return <EmployeeDashboard />
//       case 'RECEPTIONIST':
//         return <ReceptionistDashboard />
//       case 'HR':
//         return <HRDashboard />
//       default:
//         return (
//           <VStack spacing={8} align="center" w="full" h="80vh" justify="center">
//             <Heading as="h1" size="2xl" textAlign="center">Welcome to RWACOF Export Management</Heading>
//           </VStack>
//         );
//     }
//   };


//   const ProtectedRoute = ({ children, allowedRoles }) => {
//     const token = localStorage.getItem('token');
//     const storedUserRole = localStorage.getItem('userRole');

//     if (!token || !storedUserRole) {
//       return <Navigate to="/login" />;
//     }

//     // Convert both stored role and allowed roles to uppercase for consistent comparison
//     if (allowedRoles && !allowedRoles.includes(storedUserRole?.toUpperCase())) {
//       return <Navigate to="/" />;
//     }
//     return children;
//   };

//   return (
//     <ChakraProvider>
//       <Router>
//         <Box minHeight="100vh" bg={bgColor}  style={{ fontFamily: 'Inter, sans-serif', fontSize:"14px" }}>
//           <Flex direction="column" h="full">
//             <Flex
//               as="header"
//               align="center"
//               justify="space-between"
//               wrap="wrap"
//               padding={4}
//               bg={cardBgColor}
//               boxShadow="sm"
//             >
//               <Flex align="center">
//                 <Image height="50px" src={logo} alt="RWACOF Export Logistics" />
//               </Flex>
//               {isAuthenticated && (
//                 <HStack spacing={4}>
//                   {!isMobile && <MenuContent />}
//                   {isMobile && (
//                     <Tooltip label="Open Menu">
//                       <Button onClick={onOpen} variant="ghost">
//                         <Icon as={MenuIcon} />
//                       </Button>
//                     </Tooltip>
//                   )}
//                   <Text fontWeight="bold" size="2xl">
//                     Welcome <Text as="span" color="teal">{`${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`}</Text>!
//                   </Text>

//                   <Menu>
//                     <MenuButton colorScheme="teal" as={Button} variant="ghost">
//                       <Avatar size="sm" name={`${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`} />
//                     </MenuButton>
//                     <MenuList>
//                       <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                     </MenuList>
//                   </Menu>
//                 </HStack>
//               )}
//             </Flex>

//             <Flex flex={1}>
//               {isAuthenticated && isMobile && (
//                 <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
//                   <DrawerOverlay />
//                   <DrawerContent>
//                     <DrawerCloseButton />
//                     <DrawerHeader borderBottomWidth="1px">Rwacof</DrawerHeader>
//                     <DrawerBody>
//                       <MenuContent />
//                     </DrawerBody>
//                   </DrawerContent>
//                 </Drawer>
//               )}

//               <Box flex={1} p={8}>

//                 <Routes>
//                   <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                   <Route path="/" element={
//                     <ProtectedRoute>
//                       <Welcome />
//                     </ProtectedRoute>
//                   } />

//                   {/* Admin Routes */}
//                   <Route path="/shipments" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}>
//                       <ShipmentList />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/contracts" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}>
//                       <ContractList />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/contract/:id" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}>
//                       <ContractDetails />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/new-contract" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}>
//                       <ContractForm />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/containers" element={
//                     <ProtectedRoute allowedRoles={['ADMIN']}>
//                       <ContainerList />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/users" element={
//                     <ProtectedRoute allowedRoles={['ADMIN']}>
//                       <UserManagment />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/settings" element={
//                     <ProtectedRoute allowedRoles={['ADMIN']}>
//                       <SystemSettings />
//                     </ProtectedRoute>
//                   } />

//                   {/* Finance Routes */}
//                   <Route path="/grn/:id" element={
//                     <ProtectedRoute allowedRoles={['FINANCE', 'QUALITYMANAGER', 'WEIGHTBRIDGEMANAGER', 'COO', 'MANAGINGDIRECTOR']}>
//                       <GrnView />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/allgrns" element={
//                     <ProtectedRoute allowedRoles={['FINANCE', 'QUALITYMANAGER', 'WEIGHTBRIDGEMANAGER', 'COO', 'MANAGINGDIRECTOR']}>
//                       <GrnList />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/payments" element={
//                     <ProtectedRoute allowedRoles={['FINANCE']}>
//                       <Payments />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/financial-reports" element={
//                     <ProtectedRoute allowedRoles={['FINANCE']}>
//                       <FinancialReports />
//                     </ProtectedRoute>
//                   } />

//                   {/* Weight Bridge Manager and Other Routes */}
//                   <Route path="/grn" element={
//                     <ProtectedRoute allowedRoles={['FINANCE', 'QUALITYMANAGER', 'WEIGHTBRIDGEMANAGER']}>
//                       <GRN />
//                     </ProtectedRoute>
//                   } />

//                   {/* ManagingDirector Manager Routes  */}
//                   <Route path="/grn/:id" element={
//                     <ProtectedRoute allowedRoles={['FINANCE', 'QualityManager', 'ManagingDirector']}>
//                       <GrnView />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/allgrns" element={
//                     <ProtectedRoute allowedRoles={['FINANCE', 'QualityManager', 'ManagingDirector']}>
//                       <GrnList />
//                     </ProtectedRoute>
//                   } />

//                   {/* Logistics Routes */}
//                   <Route path="/new-shipment" element={
//                     <ProtectedRoute allowedRoles={['LOGISTICS']}>
//                       <ShipmentForm />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/update-shipment" element={
//                     <ProtectedRoute allowedRoles={['LOGISTICS']}>
//                       <ShipmentUpdate />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/loading-tally-sheet" element={
//                     <ProtectedRoute allowedRoles={['LOGISTICS']}>
//                       <LoadingTallySheet />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/shipments/:id" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}>
//                       <ShipmentInfo />
//                     </ProtectedRoute>
//                   } />

//                   {/* Administration Route */}
//                   <Route path="/cars" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'EMPLOYEE']}>
//                       <Cars />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/drivers" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'EMPLOYEE']}>
//                       <Drivers />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/trips" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION']}>
//                       <Trips />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/trip/create" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'RECEPTIONIST']}>
//                       <CreateTrip />
//                     </ProtectedRoute>
//                   } />

//                   <Route path="/trips/employee-requests" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'EMPLOYEE']}>
//                       <MyTrips />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/trips/employee" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'EMPLOYEE']}>
//                       <EmployeeTrips />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/trips/employee/create" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'EMPLOYEE']}>
//                       <TripForm />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/ongoing/trips" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'RECEPTIONIST']}>
//                       <FinishTripPage />
//                     </ProtectedRoute>
//                   } />

//                   <Route path="/employees" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'HR', 'RECEPTIONIST']}>
//                       <EmployeeManagement />
//                     </ProtectedRoute>
//                   } />
//                   <Route path="/departments" element={
//                     <ProtectedRoute allowedRoles={['ADMIN', 'HR', 'RECEPTIONIST']}>
//                       <DepartmentManagement />
//                     </ProtectedRoute>
//                   } />

//                   {/* Catch-all route should be last */}
//                   <Route path="*" element={<Navigate to="/" />} />
//                 </Routes>
//               </Box>
//             </Flex>
//           </Flex>
//         </Box>
//       </Router>
//     </ChakraProvider>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home, Package, FileText, DollarSign, Users, Settings, Menu as MenuIcon, File, Car } from 'lucide-react';
import {
  Box, VStack, HStack, Heading, Text, Button, Image, Icon,
  useColorModeValue, ChakraProvider, Flex, Menu, MenuButton, MenuList, MenuItem,
  Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  useDisclosure, Avatar, Tooltip, useBreakpointValue, Grid, GridItem,
  Spinner
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShipmentList from './components/Logistics/ShipmentList';
import ShipmentForm from './components/Logistics/ShipmentForm';
import ContainerList from './components/Logistics/ContainerList';
import ShipmentInfo from './components/Logistics/Shipment/ShipmentInfo';
import logo from './../assets/img/logo.png';
import Login from './components/Auth/Login';
import GRN from './components/Finance/GRN/GRN'
import Payments from './components/Finance/Payments'
import FinancialReports from './components/Finance/FinancialReports'
import UserManagment from './components/Admin/UserManagment';
import SystemSettings from './components/Admin/SystemSettings';
import GrnList from './components/Finance/GRN/GrnList';
import GrnView from './components/Finance/GRN/GrnView';
import DashboardFinance from './components/Finance/FinanceDashboard';
import LogisticsDashboard from './components/Logistics/LogisticsDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import WeightBridgeManagerDashboad from './components/Production/WeightBridgeManagerDashboad';
import ManagingDirectorDashboard from './components/ManagingDirector/ManagingDirectorDashboard';
import QualityManagerDashboard from './components/Quality/QualityManagerDashboard';
import CooDashboard from './components/COO/CooDashboard';
import LoadingTallySheet from './components/Logistics/LoadingTallySheet/LoadingTallySheet';
import ShipmentUpdate from './components/Logistics/Shipment/ShipmentUpdate';
import ContractList from './components/Logistics/Contract/ContractList';
import ContractForm from './components/Logistics/Contract/ContractForm';
import ContractDetails from './components/Logistics/Contract/ContractDetails';
import AdministrationDashboard from './components/Administration/AdministrationDashboard';
import Cars from './components/Administration/Cars';
import Drivers from './components/Administration/Drivers';
import Trips from './components/Administration/Trips';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import MyTrips from './components/Employee/MyTrips';
import ReceptionistDashboard from './components/Receptionist/ReceptionistDashboard';
import FinishTripPage from './components/Receptionist/FinishTripPage';
import EmployeeTrips from './components/Employee/EmployeeTrips';
import TripForm from './components/Employee/TripForm';
import CreateTrip from './components/Receptionist/CreateTrip';
import HRDashboard from './components/HR/HRDashboard';
import EmployeeManagement from './components/HR/EmployeeManagment';
import DepartmentManagement from './components/HR/DepartmentManagement';
import SecurityDashboard from './components/SecurityGate/SecurityDashboard';
import ApprovedTrips from './components/SecurityGate/ApprovedTrips';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#115e59', // teal-800
      light: '#0f766e', // teal-700
      dark: '#134e4a', // teal-900
      contrastText: '#ffffff',
    },
  },
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole')?.toUpperCase();
    if (token && storedUserRole) {
      setIsAuthenticated(true);
      setUserRole(storedUserRole);
    }
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const NavItem = ({ to, icon, text }) => (
    <Link to={to}>
      <Button variant="ghost" leftIcon={<Icon as={icon} />} fontWeight="medium" justifyContent="flex-start" w="full">
        {text}
      </Button>
    </Link>
  );

  const MenuContent = () => {
    const menuItems = {
      ADMIN: [
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/shipments", icon: Package, text: "Shipments" },
        { to: "/containers", icon: Package, text: "Containers" },
        { to: "/users", icon: Users, text: "User Management" },
        { to: "/settings", icon: Settings, text: "System Settings" },
      ],
      FINANCE: [
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/allgrns", icon: FileText, text: "GRN" },
        { to: "/payments", icon: DollarSign, text: "Payments" },
        { to: "/financial-reports", icon: FileText, text: "Financial Reports" },
      ],
      WEIGHTBRIDGEMANAGER: [
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/grn", icon: FileText, text: "GRN" },
        { to: "/allgrns", icon: FileText, text: "ALL GRNS" },
      ],
      QUALITYMANAGER: [
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/allgrns", icon: FileText, text: "ALL GRNS" },
      ],
      COO: [
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/grn", icon: FileText, text: "GRN" },
        { to: "/allgrns", icon: FileText, text: "ALL GRNS" },
      ],
      MANAGINGDIRECTOR: [
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/allgrns", icon: FileText, text: "ALL GRNS" },
      ],
      LOGISTICS: [
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/shipments", icon: Package, text: "Shipments" },
        { to: "/contracts", icon: File, text: "Contracts" },
      ],
      ADMINISTRATION: [
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/cars", icon: Package, text: "Cars" },
        { to: "/drivers", icon: File, text: "Drivers" },
        { to: "/trips", icon: File, text: "Trips" },
      ],
      EMPLOYEE: [
        { to: "/", icon: Home, text: "Dashboard" },
        {
          to: localStorage.getItem('userId') === '17'
            ? "/trips/employee-requests"
            : "/trips/employee",
          icon: File,
          text: "Trips"
        },
      ],
      RECEPTIONIST: [
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/ongoing/trips", icon: Package, text: "Trips" },
      ],
      HR: [
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/employees", icon: Package, text: "Employee" },
        { to: "/departments", icon: Package, text: "Department" },
      ],
      SECURITY_GATE: [
        { to: "/", icon: Home, text: "Dashboard" },
        // { to: "/approved-trips", icon: Car, text: "trips" },
      ],
    };

    return (
      <>
        {menuItems[userRole]?.map((item, index) => (
          <NavItem key={index} to={item.to} icon={item.icon} text={item.text} />
        ))}
      </>
    );
  };

  // const Welcome = () => {
  //   switch (localStorage.getItem('userRole')?.toUpperCase()) {
  //     case 'FINANCE':
  //       return <DashboardFinance />;
  //     case 'LOGISTICS':
  //       return <LogisticsDashboard />;
  //     case 'ADMIN':
  //       return <AdminDashboard />;
  //     case 'WEIGHTBRIDGEMANAGER':
  //       return <WeightBridgeManagerDashboad />
  //     case 'MANAGINGDIRECTOR':
  //       return <ManagingDirectorDashboard />
  //     case 'QUALITYMANAGER':
  //       return <QualityManagerDashboard />
  //     case 'COO':
  //       return <CooDashboard />
  //     case 'ADMINISTRATION':
  //       return <AdministrationDashboard />
  //     case 'EMPLOYEE':
  //       return <EmployeeDashboard />
  //     case 'RECEPTIONIST':
  //       return <ReceptionistDashboard />
  //     case 'HR':
  //       return <HRDashboard />
  //     case 'SECURITY_GATE':
  //       return <SecurityDashboard />
  //     default:
  //       return (
  //         <VStack spacing={8} align="center" w="full" h="80vh" justify="center">
  //           <Heading as="h1" size="2xl" textAlign="center">Welcome to RWACOF Export Management</Heading>
  //         </VStack>
  //       );
  //   }
  // };


  const Welcome = () => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(
      typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
      // Get user role from localStorage
      const role = localStorage.getItem('userRole')?.toUpperCase() || '';
      setUserRole(role);
      setLoading(false);

      // Handle window resize
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    if (loading) {
      return (
        <>
          <div className="container items-center justify-center w-full h-[80vh] space-y-4">
            <div className={`animate-spin rounded-full h-${windowWidth < 768 ? '8' : '12'} w-${windowWidth < 768 ? '8' : '12'} border-4 border-blue-500 border-t-transparent`}></div>
            <p>Loading dashboard...</p>
          </div>
          {/* <VStack spacing={4} align="center" w="full" h="80vh" justify="center">
          <Spinner size={windowWidth < 768 ? "md" : "lg"} color="blue.500" />
          <Text>Loading dashboard...</Text>
        </VStack> */}
        </>

      );
    }

    // Dashboard mapping to avoid lengthy switch statement
    const dashboardComponents = {
      'FINANCE': DashboardFinance,
      'LOGISTICS': LogisticsDashboard,
      'ADMIN': AdminDashboard,
      'WEIGHTBRIDGEMANAGER': WeightBridgeManagerDashboad,
      'MANAGINGDIRECTOR': ManagingDirectorDashboard,
      'QUALITYMANAGER': QualityManagerDashboard,
      'COO': CooDashboard,
      'ADMINISTRATION': AdministrationDashboard,
      'EMPLOYEE': EmployeeDashboard,
      'RECEPTIONIST': ReceptionistDashboard,
      'HR': HRDashboard,
      'SECURITY_GATE': SecurityDashboard
    };

    // Render the appropriate dashboard based on user role
    const Dashboard = dashboardComponents[userRole];

    if (Dashboard) {
      return <Dashboard />;
    }

    // Default welcome screen
    return (
      <VStack
        spacing={4}
        align="center"
        w="full"
        h="80vh"
        justify="center"
        px={4} // Add padding for smaller screens
      >
        <Heading
          as="h1"
          size={windowWidth < 480 ? "xl" : windowWidth < 768 ? "xl" : "2xl"}
          textAlign="center"
          lineHeight="1.4"
        >
          Welcome to RWACOF Export Management
        </Heading>
        <Text fontSize={windowWidth < 768 ? "sm" : "md"} textAlign="center" color="gray.600">
          Please contact your administrator if you're unable to access your dashboard.
        </Text>
      </VStack>
    );
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole');

    if (!token || !storedUserRole) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(storedUserRole?.toUpperCase())) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <ChakraProvider>
      <Router>
        <Box minHeight="100vh" bg={bgColor} style={{ fontFamily: 'Inter, sans-serif', fontSize: "14px" }}>
          <Flex direction="column" h="full">
            <Flex
              as="header"
              align="center"
              justify="space-between"
              wrap="wrap"
              padding={4}
              bg={cardBgColor}
              boxShadow="sm"
            >
              <Flex align="center">
                <Image height="50px" src={logo} alt="RWACOF Export Logistics" />
              </Flex>
              {isAuthenticated && (
                <HStack spacing={4}>
                  {!isMobile && <MenuContent />}
                  {isMobile && (
                    <Tooltip label="Open Menu">
                      <Button onClick={onOpen} variant="ghost">
                        <Icon as={MenuIcon} />
                      </Button>
                    </Tooltip>
                  )}
                  <Text fontWeight="bold" size="2xl">
                    Welcome <Text as="span" color="teal">{`${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`}</Text>!
                  </Text>

                  <Menu>
                    <MenuButton colorScheme="teal" as={Button} variant="ghost">
                      <Avatar size="sm" name={`${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`} />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              )}
            </Flex>

            <Flex flex={1}>
              {isAuthenticated && isMobile && (
                <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
                  <DrawerOverlay backdropFilter="blur(5px)" />
                  <DrawerContent bg="linear-gradient(135deg,rgb(255, 255, 255),rgb(247, 255, 254))" color="gray">
                    <DrawerCloseButton size="lg" color="white" mt={2} mr={2} />
                    <DrawerHeader borderBottomWidth="1px" fontSize="xl" fontWeight="bold" py={4}>
                      RWACOF
                    </DrawerHeader>
                    <DrawerBody py={4}>
                      <VStack spacing={4} align="stretch">
                        <MenuContent />
                      </VStack>
                    </DrawerBody>
                    <Box textAlign="center" py={4} borderTopWidth="1px">
                      <Button
                        onClick={onClose}
                        variant="ghost"
                        colorScheme="teal"
                        leftIcon={<Icon as={MenuIcon} />}
                        size="lg"
                        w="full"
                      >
                        Close Menu
                      </Button>
                    </Box>
                  </DrawerContent>
                </Drawer>
              )}

              <Box flex={1} p={8}>
                <Routes>
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Welcome />
                    </ProtectedRoute>
                  } />

                  {/* Admin Routes */}
                  <Route path="/shipments" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}>
                      <ShipmentList />
                    </ProtectedRoute>
                  } />
                  <Route path="/contracts" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}>
                      <ContractList />
                    </ProtectedRoute>
                  } />
                  <Route path="/contract/:id" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}>
                      <ContractDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/new-contract" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}>
                      <ContractForm />
                    </ProtectedRoute>
                  } />
                  <Route path="/containers" element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <ContainerList />
                    </ProtectedRoute>
                  } />
                  <Route path="/users" element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <UserManagment />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <SystemSettings />
                    </ProtectedRoute>
                  } />

                  {/* Finance Routes */}
                  <Route path="/grn/:id" element={
                    <ProtectedRoute allowedRoles={['FINANCE', 'QUALITYMANAGER', 'WEIGHTBRIDGEMANAGER', 'COO', 'MANAGINGDIRECTOR']}>
                      <GrnView />
                    </ProtectedRoute>
                  } />
                  <Route path="/allgrns" element={
                    <ProtectedRoute allowedRoles={['FINANCE', 'QUALITYMANAGER', 'WEIGHTBRIDGEMANAGER', 'COO', 'MANAGINGDIRECTOR']}>
                      <GrnList />
                    </ProtectedRoute>
                  } />
                  <Route path="/payments" element={
                    <ProtectedRoute allowedRoles={['FINANCE']}>
                      <Payments />
                    </ProtectedRoute>
                  } />
                  <Route path="/financial-reports" element={
                    <ProtectedRoute allowedRoles={['FINANCE']}>
                      <FinancialReports />
                    </ProtectedRoute>
                  } />

                  {/* Weight Bridge Manager and Other Routes */}
                  <Route path="/grn" element={
                    <ProtectedRoute allowedRoles={['FINANCE', 'QUALITYMANAGER', 'WEIGHTBRIDGEMANAGER']}>
                      <GRN />
                    </ProtectedRoute>
                  } />

                  {/* ManagingDirector Manager Routes  */}
                  <Route path="/grn/:id" element={
                    <ProtectedRoute allowedRoles={['FINANCE', 'QualityManager', 'ManagingDirector']}>
                      <GrnView />
                    </ProtectedRoute>
                  } />
                  <Route path="/allgrns" element={
                    <ProtectedRoute allowedRoles={['FINANCE', 'QualityManager', 'ManagingDirector']}>
                      <GrnList />
                    </ProtectedRoute>
                  } />

                  {/* Logistics Routes */}
                  <Route path="/new-shipment" element={
                    <ProtectedRoute allowedRoles={['LOGISTICS']}>
                      <ShipmentForm />
                    </ProtectedRoute>
                  } />
                  <Route path="/update-shipment" element={
                    <ProtectedRoute allowedRoles={['LOGISTICS']}>
                      <ShipmentUpdate />
                    </ProtectedRoute>
                  } />
                  <Route path="/loading-tally-sheet" element={
                    <ProtectedRoute allowedRoles={['LOGISTICS']}>
                      <LoadingTallySheet />
                    </ProtectedRoute>
                  } />
                  <Route path="/shipments/:id" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}>
                      <ShipmentInfo />
                    </ProtectedRoute>
                  } />

                  {/* Administration Route */}
                  <Route path="/cars" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'EMPLOYEE']}>
                      <Cars />
                    </ProtectedRoute>
                  } />
                  <Route path="/drivers" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'EMPLOYEE']}>
                      <Drivers />
                    </ProtectedRoute>
                  } />
                  <Route path="/trips" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION']}>
                      <Trips />
                    </ProtectedRoute>
                  } />
                  <Route path="/trip/create" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'RECEPTIONIST']}>
                      <CreateTrip />
                    </ProtectedRoute>
                  } />

                  <Route path="/trips/employee-requests" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'EMPLOYEE']}>
                      <MyTrips />
                    </ProtectedRoute>
                  } />
                  <Route path="/trips/employee" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'EMPLOYEE']}>
                      <EmployeeTrips />
                    </ProtectedRoute>
                  } />
                  <Route path="/trips/employee/create" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'EMPLOYEE']}>
                      <TripForm />
                    </ProtectedRoute>
                  } />
                  <Route path="/ongoing/trips" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ADMINISTRATION', 'RECEPTIONIST']}>
                      <FinishTripPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/employees" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'HR', 'RECEPTIONIST']}>
                      <EmployeeManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/departments" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'HR', 'RECEPTIONIST']}>
                      <DepartmentManagement />
                    </ProtectedRoute>
                  } />

                  <Route path="/approved-trips" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'SECURITY_GATE']}>
                      <ApprovedTrips />
                    </ProtectedRoute>
                  } />

                  {/* Catch-all route should be last */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;