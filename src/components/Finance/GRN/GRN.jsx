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
    Alert,
    AlertIcon,
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
} from '@chakra-ui/react';
import logo from './../../../../assets/img/logo.png';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import API_URL from '../../../constants/Constants';

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
        grnNo: '4961',
        date: new Date('2024-02-16'),
        supplier: 'Impexcor coffee',
        region: '',
        vehicleRegNo: 'RAE 298M',
        moisture: '12.6%',
        parch: '14.4',
        wbridgeRef: '',
        coffeeType: 'Arabica parch fully',
        bags: '160',
        weightOfCoffee: '10920',
        lessNoOfBags: '27',
        subGrossKg: '10,893',
        lessMoistureKg: '-',
        lessQualityKg: '-',
        netWeightKg: '10893',
        paymentWeight: '10893',
        rate: '4575',
        paymentDate: '',
        drAccount: '',
        chequeInFavourOf: '',
    });
    const [activeStep, setActiveStep] = useState(0);
    const toast = useToast();

    const steps = [
        { title: 'Receive Coffee', description: 'Receive and weigh the coffee' },
        { title: 'Quality Check', description: 'Perform quality checks' },
        { title: 'Documentation', description: 'Complete GRN documentation' },
        { title: 'Approval', description: 'Get necessary approvals' },
        { title: 'Payment', description: 'Process payment' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleDateChange = (date) => {
        setFormData((prevData) => ({ ...prevData, date }));
    };

    const calculateAmount = () => {
        const paymentWeight = parseFloat(formData.paymentWeight.replace(/,/g, ''));
        const rate = parseFloat(formData.rate.replace(/,/g, ''));
        return isNaN(paymentWeight) || isNaN(rate) ? '0' : (paymentWeight * rate).toFixed(2);
    };

    const supplierOptions = [
        'Impexcor coffee',
        'Rwanda Trading Company',
        'Kivu Belt Coffee',
        'Buf Coffee',
        'Other'
    ];

    const coffeeTypeOptions = [
        'Arabica parch fully',
        'Arabica green',
        'Robusta parch',
        'Robusta green',
        'Other'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const transformedData = {
                receivedDate: formData.date.toISOString(),
                supplierName: formData.supplier,
                supplierAddress: formData.region || 'N/A', // Assuming region is the supplier address
                productDescription: formData.coffeeType,
                quantity: parseInt(formData.bags, 10),
                quantityUnit: 'bags',
                totalWeight: parseFloat(formData.weightOfCoffee),
                weightUnit: 'kg',
                qualityGrade: formData.coffeeType,
                preparedById: 1, // Placeholder IDs, replace with actual user IDs
                checkedById: 2,
                authorizedById: 3,
                receivedById: 4,
                vehicleRegNo: formData.vehicleRegNo,
                moisture: parseFloat(formData.moisture),
                parch: parseFloat(formData.parch),
                wbridgeRef: formData.wbridgeRef,
                lessNoOfBags: parseInt(formData.lessNoOfBags, 10),
                subGrossKg: parseFloat(formData.subGrossKg.replace(/,/g, '')),
                lessMoistureKg: formData.lessMoistureKg !== '-' ? parseFloat(formData.lessMoistureKg) : 0,
                lessQualityKg: formData.lessQualityKg !== '-' ? parseFloat(formData.lessQualityKg) : 0,
                netWeightKg: parseFloat(formData.netWeightKg),
                paymentWeight: parseFloat(formData.paymentWeight),
                rate: parseFloat(formData.rate),
            };

            const response = await axios.post(`${API_URL}/api/grn`, transformedData);
            toast({
                title: "GRN submitted successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
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

    return (
        <Container maxW="6xl" py={6}>
            <form onSubmit={handleSubmit}>
                <Box bg="white" shadow="lg" rounded="lg" p={6}>
                    <HStack justify="space-between" align="start" mb={6}>
                        <HStack spacing={4}>
                            <Image src={logo} alt="Company Logo" boxSize="120px" width="150px" />
                            <Box>
                                <Heading as="h1" size="lg">RWACOF EXPORTS LTD</Heading>
                                <Text fontSize="sm">P.O BOX:6934 KIGALI</Text>
                                <Text fontSize="sm">Tel:+250 252 575872/ Fax: 0252 572024</Text>
                            </Box>
                        </HStack>
                        <Box border="1px" borderColor="gray.300" p={2} rounded="md">
                            <Text fontWeight="semibold">SOURCE</Text>
                        </Box>
                    </HStack>

                    <Heading as="h2" size="xl" textAlign="center" my={6} color="teal.600">
                        GOODS RECEIVED NOTE
                    </Heading>

                    <VStack spacing={6} align="stretch">
                        <HStack spacing={6}>
                            <EditableField label="GRN NO" name="grnNo" value={formData.grnNo} onChange={handleInputChange} />
                            <FormControl>
                                <FormLabel>DATE</FormLabel>
                                <DatePicker
                                    selected={formData.date}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    customInput={<Input />}
                                />
                            </FormControl>
                        </HStack>

                        <HStack spacing={6}>
                            <FormControl>
                                <FormLabel>SUPPLIER</FormLabel>
                                <Select
                                    name="supplier"
                                    value={formData.supplier}
                                    onChange={handleInputChange}
                                >
                                    {supplierOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <EditableField label="REGION" name="region" value={formData.region} onChange={handleInputChange} />
                        </HStack>

                        <HStack spacing={6}>
                            <EditableField label="VEHICLE REG NO" name="vehicleRegNo" value={formData.vehicleRegNo} onChange={handleInputChange} />
                            <EditableField label="W.BRIDGE REF" name="wbridgeRef" value={formData.wbridgeRef} onChange={handleInputChange} />
                        </HStack>

                        <HStack spacing={6}>
                            <EditableField label="MOISTURE" name="moisture" value={formData.moisture} onChange={handleInputChange} />
                            <EditableField label="PARCH" name="parch" value={formData.parch} onChange={handleInputChange} />
                        </HStack>

                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>S.NO</Th>
                                    <Th>TYPE OF COFFEE</Th>
                                    <Th>BAGS</Th>
                                    <Th>WEIGHT OF COFFEE</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>1</Td>
                                    <Td>
                                        <Select
                                            name="coffeeType"
                                            value={formData.coffeeType}
                                            onChange={handleInputChange}
                                        >
                                            {coffeeTypeOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </Select>
                                    </Td>
                                    <Td>
                                        <Input name="bags" value={formData.bags} onChange={handleInputChange} />
                                    </Td>
                                    <Td>
                                        <Input name="weightOfCoffee" value={formData.weightOfCoffee} onChange={handleInputChange} />
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>

                        <HStack spacing={6} align="start">
                            <Box flex={1}>
                                <Heading as="h3" size="md" mb={2}>Weighing Details</Heading>
                                <VStack align="stretch" spacing={3}>
                                    <EditableField label="LESS NO OF BAGS" name="lessNoOfBags" value={formData.lessNoOfBags} onChange={handleInputChange} />
                                    <EditableField label="SUB GROSS KG" name="subGrossKg" value={formData.subGrossKg} onChange={handleInputChange} />
                                    <EditableField label="LESS MOISTURE KG" name="lessMoistureKg" value={formData.lessMoistureKg} onChange={handleInputChange} />
                                    <EditableField label="LESS QUALITY KG" name="lessQualityKg" value={formData.lessQualityKg} onChange={handleInputChange} />
                                    <EditableField label="NET WEIGHT KG" name="netWeightKg" value={formData.netWeightKg} onChange={handleInputChange} />
                                </VStack>
                            </Box>
                            <Box flex={1}>
                                <Heading as="h3" size="md" mb={2}>Approvals</Heading>
                                <VStack align="stretch" spacing={4}>
                                    {['WEIGHED BY:', 'SUPPLIER:', 'APPROVED BY:'].map((label) => (
                                        <Box key={label}>
                                            <Text fontWeight="medium">{label}</Text>
                                            <Divider borderColor="gray.400" />
                                        </Box>
                                    ))}
                                </VStack>
                            </Box>
                        </HStack>

                        <Heading as="h3" size="lg" mb={4} color="teal.600">PAYMENT VOUCHER</Heading>
                        <HStack spacing={6}>
                            <EditableField label="DATE" name="paymentDate" value={formData.paymentDate} onChange={handleInputChange} />
                            <EditableField label="Dr. A/C" name="drAccount" value={formData.drAccount} onChange={handleInputChange} />
                            <EditableField label="CHEQUE IN FAVOUR OF" name="chequeInFavourOf" value={formData.chequeInFavourOf} onChange={handleInputChange} />
                        </HStack>

                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>ITEM</Th>
                                    <Th>QTY</Th>
                                    <Th>RATE</Th>
                                    <Th>AMOUNT</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Payment weight</Td>
                                    <Td>
                                        <Input name="paymentWeight" value={formData.paymentWeight} onChange={handleInputChange} />
                                    </Td>
                                    <Td>
                                        <Input name="rate" value={formData.rate} onChange={handleInputChange} />
                                    </Td>
                                    <Td>{calculateAmount()}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Security Retained</Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                </Tr>
                                <Tr fontWeight="bold">
                                    <Td colSpan={3}>Total</Td>
                                    <Td>{calculateAmount()}</Td>
                                </Tr>
                            </Tbody>
                        </Table>

                        <FormControl>
                            <FormLabel>In words:</FormLabel>
                            <Input bg="gray.100" readOnly />
                        </FormControl>

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

                <Box mt={10}>
                    <Heading as="h3" size="md" mb={4}>
                        GRN Process
                    </Heading>
                    <Stepper index={activeStep} colorScheme="teal">
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box flexShrink='0'>
                                    <StepTitle>{step.title}</StepTitle>
                                    <StepDescription>{step.description}</StepDescription>
                                </Box>

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <Button mt={6} colorScheme="teal" type="submit">
                    Submit GRN
                </Button>
            </form>
        </Container>
    );
};

export default GRN;