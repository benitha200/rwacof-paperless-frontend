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
// import { Download } from 'lucide-react';
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

//   // CSV Download functionality
//   const downloadCSV = () => {
//     // Convert date for each shipment to a readable format
//     const csvData = filteredShipments.map(shipment => ({
//       ...shipment,
//       date: new Date(shipment.date).toLocaleDateString()
//     }));

//     // Define CSV headers
//     const headers = [
//       'Container No', 
//       'Description', 
//       'Quantity', 
//       'Net Weight', 
//       'Amount', 
//       'Consignee', 
//       'Date', 
//       'Status'
//     ];

//     // Convert data to CSV
//     const csvContent = [
//       headers.join(','),
//       ...csvData.map(shipment => [
//         shipment.id,
//         shipment.containerNo,
//         `"${shipment.description}"`, // Wrap in quotes to handle commas
//         shipment.quantity,
//         shipment.netWeight,
//         shipment.amount,
//         shipment.consignee,
//         shipment.date,
//         shipment.status
//       ].join(','))
//     ].join('\n');

//     // Create and download CSV file
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', `shipments_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
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
//         <Flex mb={4} gap={2} justifyContent="space-between" alignItems="center">
//           <Flex gap={2}>
//             <Input
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               maxWidth="sm"
//             />
//             <Select
//               onChange={(e) => setStatusFilter(e.target.value)}
//               value={statusFilter}
//               width="250px"
//             >
//               <option value="all">All Statuses</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//               <option value="Pending">Pending</option>
//             </Select>
//           </Flex>
//           <Button 
//             colorScheme="blue" 
//             onClick={downloadCSV}
//             leftIcon={<Download />}
//           >
//             Download CSV
//           </Button>
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
import { useNavigate } from 'react-router-dom';
import { Download, Edit, Eye } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import API_URL from '../../constants/Constants';

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/shipments`)
      .then(response => response.json())
      .then(data => {
        setShipments(data);
        setFilteredShipments(data);
      })
      .catch(error => console.error('Error:', error));
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
    if (!shipment.lotNo) {
      navigate('/update-shipment', {
        state: {
          ...shipment,
          date: shipment.date ? new Date(shipment.date) : null
        }
      });
    } else {
      navigate(`/shipments/${shipment.id}`);
    }
  };

  const handleEdit = (shipment) => {
    navigate('/update-shipment', {
      state: {
        ...shipment,
        date: shipment.date ? new Date(shipment.date) : null
      }
    });
  };

  const downloadCSV = () => {
    const csvData = filteredShipments.map(shipment => ({
      ...shipment,
      date: new Date(shipment.date).toLocaleDateString()
    }));

    const headers = [
      'Container No', 'Description', 'Quantity', 'Net Weight',
      'Amount', 'Consignee', 'Date', 'Status'
    ];

    const csvContent = [
      headers.join(','),
      ...csvData.map(shipment => [
        shipment.id,
        shipment.containerNo,
        `"${shipment.description}"`,
        shipment.quantity,
        shipment.netWeight,
        shipment.amount,
        shipment.consignee,
        shipment.date,
        shipment.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shipments_${new Date().toLocaleDateString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredShipments.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredShipments.length / itemsPerPage);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Shipments</CardTitle>
        <CardDescription className="text-sm text-gray-700">
          A list of all shipments and their details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6 gap-4">
          <div className="flex gap-4 flex-1">
            <Input
              placeholder="Search shipments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs text-sm"
            />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px] text-sm bg-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem
                  value="all"
                  className="text-sm data-[state=checked]:bg-blue-50 data-[state=checked]:text-teal-600 p-2  transition-colors"
                >
                  All Statuses
                </SelectItem>
                <SelectItem
                  value="In Progress"
                  className="text-sm data-[state=checked]:bg-blue-50 data-[state=checked]:text-teal-600 p-2 transition-colors"
                >
                  In Progress
                </SelectItem>
                <SelectItem
                  value="Completed"
                  className="text-sm data-[state=checked]:bg-blue-50 data-[state=checked]:text-teal-600 p-2  transition-colors"
                >
                  Completed
                </SelectItem>
                <SelectItem
                  value="Pending"
                  className="text-sm data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600  p-2 transition-colors"
                >
                  Pending
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            onClick={downloadCSV}
            className="text-sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium text-gray-700">Container No</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Description</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Quantity</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Net Weight</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Amount</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Consignee</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Date</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="text-sm text-gray-700">{shipment.containerNo}</TableCell>
                  <TableCell className="text-sm text-gray-700">{shipment.description}</TableCell>
                  <TableCell className="text-sm text-gray-700">{shipment.quantity}</TableCell>
                  <TableCell className="text-sm text-gray-700">{shipment.netWeight}</TableCell>
                  <TableCell className="text-sm text-gray-700">{shipment.amount}</TableCell>
                  <TableCell className="text-sm text-gray-700">{shipment.consignee}</TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {new Date(shipment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(shipment)}
                      className="h-8 w-8"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(shipment)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-sm"
          >
            Previous
          </Button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="text-sm"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className="text-sm"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentList;