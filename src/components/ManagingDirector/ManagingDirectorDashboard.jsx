import React from 'react';
import { Box, Grid, Heading, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Card, CardHeader, CardBody } from "@chakra-ui/react";


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