// import React, { useState, useEffect } from "react";


// import axios from "axios";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableContainer,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Select,
//   useDisclosure,
//   useToast,
//   FormControl,
//   FormLabel,
//   Input,
//   Box,
//   Text,
//   Flex,
//   Stack,
//   Heading,
//   useBreakpointValue,
//   HStack,
//   VStack,
//   Icon,
//   SimpleGrid,
//   ButtonGroup,
//   Center,
// } from "@chakra-ui/react";
// import API_URL from "../../constants/Constants";
// import { Calendar, CarIcon, Clock, FileText, Navigation, User, ChevronLeft, ChevronRight } from "lucide-react";
// import { Badge } from '@/components/ui/badge';
// import AssignmentModal from "./AssignmentModal";

// // Create an axios instance with default configuration
// const api = axios.create({
//   baseURL: `${API_URL}/api`,
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem('token')}` // Store token in localStorage
//   }
// });

// const Trips = () => {
//   const [trips, setTrips] = useState([]);
//   const [allTrips, setAllTrips] = useState([]);
//   const [cars, setCars] = useState([]);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     itemsPerPage: 10,
//     totalItems: 0,
//     totalPages: 1
//   });
//   const [drivers, setDrivers] = useState([]);
//   const [selectedTrip, setSelectedTrip] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const toast = useToast();
//   const [isAssigning, setIsAssigning] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Use Chakra UI's responsive utilities
//   const displayMode = useBreakpointValue({
//     base: "card",
//     sm: "card",
//     md: "card",
//     lg: "table",
//     xl: "table"
//   });

//   const columnCount = useBreakpointValue({
//     base: 1,
//     sm: 1,
//     md: 2,
//     lg: 2,
//     xl: 3
//   });

//   const itemsPerPageOptions = [5, 10, 15, 20, 25, 50];
//   const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
//   const tableSize = useBreakpointValue({ base: "sm", md: "md", lg: "md" });
//   const modalSize = useBreakpointValue({ base: "full", sm: "full", md: "md" });
//   const headingSize = useBreakpointValue({ base: "md", md: "lg" });
//   const cardPadding = useBreakpointValue({ base: 3, md: 4 });

//   // Fetch data from APIs
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         setCurrentUser(localStorage.getItem("user"));

//         // Fetch trips
//         const tripsResponse = await api.get("/trips");
//         const fetchedTrips = tripsResponse.data;
//         setAllTrips(fetchedTrips);
        
//         // Update pagination information
//         const totalItems = fetchedTrips.length;
//         const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);
        
//         setPagination(prev => ({
//           ...prev,
//           totalItems,
//           totalPages
//         }));

//         // Apply pagination to the trips
//         updateDisplayedTrips(fetchedTrips, pagination.currentPage, pagination.itemsPerPage);

//         // Fetch cars
//         const carsResponse = await api.get("/car");
//         setCars(carsResponse.data.cars);

//         // Fetch drivers
//         const driversResponse = await api.get("/driver");
//         setDrivers(driversResponse.data);
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to fetch data",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Update displayed trips when pagination changes
//   useEffect(() => {
//     updateDisplayedTrips(allTrips, pagination.currentPage, pagination.itemsPerPage);
//   }, [pagination.currentPage, pagination.itemsPerPage]);

//   // Function to update displayed trips based on pagination
//   const updateDisplayedTrips = (allTripsData, page, itemsPerPage) => {
//     if (!allTripsData || allTripsData.length === 0) return;
    
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedTrips = allTripsData.slice(startIndex, endIndex);
    
//     setTrips(paginatedTrips);
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > pagination.totalPages) return;
    
//     setPagination(prev => ({
//       ...prev,
//       currentPage: newPage
//     }));
//   };

//   // Handle items per page change
//   const handleItemsPerPageChange = (e) => {
//     const newItemsPerPage = parseInt(e.target.value);
//     const newTotalPages = Math.ceil(pagination.totalItems / newItemsPerPage);
    
//     // Adjust current page if it exceeds new total pages
//     const newCurrentPage = Math.min(pagination.currentPage, newTotalPages);
    
//     setPagination({
//       currentPage: newCurrentPage,
//       itemsPerPage: newItemsPerPage,
//       totalItems: pagination.totalItems,
//       totalPages: newTotalPages
//     });
//   };

//   const handleApprove = async (tripId) => {
//     try {
//       const response = await api.patch(
//         `/trips/${tripId}/supervisor-approve`,
//         { userId: currentUser.id }
//       );

//       // Update the trip in both trips and allTrips
//       const updatedTrip = {
//         ...allTrips.find(trip => trip.id === tripId),
//         supervisorApproval: true,
//         status: 'SUPERVISOR_APPROVED'
//       };

//       setTrips(trips.map(trip => trip.id === tripId ? updatedTrip : trip));
//       setAllTrips(allTrips.map(trip => trip.id === tripId ? updatedTrip : trip));

//       toast({
//         title: "Approved",
//         description: "Trip request approved successfully",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.error || "Failed to approve trip request",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//       console.error("Error approving trip:", error);
//     }
//   };

//   const getStatusBadgeVariant = (status) => {
//     switch (status) {
//       case 'PENDING':
//         return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
//       case 'SUPERVISOR_APPROVED':
//         return 'bg-blue-100 text-blue-800 border border-blue-200';
//       case 'ASSIGNED':
//         return 'bg-sky-100 text-sky-800 border border-sky-200';
//       case 'COMPLETED':
//         return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
//       case 'REJECTED':
//         return 'bg-red-100 text-red-800 border border-red-200';
//       case 'DEPARTED':
//         return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border border-gray-200';
//     }
//   };

//   const handleAssignment = async (formData) => {
//     setIsAssigning(true);

//     try {
//       const response = await api.patch(
//         `/trips/${selectedTrip.id}/assign`,
//         {
//           carId: formData.carId,
//           driverId: formData.driverId,
//           kmAtDeparture: formData.kmAtDeparture,
//           userId: parseInt(localStorage.getItem("userId"))
//         }
//       );

//       // Update the trip in both trips and allTrips
//       const updatedTrip = {
//         ...allTrips.find(trip => trip.id === selectedTrip.id),
//         carId: formData.carId,
//         driverId: formData.driverId,
//         kmAtDeparture: formData.kmAtDeparture,
//         car: cars.find(c => c.id === formData.carId),
//         driver: drivers.find(d => d.id === formData.driverId),
//         status: 'ASSIGNED',
//         adminApproval: true
//       };

//       setTrips(trips.map(trip => trip.id === selectedTrip.id ? updatedTrip : trip));
//       setAllTrips(allTrips.map(trip => trip.id === selectedTrip.id ? updatedTrip : trip));

//       toast({
//         title: "Assigned",
//         description: "Car and driver assigned successfully",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });

//       onClose();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.error || "Failed to assign car and driver",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//       console.error("Error assigning car and driver:", error);
//     } finally {
//       setIsAssigning(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       timeZone: 'UTC' // This forces the date to be interpreted in UTC
//     };
//     return new Date(dateString).toLocaleString('en-US', options);
//   };

//   // Card view component for each trip
//   const TripCard = ({ trip }) => (
//     <Box
//       p={cardPadding}
//       mb={4}
//       borderWidth="1px"
//       borderRadius="lg"
//       boxShadow="sm"
//       bg="white"
//       width="100%"
//     >
//       <Flex justify="space-between" align="center" mb={2} flexWrap="wrap" gap={2}>
//         <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
//           {trip.employee?.user?.firstName} {trip.employee?.user?.lastName}
//         </Heading>
//         <Badge
//           className={`p-2 ${getStatusBadgeVariant(trip.status)}`}
//         >
//           {trip.status}
//         </Badge>
//       </Flex>

//       <Text fontSize="sm" color="gray.600" mb={3}>
//         {trip.employee?.employeeNumber} • {trip.employee?.department}
//       </Text>

//       <Stack spacing={2} mb={3}>
//         <Flex align="flex-start">
//           <Icon as={FileText} className="mr-2 h-4 w-4" mt={1} />
//           <Box>
//             <Text fontWeight="medium">{trip.reason}</Text>
//             <Text fontSize="sm" color="gray.600">{trip.itinerary}</Text>
//           </Box>
//         </Flex>

//         <Flex align="flex-start">
//           <Icon as={Calendar} className="mr-2 h-4 w-4" mt={1} />
//           <Box>
//             <Text fontSize="sm">Departure: {formatDate(trip.departureDate)}</Text>
//             <Text fontSize="sm">Return: {formatDate(trip.returnDate)}</Text>
//           </Box>
//         </Flex>

//         {trip.car ? (
//           <Flex align="flex-start">
//             <Icon as={CarIcon} className="mr-2 h-4 w-4" mt={1} />
//             <Box>
//               <Text fontSize="sm">{trip.car.make} {trip.car.model}</Text>
//               <Text fontSize="xs" color="gray.600">Plate: {trip.car.licensePlate} • Year: {trip.car.year}</Text>
//             </Box>
//           </Flex>
//         ) : (
//           <Text fontSize="sm" color="gray.600">No car assigned</Text>
//         )}

//         <Flex align="flex-start">
//           <Icon as={Navigation} className="mr-2 h-4 w-4" mt={1} />
//           <Box>
//             <Text fontSize="sm">Start: {trip.kmAtDeparture || 'N/A'} km</Text>
//             <Text fontSize="sm">End: {trip.kmAtArrival || 'N/A'} km</Text>
//             {trip.kmAtDeparture && trip.kmAtArrival && (
//               <Text fontSize="xs" color="gray.600">
//                 Total: {trip.kmAtArrival - trip.kmAtDeparture} km
//               </Text>
//             )}
//           </Box>
//         </Flex>
//       </Stack>

//       {!trip.car && trip.status.toLowerCase() !== 'rejected' && (
//         <Button
//           colorScheme="blue"
//           size={buttonSize}
//           width="full"
//           onClick={() => {
//             setSelectedTrip(trip);
//             onOpen();
//           }}
//         >
//           Assign Car
//         </Button>
//       )}
//     </Box>
//   );

//   // Pagination component
//   const PaginationControls = () => (
//     <Flex justify="space-between" align="center" mt={4} wrap="wrap" gap={4}>
//       <Flex align="center" gap={2}>
//         <Text fontSize="sm">Items per page:</Text>
//         <Select
//           value={pagination.itemsPerPage}
//           onChange={handleItemsPerPageChange}
//           size="sm"
//           width="auto"
//         >
//           {itemsPerPageOptions.map(option => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </Select>
//       </Flex>
      
//       <Flex align="center" gap={2}>
//         <Text fontSize="sm">
//           Showing {pagination.totalItems > 0 ? ((pagination.currentPage - 1) * pagination.itemsPerPage) + 1 : 0} 
//           - {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} 
//           {' '}of{' '}{pagination.totalItems} items
//         </Text>
//       </Flex>
      
//       <ButtonGroup size="sm" isAttached variant="outline">
//         <Button
//           leftIcon={<Icon as={ChevronLeft} className="h-4 w-4" />}
//           onClick={() => handlePageChange(pagination.currentPage - 1)}
//           isDisabled={pagination.currentPage === 1}
//         >
//           Previous
//         </Button>
        
//         {/* Page numbers */}
//         <Flex display={{ base: 'none', md: 'flex' }}>
//           {Array.from({ length: pagination.totalPages }).map((_, index) => {
//             const pageNumber = index + 1;
//             // Show first page, last page, current page, and pages around current page
//             if (
//               pageNumber === 1 ||
//               pageNumber === pagination.totalPages ||
//               (pageNumber >= pagination.currentPage - 1 && pageNumber <= pagination.currentPage + 1)
//             ) {
//               return (
//                 <Button
//                   key={pageNumber}
//                   onClick={() => handlePageChange(pageNumber)}
//                   colorScheme={pageNumber === pagination.currentPage ? "blue" : "gray"}
//                   variant={pageNumber === pagination.currentPage ? "solid" : "outline"}
//                 >
//                   {pageNumber}
//                 </Button>
//               );
//             }
//             // Show ellipsis for page gaps
//             if (
//               pageNumber === pagination.currentPage - 2 ||
//               pageNumber === pagination.currentPage + 2
//             ) {
//               return (
//                 <Button key={`ellipsis-${pageNumber}`} variant="outline" isDisabled>
//                   ...
//                 </Button>
//               );
//             }
//             return null;
//           })}
//         </Flex>
        
//         {/* Mobile view - just show current/total */}
//         <Flex display={{ base: 'flex', md: 'none' }}>
//           <Button variant="outline" isDisabled>
//             {pagination.currentPage} / {pagination.totalPages}
//           </Button>
//         </Flex>
        
//         <Button
//           rightIcon={<Icon as={ChevronRight} className="h-4 w-4" />}
//           onClick={() => handlePageChange(pagination.currentPage + 1)}
//           isDisabled={pagination.currentPage === pagination.totalPages}
//         >
//           Next
//         </Button>
//       </ButtonGroup>
//     </Flex>
//   );

//   return (
//     <Box className="">
//       <Heading size={headingSize} mb={4}>Trip Requests</Heading>

//       {isLoading ? (
//         <Center p={8}>
//           <Text>Loading trips...</Text>
//         </Center>
//       ) : (
//         <>
//           {displayMode === "card" ? (
//             // Card view - optimized for tablets and mobile
//             <>
//               <SimpleGrid columns={columnCount} spacing={4}>
//                 {trips.length > 0 ? (
//                   trips.map((trip) => (
//                     <TripCard key={trip.id} trip={trip} />
//                   ))
//                 ) : (
//                   <Box p={4} textAlign="center">
//                     <Text>No trips found</Text>
//                   </Box>
//                 )}
//               </SimpleGrid>
              
//               {pagination.totalItems > 0 && <PaginationControls />}
//             </>
//           ) : (
//             // Desktop view - table
//             <>
//               <Box overflowX="auto">
//                 <TableContainer>
//                   <Table variant="simple" size={tableSize}>
//                     <Thead>
//                       <Tr>
//                         <Th>Employee</Th>
//                         <Th>Details</Th>
//                         <Th>Dates</Th>
//                         <Th>Vehicle</Th>
//                         <Th>Mileage</Th>
//                         <Th>Status</Th>
//                         <Th>Actions</Th>
//                       </Tr>
//                     </Thead>
//                     <Tbody>
//                       {trips.length > 0 ? (
//                         trips.map((trip) => (
//                           <Tr key={trip.id}>
//                             <Td>
//                               <Flex align="center">
//                                 <Icon as={User} className="mr-2 h-4 w-4" />
//                                 <Box>
//                                   <Text>{trip.employee?.user?.firstName} {trip.employee?.user?.lastName}</Text>
//                                   <Text fontSize="sm" color="gray.600">{trip.employee?.employeeNumber}</Text>
//                                   <Text fontSize="sm" color="gray.600">{trip.employee?.department}</Text>
//                                 </Box>
//                               </Flex>
//                             </Td>
//                             <Td>
//                               <Flex align="center">
//                                 <Icon as={FileText} className="mr-2 h-4 w-4" />
//                                 <Box maxW="200px">
//                                   <Text
//                                     title={trip.reason}
//                                     css={{
//                                       display: '-webkit-box',
//                                       WebkitLineClamp: 1,
//                                       WebkitBoxOrient: 'vertical',
//                                       overflow: 'hidden',
//                                       position: 'relative',
//                                       '&::after': {
//                                         content: "'...'",
//                                         position: 'absolute',
//                                         right: 0,
//                                         bottom: 0
//                                       }
//                                     }}
//                                   >
//                                     {trip.reason}
//                                   </Text>
//                                   <Text
//                                     fontSize="sm"
//                                     color="gray.600"
//                                     title={trip.itinerary}
//                                     css={{
//                                       display: '-webkit-box',
//                                       WebkitLineClamp: 1,
//                                       WebkitBoxOrient: 'vertical',
//                                       overflow: 'hidden'
//                                     }}
//                                   >
//                                     {trip.itinerary}
//                                   </Text>
//                                 </Box>
//                               </Flex>
//                             </Td>
//                             <Td>
//                               <Stack spacing={1}>
//                                 <Flex align="center">
//                                   <Icon as={Calendar} className="mr-2 h-4 w-4" />
//                                   <Text fontSize="sm">Departure: {formatDate(trip.departureDate)}</Text>
//                                 </Flex>
//                                 <Flex align="center">
//                                   <Icon as={Clock} className="mr-2 h-4 w-4" />
//                                   <Text fontSize="sm">Return: {formatDate(trip.returnDate)}</Text>
//                                 </Flex>
//                               </Stack>
//                             </Td>
//                             <Td>
//                               {trip.car ? (
//                                 <Stack spacing={1}>
//                                   <Flex align="center">
//                                     <Icon as={CarIcon} className="mr-2 h-4 w-4" />
//                                     <Text>{trip.car.make} {trip.car.model}</Text>
//                                   </Flex>
//                                   <Text fontSize="sm" color="gray.600">Plate: {trip.car.licensePlate}</Text>
//                                   <Text fontSize="sm" color="gray.600">Year: {trip.car.year}</Text>
//                                 </Stack>
//                               ) : (
//                                 <Text color="gray.600">No car assigned</Text>
//                               )}
//                             </Td>
//                             <Td>
//                               <Stack spacing={1}>
//                                 <Flex align="center">
//                                   <Icon as={Navigation} className="mr-2 h-4 w-4" />
//                                   <Text fontSize="sm">Start: {trip.kmAtDeparture || 'N/A'} km</Text>
//                                 </Flex>
//                                 <Flex align="center">
//                                   <Icon as={Navigation} className="mr-2 h-4 w-4" />
//                                   <Text fontSize="sm">End: {trip.kmAtArrival || 'N/A'} km</Text>
//                                 </Flex>
//                                 {trip.kmAtDeparture && trip.kmAtArrival && (
//                                   <Text fontSize="sm" color="gray.600">
//                                     Total: {trip.kmAtArrival - trip.kmAtDeparture} km
//                                   </Text>
//                                 )}
//                               </Stack>
//                             </Td>
//                             <Td>
//                               <Badge
//                                 className={`p-2 ${getStatusBadgeVariant(trip.status)}`}
//                               >
//                                 {trip.status}
//                               </Badge>
//                             </Td>
//                             <Td>
//                               {!trip.car && trip.status.toLowerCase() !== 'rejected' && (
//                                 <Button
//                                   colorScheme="blue"
//                                   size={buttonSize}
//                                   onClick={() => {
//                                     setSelectedTrip(trip);
//                                     onOpen();
//                                   }}
//                                 >
//                                   Assign Car
//                                 </Button>
//                               )}
//                             </Td>
//                           </Tr>
//                         ))
//                       ) : (
//                         <Tr>
//                           <Td colSpan={7} textAlign="center">No trips found</Td>
//                         </Tr>
//                       )}
//                     </Tbody>
//                   </Table>
//                 </TableContainer>
//               </Box>
              
//               {pagination.totalItems > 0 && <PaginationControls />}
//             </>
//           )}
//         </>
//       )}

//       {/* Assignment Modal - optimized for all screen sizes */}
//       {isOpen && (
//         <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalCloseButton />
//             <ModalBody p={0}>
//               <AssignmentModal
//                 cars={cars}
//                 drivers={drivers}
//                 onSubmit={handleAssignment}
//                 isLoading={isAssigning}
//                 onClose={onClose}
//               />
//             </ModalBody>
//           </ModalContent>
//         </Modal>
//       )}
//     </Box>
//   );
// };

// export default Trips;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Flex,
  Stack,
  Heading,
  useBreakpointValue,
  HStack,
  VStack,
  Icon,
  SimpleGrid,
  ButtonGroup,
  Center,
} from "@chakra-ui/react";
import API_URL from "../../constants/Constants";
import { Calendar, CarIcon, Clock, FileText, Navigation, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import AssignmentModal from "./AssignmentModal";
import TripsLoadingSkeleton from "./TripsLoadingSkeleton";

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Store token in localStorage
  }
});

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const [cars, setCars] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1
  });
  const [drivers, setDrivers] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isAssigning, setIsAssigning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use Chakra UI's responsive utilities
  const displayMode = useBreakpointValue({
    base: "card",
    sm: "card",
    md: "card",
    lg: "table",
    xl: "table"
  });

  const columnCount = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 2,
    lg: 2,
    xl: 3
  });

  const itemsPerPageOptions = [5, 10, 15, 20, 25, 50];
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const tableSize = useBreakpointValue({ base: "sm", md: "md", lg: "md" });
  const modalSize = useBreakpointValue({ base: "full", sm: "full", md: "md" });
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const cardPadding = useBreakpointValue({ base: 3, md: 4 });

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setCurrentUser(localStorage.getItem("user"));

        // Fetch trips
        const tripsResponse = await api.get("/trips");
        const fetchedTrips = tripsResponse.data;
        setAllTrips(fetchedTrips);
        
        // Update pagination information
        const totalItems = fetchedTrips.length;
        const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);
        
        setPagination(prev => ({
          ...prev,
          totalItems,
          totalPages
        }));

        // Apply pagination to the trips
        updateDisplayedTrips(fetchedTrips, pagination.currentPage, pagination.itemsPerPage);

        // Fetch cars
        const carsResponse = await api.get("/car");
        setCars(carsResponse.data.cars);

        // Fetch drivers
        const driversResponse = await api.get("/driver");
        setDrivers(driversResponse.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Error fetching data:", error);
      } finally {
        // Use a slight delay to prevent flickering if data loads very quickly
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    fetchData();
  }, []);

  // Update displayed trips when pagination changes
  useEffect(() => {
    updateDisplayedTrips(allTrips, pagination.currentPage, pagination.itemsPerPage);
  }, [pagination.currentPage, pagination.itemsPerPage]);

  // Function to update displayed trips based on pagination
  const updateDisplayedTrips = (allTripsData, page, itemsPerPage) => {
    if (!allTripsData || allTripsData.length === 0) return;
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTrips = allTripsData.slice(startIndex, endIndex);
    
    setTrips(paginatedTrips);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    const newTotalPages = Math.ceil(pagination.totalItems / newItemsPerPage);
    
    // Adjust current page if it exceeds new total pages
    const newCurrentPage = Math.min(pagination.currentPage, newTotalPages);
    
    setPagination({
      currentPage: newCurrentPage,
      itemsPerPage: newItemsPerPage,
      totalItems: pagination.totalItems,
      totalPages: newTotalPages
    });
  };

  const handleApprove = async (tripId) => {
    try {
      const response = await api.patch(
        `/trips/${tripId}/supervisor-approve`,
        { userId: currentUser.id }
      );

      // Update the trip in both trips and allTrips
      const updatedTrip = {
        ...allTrips.find(trip => trip.id === tripId),
        supervisorApproval: true,
        status: 'SUPERVISOR_APPROVED'
      };

      setTrips(trips.map(trip => trip.id === tripId ? updatedTrip : trip));
      setAllTrips(allTrips.map(trip => trip.id === tripId ? updatedTrip : trip));

      toast({
        title: "Approved",
        description: "Trip request approved successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to approve trip request",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error approving trip:", error);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'SUPERVISOR_APPROVED':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'ASSIGNED':
        return 'bg-sky-100 text-sky-800 border border-sky-200';
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'DEPARTED':
        return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const handleAssignment = async (formData) => {
    setIsAssigning(true);

    try {
      const response = await api.patch(
        `/trips/${selectedTrip.id}/assign`,
        {
          carId: formData.carId,
          driverId: formData.driverId,
          kmAtDeparture: formData.kmAtDeparture,
          userId: parseInt(localStorage.getItem("userId"))
        }
      );

      // Update the trip in both trips and allTrips
      const updatedTrip = {
        ...allTrips.find(trip => trip.id === selectedTrip.id),
        carId: formData.carId,
        driverId: formData.driverId,
        kmAtDeparture: formData.kmAtDeparture,
        car: cars.find(c => c.id === formData.carId),
        driver: drivers.find(d => d.id === formData.driverId),
        status: 'ASSIGNED',
        adminApproval: true
      };

      setTrips(trips.map(trip => trip.id === selectedTrip.id ? updatedTrip : trip));
      setAllTrips(allTrips.map(trip => trip.id === selectedTrip.id ? updatedTrip : trip));

      toast({
        title: "Assigned",
        description: "Car and driver assigned successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to assign car and driver",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error assigning car and driver:", error);
    } finally {
      setIsAssigning(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC' // This forces the date to be interpreted in UTC
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  // Card view component for each trip
  const TripCard = ({ trip }) => (
    <Box
      p={cardPadding}
      mb={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
      width="100%"
    >
      <Flex justify="space-between" align="center" mb={2} flexWrap="wrap" gap={2}>
        <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
          {trip.employee?.user?.firstName} {trip.employee?.user?.lastName}
        </Heading>
        <Badge
          className={`p-2 ${getStatusBadgeVariant(trip.status)}`}
        >
          {trip.status}
        </Badge>
      </Flex>

      <Text fontSize="sm" color="gray.600" mb={3}>
        {trip.employee?.employeeNumber} • {trip.employee?.department}
      </Text>

      <Stack spacing={2} mb={3}>
        <Flex align="flex-start">
          <Icon as={FileText} className="mr-2 h-4 w-4" mt={1} />
          <Box>
            <Text fontWeight="medium">{trip.reason}</Text>
            <Text fontSize="sm" color="gray.600">{trip.itinerary}</Text>
          </Box>
        </Flex>

        <Flex align="flex-start">
          <Icon as={Calendar} className="mr-2 h-4 w-4" mt={1} />
          <Box>
            <Text fontSize="sm">Departure: {formatDate(trip.departureDate)}</Text>
            <Text fontSize="sm">Return: {formatDate(trip.returnDate)}</Text>
          </Box>
        </Flex>

        {trip.car ? (
          <Flex align="flex-start">
            <Icon as={CarIcon} className="mr-2 h-4 w-4" mt={1} />
            <Box>
              <Text fontSize="sm">{trip.car.make} {trip.car.model}</Text>
              <Text fontSize="xs" color="gray.600">Plate: {trip.car.licensePlate} • Year: {trip.car.year}</Text>
            </Box>
          </Flex>
        ) : (
          <Text fontSize="sm" color="gray.600">No car assigned</Text>
        )}

        <Flex align="flex-start">
          <Icon as={Navigation} className="mr-2 h-4 w-4" mt={1} />
          <Box>
            <Text fontSize="sm">Start: {trip.kmAtDeparture || 'N/A'} km</Text>
            <Text fontSize="sm">End: {trip.kmAtArrival || 'N/A'} km</Text>
            {trip.kmAtDeparture && trip.kmAtArrival && (
              <Text fontSize="xs" color="gray.600">
                Total: {trip.kmAtArrival - trip.kmAtDeparture} km
              </Text>
            )}
          </Box>
        </Flex>
      </Stack>

      {!trip.car && trip.status.toLowerCase() !== 'rejected' && (
        <Button
          colorScheme="blue"
          size={buttonSize}
          width="full"
          onClick={() => {
            setSelectedTrip(trip);
            onOpen();
          }}
        >
          Assign Car
        </Button>
      )}
    </Box>
  );

  // Pagination component
  const PaginationControls = () => (
    <Flex justify="space-between" align="center" mt={4} wrap="wrap" gap={4}>
      <Flex align="center" gap={2}>
        <Text fontSize="sm">Items per page:</Text>
        <Select
          value={pagination.itemsPerPage}
          onChange={handleItemsPerPageChange}
          size="sm"
          width="auto"
        >
          {itemsPerPageOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Flex>
      
      <Flex align="center" gap={2}>
        <Text fontSize="sm">
          Showing {pagination.totalItems > 0 ? ((pagination.currentPage - 1) * pagination.itemsPerPage) + 1 : 0} 
          - {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} 
          {' '}of{' '}{pagination.totalItems} items
        </Text>
      </Flex>
      
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          leftIcon={<Icon as={ChevronLeft} className="h-4 w-4" />}
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          isDisabled={pagination.currentPage === 1}
        >
          Previous
        </Button>
        
        {/* Page numbers */}
        <Flex display={{ base: 'none', md: 'flex' }}>
          {Array.from({ length: pagination.totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            // Show first page, last page, current page, and pages around current page
            if (
              pageNumber === 1 ||
              pageNumber === pagination.totalPages ||
              (pageNumber >= pagination.currentPage - 1 && pageNumber <= pagination.currentPage + 1)
            ) {
              return (
                <Button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  colorScheme={pageNumber === pagination.currentPage ? "blue" : "gray"}
                  variant={pageNumber === pagination.currentPage ? "solid" : "outline"}
                >
                  {pageNumber}
                </Button>
              );
            }
            // Show ellipsis for page gaps
            if (
              pageNumber === pagination.currentPage - 2 ||
              pageNumber === pagination.currentPage + 2
            ) {
              return (
                <Button key={`ellipsis-${pageNumber}`} variant="outline" isDisabled>
                  ...
                </Button>
              );
            }
            return null;
          })}
        </Flex>
        
        {/* Mobile view - just show current/total */}
        <Flex display={{ base: 'flex', md: 'none' }}>
          <Button variant="outline" isDisabled>
            {pagination.currentPage} / {pagination.totalPages}
          </Button>
        </Flex>
        
        <Button
          rightIcon={<Icon as={ChevronRight} className="h-4 w-4" />}
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          isDisabled={pagination.currentPage === pagination.totalPages}
        >
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );

  return (
    <Box className="">
      <Heading size={headingSize} mb={4}>Trip Requests</Heading>

      {isLoading ? (
        <TripsLoadingSkeleton />
      ) : (
        <>
          {displayMode === "card" ? (
            // Card view - optimized for tablets and mobile
            <>
              <SimpleGrid columns={columnCount} spacing={4}>
                {trips.length > 0 ? (
                  trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))
                ) : (
                  <Box p={4} textAlign="center">
                    <Text>No trips found</Text>
                  </Box>
                )}
              </SimpleGrid>
              
              {pagination.totalItems > 0 && <PaginationControls />}
            </>
          ) : (
            // Desktop view - table
            <>
              <Box overflowX="auto">
                <TableContainer>
                  <Table variant="simple" size={tableSize}>
                    <Thead>
                      <Tr>
                        <Th>Employee</Th>
                        <Th>Details</Th>
                        <Th>Dates</Th>
                        <Th>Vehicle</Th>
                        <Th>Mileage</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {trips.length > 0 ? (
                        trips.map((trip) => (
                          <Tr key={trip.id}>
                            <Td>
                              <Flex align="center">
                                <Icon as={User} className="mr-2 h-4 w-4" />
                                <Box>
                                  <Text>{trip.employee?.user?.firstName} {trip.employee?.user?.lastName}</Text>
                                  <Text fontSize="sm" color="gray.600">{trip.employee?.employeeNumber}</Text>
                                  <Text fontSize="sm" color="gray.600">{trip.employee?.department}</Text>
                                </Box>
                              </Flex>
                            </Td>
                            <Td>
                              <Flex align="center">
                                <Icon as={FileText} className="mr-2 h-4 w-4" />
                                <Box maxW="200px">
                                  <Text
                                    title={trip.reason}
                                    css={{
                                      display: '-webkit-box',
                                      WebkitLineClamp: 1,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                      position: 'relative',
                                      '&::after': {
                                        content: "'...'",
                                        position: 'absolute',
                                        right: 0,
                                        bottom: 0
                                      }
                                    }}
                                  >
                                    {trip.reason}
                                  </Text>
                                  <Text
                                    fontSize="sm"
                                    color="gray.600"
                                    title={trip.itinerary}
                                    css={{
                                      display: '-webkit-box',
                                      WebkitLineClamp: 1,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    {trip.itinerary}
                                  </Text>
                                </Box>
                              </Flex>
                            </Td>
                            <Td>
                              <Stack spacing={1}>
                                <Flex align="center">
                                  <Icon as={Calendar} className="mr-2 h-4 w-4" />
                                  <Text fontSize="sm">Departure: {formatDate(trip.departureDate)}</Text>
                                </Flex>
                                <Flex align="center">
                                  <Icon as={Clock} className="mr-2 h-4 w-4" />
                                  <Text fontSize="sm">Return: {formatDate(trip.returnDate)}</Text>
                                </Flex>
                              </Stack>
                            </Td>
                            <Td>
                              {trip.car ? (
                                <Stack spacing={1}>
                                  <Flex align="center">
                                    <Icon as={CarIcon} className="mr-2 h-4 w-4" />
                                    <Text>{trip.car.make} {trip.car.model}</Text>
                                  </Flex>
                                  <Text fontSize="sm" color="gray.600">Plate: {trip.car.licensePlate}</Text>
                                  <Text fontSize="sm" color="gray.600">Year: {trip.car.year}</Text>
                                </Stack>
                              ) : (
                                <Text color="gray.600">No car assigned</Text>
                              )}
                            </Td>
                            <Td>
                              <Stack spacing={1}>
                                <Flex align="center">
                                  <Icon as={Navigation} className="mr-2 h-4 w-4" />
                                  <Text fontSize="sm">Start: {trip.kmAtDeparture || 'N/A'} km</Text>
                                </Flex>
                                <Flex align="center">
                                  <Icon as={Navigation} className="mr-2 h-4 w-4" />
                                  <Text fontSize="sm">End: {trip.kmAtArrival || 'N/A'} km</Text>
                                </Flex>
                                {trip.kmAtDeparture && trip.kmAtArrival && (
                                  <Text fontSize="sm" color="gray.600">
                                    Total: {trip.kmAtArrival - trip.kmAtDeparture} km
                                  </Text>
                                )}
                              </Stack>
                            </Td>
                            <Td>
                              <Badge
                                className={`p-2 ${getStatusBadgeVariant(trip.status)}`}
                              >
                                {trip.status}
                              </Badge>
                            </Td>
                            <Td>
                              {!trip.car && trip.status.toLowerCase() !== 'rejected' && (
                                <Button
                                  colorScheme="blue"
                                  size={buttonSize}
                                  onClick={() => {
                                    setSelectedTrip(trip);
                                    onOpen();
                                  }}
                                >
                                  Assign Car
                                </Button>
                              )}
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <Tr>
                          <Td colSpan={7} textAlign="center">No trips found</Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              
              {pagination.totalItems > 0 && <PaginationControls />}
            </>
          )}
        </>
      )}

      {/* Assignment Modal - optimized for all screen sizes */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody p={0}>
              <AssignmentModal
                cars={cars}
                drivers={drivers}
                onSubmit={handleAssignment}
                isLoading={isAssigning}
                onClose={onClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Trips;