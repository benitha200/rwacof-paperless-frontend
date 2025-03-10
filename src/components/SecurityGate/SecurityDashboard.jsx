import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
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
  FileText,
  Check,
  X,
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';
import API_URL from '../../constants/Constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
// Import Material UI components
import { Modal, Box, Typography, Button as MuiButton } from '@mui/material';

const SecurityDashboard = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPending, setShowPending] = useState(true);
  const [showSupervisorApproved, setShowSupervisorApproved] = useState(true);
  const [tripToApprove, setTripToApprove] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [action, setAction] = useState('');

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

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
        // Filter trips that can be approved (e.g., SUPERVISOR_APPROVED or PENDING status)
        const filteredTrips = data.filter(trip => 
        trip.status === 'ASSIGNED'
        );
        setTrips(filteredTrips);
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
        return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      case 'DEPARTED':
        return 'bg-purple-100 text-purple-800 border border-purple-200';
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

  const filteredTrips = trips.filter(trip => {
    // Apply status filter
    if (
      (trip.status === 'PENDING' && !showPending) || 
      (trip.status === 'SUPERVISOR_APPROVED' && !showSupervisorApproved)
    ) {
      return false;
    }
    
    // Apply search filter (search in employee name, vehicle info, or reason)
    if (searchTerm) {
      const employeeName = `${trip.employee?.user?.firstName || ''} ${trip.employee?.user?.lastName || ''}`.toLowerCase();
      const carInfo = `${trip.car?.make || ''} ${trip.car?.model || ''} ${trip.car?.licensePlate || ''}`.toLowerCase();
      const reason = (trip.reason || '').toLowerCase();
      
      return employeeName.includes(searchTerm.toLowerCase()) || 
             carInfo.includes(searchTerm.toLowerCase()) ||
             reason.includes(searchTerm.toLowerCase());
    }
    
    return true;
  });

  const handleApproveAction = (trip, actionType) => {
    setTripToApprove(trip);
    setAction(actionType);
    setShowConfirmDialog(true);
  };

  const confirmAction = async () => {
    if (!tripToApprove) return;
    
    const token = localStorage.getItem('token');
    
    try {
      // Only handling the approve action since rejection is not needed
      const endpoint = `${API_URL}/api/trips/${tripToApprove.id}/approve-exit`;
      // Updated to set status to DEPARTED instead of ASSIGNED
      const requestBody = { status: 'DEPARTED' };
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Failed to authorize trip departure`);
      }

      // Update the trips list by removing the processed trip
      setTrips(trips.filter(trip => trip.id !== tripToApprove.id));
      
      // Close the dialog
      setShowConfirmDialog(false);
      setTripToApprove(null);
      setAction('');
    } catch (err) {
      setError(err.message);
      setShowConfirmDialog(false);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmDialog(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg">Loading trips pending approval...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg text-red-500">Error: {error}</div>
    </div>
  );

  // Material UI Modal style
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  };

  return (
    <div className="w-full px-4 md:px-6">
      <div className="space-y-6 my-6">
        <Card className="w-full">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="flex items-center text-xl md:text-2xl">
                  <MapPin className="mr-2 h-5 w-5" /> Trips Pending Departure Authorization
                </CardTitle>
                <CardDescription>
                  Authorize vehicle exits for assigned trips
                </CardDescription>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search trips..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
              </div>
            </div>
          </CardHeader>
          
          {/* Desktop view: Full table */}
          <CardContent className="hidden md:block overflow-x-auto">
            {filteredTrips.length === 0 ? (
              <div className="py-6 text-center text-muted-foreground">
                No trips match your current filters.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Trip Details</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          {trip.employee?.user?.firstName} {trip.employee?.user?.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: {trip.employee?.employeeNumber}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {trip.employee?.department}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          <div>
                            <div className="font-medium">{trip.reason}</div>
                            <div className="text-sm text-muted-foreground">
                              {trip.itinerary}
                            </div>
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
                            <div className="text-sm font-medium">
                              {trip.car.licensePlate}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Color: {trip.car.color}, Year: {trip.car.year}
                            </div>
                          </div>
                        ) : (
                          'No car assigned'
                        )}
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
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveAction(trip, 'approve')}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Authorize Departure
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          
          {/* Mobile view: Card-based layout */}
          <CardContent className="md:hidden space-y-6">
            {filteredTrips.length === 0 ? (
              <div className="py-6 text-center text-muted-foreground">
                No trips match your current filters.
              </div>
            ) : (
              filteredTrips.map((trip) => (
                <Card key={trip.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <div>
                        <div className="font-medium">{trip.employee?.user?.firstName} {trip.employee?.user?.lastName}</div>
                        <div className="text-sm text-muted-foreground">ID: {trip.employee?.employeeNumber}</div>
                      </div>
                    </div>
                    <Badge className={`p-1 ${getStatusBadgeVariant(trip.status)}`}>
                      {trip.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Trip Details</div>
                      <div className="flex items-start">
                        <FileText className="mr-2 h-4 w-4 mt-1" />
                        <div>
                          <div>{trip.reason}</div>
                          <div className="text-sm text-muted-foreground">{trip.itinerary}</div>
                        </div>
                      </div>
                    </div>
                    
                    {trip.car && (
                      <div>
                        <div className="text-sm font-medium mb-1">Vehicle</div>
                        <div className="flex items-center">
                          <CarIcon className="mr-2 h-4 w-4" />
                          <span className="text-sm">{trip.car.make} {trip.car.model}</span>
                        </div>
                        <div className="text-sm font-medium">{trip.car.licensePlate}</div>
                        <div className="text-sm text-muted-foreground">
                          Color: {trip.car.color}, Year: {trip.car.year}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Dates</div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span className="text-sm">Departure: {formatDate(trip.departureDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          <span className="text-sm">Return: {formatDate(trip.returnDate)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproveAction(trip, 'approve')}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Authorize Departure
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Material UI Modal for approval confirmation */}
        <Modal
          open={showConfirmDialog}
          onClose={handleCloseModal}
          aria-labelledby="confirm-modal-title"
          aria-describedby="confirm-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="confirm-modal-title" variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AlertTriangle style={{ marginRight: '8px', color: '#F59E0B' }} />
              Confirm Exit Authorization
            </Typography>
            <Typography id="confirm-modal-description" sx={{ mt: 2, mb: 3 }}>
              Are you sure you want to authorize the exit for this trip? This will change the trip status to "DEPARTED" and allow the employee to proceed with the trip.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <MuiButton onClick={handleCloseModal} variant="outlined">
                Cancel
              </MuiButton>
              <MuiButton 
                onClick={confirmAction} 
                variant="contained"
                sx={{ 
                  bgcolor: '#16a34a', 
                  '&:hover': { 
                    bgcolor: '#15803d'
                  }
                }}
              >
                Authorize
              </MuiButton>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default SecurityDashboard;