import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Button,
  useColorModeValue,
  Container,
  Icon
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { FiPlus, FiEye, FiFileText, FiTruck, FiClipboard } from 'react-icons/fi';

const FeatureCard = ({ title, description, icon, primaryAction, secondaryAction }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const iconColor = useColorModeValue("teal.500", "teal.200");

  return (
    <Card bg={cardBg} shadow="md" borderRadius="lg">
      <CardHeader>
        <Icon as={icon} w={8} h={8} color={iconColor} mb={2} />
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
      </CardBody>
      <CardFooter>
        {primaryAction && (
          <Button leftIcon={primaryAction.icon} colorScheme="teal" mr={3} onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
        )}
        {secondaryAction && (
          <Button leftIcon={secondaryAction.icon} colorScheme="teal" variant="outline" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const CooDashboard = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={8}>
            <Heading as="h1" size="2xl" mb={2}>COO Dashboard</Heading>
            <Text fontSize="xl" color={textColor}>Manage All Documents Here</Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <FeatureCard
              title="Goods Received Notes"
              description="View and manage the latest Goods Received Notes."
              icon={FiTruck}
            
              secondaryAction={{ label: "View Recent GRNs", icon: <FiEye />, onClick: () => navigate('/allgrns') }}
            />
            <FeatureCard
              title="Quality Reports"
              description="Access and generate comprehensive Quality Reports."
              icon={FiClipboard}
              primaryAction={{ label: "Generate Reports", icon: <FiFileText />, onClick: () => navigate('/financial-reports') }}
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default CooDashboard;