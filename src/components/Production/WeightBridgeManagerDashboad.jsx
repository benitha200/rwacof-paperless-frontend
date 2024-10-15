import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VStack, Heading, Text, SimpleGrid, Grid, GridItem, Button, useColorModeValue } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Eye, FileText, DollarSign } from 'lucide-react';

const data = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 4500 },
  { name: 'May', amount: 6000 },
  { name: 'Jun', amount: 5500 },
];

const WeightBridgeManagerDashboad = () => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.700");
  const statCardBg = useColorModeValue("teal.50", "teal.800");
  const chartColor = useColorModeValue("teal.500", "teal.200");

  return (
    <VStack spacing={8} align="stretch" w="full" p={5}>
      <Heading as="h1" size="2xl" textAlign="center" mb={2}>WeightBridgeManager Dashboard</Heading>
      <Text fontSize="xl" textAlign="center" color="gray.500" mb={6}>Manage All Weight Bridge Documents Here</Text>

      <SimpleGrid columns={2} spacing={6} h="full">
        <Card bg={cardBg}>
          <CardHeader>
            <Heading size="md">Recent GRNs</Heading>
          </CardHeader>
          <CardBody>
            <Text>View and manage the latest Goods Received Notes.</Text>
          </CardBody>
          <CardFooter>
            <Button leftIcon={<Plus />} colorScheme="teal" mr={3} onClick={() => navigate('/grn')}>
              Add GRN
            </Button>
            <Button leftIcon={<Eye />} colorScheme="blue" onClick={() => navigate('/allgrns')}>
              View GRNs
            </Button>
          </CardFooter>
        </Card>
        <Card bg={cardBg}>
          <CardHeader>
            <Heading size="md">Weight Bridge Reports</Heading>
          </CardHeader>
          <CardBody>
            <Text>Access and generate comprehensive Weight Bridge reports.</Text>
          </CardBody>
          <CardFooter>
            <Button leftIcon={<FileText />} colorScheme="blue" onClick={() => navigate('/financial-reports')}>
              Generate Reports
            </Button>
          </CardFooter>
        </Card>
      </SimpleGrid>

    </VStack>
  );
};

export default WeightBridgeManagerDashboad;