// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import API_URL from '../../constants/Constants';

// const TripForm = ({ 
//   initialEmployeeId = 7, 
//   initialReason = '',
//   initialItinerary = '',
//   initialKmAtDeparture ='' 
// }) => {
//   const [tripData, setTripData] = useState({
//     employeeId: initialEmployeeId,
//     kmAtDeparture: initialKmAtDeparture,
//     reason: initialReason,
//     itinerary: initialItinerary,
//     departureDate: new Date().toISOString(),
//     returnDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours later
//   });

//   const [submissionStatus, setSubmissionStatus] = useState({
//     success: false,
//     error: null
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTripData(prev => ({
//       ...prev,
//       [name]: name === 'kmAtDeparture' ? parseInt(value, 10) || 0 : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Ensure kmAtDeparture is an integer
//     const submitData = {
//       ...tripData,
//       kmAtDeparture: parseInt(tripData.kmAtDeparture, 10)
//     };

//     try {
//       const response = await fetch(`${API_URL}/api/trips`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(submitData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create trip');
//       }

//       const result = await response.json();
//       setSubmissionStatus({
//         success: true,
//         error: null
//       });
      
//       console.log('Trip created successfully:', result);
//     } catch (error) {
//       setSubmissionStatus({
//         success: false,
//         error: error.message
//       });
//       console.error('Error creating trip:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto max-w-xl p-4">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-center">Request Trip</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Input 
//                 type="number" 
//                 name="employeeId"
//                 value={tripData.employeeId}
//                 onChange={handleInputChange}
//                 required 
//                 hidden
//               />
//             </div>
            
//             <div>
//               <Label>KM at Departure</Label>
//               <Input 
//                 type="number" 
//                 name="kmAtDeparture"
//                 value={tripData.kmAtDeparture}
//                 onChange={handleInputChange}
//                 required 
//                 min="0"
//               />
//             </div>
            
//             <div>
//               <Label>Reason</Label>
//               <Textarea
//                 name="reason"
//                 value={tripData.reason}
//                 onChange={handleInputChange}
//                 required 
//                 placeholder="Enter detailed reason for your trip"
//                 rows={4}
//               />
//             </div>
            
//             <div>
//               <Label>Itinerary</Label>
//               <Input 
//                 type="text" 
//                 name="itinerary"
//                 value={tripData.itinerary}
//                 onChange={handleInputChange}
//                 required 
//                 placeholder="Enter trip itinerary"
//               />
//             </div>
            
//             <div>
//               <Label>Departure Date</Label>
//               <Input 
//                 type="datetime-local" 
//                 name="departureDate"
//                 value={new Date(tripData.departureDate).toISOString().slice(0,16)}
//                 onChange={(e) => {
//                   const date = new Date(e.target.value);
//                   setTripData(prev => ({
//                     ...prev,
//                     departureDate: date.toISOString()
//                   }));
//                 }}
//                 required 
//               />
//             </div>
            
//             <div>
//               <Label>Return Date</Label>
//               <Input 
//                 type="datetime-local" 
//                 name="returnDate"
//                 value={new Date(tripData.returnDate).toISOString().slice(0,16)}
//                 onChange={(e) => {
//                   const date = new Date(e.target.value);
//                   setTripData(prev => ({
//                     ...prev,
//                     returnDate: date.toISOString()
//                   }));
//                 }}
//                 required 
//               />
//             </div>
            
//             {submissionStatus.error && (
//               <div className="text-red-500 text-sm">
//                 {submissionStatus.error}
//               </div>
//             )}
            
//             {submissionStatus.success && (
//               <div className="text-green-600 m-3 text-center bg-green-100 p-3 rounded text-sm">
//                 Trip created successfully!
//               </div>
//             )}
            
//             <Button type="submit" className="w-full">
//               Create Trip
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default TripForm;

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import API_URL from '../../constants/Constants';

const TripForm = ({ 
  initialEmployeeId = 7, 
  initialReason = '',
  initialItinerary = '',
  initialKmAtDeparture ='' 
}) => {
  const [tripData, setTripData] = useState({
    employeeId: initialEmployeeId,
    kmAtDeparture: initialKmAtDeparture,
    reason: initialReason,
    itinerary: initialItinerary,
    departureDate: new Date().toISOString(),
    returnDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours later
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    error: null,
    isLoading: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({
      ...prev,
      [name]: name === 'kmAtDeparture' ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Set loading state
    setSubmissionStatus(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      success: false
    }));
    
    // Ensure kmAtDeparture is an integer
    const submitData = {
      ...tripData,
      kmAtDeparture: parseInt(tripData.kmAtDeparture, 10)
    };

    try {
      const response = await fetch(`${API_URL}/api/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        throw new Error('Failed to create trip');
      }

      const result = await response.json();
      setSubmissionStatus({
        success: true,
        error: null,
        isLoading: false
      });
      
      console.log('Trip created successfully:', result);
    } catch (error) {
      setSubmissionStatus({
        success: false,
        error: error.message,
        isLoading: false
      });
      console.error('Error creating trip:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Request Trip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input 
                type="number" 
                name="employeeId"
                value={tripData.employeeId}
                onChange={handleInputChange}
                required 
                hidden
              />
            </div>
            
            <div>
              <Label>KM at Departure</Label>
              <Input 
                type="number" 
                name="kmAtDeparture"
                value={tripData.kmAtDeparture}
                onChange={handleInputChange}
                required 
                min="0"
              />
            </div>
            
            <div>
              <Label>Reason</Label>
              <Textarea
                name="reason"
                value={tripData.reason}
                onChange={handleInputChange}
                required 
                placeholder="Enter detailed reason for your trip"
                rows={4}
              />
            </div>
            
            <div>
              <Label>Itinerary</Label>
              <Input 
                type="text" 
                name="itinerary"
                value={tripData.itinerary}
                onChange={handleInputChange}
                required 
                placeholder="Enter trip itinerary"
              />
            </div>
            
            <div>
              <Label>Departure Date</Label>
              <Input 
                type="datetime-local" 
                name="departureDate"
                value={new Date(tripData.departureDate).toISOString().slice(0,16)}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setTripData(prev => ({
                    ...prev,
                    departureDate: date.toISOString()
                  }));
                }}
                required 
              />
            </div>
            
            <div>
              <Label>Return Date</Label>
              <Input 
                type="datetime-local" 
                name="returnDate"
                value={new Date(tripData.returnDate).toISOString().slice(0,16)}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setTripData(prev => ({
                    ...prev,
                    returnDate: date.toISOString()
                  }));
                }}
                required 
              />
            </div>
            
            {submissionStatus.error && (
              <div className="text-red-500 text-sm">
                {submissionStatus.error}
              </div>
            )}
            
            {submissionStatus.success && (
              <div className="text-green-600 m-3 text-center bg-green-100 p-3 rounded text-sm">
                Trip created successfully!
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={submissionStatus.isLoading}
            >
              {submissionStatus.isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Trip...
                </>
              ) : (
                'Create Trip'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TripForm;