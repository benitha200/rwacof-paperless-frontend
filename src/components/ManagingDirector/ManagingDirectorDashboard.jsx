import React from 'react';
import { Box, Grid, Heading, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, SimpleGrid, Card, CardHeader, CardBody } from "@chakra-ui/react";
import { TrendingUp, DollarSign, Package, Users } from 'lucide-react';

const StatCard = ({ title, value, icon, trend }) => (
  <Card>
    <CardHeader>
      <Heading size="md">{title}</Heading>
    </CardHeader>
    <CardBody>
      <Stat>
        <StatNumber fontSize="3xl">{value}</StatNumber>
        <StatHelpText>
          <StatArrow type={trend > 0 ? "increase" : "decrease"} />
          {Math.abs(trend)}%
        </StatHelpText>
      </Stat>
      {React.createElement(icon, { size: 24, color: "teal" })}
    </CardBody>
  </Card>
);

const ManagingDirectorDashboard = () => {
  return (
    <Box>
      <Heading mb={6}>Managing Director Dashboard</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard title="Revenue" value="$10.2M" icon={DollarSign} trend={5.4} />
        <StatCard title="Shipments" value="152" icon={Package} trend={-2.1} />
        <StatCard title="New Customers" value="28" icon={Users} trend={12.7} />
        <StatCard title="Market Share" value="18.5%" icon={TrendingUp} trend={3.2} />
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        <Card>
          <CardHeader>
            <Heading size="md">Financial Overview</Heading>
          </CardHeader>
          <CardBody>
            <Text>Here you would typically include a chart or graph showing financial data over time.</Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Recent GRNs</Heading>
          </CardHeader>
          <CardBody>
            <Text>A list of recent Goods Received Notes (GRNs) would be displayed here.</Text>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
};

export default ManagingDirectorDashboard;