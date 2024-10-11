import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Home, Package, TrendingUp, Plus, Eye, LogOut, FileText, DollarSign, Users, Truck, Settings } from 'lucide-react';
import {
  Box, VStack, HStack, Heading, Text, Button, Image, Icon,
  useColorModeValue, Grid, GridItem, Stat, StatLabel, StatNumber, StatHelpText,
  SimpleGrid, Card, CardHeader, CardBody, CardFooter, ChakraProvider, Flex, Container, Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
import ShipmentList from './components/Logistics/ShipmentList';
import ShipmentForm from './components/Logistics/ShipmentForm';
import ContainerList from './components/Logistics/ContainerList';
import ContainerForm from './components/Logistics/ContainerForm';
import ShipmentInfo from './components/Logistics/Shipment/ShipmentInfo';
import logo from './../assets/img/logo.png';
import logistics from './../assets/img/Logistics-rafiki.png';
import financeimg from './../assets/img/Finance-app-cuate.png';
import Login from './components/Auth/Login';
import GRN from './components/Finance/GRN/GRN'
import Payments from './components/Finance/Payments'
import FinancialReports from './components/Finance/FinancialReports'
import UserManagment from './components/Admin/UserManagment';
import SystemSettings from './components/Admin/SystemSettings';
import GrnList from './components/Finance/GRN/GrnList';
import GrnView from './components/Finance/GRN/GrnView';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const bgColor = useColorModeValue("white", "gray.300");
  const cardBgColor = useColorModeValue("white", "teal.400");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole');
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
      <Button variant="ghost" leftIcon={<Icon as={icon} />} fontWeight="medium">
        {text}
      </Button>
    </Link>
  );

  const RoleBasedMenu = () => {
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
        { to: "/grn", icon: FileText, text: "GRN" },
        { to: "/payments", icon: DollarSign, text: "Payments" },
        { to: "/financial-reports", icon: FileText, text: "Financial Reports" },
      ],
      QualityManager:[
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/grn", icon: FileText, text: "GRN" },
        { to: "/allgrns", icon: FileText, text: "ALL GRNS" },
      ],
      LOGISTICS: [
        { to: "/", icon: Home, text: "Dashboard" },
        { to: "/shipments", icon: Package, text: "Shipments" },
        { to: "/new-shipment", icon: Plus, text: "New Shipment" },
        { to: "/tracking", icon: Eye, text: "Shipment Tracking" },
      ],
    };

    return (
      <Menu>
        <MenuButton as={Button} rightIcon={<Icon as={Package} />}>
          Menu
        </MenuButton>
        <MenuList>
          {menuItems[userRole]?.map((item, index) => (
            <MenuItem key={index} as={Link} to={item.to} icon={<Icon as={item.icon} />}>
              {item.text}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  };

  const WelcomeFinance = () => {
    const navigate = useNavigate();
    const cardBg = useColorModeValue("white", "gray.700");
    const statCardBg = useColorModeValue("teal.50", "teal.900");

    return (
      <VStack spacing={8} align="stretch" w="full">
        <Heading as="h1" size="2xl" textAlign="center">Finance Dashboard</Heading>
        <Text fontSize="xl" textAlign="center" color="gray.500">Manage All Financial Documents Here</Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Stat bg={statCardBg} p={4} borderRadius="lg" boxShadow="md">
            <StatLabel>Total GRNs</StatLabel>
            <StatNumber>145</StatNumber>
            <StatHelpText>↑ 23% from last month</StatHelpText>
          </Stat>
          <Stat bg={statCardBg} p={4} borderRadius="lg" boxShadow="md">
            <StatLabel>Pending Payments</StatLabel>
            <StatNumber>$1.2M</StatNumber>
            <StatHelpText>↓ 5% from last month</StatHelpText>
          </Stat>
          <Stat bg={statCardBg} p={4} borderRadius="lg" boxShadow="md">
            <StatLabel>Total Payments</StatLabel>
            <StatNumber>$4.7M</StatNumber>
            <StatHelpText>Based on current metrics</StatHelpText>
          </Stat>
        </SimpleGrid>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          <GridItem>
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">Recent GRNs</Heading>
              </CardHeader>
              <CardBody>
                <Text>View and manage the latest Goods Received Notes.</Text>
              </CardBody>
              <CardFooter>
                <HStack spacing={4} width="100%" justifyContent="center">
                  <Button leftIcon={<Icon as={Plus} />} colorScheme="teal" onClick={() => navigate('/grn')}>
                    Add GRN
                  </Button>
                  <Button leftIcon={<Icon as={Eye} />} colorScheme="blue" onClick={() => navigate('/allgrns')}>
                    View GRNs
                  </Button>
                </HStack>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem>
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">Financial Reports</Heading>
              </CardHeader>
              <CardBody>
                <Text>Access and generate comprehensive financial reports.</Text>
              </CardBody>
              <CardFooter>
                <Button leftIcon={<Icon as={FileText} />} colorScheme="blue" onClick={() => navigate('/financial-reports')}>
                  Generate Reports
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </VStack>
    );
  };

  const WelcomeLogistics = () => {
    const navigate = useNavigate();
    const cardBg = useColorModeValue("white", "gray.700");
    const statCardBg = useColorModeValue("blue.50", "blue.900");

    return (
      <VStack spacing={8} align="stretch" w="full">
        <Heading as="h1" size="2xl" textAlign="center">Logistics Dashboard</Heading>
        <Text fontSize="xl" textAlign="center" color="gray.500">Manage your shipments efficiently</Text>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          <GridItem>
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">Create New Shipment</Heading>
              </CardHeader>
              <CardBody>
                <Text>Initiate a new shipment and streamline the export process.</Text>
              </CardBody>
              <CardFooter>
                <Button leftIcon={<Icon as={Plus} />} colorScheme="green" onClick={() => navigate('/new-shipment')}>
                  New Shipment
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem>
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">Track Shipments</Heading>
              </CardHeader>
              <CardBody>
                <Text>Monitor and manage all active shipments in real-time.</Text>
              </CardBody>
              <CardFooter>
                <Button leftIcon={<Icon as={Truck} />} colorScheme="blue" onClick={() => navigate('/tracking')}>
                  Track Shipments
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </VStack>
    );
  };

  const WelcomeAdmin = () => {
    const navigate = useNavigate();
    const cardBg = useColorModeValue("white", "gray.700");
    const statCardBg = useColorModeValue("purple.50", "purple.900");

    return (
      <VStack spacing={8} align="stretch" w="full">
        <Heading as="h1" size="2xl" textAlign="center">Admin Dashboard</Heading>
        <Text fontSize="xl" textAlign="center" color="gray.500">Manage all aspects of the export system</Text>

        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
          <Stat bg={statCardBg} p={4} borderRadius="lg" boxShadow="md">
            <StatLabel>Total Users</StatLabel>
            <StatNumber>1,234</StatNumber>
            <StatHelpText>↑ 5% from last month</StatHelpText>
          </Stat>
          <Stat bg={statCardBg} p={4} borderRadius="lg" boxShadow="md">
            <StatLabel>Active Shipments</StatLabel>
            <StatNumber>87</StatNumber>
            <StatHelpText>↑ 15% from last week</StatHelpText>
          </Stat>
          <Stat bg={statCardBg} p={4} borderRadius="lg" boxShadow="md">
            <StatLabel>Total Revenue</StatLabel>
            <StatNumber>$5.4M</StatNumber>
            <StatHelpText>↑ 8% from last month</StatHelpText>
          </Stat>
          <Stat bg={statCardBg} p={4} borderRadius="lg" boxShadow="md">
            <StatLabel>System Uptime</StatLabel>
            <StatNumber>99.9%</StatNumber>
            <StatHelpText>Last 30 days</StatHelpText>
          </Stat>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Card bg={cardBg}>
            <CardHeader>
              <Heading size="md">Manage Users</Heading>
            </CardHeader>
            <CardBody>
              <Text>Add, remove, or modify user accounts and permissions.</Text>
            </CardBody>
            <CardFooter>
              <Button leftIcon={<Icon as={Users} />} colorScheme="purple" onClick={() => navigate('/users')}>
                User Management
              </Button>
            </CardFooter>
          </Card>
          <Card bg={cardBg}>
            <CardHeader>
              <Heading size="md">System Settings</Heading>
            </CardHeader>
            <CardBody>
              <Text>Configure and optimize system parameters for peak performance.</Text>
            </CardBody>
            <CardFooter>
              <Button leftIcon={<Icon as={Settings} />} colorScheme="gray" onClick={() => navigate('/settings')}>
                System Settings
              </Button>
            </CardFooter>
          </Card>
          <Card bg={cardBg}>
            <CardHeader>
              <Heading size="md">Financial Overview</Heading>
            </CardHeader>
            <CardBody>
              <Text>Review comprehensive financial reports and analytics.</Text>
            </CardBody>
            <CardFooter>
              <Button leftIcon={<Icon as={DollarSign} />} colorScheme="green" onClick={() => navigate('/financial-reports')}>
                Financial Reports
              </Button>
            </CardFooter>
          </Card>
          <Card bg={cardBg}>
            <CardHeader>
              <Heading size="md">Logistics Overview</Heading>
            </CardHeader>
            <CardBody>
              <Text>Monitor and manage all shipments and logistics operations.</Text>
            </CardBody>
            <CardFooter>
              <Button leftIcon={<Icon as={TrendingUp} />} colorScheme="blue" onClick={() => navigate('/shipments')}>
                Logistics Dashboard
              </Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </VStack>
    );
  };

  const Welcome = () => {
    switch (userRole) {
      case 'FINANCE':
        return <WelcomeFinance />;
      case 'LOGISTICS':
        return <WelcomeLogistics />;
      case 'ADMIN':
        return <WelcomeAdmin />;
      default:
        return (
          <VStack spacing={8} align="center" w="full" h="80vh" justify="center">
            <Heading as="h1" size="2xl" textAlign="center">Welcome to RWACOF Export Management</Heading>
            <Text fontSize="xl" textAlign="center" color="gray.500">Please log in to access your dashboard.</Text>
            <Button size="lg" colorScheme="teal" onClick={() => navigate('/login')}>
              Log In
            </Button>
          </VStack>
        );
    }
  };


  const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole');

    if (!token || !storedUserRole) {
      return <Navigate to="/login" />;
    }
    if (allowedRoles && !allowedRoles.includes(storedUserRole)) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <ChakraProvider>
      <Router>
        <Box minHeight="100vh" bg={bgColor}>
          <Flex
            as="nav"
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
            <HStack spacing={4}>
              {isAuthenticated ? (
                <>
                  <RoleBasedMenu />
                  <Button onClick={handleLogout} leftIcon={<Icon as={LogOut} />} variant="ghost">
                    Logout
                  </Button>
                </>
              ) : (
                <NavItem to="/login" icon={LogOut} text="Login" />
              )}
            </HStack>
          </Flex>

          <Container maxW="container.xl" py={8}>
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
              <Route path="/grn" element={
                <ProtectedRoute allowedRoles={['FINANCE','QualityManager']}>
                  <GRN />
                </ProtectedRoute>
              } />
              <Route path="/grn/:id" element={
                <ProtectedRoute allowedRoles={['FINANCE','QualityManager']}>
                  <GrnView />
                </ProtectedRoute>
              } />
              <Route path="/allgrns" element={
                <ProtectedRoute allowedRoles={['FINANCE','QualityManager']}>
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

              {/* Logistics Routes */}
              <Route path="/new-shipment" element={
                <ProtectedRoute allowedRoles={['LOGISTICS']}>
                  <ShipmentForm />
                </ProtectedRoute>
              } />
              <Route path="/tracking" element={
                <ProtectedRoute allowedRoles={['LOGISTICS']}>
                  <ShipmentList />
                </ProtectedRoute>
              } />
              <Route path="/shipments/:id" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'LOGISTICS']}>
                  <ShipmentInfo />
                </ProtectedRoute>
              } />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;