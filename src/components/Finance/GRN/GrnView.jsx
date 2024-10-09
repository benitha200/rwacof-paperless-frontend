import React, { useState, useEffect } from 'react';
import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    Container,
    Divider,
    Spinner,
    useToast,
} from '@chakra-ui/react';
import {
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepTitle,
    StepDescription,
    StepSeparator,
    StepIcon,
    StepNumber,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import logo from './../../../../assets/img/logo.png';
import API_URL from '../../../constants/Constants';

const GrnView = () => {
    const [grnData, setGrnData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const toast = useToast();

    const steps = [
        { title: 'Receive Coffee', description: 'Receive and weigh the coffee' },
        { title: 'Quality Check', description: 'Perform quality checks' },
        { title: 'Documentation', description: 'Complete GRN documentation' },
        { title: 'Approval', description: 'Get necessary approvals' },
        { title: 'Payment', description: 'Process payment' },
    ];

    const [activeStep, setActiveStep] = useState(1);

    useEffect(() => {
        fetchGrnDetails();
    }, [id]);

    const fetchGrnDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/grn/${id}`);
            setGrnData(response.data);
            setIsLoading(false);
        } catch (error) {
            toast({
                title: "Error fetching GRN details.",
                description: "An unexpected error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Box textAlign="center" py={10}>
                <Spinner size="xl" />
                <Text mt={4}>Loading GRN details...</Text>
            </Box>
        );
    }

    if (!grnData) {
        return <Box>No GRN data found.</Box>;
    }

    const calculateAmount = () => {
        return (grnData.paymentWeight * grnData.rate).toFixed(2);
    };


    return (
        <Container maxW="6xl" py={6}>
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
                        <Box>
                            <Text fontWeight="bold">GRN NO</Text>
                            <Text>{grnData.id}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">DATE</Text>
                            <Text>{format(new Date(grnData.receivedDate), 'dd/MM/yyyy')}</Text>
                        </Box>
                    </HStack>

                    <HStack spacing={6}>
                        <Box>
                            <Text fontWeight="bold">SUPPLIER</Text>
                            <Text>{grnData.supplierName}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">REGION</Text>
                            <Text>{grnData.supplierAddress}</Text>
                        </Box>
                    </HStack>

                    <HStack spacing={6}>
                        <Box>
                            <Text fontWeight="bold">VEHICLE REG NO</Text>
                            <Text>{grnData.vehicleRegNo}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">W.BRIDGE REF</Text>
                            <Text>{grnData.wbridgeRef}</Text>
                        </Box>
                    </HStack>

                    <HStack spacing={6}>
                        <Box>
                            <Text fontWeight="bold">MOISTURE</Text>
                            <Text>{grnData.moisture}%</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">PARCH</Text>
                            <Text>{grnData.parch}</Text>
                        </Box>
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
                                <Td>{grnData.productDescription}</Td>
                                <Td>{grnData.quantity}</Td>
                                <Td>{grnData.totalWeight} kg</Td>
                            </Tr>
                        </Tbody>
                    </Table>

                    <HStack spacing={6} align="start">
                        <Box flex={1}>
                            <Heading as="h3" size="md" mb={2}>Weighing Details</Heading>
                            <VStack align="stretch" spacing={3}>
                                <HStack justify="space-between">
                                    <Text>LESS NO OF BAGS:</Text>
                                    <Text>{grnData.lessNoOfBags}</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text>SUB GROSS KG:</Text>
                                    <Text>{grnData.subGrossKg}</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text>LESS MOISTURE KG:</Text>
                                    <Text>{grnData.lessMoistureKg}</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text>LESS QUALITY KG:</Text>
                                    <Text>{grnData.lessQualityKg}</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text>NET WEIGHT KG:</Text>
                                    <Text>{grnData.netWeightKg}</Text>
                                </HStack>
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
                                <Td>{grnData.paymentWeight}</Td>
                                <Td>{grnData.rate}</Td>
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

                    <HStack justify="space-between">
                        {['PREPARED BY:', 'CHECKED BY:', 'AUTHORIZED BY:', 'RECEIVED BY:'].map((label) => (
                            <Box key={label}>
                                <Text fontWeight="medium">{label}</Text>
                                <Divider borderColor="gray.400" />
                            </Box>
                        ))}
                    </HStack>

                </VStack>

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
            </Box>
        </Container>
    );
};

export default GrnView;