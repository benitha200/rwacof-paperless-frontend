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
//     lotNo: '',
//     description: 'RWANDA ARABIC COFFEE',
//     quantity: '',
//     quantityUnit: 'bags',
//     netWeight: '',
//     netWeightUnit: 'Kgs',
//     amount: '',
//     price: '',
//     consignee: '',
//     date: null
//   });
//   const navigate = useNavigate();
//   const toast = useToast();

//   const quantityUnits = ['Big Bags','Jute Bags','Jute Bags (Grain Pro) ','Bulk'];
//   const PackagingType = ['Big Bags','Jute Bags','Jute Bags (Grain Pro) ','Bulk'];
//   // const PackagingType = ['Big Bags','Jute Bags','Jute Bags/60kg','Jute Bags/60kg','Bulk', 'Kgs'];
//   const weightUnits = ['Kgs', 'Bags'];

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
//       quantity: parseInt(shipment.quantity, 10),
//       netWeight: parseFloat(shipment.netWeight),
//       amount: parseFloat(shipment.amount),
//       price: parseFloat(shipment.price),
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
//       navigate(`/shipments/${data.id}`);
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

//             <SimpleGrid columns={2} spacing={4}>
//               <FormControl isRequired>
//                 <FormLabel htmlFor="lotNo">Lot No</FormLabel>
//                 <Input id="lotNo" name="lotNo" value={shipment.lotNo} onChange={handleChange} />
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel htmlFor="description">Description</FormLabel>
//                 <Input id="description" name="description" value={shipment.description} onChange={handleChange} />
//               </FormControl>
//             </SimpleGrid>

//             <SimpleGrid columns={4} spacing={4}>
//               <FormControl isRequired>
//                 <FormLabel htmlFor="quantity">Quantity</FormLabel>
//                 <InputGroup>
//                   <Input id="quantity" name="quantity" type="number" value={shipment.quantity} onChange={handleChange} />
//                   {/* <InputRightElement width="7rem">
//                     <Select name="quantityUnit" value={shipment.quantityUnit} onChange={handleChange} >
//                       {PackagingType.map((unit) => (
//                         <option key={unit} value={unit}>{unit}</option>
//                       ))}
//                     </Select>
//                   </InputRightElement> */}
//                 </InputGroup>
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel htmlFor="quantity">Packaging Type</FormLabel>
//                 <InputGroup>
//                   {/* <Input id="quantity" name="quantity" type="number" value={shipment.quantity} onChange={handleChange} /> */}
//                     <Select name="quantityUnit" value={shipment.quantityUnit} onChange={handleChange} >
//                       {PackagingType.map((unit) => (
//                         <option key={unit} value={unit}>{unit}</option>
//                       ))}
//                     </Select>
//                 </InputGroup>
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel htmlFor="netWeight">Net Weight</FormLabel>
//                 <InputGroup>
//                   <Input id="netWeight" name="netWeight" type="number" step="0.01" value={shipment.netWeight} onChange={handleChange} />
//                   <InputRightElement width="6rem">
//                     <Select name="netWeightUnit" value={shipment.netWeightUnit} onChange={handleChange}>
//                       {weightUnits.map((unit) => (
//                         <option key={unit} value={unit}>{unit}</option>
//                       ))}
//                     </Select>
//                   </InputRightElement>
//                 </InputGroup>
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel htmlFor="price">Price</FormLabel>
//                 <InputGroup>
//                   <Input id="price" name="price" type="number" step="0.01" value={shipment.price} onChange={handleChange} />
//                   <InputRightElement width="4.5rem">
//                     <Text fontSize="sm">USC/LB</Text>
//                   </InputRightElement>
//                 </InputGroup>
//               </FormControl>
//             </SimpleGrid>

//             <FormControl isRequired>
//               <FormLabel htmlFor="amount">Amount</FormLabel>
//               <InputGroup>
//                 <Input id="amount" name="amount" type="number" step="0.01" value={shipment.amount} readOnly />
//                 <InputRightElement width="4.5rem">
//                   <Text fontSize="sm">USD</Text>
//                 </InputRightElement>
//               </InputGroup>
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel htmlFor="consignee">Consignee</FormLabel>
//               <Select name="consignee" value={shipment.consignee} onChange={handleChange}>
//                 <option value="">Select a consignee</option>
//                 <option value="Sucafina SA">Sucafina SA</option>
//                 <option value="Sucafina NV">Sucafina NV</option>
//                 <option value="Sucafina UK">Sucafina UK</option>
//               </Select>
//             </FormControl>

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
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Text,
  useToast,
  Heading,
  SimpleGrid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API_URL from '../../constants/Constants';

export default function ShipmentForm() {
  const [shipment, setShipment] = useState({
    containerNo: '',
    truckNo: '',
    description: 'RWANDA ARABIC COFFEE',
    date: null
  });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (shipment.price && shipment.netWeight) {
      const calculatedAmount = ((parseFloat(shipment.price) * 22.046) / 1000) * parseFloat(shipment.netWeight);
      setShipment(prev => ({ ...prev, amount: calculatedAmount.toFixed(2) }));
    }
  }, [shipment.price, shipment.netWeight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipment(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date) => {
    setShipment(prev => ({ ...prev, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedShipment = {
      ...shipment,
      // quantity: parseInt(shipment.quantity, 10),
      // netWeight: parseFloat(shipment.netWeight),
      // amount: parseFloat(shipment.amount),
      // price: parseFloat(shipment.price),
      date: shipment.date ? shipment.date.toISOString() : null,
      userId: parseInt(localStorage.getItem('userId')),
    };

    try {
      const response = await fetch(`${API_URL}/api/shipments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedShipment),
      });

      if (!response.ok) {
        throw new Error('Failed to create shipment');
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
        description: "Failed to create shipment. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Card maxW="2xl" mx="auto">
      <CardHeader>
        <Heading size="lg">New Shipment</Heading>
        <Text>Enter the details for a new shipment</Text>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <SimpleGrid columns={2} spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="containerNo">Container No</FormLabel>
                <Input id="containerNo" name="containerNo" value={shipment.containerNo} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="truckNo">Truck No</FormLabel>
                <Input id="truckNo" name="truckNo" value={shipment.truckNo} onChange={handleChange} />
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={1} spacing={4}>
              
              <FormControl isRequired>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input id="description" name="description" readOnly value={shipment.description} onChange={handleChange} />
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired>
              <FormLabel htmlFor="date">Date</FormLabel>
              <Popover variant="inline">
                <PopoverTrigger>
                  <Button leftIcon={<CalendarIcon />} variant="outline" w="full" justifyContent="start">
                    {shipment.date ? format(shipment.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full'>
                  <PopoverBody>
                    <div className='w-full'>
                      <DatePicker
                      selected={shipment.date}
                      onChange={handleDateSelect}
                      inline
                      showMonthDropdown
                      forceShowMonthNavigation
                    />
                    </div>
                    
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </FormControl>
          </VStack>
        </form>
      </CardBody>
      <CardFooter>
        <Button colorScheme="teal" onClick={handleSubmit} w="full">Save Shipment</Button>
      </CardFooter>
    </Card>
  );
}