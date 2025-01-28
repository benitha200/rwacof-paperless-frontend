
// import React, { useState, useEffect } from 'react';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Loader2 } from 'lucide-react';
// import API_URL from '../../constants/Constants';
// import { ArrowBack } from '@mui/icons-material';

// const CreateTrip = ({
//     initialEmployeeId = 7,
//     initialReason = '',
//     initialItinerary = '',
// }) => {
//     const [departments, setDepartments] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [selectedDepartment, setSelectedDepartment] = useState('');
//     const [tripData, setTripData] = useState({
//         employeeId: initialEmployeeId,
//         requestType: '',
//         unitDepartment: '',
//         postPosition: '',
//         reason: initialReason,
//         itinerary: initialItinerary,
//         transportMeans: '',
//         departureDate: new Date().toISOString().split('T')[0],
//         departureTime: '',
//         // departurePeriod: 'AM',
//         returnTime: '',
//         // returnPeriod: 'AM',
//         returnDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//         supervisorApproval: true
//     });

//     const [submissionStatus, setSubmissionStatus] = useState({
//         success: false,
//         error: null,
//         isLoading: false
//     });

//     // Fetch departments
//     useEffect(() => {
//         const fetchDepartments = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/api/departments`);
//                 const data = await response.json();
//                 setDepartments(data);
//             } catch (error) {
//                 console.error('Error fetching departments:', error);
//             }
//         };
//         fetchDepartments();
//     }, []);

//     // Fetch employees when department is selected
//     useEffect(() => {
//         const fetchEmployees = async () => {
//             if (selectedDepartment) {
//                 try {
//                     const response = await fetch(`${API_URL}/api/employees/department/${selectedDepartment}`);
//                     const data = await response.json();
//                     setEmployees(data);
//                 } catch (error) {
//                     console.error('Error fetching employees:', error);
//                 }
//             } else {
//                 setEmployees([]);
//             }
//         };
//         fetchEmployees();
//     }, [selectedDepartment]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'unitDepartment') {
//             setSelectedDepartment(value);
//         }
//         setTripData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmissionStatus(prev => ({
//             ...prev,
//             isLoading: true,
//             error: null,
//             success: false
//         }));

//         // Convert 12-hour time to 24-hour format
//         const convertTo24Hour = (time, period) => {
//             if (!time) return '00:00:00';
//             let [hours, minutes] = time.split(':');
//             hours = parseInt(hours);
            
//             if (period === 'PM' && hours !== 12) {
//                 hours += 12;
//             } else if (period === 'AM' && hours === 12) {
//                 hours = 0;
//             }
            
//             return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
//         };

//         const submitData = {
//             ...tripData,
//             employeeId: parseInt(tripData.employeeId),
//             departureDate: `${tripData.departureDate}T${convertTo24Hour(tripData.departureTime, tripData.departurePeriod)}Z`,
//             returnDate: `${tripData.returnDate}T${convertTo24Hour(tripData.returnTime, tripData.returnPeriod)}Z`,
//             supervisorApproval: true
//         };

//         try {
//             const response = await fetch(`${API_URL}/api/trips`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(submitData)
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create trip');
//             }

//             const result = await response.json();
//             setSubmissionStatus({
//                 success: true,
//                 error: null,
//                 isLoading: false
//             });

//             console.log('Trip created successfully:', result);
//         } catch (error) {
//             setSubmissionStatus({
//                 success: false,
//                 error: error.message,
//                 isLoading: false
//             });
//             console.error('Error creating trip:', error);
//         }
//     };


//     return (
//         <div>
//             <Button className="mt-4"><a href='/ongoing/trips'><ArrowBack fontSize='12'/> Back to Trips</a></Button>
//             <div className="container mx-auto max-w-2xl p-4">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="text-center">Request Trip</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                                 <Label>Request Type</Label>
//                                 <select
//                                     className="w-full border rounded p-2"
//                                     name="requestType"
//                                     value={tripData.requestType}
//                                     onChange={handleInputChange}
//                                     required
//                                 >
//                                     <option value="">Select Type</option>
//                                     <option value="UP_COUNTRY">UP-COUNTRY</option>
//                                     <option value="LOCAL">LOCAL-KIGALI</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <Label>Unit/Department</Label>
//                                 <select
//                                     className="w-full border rounded p-2"
//                                     name="unitDepartment"
//                                     value={tripData.unitDepartment}
//                                     onChange={handleInputChange}
//                                     required
//                                 >
//                                     <option value="">Select Department</option>
//                                     {departments.map(dept => (
//                                         <option key={dept.id} value={dept.id}>
//                                             {dept.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <Label>Employee</Label>
//                                 <select
//                                     className="w-full border rounded p-2"
//                                     name="employeeId"
//                                     value={tripData.employeeId}
//                                     onChange={handleInputChange}
//                                     required
//                                 >
//                                     <option value="">Select Employee</option>
//                                     {employees.map(emp => (
//                                         <option key={emp.id} value={emp.id}>
//                                             {emp.user.firstName} {emp.user.lastName}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {tripData.requestType === 'UP_COUNTRY' && (
//                                 <div>
//                                     <Label>Post/Position</Label>
//                                     <Input
//                                         type="text"
//                                         name="postPosition"
//                                         value={tripData.postPosition}
//                                         onChange={handleInputChange}
//                                         placeholder="Enter your position"
//                                     />
//                                 </div>
//                             )}

//                             <div>
//                                 <Label>Transport Means</Label>
//                                 <Input
//                                     type="text"
//                                     name="transportMeans"
//                                     value={tripData.transportMeans}
//                                     onChange={handleInputChange}
//                                     placeholder="Type of vehicle needed"
//                                 />
//                             </div>

//                             <div>
//                                 <Label>Reason for Travel</Label>
//                                 <Textarea
//                                     name="reason"
//                                     value={tripData.reason}
//                                     onChange={handleInputChange}
//                                     required
//                                     placeholder="Enter detailed reason for your trip"
//                                     rows={4}
//                                 />
//                             </div>

//                             <div>
//                                 <Label>Itinerary</Label>
//                                 <Input
//                                     type="text"
//                                     name="itinerary"
//                                     value={tripData.itinerary}
//                                     onChange={handleInputChange}
//                                     required
//                                     placeholder="Enter trip itinerary"
//                                 />
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <Label>Departure Date</Label>
//                                     <Input
//                                         type="date"
//                                         name="departureDate"
//                                         value={tripData.departureDate}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <div className="flex-1">
//                                         <Label>Departure Time</Label>
//                                         <Input
//                                             type="time"
//                                             name="departureTime"
//                                             value={tripData.departureTime}
//                                             onChange={handleInputChange}
//                                             required
//                                         />
//                                     </div>
//                                     {/* <div className="w-20">
//                                         <Label>Period</Label>
//                                         <select
//                                             className="w-full border rounded p-2"
//                                             name="departurePeriod"
//                                             value={tripData.departurePeriod}
//                                             onChange={handleInputChange}
//                                         >
//                                             <option value="AM">AM</option>
//                                             <option value="PM">PM</option>
//                                         </select>
//                                     </div> */}
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <Label>Return Date</Label>
//                                     <Input
//                                         type="date"
//                                         name="returnDate"
//                                         value={tripData.returnDate}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <div className="flex-1">
//                                         <Label>Return Time</Label>
//                                         <Input
//                                             type="time"
//                                             name="returnTime"
//                                             value={tripData.returnTime}
//                                             onChange={handleInputChange}
//                                             required
//                                         />
//                                     </div>
//                                     {/* <div className="w-20">
//                                         <Label>Period</Label>
//                                         <select
//                                             className="w-full border rounded p-2"
//                                             name="returnPeriod"
//                                             value={tripData.returnPeriod}
//                                             onChange={handleInputChange}
//                                         >
//                                             <option value="AM">AM</option>
//                                             <option value="PM">PM</option>
//                                         </select>
//                                     </div> */}
//                                 </div>
//                             </div>

//                             {submissionStatus.error && (
//                                 <div className="text-red-500 text-sm">
//                                     {submissionStatus.error}
//                                 </div>
//                             )}

//                             {submissionStatus.success && (
//                                 <div className="text-green-600 m-3 text-center bg-green-100 p-3 rounded text-sm">
//                                     Trip created successfully!
//                                 </div>
//                             )}

//                             <Button
//                                 type="submit"
//                                 className="w-full"
//                                 disabled={submissionStatus.isLoading}
//                             >
//                                 {submissionStatus.isLoading ? (
//                                     <>
//                                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                         Creating Trip...
//                                     </>
//                                 ) : (
//                                     'Create Trip'
//                                 )}
//                             </Button>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default CreateTrip;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import API_URL from '../../constants/Constants';
import { ArrowBack } from '@mui/icons-material';

const CreateTrip = ({
    initialEmployeeId = 7,
    initialReason = '',
    initialItinerary = '',
}) => {
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [tripData, setTripData] = useState({
        employeeId: initialEmployeeId,
        requestType: '',
        unitDepartment: '',
        postPosition: '',
        reason: initialReason,
        itinerary: initialItinerary,
        transportMeans: '',
        departureDate: new Date().toISOString().split('T')[0],
        departureTime: '',
        returnTime: '',
        returnDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        supervisorApproval: true
    });

    const [submissionStatus, setSubmissionStatus] = useState({
        success: false,
        error: null,
        isLoading: false
    });

    // Fetch departments
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch(`${API_URL}/api/departments`);
                const data = await response.json();
                setDepartments(data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        fetchDepartments();
    }, []);

    // Fetch employees when department is selected
    useEffect(() => {
        const fetchEmployees = async () => {
            if (selectedDepartment) {
                try {
                    const response = await fetch(`${API_URL}/api/employees/department/${selectedDepartment}`);
                    const data = await response.json();
                    setEmployees(data);
                } catch (error) {
                    console.error('Error fetching employees:', error);
                }
            } else {
                setEmployees([]);
            }
        };
        fetchEmployees();
    }, [selectedDepartment]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'unitDepartment') {
            const selectedDept = departments.find(dept => dept.id === parseInt(value));
            if (selectedDept) {
                setSelectedDepartment(value);
                setTripData(prev => ({
                    ...prev,
                    unitDepartment: selectedDept.name // Store the department name directly
                }));
            }
        } else {
            setTripData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus(prev => ({
            ...prev,
            isLoading: true,
            error: null,
            success: false
        }));

        const convertTo24Hour = (time, period) => {
            if (!time) return '00:00:00';
            let [hours, minutes] = time.split(':');
            hours = parseInt(hours);
            
            if (period === 'PM' && hours !== 12) {
                hours += 12;
            } else if (period === 'AM' && hours === 12) {
                hours = 0;
            }
            
            return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
        };

        // Ensure department name is included in submission
        if (!tripData.unitDepartment) {
            setSubmissionStatus({
                success: false,
                error: 'Please select a department',
                isLoading: false
            });
            return;
        }

        const submitData = {
            ...tripData,
            employeeId: parseInt(tripData.employeeId),
            departureDate: `${tripData.departureDate}T${convertTo24Hour(tripData.departureTime, tripData.departurePeriod)}Z`,
            returnDate: `${tripData.returnDate}T${convertTo24Hour(tripData.returnTime, tripData.returnPeriod)}Z`,
            supervisorApproval: true
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
        <div>
            <Button className="mt-4"><a href='/ongoing/trips'><ArrowBack fontSize='12'/> Back to Trips</a></Button>
            <div className="container mx-auto max-w-2xl p-4">
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
                                <select
                                    className="w-full border rounded p-2"
                                    name="unitDepartment"
                                    value={selectedDepartment}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label>Employee</Label>
                                <select
                                    className="w-full border rounded p-2"
                                    name="employeeId"
                                    value={tripData.employeeId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.user.firstName} {emp.user.lastName}
                                        </option>
                                    ))}
                                </select>
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
                                <div className="flex gap-2">
                                    <div className="flex-1">
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
                                <div className="flex gap-2">
                                    <div className="flex-1">
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
        </div>
    );
};

export default CreateTrip;