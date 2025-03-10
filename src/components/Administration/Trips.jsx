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
// } from "@chakra-ui/react";
// import API_URL from "../../constants/Constants";
// import { Calendar, CarIcon, Clock, FileText, Navigation, User } from "lucide-react";
// import { Badge } from '@/components/ui/badge';

// // Create an axios instance with default configuration
// const api = axios.create({
//   baseURL: `${API_URL}/api`,
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem('token')}` // Store token in localStorage
//   }
// });

// const Trips = () => {
//   const [trips, setTrips] = useState([]);
//   const [cars, setCars] = useState([]);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalCars: 0
//   });
//   const [drivers, setDrivers] = useState([]);
//   const [selectedTrip, setSelectedTrip] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const toast = useToast();

//   // Check window size for responsive design
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Fetch data from APIs
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setCurrentUser(localStorage.getItem("user"));

//         // Fetch trips
//         const tripsResponse = await api.get("/trips");
//         setTrips(tripsResponse.data);

//         // Fetch cars
//         const carsResponse = await api.get("/car");
//         setCars(carsResponse.data.cars);
//         console.log(carsResponse);

//         // Update pagination information
//         setPagination({
//           currentPage: 1,
//           totalPages: 1,
//           totalCars: 3
//         });

//         // Fetch drivers
//         const driversResponse = await api.get("/driver");
//         console.log(driversResponse);
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
//       }
//     };

//     fetchData();
//   }, []);

//   const handleApprove = async (tripId) => {
//     try {
//       const response = await api.patch(
//         `/trips/${tripId}/supervisor-approve`,
//         { userId: currentUser.id }
//       );

//       setTrips(trips.map((trip) =>
//         trip.id === tripId
//           ? {
//             ...trip,
//             supervisorApproval: true,
//             status: 'SUPERVISOR_APPROVED'
//           }
//           : trip
//       ));

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

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'AVAILABLE':
//         return 'bg-emerald-200 text-emerald-900';
//       case 'PENDING':
//         return 'bg-amber-200 text-amber-900';
//       case 'SUPERVISOR_APPROVED':
//         return 'bg-sky-200 text-sky-900';
//       case 'ASSIGNED':
//         return 'bg-lime-200 text-lime-900';
//       case 'REJECTED':
//         return 'bg-rose-200 text-rose-900';
//       case 'COMPLETED':
//         return 'bg-purple-200 text-purple-900';
//       default:
//         return 'bg-gray-100 text-gray-800';
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
//       case 'IN_PROGRESS':
//         return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border border-gray-200';
//     }
//   };

//   const handleAssignment = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const carId = Number(formData.get("car"));
//     const driverId = Number(formData.get("driver"));
//     const kmAtDeparture = Number(formData.get("kmAtDeparture"));

//     try {
//       const response = await api.patch(
//         `/trips/${selectedTrip.id}/assign`,
//         {
//           carId,
//           driverId,
//           kmAtDeparture,
//           userId: parseInt(localStorage.getItem("userId"))
//         }
//       );

//       setTrips(trips.map((trip) =>
//         trip.id === selectedTrip.id
//           ? {
//             ...trip,
//             carId,
//             driverId,
//             kmAtDeparture,
//             car: cars.find(c => c.id === carId),
//             driver: drivers.find(d => d.id === driverId),
//             status: 'ASSIGNED',
//             adminApproval: true
//           }
//           : trip
//       ));

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
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Mobile card view for each trip
//   const TripCard = ({ trip }) => (
//     <Box 
//       p={4} 
//       mb={4} 
//       borderWidth="1px" 
//       borderRadius="lg" 
//       boxShadow="sm"
//       bg="white"
//     >
//       <Flex justify="space-between" align="center" mb={2}>
//         <Heading size="sm">
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
//         <Flex align="center">
//           <FileText className="mr-2 h-4 w-4" />
//           <Box>
//             <Text fontWeight="medium">{trip.reason}</Text>
//             <Text fontSize="sm" color="gray.600">{trip.itinerary}</Text>
//           </Box>
//         </Flex>

//         <Flex align="center">
//           <Calendar className="mr-2 h-4 w-4" />
//           <Box>
//             <Text fontSize="sm">Departure: {formatDate(trip.departureDate)}</Text>
//             <Text fontSize="sm">Return: {formatDate(trip.returnDate)}</Text>
//           </Box>
//         </Flex>

//         {trip.car ? (
//           <Flex align="center">
//             <CarIcon className="mr-2 h-4 w-4" />
//             <Box>
//               <Text fontSize="sm">{trip.car.make} {trip.car.model}</Text>
//               <Text fontSize="xs" color="gray.600">Plate: {trip.car.licensePlate} • Year: {trip.car.year}</Text>
//             </Box>
//           </Flex>
//         ) : (
//           <Text fontSize="sm" color="gray.600">No car assigned</Text>
//         )}

//         <Flex align="center">
//           <Navigation className="mr-2 h-4 w-4" />
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
//           size="sm"
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

//   return (
//     <Box className="p-4">
//       <Heading size="lg" mb={4}>Trip Requests</Heading>

//       {isMobile ? (
//         // Mobile view - cards
//         <Box>
//           {trips.map((trip) => (
//             <TripCard key={trip.id} trip={trip} />
//           ))}
//         </Box>
//       ) : (
//         // Desktop view - table
//         <Box overflowX="auto">
//           <TableContainer>
//             <Table variant="simple" size={{base: "sm", lg: "md"}}>
//               <Thead>
//                 <Tr>
//                   <Th>Employee</Th>
//                   <Th>Reporting Manager</Th>
//                   <Th>Department</Th>
//                   <Th>Vehicle</Th>
//                   <Th>Driver</Th>
//                   <Th>Status</Th>
//                   <Th>Actions</Th>
//                 </Tr>
//               </Thead>
//               <Tbody>
//                 {trips.map((trip) => (
//                   <Tr key={trip.id}>
//                     <Td>
//                       <Flex align="center">
//                         <User className="mr-2 h-4 w-4" />
//                         <Box>
//                           <Text>{trip.employee?.user?.firstName} {trip.employee?.user?.lastName}</Text>
//                           <Text fontSize="sm" color="gray.600">{trip.employee?.employeeNumber}</Text>
//                           <Text fontSize="sm" color="gray.600">{trip.employee?.department}</Text>
//                         </Box>
//                       </Flex>
//                     </Td>
//                     <Td>
//                       <Flex align="center">
//                         <FileText className="mr-2 h-4 w-4" />
//                         <Box>
//                           <Text>{trip.reason}</Text>
//                           <Text fontSize="sm" color="gray.600">{trip.itinerary}</Text>
//                         </Box>
//                       </Flex>
//                     </Td>
//                     <Td>
//                       <Stack spacing={1}>
//                         <Flex align="center">
//                           <Calendar className="mr-2 h-4 w-4" />
//                           <Text fontSize="sm">Departure: {formatDate(trip.departureDate)}</Text>
//                         </Flex>
//                         <Flex align="center">
//                           <Clock className="mr-2 h-4 w-4" />
//                           <Text fontSize="sm">Return: {formatDate(trip.returnDate)}</Text>
//                         </Flex>
//                       </Stack>
//                     </Td>
//                     <Td>
//                       {trip.car ? (
//                         <Stack spacing={1}>
//                           <Flex align="center">
//                             <CarIcon className="mr-2 h-4 w-4" />
//                             <Text>{trip.car.make} {trip.car.model}</Text>
//                           </Flex>
//                           <Text fontSize="sm" color="gray.600">Plate: {trip.car.licensePlate}</Text>
//                           <Text fontSize="sm" color="gray.600">Year: {trip.car.year}</Text>
//                         </Stack>
//                       ) : (
//                         <Text color="gray.600">No car assigned</Text>
//                       )}
//                     </Td>
//                     <Td>
//                       <Stack spacing={1}>
//                         <Flex align="center">
//                           <Navigation className="mr-2 h-4 w-4" />
//                           <Text fontSize="sm">Start: {trip.kmAtDeparture || 'N/A'} km</Text>
//                         </Flex>
//                         <Flex align="center">
//                           <Navigation className="mr-2 h-4 w-4" />
//                           <Text fontSize="sm">End: {trip.kmAtArrival || 'N/A'} km</Text>
//                         </Flex>
//                         {trip.kmAtDeparture && trip.kmAtArrival && (
//                           <Text fontSize="sm" color="gray.600">
//                             Total: {trip.kmAtArrival - trip.kmAtDeparture} km
//                           </Text>
//                         )}
//                       </Stack>
//                     </Td>
//                     <Td>
//                       <Badge
//                         className={`p-2 ${getStatusBadgeVariant(trip.status)}`}
//                       >
//                         {trip.status}
//                       </Badge>
//                     </Td>
//                     <Td>
//                       {!trip.car && trip.status.toLowerCase() !== 'rejected' && (
//                         <Button
//                           colorScheme="blue"
//                           size="sm"
//                           onClick={() => {
//                             setSelectedTrip(trip);
//                             onOpen();
//                           }}
//                         >
//                           Assign Car
//                         </Button>
//                       )}
//                     </Td>
//                   </Tr>
//                 ))}
//               </Tbody>
//             </Table>
//           </TableContainer>
//         </Box>
//       )}

//       {/* Assignment Modal - same for both views */}
//       <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? "full" : "md"}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Assign Car and Driver</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <form onSubmit={handleAssignment} id="assignment-form">
//               <Stack spacing={4}>
//                 <FormControl isRequired>
//                   <FormLabel htmlFor="car">Select Car</FormLabel>
//                   <Select name="car" placeholder="Select a car">
//                     {cars
//                       .filter(car => car.status === "AVAILABLE")
//                       .map((car) => (
//                         <option key={car.id} value={car.id}>
//                           {car.make} {car.model} ({car.licensePlate})
//                         </option>
//                       ))}
//                   </Select>
//                 </FormControl>

//                 <FormControl isRequired>
//                   <FormLabel htmlFor="driver">Select Driver</FormLabel>
//                   <Select name="driver" placeholder="Select a driver">
//                     {drivers
//                       .filter(driver => driver.status !== "INACTIVE")
//                       .map((driver) => (
//                         <option key={driver.id} value={driver.id}>
//                           {driver.firstName} {driver.lastName}
//                         </option>
//                       ))}
//                   </Select>
//                 </FormControl>

//                 <FormControl isRequired>
//                   <FormLabel>KM at Departure</FormLabel>
//                   <Input
//                     name="kmAtDeparture"
//                     type="number"
//                     min="0"
//                     placeholder="Enter current KM reading"
//                   />
//                 </FormControl>
//               </Stack>
//             </form>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" type="submit" form="assignment-form" width="full">
//               Assign
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
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
} from "@chakra-ui/react";
import API_URL from "../../constants/Constants";
import { Calendar, CarIcon, Clock, FileText, Navigation, User } from "lucide-react";
import { Badge } from '@/components/ui/badge';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Store token in localStorage
  }
});

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [cars, setCars] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCars: 0
  });
  const [drivers, setDrivers] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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

  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const tableSize = useBreakpointValue({ base: "sm", md: "md", lg: "md" });
  const modalSize = useBreakpointValue({ base: "full", sm: "full", md: "md" });
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const cardPadding = useBreakpointValue({ base: 3, md: 4 });

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCurrentUser(localStorage.getItem("user"));

        // Fetch trips
        const tripsResponse = await api.get("/trips");
        setTrips(tripsResponse.data);

        // Fetch cars
        const carsResponse = await api.get("/car");
        setCars(carsResponse.data.cars);

        // Update pagination information
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalCars: 3
        });

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
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (tripId) => {
    try {
      const response = await api.patch(
        `/trips/${tripId}/supervisor-approve`,
        { userId: currentUser.id }
      );

      setTrips(trips.map((trip) =>
        trip.id === tripId
          ? {
            ...trip,
            supervisorApproval: true,
            status: 'SUPERVISOR_APPROVED'
          }
          : trip
      ));

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

  const handleAssignment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const carId = Number(formData.get("car"));
    const driverId = Number(formData.get("driver"));
    const kmAtDeparture = Number(formData.get("kmAtDeparture"));

    try {
      const response = await api.patch(
        `/trips/${selectedTrip.id}/assign`,
        {
          carId,
          driverId,
          kmAtDeparture,
          userId: parseInt(localStorage.getItem("userId"))
        }
      );

      setTrips(trips.map((trip) =>
        trip.id === selectedTrip.id
          ? {
            ...trip,
            carId,
            driverId,
            kmAtDeparture,
            car: cars.find(c => c.id === carId),
            driver: drivers.find(d => d.id === driverId),
            status: 'ASSIGNED',
            adminApproval: true
          }
          : trip
      ));

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
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  return (
    <Box className="">
      <Heading size={headingSize} mb={4}>Trip Requests</Heading>

      {displayMode === "card" ? (
        // Card view - optimized for tablets and mobile
        <SimpleGrid columns={columnCount} spacing={4}>
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </SimpleGrid>
      ) : (
        // Desktop view - table
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
                {trips.map((trip) => (
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
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Assignment Modal - optimized for all screen sizes */}
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Car and Driver</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleAssignment} id="assignment-form">
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="car">Select Car</FormLabel>
                  <Select
                    name="car"
                    placeholder="Select a car"
                    size={buttonSize}
                  >
                    {cars
                      .filter(car => car.status === "AVAILABLE")
                      .map((car) => (
                        <option key={car.id} value={car.id}>
                          {car.make} {car.model} ({car.licensePlate})
                        </option>
                      ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="driver">Select Driver</FormLabel>
                  <Select
                    name="driver"
                    placeholder="Select a driver"
                    size={buttonSize}
                  >
                    {drivers
                      .filter(driver => driver.status !== "INACTIVE")
                      .map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.firstName} {driver.lastName}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>KM at Departure</FormLabel>
                  <Input
                    name="kmAtDeparture"
                    type="number"
                    min="0"
                    placeholder="Enter current KM reading"
                    size={buttonSize}
                  />
                </FormControl>
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              type="submit"
              form="assignment-form"
              width="full"
              size={buttonSize}
            >
              Assign
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Trips;