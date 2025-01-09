import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Calendar,
  MapPin,
  Car as CarIcon,
  Clock,
  Navigation,
  FileText
} from 'lucide-react';
import API_URL from '../../constants/Constants';
import { Button } from '@/components/ui/button';
import FinishTripModal from './FinishTripModal1';

const FinishTripPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTripToFinish, setSelectedTripToFinish] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve token and user ID from localStorage
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);

    const fetchTrips = async () => {
      try {
        const response = await fetch(`${API_URL}/api/trips`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }

        const data = await response.json();
        setTrips(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);



  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'SUPERVISOR_APPROVED':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'ASSIGNED':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'IN_PROGRESS':
        return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
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

  const handleFinishTrip = (finishedTrip) => {
    // Update the trips list with the finished trip
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === finishedTrip.id ? finishedTrip : trip
      )
    );
    setSelectedTripToFinish(null);
  };

  if (loading) return <div>Loading trips...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2" /> All Trips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Trip Details</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Kilometers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      {trip.employee?.user?.firstName} {trip.employee?.user?.lastName}

                    </div>
                    <div className="mr-2 text-sm text-muted-foreground">
                      {trip.employee?.employeeNumber}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {trip.employee?.department}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <div>
                        <div>{trip.reason}</div>
                        <div className="text-sm text-muted-foreground">
                          {trip.itinerary}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center mb-1">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Departure: {formatDate(trip.departureDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Return: {formatDate(trip.returnDate)}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {trip.car ? (
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <CarIcon className="mr-2 h-4 w-4" />
                          {trip.car.make} {trip.car.model}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Plate: {trip.car.licensePlate}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Year: {trip.car.year}
                        </div>
                      </div>
                    ) : (
                      'No car assigned'
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Navigation className="mr-2 h-4 w-4" />
                        <span>Start: {trip.kmAtDeparture} km</span>
                      </div>
                      <div className="flex items-center">
                        <Navigation className="mr-2 h-4 w-4" />
                        <span>End: {trip.kmAtArrival} km</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total: {trip.kmAtArrival - trip.kmAtDeparture} km
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`p-2 ${getStatusBadgeVariant(trip.status)}`}
                    >
                      {trip.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {trip.status === 'ASSIGNED' && (
                      <Button
                        size="sm"
                        onClick={() => setSelectedTripToFinish(trip)}
                      >
                        Finish Trip
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Finish Trip Modal */}
      <FinishTripModal
        open={!!selectedTripToFinish}
        onClose={() => setSelectedTripToFinish(null)}
        tripId={selectedTripToFinish?.id}
        userId={userId}
        onTripFinished={handleFinishTrip}
      />
    </div>
  );
};

export default FinishTripPage;