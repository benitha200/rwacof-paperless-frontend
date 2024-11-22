import React, { useState } from "react";
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
} from "@chakra-ui/react";

const Trips = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      department: "Sales",
      approvalStatus: "Pending",
      assignedCar: null,
      assignedDriver: null,
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      department: "Marketing",
      approvalStatus: "Pending",
      assignedCar: null,
      assignedDriver: null,
    },
  ]);

  const [cars] = useState([
    { id: 1, model: "Toyota Camry", plateNumber: "ABC-123" },
    { id: 2, model: "Honda Accord", plateNumber: "XYZ-456" },
  ]);

  const [drivers] = useState([
    { id: 1, name: "Mike Johnson" },
    { id: 2, name: "Sarah Williams" },
  ]);

  const [selectedTrip, setSelectedTrip] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleApprove = (tripId) => {
    setTrips(trips.map((trip) =>
      trip.id === tripId ? { ...trip, approvalStatus: "Approved" } : trip
    ));
  };

  const handleReject = (tripId) => {
    setTrips(trips.map((trip) =>
      trip.id === tripId ? { ...trip, approvalStatus: "Rejected" } : trip
    ));
  };

  const openAssignmentDialog = (trip) => {
    setSelectedTrip(trip);
    onOpen();
  };

  const handleAssignment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const car = cars.find((c) => c.id === Number(formData.get("car")));
    const driver = drivers.find((d) => d.id === Number(formData.get("driver")));

    setTrips(
      trips.map((trip) =>
        trip.id === selectedTrip.id
          ? { ...trip, assignedCar: car, assignedDriver: driver }
          : trip
      )
    );
    onClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Trip Requests</h2>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Employee</Th>
              <Th>Department</Th>
              <Th>Approval Status</Th>
              <Th>Assigned Car</Th>
              <Th>Assigned Driver</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trips.map((trip) => (
              <Tr key={trip.id}>
                <Td>{trip.employeeName}</Td>
                <Td>{trip.department}</Td>
                <Td>{trip.approvalStatus}</Td>
                <Td>{trip.assignedCar?.plateNumber || "Not Assigned"}</Td>
                <Td>{trip.assignedDriver?.name || "Not Assigned"}</Td>
                <Td>
                  {trip.approvalStatus === "Pending" && (
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
                  {trip.approvalStatus === "Approved" && (
                    <Button
                      colorScheme="blue"
                      onClick={() => openAssignmentDialog(trip)}
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
                <Select name="car" placeholder="Select a car">
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.model} ({car.plateNumber})
                    </option>
                  ))}
                </Select>
              </div>
              <div className="mt-4">
                <label htmlFor="driver" className="block mb-2">
                  Select Driver
                </label>
                <Select name="driver" placeholder="Select a driver">
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
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
