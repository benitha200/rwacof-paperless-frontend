// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
//   Heading,
//   Text,
//   Button,
//   useToast,
//   Spinner,
//   HStack,
//   VStack,
//   Input,
//   Select,
//   Flex,
//   IconButton,
//   Card,
// } from '@chakra-ui/react';
// // import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
// import { Link as RouterLink } from 'react-router-dom';
// import axios from 'axios';
// import { format } from 'date-fns';
// import API_URL from '../../../constants/Constants';

// const GrnList = () => {
//   const [grns, setGrns] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const toast = useToast();

//   useEffect(() => {
//     fetchGrns();
//   }, []);

//   const fetchGrns = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${API_URL}/api/grn`);
//       setGrns(response.data);
//       setIsLoading(false);
//     } catch (err) {
//       setError('Failed to fetch GRNs');
//       setIsLoading(false);
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch GRNs. Please try again later.',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   const filteredGrns = useMemo(() => {
//     return grns.filter((grn) => {
//       const matchesSearch = Object.values(grn).some(
//         (value) =>
//           value &&
//           value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       const matchesStatus =
//         !statusFilter || grn.status.toLowerCase() === statusFilter.toLowerCase();
//       return matchesSearch && matchesStatus;
//     });
//   }, [grns, searchTerm, statusFilter]);

//   const paginatedGrns = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredGrns.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredGrns, currentPage, itemsPerPage]);

//   const totalPages = Math.ceil(filteredGrns.length / itemsPerPage);

//   if (isLoading) {
//     return (
//       <Box textAlign="center" py={10}>
//         <Spinner size="xl" />
//         <Text mt={4}>Loading GRNs...</Text>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box textAlign="center" py={10}>
//         <Text color="red.500">{error}</Text>
//         <Button mt={4} onClick={fetchGrns}>
//           Try Again
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Card p={5} className='card'>
//       <VStack spacing={5} align="stretch">
//         <HStack justify="space-between">
//           <Heading size="lg">Goods Received Notes</Heading>
//           <Button colorScheme="teal" onClick={fetchGrns}>
//             Refresh
//           </Button>
//         </HStack>

//         <Flex>
//           <Input
//             placeholder="Search GRNs..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             mr={2}
//           />
//           <Select
//             placeholder="Filter by Status"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             w="200px"
//           >
//             <option value="Approved">Approved</option>
//             <option value="Recieved">Recieved</option>
//             <option value="Completed">Completed</option>
//           </Select>
//         </Flex>

//         <TableContainer>
//           <Table variant="simple" colorScheme="teal">
//             <TableCaption>List of Goods Received Notes</TableCaption>
//             <Thead>
//               <Tr>
//                 <Th>GRN No</Th>
//                 <Th>Date</Th>
//                 <Th>Supplier</Th>
//                 <Th>Coffee Type</Th>
//                 <Th isNumeric>Quantity (Bags)</Th>
//                 <Th isNumeric>Total Weight (kg)</Th>
//                 <Th>Status</Th>
//                 <Th>Actions</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {paginatedGrns.map((grn) => (
//                 <Tr key={grn.id}>
//                   <Td>{grn.id}</Td>
//                   <Td>{format(new Date(grn.receivedDate), 'dd/MM/yyyy')}</Td>
//                   <Td>{grn.supplierName}</Td>
//                   <Td>{grn.coffee_type}</Td>
//                   <Td isNumeric>{grn.quantity}</Td>
//                   <Td isNumeric>{grn.totalWeight.toFixed(2)}</Td>
//                   <Td>
//                     <Text
//                       color={grn.status === 'Approved' ? 'green.500' : 'orange.500'}
//                       fontWeight="bold"
//                     >
//                       {grn.status}
//                     </Text>
//                   </Td>
//                   <Td>
//                     <Button
//                       as={RouterLink}
//                       to={`/grn/${grn.id}`}
//                       variant="outline"
//                       size="sm"
//                       colorScheme="teal"
//                     >
//                       View
//                     </Button>
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </TableContainer>

//         <Flex justify="space-between" align="center">
//           <Text>
//             Showing {paginatedGrns.length} of {filteredGrns.length} results
//           </Text>
//           <HStack>
//             <IconButton
//               // icon={<ChevronLeftIcon />}
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               isDisabled={currentPage === 1}
//               aria-label="Previous page"
//             />
//             <Text>
//               Page {currentPage} of {totalPages}
//             </Text>
//             <IconButton
//               // icon={<ChevronRightIcon />}
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               isDisabled={currentPage === totalPages}
//               aria-label="Next page"
//             />
//           </HStack>
//         </Flex>
//       </VStack>
//     </Card>
//   );
// };

// export default GrnList;

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Text,
  Button,
  useToast,
  Spinner,
  HStack,
  VStack,
  Input,
  Select,
  Flex,
  IconButton,
  Card,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import API_URL from '../../../constants/Constants';

const GrnList = () => {
  const [grns, setGrns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const toast = useToast();
  const userRole = localStorage.getItem('userRole')?.toUpperCase();

  useEffect(() => {
    fetchGrns();
  }, []);

  const fetchGrns = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/grn`);
      setGrns(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch GRNs');
      setIsLoading(false);
      toast({
        title: 'Error',
        description: 'Failed to fetch GRNs. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const filteredGrns = useMemo(() => {
    return grns.filter((grn) => {
      // Role-based filtering
      if (userRole === 'COO' && grn.currentStep !== 1) return false;
      if (userRole === 'MANAGINGDIRECTOR' && grn.currentStep !== 2) return false;

      // Search term filtering
      const matchesSearch = Object.values(grn).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Status filtering
      const matchesStatus = !statusFilter || grn.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [grns, searchTerm, statusFilter, userRole]);

  const paginatedGrns = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredGrns.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredGrns, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredGrns.length / itemsPerPage);

  // Get unique statuses from GRNs for the status filter
  const availableStatuses = useMemo(() => {
    return [...new Set(grns.map(grn => grn.status))];
  }, [grns]);

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading GRNs...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">{error}</Text>
        <Button mt={4} onClick={fetchGrns}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Card p={5} className='card'>
      <VStack spacing={5} align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Goods Received Notes</Heading>
          <Button colorScheme="teal" onClick={fetchGrns}>
            Refresh
          </Button>
        </HStack>

        <Flex>
          <Input
            placeholder="Search GRNs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mr={2}
          />
          <Select
            placeholder="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            w="200px"
          >
            {availableStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Select>
        </Flex>

        <TableContainer>
          <Table variant="simple" colorScheme="teal">
            <TableCaption>
              {userRole === 'COO' && 'Showing GRNs Ready for COO Review'}
              {userRole === 'MANAGINGDIRECTOR' && 'Showing GRNs Ready for Managing Director Review'}
              {!['COO', 'MANAGINGDIRECTOR'].includes(userRole) && 'List of All Goods Received Notes'}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>GRN No</Th>
                <Th>Date</Th>
                <Th>Supplier</Th>
                <Th>Coffee Type</Th>
                <Th isNumeric>Quantity (Bags)</Th>
                <Th isNumeric>Total Weight (kg)</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedGrns.map((grn) => (
                <Tr key={grn.id}>
                  <Td>{grn.id}</Td>
                  <Td>{format(new Date(grn.receivedDate), 'dd/MM/yyyy')}</Td>
                  <Td>{grn.supplierName}</Td>
                  <Td>{grn.coffee_type}</Td>
                  <Td isNumeric>{grn.quantity}</Td>
                  <Td isNumeric>{grn.totalWeight.toFixed(2)}</Td>
                  <Td>
                    <Text
                      color={grn.status === 'Approved' ? 'green.500' : 'orange.500'}
                      fontWeight="bold"
                    >
                      {grn.status}
                    </Text>
                  </Td>
                  <Td>
                    <Button
                      as={RouterLink}
                      to={`/grn/${grn.id}`}
                      variant="outline"
                      size="sm"
                      colorScheme="teal"
                    >
                      View
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Flex justify="space-between" align="center">
          <Text>
            Showing {paginatedGrns.length} of {filteredGrns.length} results
          </Text>
          <HStack>
            <IconButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={currentPage === 1}
              aria-label="Previous page"
            />
            <Text>
              Page {currentPage} of {totalPages}
            </Text>
            <IconButton
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              isDisabled={currentPage === totalPages}
              aria-label="Next page"
            />
          </HStack>
        </Flex>
      </VStack>
    </Card>
  );
};

export default GrnList;