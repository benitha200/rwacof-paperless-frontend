// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Heading,
//   Text,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Button,
//   Input,
//   Select,
//   Flex,
//   Card,
//   CardHeader,
//   CardBody,
//   Stack,
// } from '@chakra-ui/react';
// import API_URL from '../../constants/Constants';
// import { Edit, Eye } from 'lucide-react';

// function ShipmentList() {
//   const [shipments, setShipments] = useState([]);
//   const [filteredShipments, setFilteredShipments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`${API_URL}/api/shipments`)
//       .then(response => {
//         setShipments(response.data);
//         setFilteredShipments(response.data);
//       })
//       .catch(error => console.error('Error fetching shipments:', error));
//   }, []);

//   useEffect(() => {
//     const results = shipments.filter(shipment =>
//       (shipment.containerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//        shipment.consignee.toLowerCase().includes(searchTerm.toLowerCase())) &&
//       (statusFilter === 'all' || shipment.status === statusFilter)
//     );
//     setFilteredShipments(results);
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, shipments]);

//   const handleView = (shipment) => {
//     console.log("View button clicked for shipment:", shipment.id);
    
//     // If lotNo is null, navigate to update-shipment with shipment data
//     if (shipment.lotNo === null || shipment.lotNo === '') {
//       navigate('/update-shipment', { 
//         state: { 
//           ...shipment,
//           // Ensure date is converted to Date object if it's a string
//           date: shipment.date ? new Date(shipment.date) : null 
//         } 
//       });
//     } else {
//       // Otherwise, navigate to shipment details
//       navigate(`/shipments/${shipment.id}`);
//     }
//   };

//   const handleEdit = (id) => {
//     console.log("Edit button clicked for shipment:", id);
//     // You can implement edit functionality here
//   };

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredShipments.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <Card>
//       <CardHeader>
//         <Heading size="lg">Shipments</Heading>
//         <Text>A list of all shipments</Text>
//       </CardHeader>
//       <CardBody>
//         <Flex mb={4} gap={2}>
//           <Input
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             maxWidth="sm"
//           />
//           <Select
//             onChange={(e) => setStatusFilter(e.target.value)}
//             value={statusFilter}
//             width="180px"
//           >
//             <option value="all">All Statuses</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//             <option value="Pending">Pending</option>
//           </Select>
//         </Flex>
//         <Table variant="simple" className='text-md p-0' size='sm'>
//           <Thead>
//             <Tr>
//               <Th>Container No</Th>
//               <Th>Description</Th>
//               <Th>Quantity</Th>
//               <Th>Net Weight</Th>
//               <Th>Amount</Th>
//               <Th>Consignee</Th>
//               <Th>Date</Th>
//               <Th>Actions</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {currentItems.map(shipment => (
//               <Tr key={shipment.id}>
//                 <Td>{shipment.containerNo}</Td>
//                 <Td>{shipment.description}</Td>
//                 <Td>{shipment.quantity}</Td>
//                 <Td>{shipment.netWeight}</Td>
//                 <Td>{shipment.amount}</Td>
//                 <Td>{shipment.consignee}</Td>
//                 <Td>{new Date(shipment.date).toLocaleDateString()}</Td>
//                 <Td gap={2} className='flex p-1'>
//                   <Button colorScheme="green" className='w-1/4' onClick={() => handleView(shipment)}><Eye/></Button>
//                   <Button colorScheme="teal" className='w-1/4' onClick={() => handleEdit(shipment.id)}><Edit/></Button>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//         <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
//           <Button
//             onClick={() => paginate(currentPage - 1)}
//             isDisabled={currentPage === 1}
//           >
//             Previous
//           </Button>
//           {[...Array(Math.ceil(filteredShipments.length / itemsPerPage)).keys()].map((number) => (
//             <Button
//               key={number + 1}
//               onClick={() => paginate(number + 1)}
//               colorScheme={currentPage === number + 1 ? "teal" : "gray"}
//             >
//               {number + 1}
//             </Button>
//           ))}
//           <Button
//             onClick={() => paginate(currentPage + 1)}
//             isDisabled={currentPage === Math.ceil(filteredShipments.length / itemsPerPage)}
//           >
//             Next
//           </Button>
//         </Stack>
//       </CardBody>
//     </Card>
//   );
// }

// export default ShipmentList;

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
import { Download } from 'lucide-react';
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

  const handleView = (shipment) => {
    console.log("View button clicked for shipment:", shipment.id);
    
    // If lotNo is null, navigate to update-shipment with shipment data
    if (shipment.lotNo === null || shipment.lotNo === '') {
      navigate('/update-shipment', { 
        state: { 
          ...shipment,
          // Ensure date is converted to Date object if it's a string
          date: shipment.date ? new Date(shipment.date) : null 
        } 
      });
    } else {
      // Otherwise, navigate to shipment details
      navigate(`/shipments/${shipment.id}`);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit button clicked for shipment:", id);
    // You can implement edit functionality here
  };

  // CSV Download functionality
  const downloadCSV = () => {
    // Convert date for each shipment to a readable format
    const csvData = filteredShipments.map(shipment => ({
      ...shipment,
      date: new Date(shipment.date).toLocaleDateString()
    }));

    // Define CSV headers
    const headers = [
      'Container No', 
      'Description', 
      'Quantity', 
      'Net Weight', 
      'Amount', 
      'Consignee', 
      'Date', 
      'Status'
    ];

    // Convert data to CSV
    const csvContent = [
      headers.join(','),
      ...csvData.map(shipment => [
        shipment.id,
        shipment.containerNo,
        `"${shipment.description}"`, // Wrap in quotes to handle commas
        shipment.quantity,
        shipment.netWeight,
        shipment.amount,
        shipment.consignee,
        shipment.date,
        shipment.status
      ].join(','))
    ].join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `shipments_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <Flex mb={4} gap={2} justifyContent="space-between" alignItems="center">
          <Flex gap={2}>
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxWidth="sm"
            />
            <Select
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
              width="250px"
            >
              <option value="all">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </Select>
          </Flex>
          <Button 
            colorScheme="blue" 
            onClick={downloadCSV}
            leftIcon={<Download />}
          >
            Download CSV
          </Button>
        </Flex>
        <Table variant="simple" className='text-md p-0' size='sm'>
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
                <Td gap={2} className='flex p-1'>
                  <Button colorScheme="green" className='w-1/4' onClick={() => handleView(shipment)}><Eye/></Button>
                  <Button colorScheme="teal" className='w-1/4' onClick={() => handleEdit(shipment.id)}><Edit/></Button>
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