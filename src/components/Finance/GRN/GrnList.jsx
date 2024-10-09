import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import API_URL from '../../../constants/Constants';


const GrnList = () => {
  const [grns, setGrns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

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
        <Button mt={4} onClick={fetchGrns}>Try Again</Button>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <HStack justify="space-between" mb={5}>
        <Heading size="lg">Goods Received Notes</Heading>
        <Button colorScheme="teal" onClick={fetchGrns}>Refresh</Button>
      </HStack>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>List of Goods Received Notes</TableCaption>
          <Thead>
            <Tr>
              <Th>GRN No</Th>
              <Th>Date</Th>
              <Th>Supplier</Th>
              <Th>Coffee Type</Th>
              <Th>Quantity (Bags)</Th>
              <Th>Total Weight (kg)</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {grns.map((grn) => (
              <Tr key={grn.id}>
                <Td>{grn.id}</Td>
                <Td>{format(new Date(grn.receivedDate), 'dd/MM/yyyy')}</Td>
                <Td>{grn.supplierName}</Td>
                <Td>{grn.productDescription}</Td>
                <Td isNumeric>{grn.quantity}</Td>
                <Td isNumeric>{grn.totalWeight}</Td>
                {/* <Td isNumeric>{grn?.totalWeight?.toFixed(2)}</Td> */}
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
                    variant="link"
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
    </Box>
  );
};

export default GrnList;