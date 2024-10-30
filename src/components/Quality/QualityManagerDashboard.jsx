import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VStack, Heading, Text, SimpleGrid, Grid, GridItem, Button, useColorModeValue } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Plus, Eye, FileText, DollarSign } from 'lucide-react';



const QualityManagerDashboard = () => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue("white", "gray.700");
  return (
    <VStack spacing={8} align="stretch" w="full" p={5}>
      <Heading as="h1" size="2xl" textAlign="center" mb={2}>Quality Manager Dashboard</Heading>
      <Text fontSize="xl" textAlign="center" color="gray.500" mb={6}>Manage All Documents Here</Text>

          <SimpleGrid alignContent="center" columns={2} spacing={6} h="full">
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">Recent GRNs</Heading>
              </CardHeader>
              <CardBody>
                <Text>View and manage the latest Goods Received Notes.</Text>
              </CardBody>
              <CardFooter>
                <Button leftIcon={<Eye />} colorScheme="teal" onClick={() => navigate('/allgrns')}>
                  View GRNs
                </Button>
              </CardFooter>
            </Card>
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">Quality Reports</Heading>
              </CardHeader>
              <CardBody>
                <Text>Access and generate comprehensive Quality Reports.</Text>
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

export default QualityManagerDashboard;