import React, { useState, useEffect, useRef } from 'react';
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
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Input,
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
    useBreakpointValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import logo from './../../../../assets/img/logo.png';
import API_URL from '../../../constants/Constants';
import { DownloadIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GrnView = () => {
    const [grnData, setGrnData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserRole, setCurrentUserRole] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const { id } = useParams();
    const toast = useToast();
    const grnRef = useRef(null);
    const orientation = useBreakpointValue({ base: 'vertical', md: 'horizontal' });
    const [isPaymentConfirmationOpen, setIsPaymentConfirmationOpen] = useState(false);

    const [contractRef, setContractRef] = useState('');
    const [price, setPrice] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [isPriceEditable, setIsPriceEditable] = useState(false);
    const [isExchangeRateEditable, setIsExchangeRateEditable] = useState(false);

    const steps = [
        { title: 'Receive', description: 'Weight Bridge Manager' },
        { title: 'Quality', description: 'QUALITYMANAGER' },
        { title: 'Update Price', description: 'COO' },
        { title: 'Approve', description: 'MANAGINGDIRECTOR' },
        { title: 'Payment', description: 'FINANCE' },
    ];

    useEffect(() => {
        fetchGrnDetails();
        fetchCurrentUserRole();
    }, [id]);

    useEffect(() => {
        // Determine editability based on role and current step
        setIsPriceEditable(
            currentUserRole === 'COO' &&
            grnData?.currentStep === 2
        );
        setIsExchangeRateEditable(
            currentUserRole === 'FINANCE' &&
            grnData?.currentStep === 4
        );
    }, [currentUserRole, grnData?.currentStep]);


    const fetchGrnDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/grn/${id}`);
            setGrnData(response.data);
            console.log(response.data.currentStep);
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

    const fetchCurrentUserRole = async () => {
        try {
            // const response = await axios.get(`${API_URL}/api/user/${localStorage.getItem('userRole')}`);
            setCurrentUserRole(localStorage.getItem('userRole').toUpperCase());
        } catch (error) {
            console.error('Error fetching current user role:', error);
        }
    };


    const handleApprove = async () => {
        const nextStep = grnData.currentStep + 1;

        // If it's the last step (Payment), show confirmation dialog
        if (nextStep === steps.length - 1) {
            setIsPaymentConfirmationOpen(true);
            return;
        }

        try {
            let status;
            switch (nextStep) {
                case 0:
                    status = 'Received';
                    break;
                case 1:
                    status = 'QualityApproved';
                    break;
                case 2:
                    status = 'PriceSet';
                    break;
                case 3:
                    status = 'MDApproved';
                    break;
                default:
                    status = 'pending';
            }

            const response = await axios.post(`${API_URL}/api/grn`, {
                ...grnData,
                currentStep: nextStep,
                status: status,
            });

            setGrnData(response.data);
            toast({
                title: `GRN ${status} successfully.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error updating GRN.",
                description: "An unexpected error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handlePriceUpdate = async () => {
        if (!contractRef || !price) {
            toast({
                title: "Error",
                description: "Please enter both contract reference and price",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/grn`, {
                ...grnData,
                contractRef,
                price: parseFloat(price),
                status: 'PriceSet',
                currentStep: 2
            });

            setGrnData(response.data);
            toast({
                title: "Price updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error updating price",
                description: error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleExchangeRate = async () => {
        if (!exchangeRate) {
            toast({
                title: "Error",
                description: "Please enter the exchange rate",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const payment_quantity = grnData.netWeightKg;
            const payment_rate = grnData.price * parseFloat(exchangeRate);
            const payment_amount = payment_quantity * payment_rate;

            const response = await axios.post(`${API_URL}/api/grn`, {
                ...grnData,
                exchange_rate: parseFloat(exchangeRate),
                payment_quantity,
                payment_rate,
                payment_amount,
                status: 'Paid',
                currentStep: 4
            });

            setGrnData(response.data);
            toast({
                title: "Payment details updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error updating payment details",
                description: error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const confirmPayment = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/grn`, {
                ...grnData,
                currentStep: steps.length - 1,
                status: 'Paid',
            });

            setGrnData(response.data);
            setIsPaymentConfirmationOpen(false);
            toast({
                title: "GRN is paid.",
                description: "Payment has been processed successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error processing payment.",
                description: "An unexpected error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        try {
            const element = grnRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                logging: false,
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;

            pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`GRN_${id}.pdf`);

            setIsDownloading(false);
            toast({
                title: "PDF downloaded successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('PDF generation error:', error);
            setIsDownloading(false);
            toast({
                title: "downloading PDF.",
                description: "This feature is in implementation.",
                status: "info",
                duration: 5000,
                isClosable: true,
            });
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

    // const canApprove = currentUserRole === steps[grnData.currentStep].description;
    
    
    const PriceInfoSection = ({ grnData, currentUserRole, contractRef, price, setContractRef, setPrice, handlePriceUpdate }) => {
        const isEditable = currentUserRole === "COO" && grnData.currentStep === 1;
        const shouldShow = ["COO", "FINANCE", "MANAGINGDIRECTOR", "ADMIN"].includes(currentUserRole);

        if (!shouldShow) return null;

        return (
            <VStack spacing={4} align="stretch">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Contract Ref</Th>
                            <Th>Price</Th>
                            {isEditable && <Th>Action</Th>}
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                {isEditable ? (
                                    <Input
                                        value={contractRef}
                                        onChange={(e) => setContractRef(e.target.value)}
                                        placeholder="Contract Reference"
                                    />
                                ) : (
                                    <span>{grnData.contractRef || '-'}</span>
                                )}
                            </Td>
                            <Td>
                                {isEditable ? (
                                    <Input
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Price"
                                        type="number"
                                    />
                                ) : (
                                    <span>{grnData.price || '-'}</span>
                                )}
                            </Td>
                            {isEditable && (
                                <Td>
                                    <Button
                                        colorScheme="teal"
                                        onClick={handlePriceUpdate}
                                    >
                                        Update Price & Approve
                                    </Button>
                                </Td>
                            )}
                        </Tr>
                    </Tbody>
                </Table>
            </VStack>
        );
    };

    return (
        <Container maxW="6xl" py={6}>
            <Box bg="white" shadow="lg" rounded="lg" p={6}>
                <Box display="flex" justifyContent="right" mb={4}>
                    <Button
                        leftIcon={<DownloadIcon color='white' />}
                        colorScheme="teal"
                        onClick={handleDownloadPDF}
                        isLoading={isDownloading}
                        loadingText="Downloading..."
                    >
                        Download PDF
                    </Button>
                </Box>

                <HStack justify="space-between" align="start" mb={6}>
                    <HStack spacing={4}>
                        <Image src={logo} alt="Company Logo" boxSize="120px" width="150px" />
                        <Box>
                            <Heading size="md">RWACOF EXPORTS LTD</Heading>
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

                <Heading size="md" textAlign="center" my={6} color="teal.600">
                    GOODS RECEIVED NOTE
                </Heading>

                <VStack spacing={6} align="stretch">
                    <HStack spacing={16}>             <Box>
                        <Text fontWeight="bold">GRN NO</Text>
                        <Text size={12}>{grnData.id}</Text>
                    </Box>
                        <Box>
                            <Text fontWeight="bold">DATE</Text>
                            <Text>{format(new Date(grnData.receivedDate), 'dd/MM/yyyy')}</Text>
                        </Box>
                    </HStack>

                    <HStack spacing={12}>
                        <Box>
                            <Text fontWeight="bold">SUPPLIER</Text>
                            <Text>{grnData.supplierName}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">REGION</Text>
                            <Text>{grnData.supplierAddress}</Text>
                        </Box>
                    </HStack>

                    <HStack spacing={8}>
                        <Box>
                            <Text fontWeight="bold">VEHICLE REG NO</Text>
                            <Text>{grnData.plate_no}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">W.BRIDGE REF</Text>
                            <Text>{grnData.wbridgeRef}</Text>
                        </Box>
                    </HStack>

                    <HStack spacing={16}>
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
                                <Td>{grnData.id}</Td>
                                <Td>{grnData.coffee_type}</Td>
                                <Td>{grnData.quantity}</Td>
                                <Td>{grnData.totalWeight} kg</Td>
                            </Tr>
                        </Tbody>
                    </Table>

                    <HStack spacing={6} align="start" marginTop={5}>
                        <Box flex={0.5}>
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
                    </HStack>

                    <Heading size="md" mb={4} color="teal.600">PAYMENT VOUCHER</Heading>
                    {/* {(localStorage.getItem('userRole') === "COO" && grnData.currentStep === 1) && (
                        <VStack spacing={4} align="stretch">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Contract Ref</Th>
                                        <Th>Price</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>
                                            <Input
                                                value={contractRef}
                                                onChange={(e) => setContractRef(e.target.value)}
                                                placeholder="Contract Reference"
                                            />
                                        </Td>
                                        <Td>
                                            <Input
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="Price"
                                                type="number"
                                            />
                                        </Td>
                                        <Td>
                                            <Button
                                                colorScheme="teal"
                                                onClick={handlePriceUpdate}
                                            >
                                                Update Price & Approve
                                            </Button>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </VStack>
                    )} */}

                    <PriceInfoSection
                        grnData={grnData}
                        currentUserRole={currentUserRole}
                        contractRef={contractRef}
                        price={price}
                        setContractRef={setContractRef}
                        setPrice={setPrice}
                        handlePriceUpdate={handlePriceUpdate}
                    />

                    {(localStorage.getItem('userRole') === "FINANCE" && (grnData.currentStep === 3 || grnData.currentStep === 4)) && (
                        <VStack spacing={4} align="stretch">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Exchange Rate</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>
                                            <Input
                                                value={exchangeRate}
                                                onChange={(e) => setExchangeRate(e.target.value)}
                                                placeholder="Exchange Rate"
                                                type="number"
                                            />
                                        </Td>
                                        <Td>
                                            <Button
                                                colorScheme="teal"
                                                onClick={handleExchangeRate}
                                            >
                                                Update Exchange Rate
                                            </Button>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </VStack>
                    )}

                    {/* <Heading size="md" mb={4} color="teal.600">PAYMENT VOUCHER</Heading>
                    {(localStorage.getItem('userRole')?.toUpperCase() === "ADMIN" ||
                        localStorage.getItem('userRole')?.toUpperCase() === "FINANCE" ||
                        localStorage.getItem('userRole')?.toUpperCase() === "COO" ||
                        localStorage.getItem('userRole')?.toUpperCase() === "MANAGINGDIRECTOR") && (
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>RPG</Th>
                                        <Th>PRICE</Th>
                                        <Th>EXCHANGE RATE</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>
                                            <input
                                                className="border border-1 p-2 rounded w-full"
                                                placeholder="Contract Ref"
                                            />
                                        </Td>
                                        <Td>
                                            <input
                                                className="border border-1 p-2 rounded w-full"
                                                placeholder="Price"
                                            />
                                        </Td>
                                        <Td>
                                            <input
                                                className="border border-1 p-2 rounded w-full"
                                                placeholder="Exchange Rate"
                                            />
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        )} */}

                    {(localStorage.getItem('userRole')?.toUpperCase() === "ADMIN" ||
                        localStorage.getItem('userRole')?.toUpperCase() === "FINANCE" ||
                        localStorage.getItem('userRole')?.toUpperCase() === "COO" ||
                        localStorage.getItem('userRole')?.toUpperCase() === "MANAGINGDIRECTOR") && (
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
                                        {/* <Td>{grnData.payment_weight}</Td>
                                <Td>{grnData.payment_rate}</Td>
                                <Td>{(parseFloat(grnData.payment_weight) * parseFloat(grnData.payment_rate)).toFixed(0)}</Td> */}

                                        {/* <Td>{grnData.payment_quantity || grnData.netWeightKg}</Td> */}
                                        <Td>
                                            {new Intl.NumberFormat('en-US').format(
                                                grnData.payment_quantity || grnData.netWeightKg
                                            )}
                                        </Td>
                                        {/* <Td>{grnData.payment_rate || (grnData.price * grnData.exchange_rate || 0)}</Td> */}
                                        <Td>
                                            {new Intl.NumberFormat('en-US').format(
                                                grnData.payment_rate || 0
                                            )}
                                        </Td>
                                        <Td>
                                            {new Intl.NumberFormat('en-US').format(
                                                grnData.payment_amount ||
                                                ((grnData.payment_quantity || grnData.netWeightKg) * (grnData.payment_rate || 0))
                                            )}
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Security Retained</Td>
                                        <Td></Td>
                                        <Td></Td>
                                        <Td></Td>
                                    </Tr>
                                    <Tr fontWeight="bold">
                                        <Td colSpan={3}>Total</Td>
                                        {/* <Td>{grnData.payment_amount || ((grnData.payment_quantity || grnData.netWeightKg) * (grnData.payment_rate || 0))}</Td>
                                         */}

                                        <Td>
                                            {new Intl.NumberFormat('en-US').format(
                                                grnData.payment_amount ||
                                                ((grnData.payment_quantity || grnData.netWeightKg) * (grnData.payment_rate || 0))
                                            )}
                                        </Td>

                                    </Tr>
                                </Tbody>
                            </Table>
                        )}


                </VStack>


                <Box mt={10} className='text-center'>
                    <Heading alignContent="center" size="md" mb={4} color="teal.600">
                        GRN STATUS
                    </Heading>
                    <Stepper
                        index={grnData.currentStep + 1}
                        orientation={orientation}
                        colorScheme="teal"
                        spacing={{ base: '2', md: '4' }}
                        hasStepSeparator={true}
                    >
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <Step
                                    flexDirection={{ base: 'row', md: 'column' }}
                                >
                                    <StepIndicator>
                                        <StepStatus
                                            complete={<StepIcon />}
                                            incomplete={<StepNumber />}
                                            active={<StepNumber />}
                                        />
                                    </StepIndicator>
                                    <Box
                                        flexShrink='0'
                                        textAlign={{ base: 'left', md: 'center' }}
                                        ml={{ base: 3, md: 0 }}
                                    >
                                        <StepTitle>{step.title}</StepTitle>
                                        <StepDescription display={{ base: 'none', sm: 'block' }}>
                                            {step.description}
                                        </StepDescription>
                                    </Box>
                                </Step>
                                {index < steps.length - 1 && (
                                    <StepSeparator
                                        borderColor={index < grnData.currentStep + 1 ? 'teal.500' : 'gray.200'}
                                        borderWidth="2px"
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </Stepper>
                </Box>


                {(currentUserRole === steps[Math.min(grnData.currentStep + 1, steps.length - 1)].description) &&
                    grnData.currentStep < steps.length - 1 && (
                        <Button mt={6} colorScheme="teal" onClick={handleApprove}>
                            Approve and Send to Next Step
                        </Button>
                    )}


                <Text mt={4} fontWeight="bold">
                    {/* {steps[grnData.currentStep+1].description} */}
                    Current Status: {grnData.status}
                </Text>
            </Box>

            <AlertDialog
                isOpen={isPaymentConfirmationOpen}
                onClose={() => setIsPaymentConfirmationOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Confirm Payment
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to process the final payment for this GRN?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={() => setIsPaymentConfirmationOpen(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme='teal' onClick={confirmPayment} ml={3}>
                                Confirm Payment
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Container>
    );
};

export default GrnView;