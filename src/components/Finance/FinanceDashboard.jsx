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

const DashboardFinance = () => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.700");
  const statCardBg = useColorModeValue("gray.100", "gray.800");

  return (
    <VStack spacing={8} align="stretch" w="full" p={5}>
      <Heading as="h1" size="2xl" textAlign="center" mb={2}>Finance Dashboard</Heading>
      <Text fontSize="xl" textAlign="center" color="gray.500" mb={6}>Manage All Financial Documents Here</Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Stat bg={statCardBg} p={6} borderRadius="lg" boxShadow="md">
          <StatLabel fontSize="lg">Total GRNs</StatLabel>
          <StatNumber fontSize="4xl">145</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23% from last month
          </StatHelpText>
        </Stat>
        <Stat bg={statCardBg} p={6} borderRadius="lg" boxShadow="md">
          <StatLabel fontSize="lg">Pending Payments</StatLabel>
          <StatNumber fontSize="4xl">$1.2M</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            5% from last month
          </StatHelpText>
        </Stat>
        <Stat bg={statCardBg} p={6} borderRadius="lg" boxShadow="md">
          <StatLabel fontSize="lg">Total Payments</StatLabel>
          <StatNumber fontSize="4xl">$4.7M</StatNumber>
          <StatHelpText>Based on current metrics</StatHelpText>
        </Stat>
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
        <GridItem colSpan={1}>
          <Card bg={cardBg} h="full">
            <CardHeader>
              <Heading size="md">Monthly Payment</Heading>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#66b2b2" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <SimpleGrid columns={1} spacing={6} h="full">
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
                <Heading size="md">Financial Reports</Heading>
              </CardHeader>
              <CardBody>
                <Text>Access and generate comprehensive financial reports.</Text>
              </CardBody>
              <CardFooter>
                <Button leftIcon={<FileText />} colorScheme="blue" onClick={() => navigate('/financial-reports')}>
                  Generate Reports
                </Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default DashboardFinance;