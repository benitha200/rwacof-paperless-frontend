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
} from "@chakra-ui/react";
import API_URL from "../../constants/Constants";

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
  // const [cars, setCars] = useState([]);
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
        // setCars(carsResponse.data);
        // setCars(data.cars);
        setCars(carsResponse.data.cars);
        console.log(carsResponse);

        // Update pagination information
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalCars: 3
        });

        // Fetch drivers
        const driversResponse = await api.get("/driver");
        console.log(driversResponse);
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

  // Update other methods to use the api instance
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'SUPERVISOR_APPROVED':
        return 'bg-blue-100 text-blue-800';
      case 'ASSIGNED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  // Similar updates for handleReject and handleAssignment methods...
  const handleReject = async (tripId) => {
    try {
      const response = await api.patch(
        `/trips/${tripId}/reject`,
        { userId: currentUser.id }
      );

      setTrips(trips.map((trip) =>
        trip.id === tripId
          ? {
            ...trip,
            status: 'REJECTED',
            supervisorApproval: false
          }
          : trip
      ));

      toast({
        title: "Rejected",
        description: "Trip request rejected",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to reject trip request",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error rejecting trip:", error);
    }
  };

  const handleAssignment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const carId = Number(formData.get("car"));
    const driverId = Number(formData.get("driver"));

    try {
      const response = await api.patch(
        `/trips/${selectedTrip.id}/assign`,
        {
          carId,
          driverId,
          userId: parseInt(localStorage.getItem("userId"))
        }
      );

      // Update local state
      setTrips(trips.map((trip) =>
        trip.id === selectedTrip.id
          ? {
            ...trip,
            carId,
            driverId,
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

  // Check if user can approve/reject trip
  const canManageTrip = (trip) => {
    if (!currentUser || !trip.employee) return false;

    // Check if current user is the reporting manager of the trip creator
    return currentUser.employee &&
      currentUser.employee.id === trip.employee.reportsToId;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Trip Requests</h2>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Employee</Th>
              <Th>Reporting Manager</Th>
              <Th>Department</Th>
              <Th>Status</Th>
              <Th>Vehicle</Th>
              <Th>Driver</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trips.map((trip) => (
              <Tr key={trip.id}>
                <Td>
                  {trip.employee?.user?.firstName} {trip.employee?.user?.lastName}
                </Td>
                <Td>
                  {trip.employee?.reportsTo?.user?.firstName} {trip.employee?.reportsTo?.user?.lastName}
                </Td>
                <Td>{trip.employee?.department}</Td>

                <Td>
                  <span className={`px-2 py-2 m-3 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}>
                    {trip.status === 'ASSIGNED' ? 'CAR ASSIGNED' : trip.status}
                  </span>
                </Td>
                <Td>
                  {trip.car
                    ? `${trip.car.make} ${trip.car.model} (${trip.car.licensePlate})`
                    : "Not Assigned"}
                </Td>
                <Td>
                  {trip.driver
                    ? `${trip.driver.firstName} ${trip.driver.lastName}`
                    : "Not Assigned"}
                </Td>
                <Td>
                  {/* Approval buttons for pending trips */}
                  {trip.status === "PENDING" && !trip.supervisorApproval && canManageTrip(trip) && (
                    <div className="flex gap-2">
                      <Button
                        colorScheme="green"
                        onClick={() => handleApprove(trip.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleReject(trip.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}

                  {/* Car assignment button */}
                  {trip.supervisorApproval && !trip.car && (
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        setSelectedTrip(trip); // Set the selected trip for assignment
                        onOpen(); // Open the modal
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

      {/* Car and Driver Assignment Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Car and Driver</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleAssignment}>
              <div>
                <label htmlFor="car" className="block mb-2">
                  Select Car
                </label>
                <Select name="car" placeholder="Select a car" isRequired>
                  {cars
                    .filter(car => car.status === "AVAILABLE")
                    .map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.make} {car.model} ({car.licensePlate})
                      </option>
                    ))}
                </Select>
              </div>
              <div className="mt-4">
                <label htmlFor="driver" className="block mb-2">
                  Select Driver
                </label>
                <Select name="driver" placeholder="Select a driver" isRequired>
                  {drivers
                    .filter(driver => driver.status !== "INACTIVE") // Change condition to exclude only inactive drivers
                    .map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.firstName} {driver.lastName}
                      </option>
                    ))}
                </Select>
              </div>
              <ModalFooter>
                <Button colorScheme="blue" type="submit" className="w-full">
                  Assign
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Trips;