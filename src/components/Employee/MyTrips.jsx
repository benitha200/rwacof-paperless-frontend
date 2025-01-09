import React, { useState, useEffect } from "react";
import axios from "axios"; // Add this import
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    useToast,
} from "@chakra-ui/react";
import API_URL from "../../constants/Constants";

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([]);
    const toast = useToast();

    const userId = localStorage.getItem("userId");

    // Create axios instance
    const api = axios.create({
        baseURL: `${API_URL}/api`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    });

    const fetchTrips = async () => {
        try {
            const response = await fetch(`${API_URL}/api/trips`);
            const data = await response.json();
            const parsedUserId = userId;

            // Filter trips where the logged-in user is the reporting manager
            const filtered = data.filter(
                (trip) => trip.employee.reportsTo.user.id === parsedUserId
            );

            setTrips(data);
            setFilteredTrips(filtered);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };

    // Fetch trips on component mount
    useEffect(() => {
        fetchTrips();
    }, []);

    const getStatusColor = (status) => {
        switch(status) {
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

    const handleReject = async (tripId) => {
        try {
            const response = await api.patch(
                `/trips/${tripId}/reject`, 
                { userId: parseInt(userId) } // Use userId from localStorage
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

    // Approve Trip Handler
    const handleApprove = async (tripId) => {
        try {
            const response = await fetch(
                `${API_URL}/api/trips/${tripId}/supervisor-approve`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: parseInt(userId || "0"), // Supervisor's ID
                    }),
                }
            );

            if (response.ok) {
                const updatedTrip = await response.json();
                
                // Refetch trips to ensure latest data
                fetchTrips();

                // Update trips state to reflect the change
                setFilteredTrips(
                    filteredTrips.map((trip) =>
                        trip.id === updatedTrip.id ? updatedTrip : trip
                    )
                );
            } else {
                console.error("Error approving trip:", response.statusText);
            }
        } catch (error) {
            console.error("Error approving trip:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Trips Approval</h2>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Employee</Th>
                            <Th>Department</Th>
                            <Th>Vehicle Plate</Th>
                            <Th>Departure Date</Th>
                            <Th>Return Date</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {trips.map((trip) => (
                            <Tr key={trip.id}>
                                <Td>{trip.employee.user.firstName} {trip.employee.user.lastName}</Td>
                                <Td>{trip.employee.department}</Td>
                                <Td>{trip.car?.plateNumber || "N/A"}</Td>
                                <Td>{trip.departureDate}</Td>
                                <Td>{trip.returnDate}</Td>
                                {/* <Td>{trip.status}</Td> */}
                                <Td>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}>
                                                    {trip.status}
                                                </span>
                                </Td>  
                                <Td>
                                    {trip.status === "PENDING" && (
                                      <div className="flex gap-2"> 
                                      <Button
                                            colorScheme="teal"
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
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyTrips;