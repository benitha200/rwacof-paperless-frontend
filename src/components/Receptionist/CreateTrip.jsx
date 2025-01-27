// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Loader2 } from 'lucide-react';
// import API_URL from '../../constants/Constants';

// const CreateTrip = ({ 
//   initialEmployeeId = 7, 
//   initialReason = '',
//   initialItinerary = '',
//   initialKmAtDeparture ='',
//   initialType='',
// }) => {
//   const [tripData, setTripData] = useState({
//     employeeId: initialEmployeeId,
//     type: '',
//     kmAtDeparture: initialKmAtDeparture,
//     reason: initialReason,
//     itinerary: initialItinerary,
//     departureDate: new Date().toISOString(),
//     returnDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours later
//   });

//   const [submissionStatus, setSubmissionStatus] = useState({
//     success: false,
//     error: null,
//     isLoading: false
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
    
//     // Set loading state
//     setSubmissionStatus(prev => ({
//       ...prev,
//       isLoading: true,
//       error: null,
//       success: false
//     }));
    
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
//         error: null,
//         isLoading: false
//       });
      
//       console.log('Trip created successfully:', result);
//     } catch (error) {
//       setSubmissionStatus({
//         success: false,
//         error: error.message,
//         isLoading: false
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

//           <div className='d-flex flex-col'>
//             <label>Type</label>
//               <select className='w-full border border-3 rounded p-2' name="type" value={tripData.type} onChange={handleInputChange} required>
//                 <option value="">Select Type</option>
//                 <option value="Local">UP-COUNTRY</option>
//                 <option value="International">LOCAL-KIGALI</option>
//               </select>
//             </div>
//             <div>
//                 <label>Employee</label>
//               <Input 
//                 type="number" 
//                 name="employeeId"
//                 value={tripData.employeeId}
//                 onChange={handleInputChange}
//                 required 
//                 // hidden
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
            
//             <Button 
//               type="submit" 
//               className="w-full" 
//               disabled={submissionStatus.isLoading}
//             >
//               {submissionStatus.isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Creating Trip...
//                 </>
//               ) : (
//                 'Create Trip'
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CreateTrip;

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import API_URL from '../../constants/Constants';

const CreateTrip = ({ 
  initialEmployeeId = 7,
  initialReason = '',
  initialItinerary = '',
  initialKmAtDeparture = '',
}) => {
  const [tripData, setTripData] = useState({
    employeeId: initialEmployeeId,
    requestType: '',
    unitDepartment: '',
    postPosition: '',
    reason: initialReason,
    itinerary: initialItinerary,
    transportMeans: '',
    kmAtDeparture: initialKmAtDeparture,
    departureDate: new Date().toISOString().split('T')[0],
    departureTime: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
    returnDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    returnTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
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
    setSubmissionStatus(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      success: false
    }));

    // Combine date and time fields
    const submitData = {
      ...tripData,
      kmAtDeparture: parseInt(tripData.kmAtDeparture, 10),
      departureDate: `${tripData.departureDate}T${tripData.departureTime}:00Z`,
      returnDate: `${tripData.returnDate}T${tripData.returnTime}:00Z`,
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
              <Label>Request Type</Label>
              <select 
                className="w-full border rounded p-2"
                name="requestType"
                value={tripData.requestType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="UP_COUNTRY">UP-COUNTRY</option>
                <option value="LOCAL">LOCAL-KIGALI</option>
              </select>
            </div>

            <div>
              <Label>Unit/Department</Label>
              <Input 
                type="text"
                name="unitDepartment"
                value={tripData.unitDepartment}
                onChange={handleInputChange}
                required
                placeholder="Enter your unit/department"
              />
            </div>

            {tripData.requestType === 'UP_COUNTRY' && (
              <div>
                <Label>Post/Position</Label>
                <Input 
                  type="text"
                  name="postPosition"
                  value={tripData.postPosition}
                  onChange={handleInputChange}
                  placeholder="Enter your position"
                />
              </div>
            )}

            <div>
              <Label>Transport Means</Label>
              <Input 
                type="text"
                name="transportMeans"
                value={tripData.transportMeans}
                onChange={handleInputChange}
                placeholder="Type of vehicle needed"
              />
            </div>

            <div>
              <Label>Reason for Travel</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Departure Date</Label>
                <Input 
                  type="date"
                  name="departureDate"
                  value={tripData.departureDate}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div>
                <Label>Departure Time</Label>
                <Input 
                  type="time"
                  name="departureTime"
                  value={tripData.departureTime}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Return Date</Label>
                <Input 
                  type="date"
                  name="returnDate"
                  value={tripData.returnDate}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div>
                <Label>Return Time</Label>
                <Input 
                  type="time"
                  name="returnTime"
                  value={tripData.returnTime}
                  onChange={handleInputChange}
                  required 
                />
              </div>
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

export default CreateTrip;
