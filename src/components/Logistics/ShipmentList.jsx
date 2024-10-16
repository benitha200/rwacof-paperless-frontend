import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Select,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Stack,
} from '@chakra-ui/react';
import API_URL from '../../constants/Constants';
import { Edit, Eye } from 'lucide-react';

function ShipmentList() {
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/shipments`)
      .then(response => {
        setShipments(response.data);
        setFilteredShipments(response.data);
      })
      .catch(error => console.error('Error fetching shipments:', error));
  }, []);

  useEffect(() => {
    const results = shipments.filter(shipment =>
      (shipment.containerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
       shipment.consignee.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || shipment.status === statusFilter)
    );
    setFilteredShipments(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, shipments]);

  const handleView = (id) => {
    console.log("View button clicked for shipment:", id);
    navigate(`/shipments/${id}`);
  };
  const handleEdit = (id) => {
    console.log("View button clicked for shipment:", id);
    // navigate(`/shipments/${id}`);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredShipments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card>
      <CardHeader>
        <Heading size="lg">Shipments</Heading>
        <Text>A list of all shipments</Text>
      </CardHeader>
      <CardBody>
        <Flex mb={4} gap={2}>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            maxWidth="sm"
          />
          <Select
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
            width="180px"
          >
            <option value="all">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </Select>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Container No</Th>
              <Th>Description</Th>
              <Th>Quantity</Th>
              <Th>Net Weight</Th>
              <Th>Amount</Th>
              <Th>Consignee</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map(shipment => (
              <Tr key={shipment.id}>
                <Td>{shipment.containerNo}</Td>
                <Td>{shipment.description}</Td>
                <Td>{shipment.quantity}</Td>
                <Td>{shipment.netWeight}</Td>
                <Td>{shipment.amount}</Td>
                <Td>{shipment.consignee}</Td>
                <Td>{new Date(shipment.date).toLocaleDateString()}</Td>
                <Td gap={2} className='flex p-2'>
                  <Button colorScheme="green" onClick={() => handleView(shipment.id)}><Eye/></Button>
                  <Button colorScheme="teal" onClick={() => handleEdit(shipment.id)}><Edit/></Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <Button
            onClick={() => paginate(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(Math.ceil(filteredShipments.length / itemsPerPage)).keys()].map((number) => (
            <Button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              colorScheme={currentPage === number + 1 ? "teal" : "gray"}
            >
              {number + 1}
            </Button>
          ))}
          <Button
            onClick={() => paginate(currentPage + 1)}
            isDisabled={currentPage === Math.ceil(filteredShipments.length / itemsPerPage)}
          >
            Next
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ShipmentList;