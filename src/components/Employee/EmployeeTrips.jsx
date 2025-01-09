import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const EmployeeTrips = () => {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTrip, setNewTrip] = useState({
        employeeId: 1,
        kmAtDeparture: '',
        reason: '',
        itinerary: '',
        vehiclePlate: '',
        departureDate: '',
        returnDate: '',
        kmAtArrival: ''
    });

    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
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

    // Fetch trips for the user
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/trips/user/${localStorage.getItem('userId')}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch trips');
                }
                const data = await response.json();
                setTrips(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchTrips();
    }, []);

    // Handle creating a new trip
    const handleCreateTrip = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newTrip,
                    departureDate: new Date().toISOString(),
                    returnDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours later
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create trip');
            }

            const createdTrip = await response.json();
            setTrips([...trips, createdTrip]);
            setIsDialogOpen(false);

            // Reset form
            setNewTrip({
                employeeId: 1,
                kmAtDeparture: '',
                reason: '',
                itinerary: '',
                vehiclePlate: '',
                departureDate: '',
                returnDate: '',
                kmAtArrival: ''
            });
        } catch (err) {
            console.error('Error creating trip:', err);
            alert('Failed to create trip');
        }
    };

    // Handle input changes for new trip form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTrip(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateTripRedirect = () => {
        navigate('/trips/employee/create');
    };

    if (isLoading) return <div>Loading trips...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-left font-bold mb-4">My Trips</h1>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-4 float-right p-4" onClick={handleCreateTripRedirect}>
                        Request Trip
                    </Button>

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request Trip</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateTrip} className="space-y-4">
                        <div>
                            <Label>KM at Departure</Label>
                            <Input
                                type="number"
                                name="kmAtDeparture"
                                value={newTrip.kmAtDeparture}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Reason</Label>
                            <Input
                                type="text"
                                name="reason"
                                value={newTrip.reason}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Itinerary</Label>
                            <Input
                                type="text"
                                name="itinerary"
                                value={newTrip.itinerary}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Vehicle Plate</Label>
                            <Input
                                type="text"
                                name="vehiclePlate"
                                value={newTrip.vehiclePlate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>KM at Arrival</Label>
                            <Input
                                type="number"
                                name="kmAtArrival"
                                value={newTrip.kmAtArrival}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Button type="submit">Submit Trip</Button>
                    </form>
                </DialogContent>
            </Dialog>

            {trips.length === 0 ? (
                <p>No trips found.</p>
            ) : (
                trips.map(trip => (
                    <Card key={trip.id} className="mb-4">
                        <CardHeader>
                            <CardTitle>Trip Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2">
                                <p><strong>Vehicle Plate:</strong> {trip.vehiclePlate}</p>
                                <p><strong>Reason:</strong> {trip.reason}</p>
                                <p><strong>Departure Date:</strong> {new Date(trip.departureDate).toLocaleString()}</p>
                                <p><strong>Return Date:</strong> {new Date(trip.returnDate).toLocaleString()}</p>
                                <p><strong>KM at Departure:</strong> {trip.kmAtDeparture}</p>
                                <p><strong>KM at Arrival:</strong> {trip.kmAtArrival}</p>
                                {/* <p><strong>Status:</strong> {trip.status}</p> */}
                                <p className='gap-3'><strong>Status:  
                                <span className={`px-2 py-2 m-3 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}>
                                    {trip.status}
                                </span>
                                </strong></p>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
};

export default EmployeeTrips;