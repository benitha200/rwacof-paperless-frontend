// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   CardFooter,
//   FormControl,
//   FormLabel,
//   Input,
//   VStack,
//   Select,
//   Text,
//   useToast,
//   Heading,
//   SimpleGrid,
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   PopoverBody,
//   InputGroup,
//   InputRightElement,
// } from "@chakra-ui/react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import API_URL from '../../constants/Constants';

// export default function ShipmentForm() {
//   const [shipment, setShipment] = useState({
//     containerNo: '',
//     truckNo: '',
//     description: 'RWANDA ARABICA COFFEE',
//     date: null
//   });
//   const navigate = useNavigate();
//   const toast = useToast();

//   useEffect(() => {
//     if (shipment.price && shipment.netWeight) {
//       const calculatedAmount = ((parseFloat(shipment.price) * 22.046) / 1000) * parseFloat(shipment.netWeight);
//       setShipment(prev => ({ ...prev, amount: calculatedAmount.toFixed(2) }));
//     }
//   }, [shipment.price, shipment.netWeight]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setShipment(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDateSelect = (date) => {
//     setShipment(prev => ({ ...prev, date }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formattedShipment = {
//       ...shipment,
//       // quantity: parseInt(shipment.quantity, 10),
//       // netWeight: parseFloat(shipment.netWeight),
//       // amount: parseFloat(shipment.amount),
//       // price: parseFloat(shipment.price),
//       date: shipment.date ? shipment.date.toISOString() : null,
//       userId: parseInt(localStorage.getItem('userId')),
//     };

//     try {
//       const response = await fetch(`${API_URL}/api/shipments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formattedShipment),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create shipment');
//       }

//       const data = await response.json();
//       toast({
//         title: "Shipment created",
//         description: "The shipment was successfully created.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//       navigate(`/shipments`);
//     } catch (error) {
//       console.error('Error creating shipment:', error);
//       toast({
//         title: "Error",
//         description: "Failed to create shipment. Please try again.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Card maxW="2xl" mx="auto">
//       <CardHeader>
//         <Heading size="lg">New Shipment</Heading>
//         <Text>Enter the details for a new shipment</Text>
//       </CardHeader>
//       <CardBody>
//         <form onSubmit={handleSubmit}>
//           <VStack spacing={4} align="stretch">
//             <SimpleGrid columns={2} spacing={4}>
//               <FormControl isRequired>
//                 <FormLabel htmlFor="containerNo">Container No</FormLabel>
//                 <Input id="containerNo" name="containerNo" value={shipment.containerNo} onChange={handleChange} />
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel htmlFor="truckNo">Truck No</FormLabel>
//                 <Input id="truckNo" name="truckNo" value={shipment.truckNo} onChange={handleChange} />
//               </FormControl>
//             </SimpleGrid>

//             <SimpleGrid columns={1} spacing={4}>
              
//               <FormControl isRequired>
//                 <FormLabel htmlFor="description">Description</FormLabel>
//                 <Input id="description" name="description" readOnly value={shipment.description} onChange={handleChange} />
//               </FormControl>
//             </SimpleGrid>

//             <FormControl isRequired>
//               <FormLabel htmlFor="date">Date</FormLabel>
//               <Popover variant="inline">
//                 <PopoverTrigger>
//                   <Button leftIcon={<CalendarIcon />} variant="outline" w="full" justifyContent="start">
//                     {shipment.date ? format(shipment.date, "PPP") : "Pick a date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className='w-full'>
//                   <PopoverBody>
//                     <div className='w-full'>
//                       <DatePicker
//                       selected={shipment.date}
//                       onChange={handleDateSelect}
//                       inline
//                       showMonthDropdown
//                       forceShowMonthNavigation
//                     />
//                     </div>
                    
//                   </PopoverBody>
//                 </PopoverContent>
//               </Popover>
//             </FormControl>
//           </VStack>
//         </form>
//       </CardBody>
//       <CardFooter>
//         <Button colorScheme="teal" onClick={handleSubmit} w="full">Save Shipment</Button>
//       </CardFooter>
//     </Card>
//   );
// }

import React, { useState, useEffect } from 'react';
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import API_URL from '../../constants/Constants';
import { useToast } from '@chakra-ui/react';
import { useNavigate,useLocation } from 'react-router-dom';


const ShipmentForm = () => {
  const location = useLocation();
  const { contractId, contractNumber,contractPrice } = location.state || {};
  
  const [shipment, setShipment] = useState({
    containerNo: '',
    truckNo: '',
    description: 'RWANDA ARABICA COFFEE',
    lotNo: '',
    quantity: '',
    quantityUnit: '',
    netWeight: '',
    netWeightUnit: '',
    amount: '',
    price: '',
    consignee: '',
    date: null,
  });
  
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked");

    if (!contractId) {
      toast({
        title: "Error",
        description: "Contract ID is required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formattedShipment = {
      containerNo: shipment.containerNo,
      truckNo: shipment.truckNo,
      description: shipment.description,
      lotNo: shipment.lotNo || undefined,
      quantity: shipment.quantity ? parseInt(shipment.quantity, 10) : undefined,
      quantityUnit: shipment.quantityUnit || undefined,
      netWeight: shipment.netWeight ? parseFloat(shipment.netWeight) : undefined,
      netWeightUnit: shipment.netWeightUnit || undefined,
      amount: shipment.amount ? parseFloat(shipment.amount) : undefined,
      price: shipment.price ? parseFloat(shipment.price) : undefined,
      consignee: shipment.consignee || undefined,
      date: shipment.date ? shipment.date.toISOString() : new Date().toISOString(),
      userId: parseInt(localStorage.getItem('userId')),
    };

    try {
      // Note: Using the contract-specific endpoint
      const response = await fetch(`${API_URL}/api/contracts/${contractId}/shipments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedShipment),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create shipment');
      }

      const data = await response.json();
      toast({
        title: "Shipment created",
        description: "The shipment was successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/shipments`);
    } catch (error) {
      console.error('Error creating shipment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create shipment. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("button clicked")

  //   const formattedShipment = {
  //     ...shipment,
  //     // quantity: parseInt(shipment.quantity, 10),
  //     // netWeight: parseFloat(shipment.netWeight),
  //     // amount: parseFloat(shipment.amount),
  //     // price: parseFloat(shipment.price),
  //     date: shipment.date ? shipment.date.toISOString() : null,
  //     userId: parseInt(localStorage.getItem('userId')),
  //   };

  //   try {
  //     const response = await fetch(`${API_URL}/api/shipments`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formattedShipment),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create shipment');
  //     }

  //     const data = await response.json();
  //     toast({
  //       title: "Shipment created",
  //       description: "The shipment was successfully created.",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     navigate(`/shipments`);
  //   } catch (error) {
  //     console.error('Error creating shipment:', error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to create shipment. Please try again.",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // };



  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-gray-700">New Shipment</CardTitle>
        <CardDescription className="font-normal tracking-wide text-sm">
          Enter the details for a new shipment - Contract #{contractNumber}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="containerNo" className="text-sm font-normal text-gray-600">
                Container No
              </Label>
              <Input
                id="containerNo"
                name="containerNo"
                value={shipment.containerNo}
                onChange={handleChange}
                className="font-normal text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="truckNo" className="text-sm font-normal text-gray-600">
                Truck No
              </Label>
              <Input
                id="truckNo"
                name="truckNo"
                value={shipment.truckNo}
                onChange={handleChange}
                className="font-normal text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-normal text-gray-600">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={shipment.description}
              onChange={handleChange}
              className="font-normal text-sm text-gray-600"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-normal text-gray-600">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal text-sm"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {shipment.date ? (
                    format(shipment.date, "PPP")
                  ) : (
                    <span className="text-muted-foreground text-gray-700">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={shipment.date}
                  onSelect={(date) => setShipment(prev => ({ ...prev, date }))}
                  initialFocus
                  className="rounded-md border shadow bg-white text-gray-800"
                  classNames={{
                    months: "space-y-4 mx-1",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center gap-1",
                    caption_label: "font-normal text-sm",
                    nav: "flex items-center gap-1",
                    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse",
                    head_row: "flex font-normal text-muted-foreground",
                    head_cell: "w-9 font-normal text-[0.8rem] text-muted-foreground",
                    row: "flex w-full",
                    cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "opacity-50",
                    day_disabled: "opacity-50",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                  components={{
                    IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                    IconRight: () => <ChevronRight className="h-4 w-4" />,
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full font-normal tracking-wide text-sm bg-teal-600 hover:bg-teal-700"
        >
          Save Shipment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShipmentForm;