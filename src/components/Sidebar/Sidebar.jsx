import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Package, FileText, DollarSign, Users, Settings, File, LogOut } from 'lucide-react';
import {
  Box, VStack, Flex, Text, Icon, Divider, Tooltip, Avatar,
  useColorModeValue
} from "@chakra-ui/react";

const Sidebar = ({ userRole }) => {
  const location = useLocation();
  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("teal.50", "teal.900");
  const activeBg = useColorModeValue("teal.100", "teal.800");
  const borderColor = useColorModeValue("teal.500", "teal.200");
  
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
      { to: "/employees", icon: Users, text: "Employee" },
      { to: "/departments", icon: Package, text: "Department" },
    ],
    // Add other roles as needed
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const NavItem = ({ to, icon, text }) => (
    <Tooltip label={text} placement="right" hasArrow>
      <Link to={to} style={{ width: '100%' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive(to) ? activeBg : "transparent"}
          color={isActive(to) ? "teal.600" : "gray.600"}
          borderLeft={isActive(to) ? `4px solid ${borderColor}` : "4px solid transparent"}
          _hover={{
            bg: hoverBg,
            color: "teal.600",
          }}
          transition="all 0.3s"
        >
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
            color={isActive(to) ? "teal.600" : "gray.500"}
            _groupHover={{
              color: "teal.600",
            }}
          />
          <Text fontWeight={isActive(to) ? "bold" : "medium"}>{text}</Text>
        </Flex>
      </Link>
    </Tooltip>
  );

  const firstName = localStorage.getItem('firstName') || '';
  const lastName = localStorage.getItem('lastName') || '';

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      bg={bgColor}
      w="64"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      boxShadow="md"
      display={{ base: "none", md: "block" }}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between" px="8">
        <Text fontSize="2xl" fontWeight="bold" color="teal.600">RWACOF</Text>
      </Flex>
      
      <Box px="4" py="6">
        <VStack align="center" mb="8" spacing="4">
          <Avatar 
            size="lg" 
            name={`${firstName} ${lastName}`} 
            bg="teal.500"
            src="" // Add a profile image path if available
          />
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="md">{`${firstName} ${lastName}`}</Text>
            <Text fontSize="sm" color="gray.500">{userRole}</Text>
          </Box>
        </VStack>
        
        <Divider mb="6" />
        
        <VStack align="stretch" spacing="1">
          {menuItems[userRole]?.map((item, index) => (
            <NavItem key={index} to={item.to} icon={item.icon} text={item.text} />
          ))}
        </VStack>
        
        <Divider my="6" />
        
        <VStack align="stretch" spacing="1">
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('userRole');
              localStorage.removeItem('firstName');
              localStorage.removeItem('lastName');
              localStorage.removeItem('email');
              localStorage.removeItem('userId');
              window.location.href = '/login';
            }}
            _hover={{
              bg: hoverBg,
              color: "red.600",
            }}
            transition="all 0.3s"
          >
            <Icon
              mr="4"
              fontSize="16"
              as={LogOut}
              color="gray.500"
              _groupHover={{
                color: "red.600",
              }}
            />
            <Text fontWeight="medium">Logout</Text>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default Sidebar;