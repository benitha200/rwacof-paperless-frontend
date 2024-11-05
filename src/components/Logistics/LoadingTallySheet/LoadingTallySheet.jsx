import React, { useState, useEffect, useMemo } from 'react';
import { 
    Card, 
    CardHeader, 
    CardBody, 
    Heading, 
    Text, 
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td, 
    TableContainer, 
    Box, 
    Alert, 
    AlertIcon, 
    AlertTitle, 
    AlertDescription,
    Spinner,
    VStack,
    HStack,
    Badge,
    Tooltip,
    Input,
    Select,
    Button,
    useToast
} from '@chakra-ui/react';
import { format } from 'date-fns';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import API_URL from '../../../constants/Constants';

const LoadingTallySheet = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [filterForwarder, setFilterForwarder] = useState('');
    const [filterDateRange, setFilterDateRange] = useState('');

    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/loading-tally-sheets`);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch loading tally sheet data');
                setLoading(false);
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

      // Helper functions for date filtering
      const isWithinLastWeek = (date) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return date >= oneWeekAgo;
    };

    const isWithinLastMonth = (date) => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return date >= oneMonthAgo;
    };

    // Memoized filtered data
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesSearch = 
                !searchTerm || 
                item.shipment.containerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.forwarder.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.plateNo.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesForwarder = 
                !filterForwarder || 
                item.forwarder === filterForwarder;

            const matchesDateRange = 
                !filterDateRange || 
                (filterDateRange === 'lastWeek' && isWithinLastWeek(new Date(item.loadingDay))) ||
                (filterDateRange === 'lastMonth' && isWithinLastMonth(new Date(item.loadingDay)));

            return matchesSearch && matchesForwarder && matchesDateRange;
        });
    }, [data, searchTerm, filterForwarder, filterDateRange]);

  

    // Get unique forwarders for filter dropdown
    const uniqueForwarders = [...new Set(data.map(item => item.forwarder))];

    // Prepare data for CSV download
    const csvData = filteredData.map(item => ({
        'Loading Day': format(new Date(item.loadingDay), 'dd/MM/yyyy'),
        'Container/Truck No': item.shipment.containerNo,
        'SL': item.sl,
        'Forwarder': item.forwarder,
        'RSS/SSRW/SPRW': item.rssSsrwSprw,
        'Plate No': item.plateNo,
        'Tare': item.tare,
        'Lot No': item.shipment.lotNo,
        'Quantity': `${item.shipment.quantity} ${item.shipment.quantityUnit}`,
        'Net Weight': `${item.shipment.netWeight} ${item.shipment.netWeightUnit}`,
        'Amount': `$${item.shipment.amount.toLocaleString()}`
    }));

    // Render loading state
    if (loading) {
        return (
            <Card width="full">
                <CardBody>
                    <VStack spacing={4} align="center" justify="center" height="48">
                        <Spinner 
                            size="xl" 
                            color="blue.500" 
                            thickness="4px"
                        />
                        <Text color="gray.500" fontSize="sm">
                            Loading tally sheet data...
                        </Text>
                    </VStack>
                </CardBody>
            </Card>
        );
    }

    // Render error state
    if (error) {
        return (
            <Alert status="error" variant="subtle">
                <AlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    // Render empty state
    if (!data || data.length === 0) {
        return (
            <Card width="full">
                <CardBody>
                    <VStack spacing={4} align="center" justify="center" height="48">
                        <Text color="gray.500" fontSize="xl">
                            No loading tally sheet data available
                        </Text>
                    </VStack>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card width="full">
            <CardHeader>
                <Heading size="lg">Loading Tally Sheet</Heading>
                <Text color="gray.500">A comprehensive list of all shipments</Text>
                
                {/* Filter and Search Section */}
                <HStack spacing={4} mt={4}>
                    <Input 
                        placeholder="Search Container, Forwarder, Plate No" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        leftElement={<SearchIcon color="gray.300" />}
                    />
                    <Select 
                        placeholder="Filter by Forwarder"
                        value={filterForwarder}
                        onChange={(e) => setFilterForwarder(e.target.value)}
                    >
                        {uniqueForwarders.map(forwarder => (
                            <option key={forwarder} value={forwarder}>
                                {forwarder}
                            </option>
                        ))}
                    </Select>
                    <Select 
                        placeholder="Filter by Date Range"
                        value={filterDateRange}
                        onChange={(e) => setFilterDateRange(e.target.value)}
                    >
                        <option value="lastWeek">Last Week</option>
                        <option value="lastMonth">Last Month</option>
                    </Select>
                    
                    {/* Download Button */}
                    {csvData.length > 0 && (
                        <CSVLink 
                            data={csvData} 
                            filename={`loading_tally_sheet_${format(new Date(), 'yyyyMMdd')}.csv`}
                        >
                            <Button 
                                leftIcon={<DownloadIcon />} 
                                colorScheme="green"
                                onClick={() => toast({
                                    title: "Download Started",
                                    description: "Your CSV file is being downloaded.",
                                    status: "success",
                                    duration: 3000,
                                    isClosable: true,
                                })}
                            >
                                Download CSV
                            </Button>
                        </CSVLink>
                    )}
                </HStack>
            </CardHeader>
            <CardBody>
                <TableContainer>
                    <Table variant="simple" colorScheme="gray" size="sm">
                        <Thead>
                            <Tr>
                                <Th>Loading Day</Th>
                                <Th>Container/Truck No</Th>
                                <Th>SL</Th>
                                <Th>Forwarder</Th>
                                <Th>RSS/SSRW/SPRW</Th>
                                <Th>Plate No</Th>
                                <Th>Tare</Th>
                                <Th>Details</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredData.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{format(new Date(item.loadingDay), 'dd/MM/yyyy')}</Td>
                                    <Td>{item.shipment.containerNo}</Td>
                                    <Td>{item.sl}</Td>
                                    <Td>{item.forwarder}</Td>
                                    <Td>{item.rssSsrwSprw}</Td>
                                    <Td>{item.plateNo}</Td>
                                    <Td>{item.tare}</Td>
                                    <Td>
                                        <VStack 
                                            align="start" 
                                            spacing={4} 
                                            p={4} 
                                            bg="gray.50" 
                                            borderRadius="md"
                                        >
                                            <HStack>
                                                <Text fontWeight="bold">Lot No:</Text>
                                                <Badge colorScheme="blue">{item.shipment.lotNo}</Badge>
                                            </HStack>
                                            <Tooltip 
                                                label={`Quantity: ${item.shipment.quantity} ${item.shipment.quantityUnit}`} 
                                                aria-label="Quantity tooltip"
                                            >
                                                <HStack>
                                                    <Text fontWeight="bold">Quantity:</Text>
                                                    <Text>
                                                        {item.shipment.quantity} {item.shipment.quantityUnit}
                                                    </Text>
                                                </HStack>
                                            </Tooltip>
                                            <HStack>
                                                <Text fontWeight="bold">Net Weight:</Text>
                                                <Text>
                                                    {item.shipment.netWeight} {item.shipment.netWeightUnit}
                                                </Text>
                                            </HStack>
                                            <HStack>
                                                <Text fontWeight="bold">Amount:</Text>
                                                <Badge colorScheme="green">
                                                    ${item.shipment.amount.toLocaleString()}
                                                </Badge>
                                            </HStack>
                                        </VStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    );
};

export default LoadingTallySheet;