import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { CheckCircle, Circle } from "react-icons/md";

function ProgressCard({ steps, activeStep }) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Progress</Heading>
      </CardHeader>
      <CardBody>
        <VStack align="stretch" spacing={1}>
          {steps.map((step, index) => (
            <HStack key={index}>
              <Icon
                as={index <= activeStep ? CheckCircle : Circle}
                color={index <= activeStep ? "teal.600" : "gray.300"}
                boxSize={6}
              />
              <Text
                fontSize="lg"
                color={index <= activeStep ? "teal.600" : "gray.600"}
              >
                {step.title}
              </Text>
            </HStack>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
}

export default ProgressCard;