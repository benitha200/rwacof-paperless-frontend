import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Input,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    FormControl,
    FormLabel,
    Button,
    Image,
    Container,
    Divider,
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepIcon,
    StepNumber,
    StepTitle,
    StepDescription,
    StepSeparator,
    useToast,
    useBreakpointValue,
    SimpleGrid,
} from '@chakra-ui/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API_URL from '../../../constants/Constants';
import logo from './../../../../assets/img/logo.png';

const EditableField = ({ label, name, value, onChange, type = "text" }) => (
    <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
        />
    </FormControl>
);

const GRN = () => {
    const [formData, setFormData] = useState({
        receivedDate: new Date(),
        supplierName: 'IMPEXCOR',
        supplierAddress: 'Kigali City',
        plate_no: 'RAE345A',
        wbridgeRef: '',
        moisture: '12.3',
        parch: '14.4',
        coffee_type: 'ARABICA PARCH FW',
        bags: '100',
        quantity: '6000',
        quantityUnit: 'kgs',
        totalWeight: '6000',
        weightUnit: 'kgs',
        lessNoOfBags: '100',
        subGrossKg: '5980',
        lessMoistureKg: '',
        lessQualityKg: '',
        netWeightKg: '5980',
        cheque_in_favor_of: 'Rwacof',
        payment_weight: '5980',
        payment_quantity: '5980',
        payment_rate: '4500',
        payment_amount: '675600',
        paymentDate: new Date(),
        drAc: '',
        qualityGrade: 'Grade A',
        rate: '10',
        preparedById: 1,
        checkedById: 1,
        authorizedById: 1,
        receivedById: 1,
        remarks: '',
        status: 'Received',
        currentStep: 0,
    });

    const [activeStep, setActiveStep] = useState(0);
    const toast = useToast();

    const steps = [
        { title: 'Receive', description: 'Weight Bridge Manager' },
        { title: 'Quality', description: 'Quality Manager' },
        { title: 'Document', description: 'COO' },
        { title: 'Approve', description: 'Managing Director' },
        { title: 'Payment', description: 'Finance' },
    ];

    const orientation = useBreakpointValue({ base: 'vertical', md: 'horizontal' });
    const stepperWidth = useBreakpointValue({ base: '100%', md: '90%', lg: '80%' });
    const stackDirection = useBreakpointValue({ base: "column", md: "row" });
    const spacing = useBreakpointValue({ base: 4, md: 6 });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (date, name) => {
        setFormData((prevData) => ({ ...prevData, [name]: date }));
    };

    const calculateAmount = () => {
        const paymentQuantity = parseFloat(formData.payment_quantity);
        const paymentRate = parseFloat(formData.payment_rate);
        return isNaN(paymentQuantity) || isNaN(paymentRate) ? '0' : (paymentQuantity * paymentRate).toFixed(2);
    };

    const coffeeTypeOptions = [
        'Arabica parch fully',
        'Arabica green',

    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const transformedData = {
                ...formData,
                receivedDate: formData.receivedDate.toISOString(),
                paymentDate: formData.paymentDate.toISOString(),
                quantity: parseInt(formData.quantity, 10),
                bags: parseInt(formData.bags, 10),
                lessNoOfBags: parseInt(formData.lessNoOfBags, 10) || 0,
                subGrossKg: parseInt(formData.subGrossKg, 10),
                lessMoistureKg: parseInt(formData.lessMoistureKg, 10) || 0,
                lessQualityKg: parseInt(formData.lessQualityKg, 10) || 0,
                netWeightKg: parseInt(formData.netWeightKg, 10),
                payment_quantity: parseInt(formData.payment_quantity, 10),
                payment_rate: parseInt(formData.payment_rate, 10),
                payment_amount: parseInt(formData.payment_amount, 10),
                drAc: parseInt(formData.drAc, 10),
                rate: parseInt(formData.rate, 10),
                moisture: parseFloat(formData.moisture),
                parch: parseFloat(formData.parch) || null,
                totalWeight: parseFloat(formData.totalWeight),
            };
    
            // Get the token from localStorage (or wherever you store it)
            const token = localStorage.getItem('token'); // Adjust this if you store the token differently
    
            // Set up the config object for axios, including the Authorization header
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
    
            const response = await axios.post(`${API_URL}/api/grn`, transformedData, config);
            
            toast({
                title: "GRN submitted successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setActiveStep(5);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                error.response.data.errors.forEach((err) => {
                    toast({
                        title: "Error",
                        description: err.msg,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                });
            } else {
                toast({
                    title: "Error submitting GRN.",
                    description: "An unexpected error occurred.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const transformedData = {
    //             ...formData,
    //             receivedDate: formData.receivedDate.toISOString(),
    //             paymentDate: formData.paymentDate.toISOString(),
    //             quantity: parseInt(formData.quantity, 10),
    //             bags: parseInt(formData.bags, 10),
    //             lessNoOfBags: parseInt(formData.lessNoOfBags, 10) || 0,
    //             subGrossKg: parseInt(formData.subGrossKg, 10),
    //             lessMoistureKg: parseInt(formData.lessMoistureKg, 10) || 0,
    //             lessQualityKg: parseInt(formData.lessQualityKg, 10) || 0,
    //             netWeightKg: parseInt(formData.netWeightKg, 10),
    //             payment_quantity: parseInt(formData.payment_quantity, 10),
    //             payment_rate: parseInt(formData.payment_rate, 10),
    //             payment_amount: parseInt(formData.payment_amount, 10),
    //             drAc: parseInt(formData.drAc, 10),
    //             rate: parseInt(formData.rate, 10),
    //             moisture: parseFloat(formData.moisture),
    //             parch: parseFloat(formData.parch) || null,
    //             totalWeight: parseFloat(formData.totalWeight),
    //         };

    //         const response = await axios.post(`${API_URL}/api/grn`, transformedData);
    //         toast({
    //             title: "GRN submitted successfully.",
    //             status: "success",
    //             duration: 3000,
    //             isClosable: true,
    //         });
    //         setActiveStep(5); // Move to the final step after successful submission
    //     } catch (error) {
    //         if (error.response && error.response.data && error.response.data.errors) {
    //             error.response.data.errors.forEach((err) => {
    //                 toast({
    //                     title: "Error",
    //                     description: err.msg,
    //                     status: "error",
    //                     duration: 5000,
    //                     isClosable: true,
    //                 });
    //             });
    //         } else {
    //             toast({
    //                 title: "Error submitting GRN.",
    //                 description: "An unexpected error occurred.",
    //                 status: "error",
    //                 duration: 5000,
    //                 isClosable: true,
    //             });
    //         }
    //     }
    // };


    return (
        <Container maxW="6xl" py={6}>
            <form onSubmit={handleSubmit}>
                <Box bg="white" shadow="lg" rounded="lg" p={6}>
                    <VStack spacing={4} align="stretch">
                        <HStack justify="space-between" align="start" direction={stackDirection} spacing={4} wrap="wrap">
                            <HStack spacing={4} align="center" direction={stackDirection}>
                                <Image src={logo} alt="Company Logo" boxSize={{ base: "100px", md: "120px" }} width={{ base: "120px", md: "150px" }} />
                                <Box textAlign={{ base: "center", md: "left" }}>
                                    <Heading as="h1" size="lg">RWACOF EXPORTS LTD</Heading>
                                    <Text fontSize="sm">P.O BOX:6934 KIGALI</Text>
                                    <Text fontSize="sm">Tel:+250 252 575872/ Fax: 0252 572024</Text>
                                </Box>
                            </HStack>
                            <Box border="1px" borderColor="gray.300" p={2} rounded="md" width={{ base: "100%", md: "auto" }} mt={{ base: 4, md: 0 }}>
                                <Text fontWeight="semibold">SOURCE</Text>
                                <Divider my={2} />
                                <Text fontWeight="semibold">Kigali</Text>
                            </Box>
                        </HStack>

                        <Heading as="h2" size="xl" textAlign="center" my={6} color="teal.600">
                            GOODS RECEIVED NOTE
                        </Heading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={spacing}>
                            <FormControl>
                                <FormLabel>RECEIVED DATE</FormLabel>
                                <DatePicker
                                    selected={formData.receivedDate}
                                    onChange={(date) => handleDateChange(date, 'receivedDate')}
                                    dateFormat="yyyy-MM-dd"
                                    customInput={<Input />}
                                />
                            </FormControl>
                            <EditableField label="SUPPLIER NAME" name="supplierName" value={formData.supplierName} onChange={handleInputChange} />
                        </SimpleGrid>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={spacing}>
                            <EditableField label="SUPPLIER ADDRESS" name="supplierAddress" value={formData.supplierAddress} onChange={handleInputChange} />
                            <EditableField label="PLATE NO" name="plate_no" value={formData.plate_no} onChange={handleInputChange} />
                        </SimpleGrid>

                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={spacing}>
                            <EditableField label="W.BRIDGE REF" name="wbridgeRef" value={formData.wbridgeRef} onChange={handleInputChange} />
                            <EditableField label="MOISTURE" name="moisture" value={formData.moisture} onChange={handleInputChange} />
                            <EditableField label="PARCH" name="parch" value={formData.parch} onChange={handleInputChange} />
                        </SimpleGrid>

                        <Box overflowX="auto">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>TYPE OF COFFEE</Th>
                                        <Th>BAGS</Th>
                                        <Th>QUANTITY</Th>
                                        <Th>UNIT</Th>
                                        <Th>TOTAL WEIGHT</Th>
                                        <Th>WEIGHT UNIT</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>
                                            <Select
                                                name="coffee_type"
                                                value={formData.coffee_type}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select coffee type</option>
                                                {coffeeTypeOptions.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </Select>
                                        </Td>
                                        <Td>
                                            <Input name="bags" value={formData.bags} onChange={handleInputChange} />
                                        </Td>
                                        <Td>
                                            <Input name="quantity" value={formData.quantity} onChange={handleInputChange} />
                                        </Td>
                                        <Td>
                                            <Input name="quantityUnit" value={formData.quantityUnit} onChange={handleInputChange} />
                                        </Td>
                                        <Td>
                                            <Input name="totalWeight" value={formData.totalWeight} onChange={handleInputChange} />
                                        </Td>
                                        <Td>
                                            <Input name="weightUnit" value={formData.weightUnit} onChange={handleInputChange} />
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Box>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={spacing}>
                            <EditableField label="LESS NO OF BAGS" name="lessNoOfBags" value={formData.lessNoOfBags} onChange={handleInputChange} />
                            <EditableField label="SUB GROSS KG" name="subGrossKg" value={formData.subGrossKg} onChange={handleInputChange} />
                        </SimpleGrid>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={spacing}>
                            <EditableField label="LESS MOISTURE KG" name="lessMoistureKg" value={formData.lessMoistureKg} onChange={handleInputChange} />
                            <EditableField label="LESS QUALITY KG" name="lessQualityKg" value={formData.lessQualityKg} onChange={handleInputChange} />
                        </SimpleGrid>

                        <EditableField label="NET WEIGHT KG" name="netWeightKg" value={formData.netWeightKg} onChange={handleInputChange} />

                        <Heading as="h3" size="lg" mb={4} color="teal.600">PAYMENT VOUCHER</Heading>

                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={spacing}>
                            <EditableField label="PAYMENT WEIGHT" name="payment_weight" value={formData.payment_weight} onChange={handleInputChange} />
                            <EditableField label="PAYMENT QUANTITY" name="payment_quantity" value={formData.payment_quantity} onChange={handleInputChange} />
                            <EditableField label="PAYMENT RATE" name="payment_rate" value={formData.payment_rate} onChange={handleInputChange} />
                        </SimpleGrid>

                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={spacing}>
                            <EditableField label="PAYMENT AMOUNT" name="payment_amount" value={calculateAmount()} readOnly />
                            <FormControl>
                                <FormLabel>PAYMENT DATE</FormLabel>
                                <DatePicker
                                    selected={formData.paymentDate}
                                    onChange={(date) => handleDateChange(date, 'paymentDate')}
                                    dateFormat="yyyy-MM-dd"
                                    customInput={<Input />}
                                />
                            </FormControl>
                            <EditableField label="DR. A/C" name="drAc" value={formData.drAc} onChange={handleInputChange} />
                        </SimpleGrid>

                        <EditableField label="CHEQUE IN FAVOUR OF" name="cheque_in_favor_of" value={formData.cheque_in_favor_of} onChange={handleInputChange} />
                        <EditableField label="QUALITY GRADE" name="qualityGrade" value={formData.qualityGrade} onChange={handleInputChange} />
                        <EditableField label="RATE" name="rate" value={formData.rate} onChange={handleInputChange} />
                        <EditableField label="REMARKS" name="remarks" value={formData.remarks} onChange={handleInputChange} />

                        <HStack justify="space-between">
                            {['PREPARED BY:', 'CHECKED BY:', 'AUTHORIZED BY:', 'RECEIVED BY:'].map((label) => (
                                <Box key={label}>
                                    <Text fontWeight="medium">{label}</Text>
                                    <Divider borderColor="gray.400" />
                                </Box>
                            ))}
                        </HStack>
                    </VStack>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Button mt={6} width="container.md" colorScheme="teal" type="submit">
                        Submit GRN
                    </Button>
                </Box>

            </form>
        </Container>
    );
};

export default GRN;