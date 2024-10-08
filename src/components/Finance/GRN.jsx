import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Input,
  Text,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Flex,
} from '@chakra-ui/react';
import logo from './../../../assets/img/logo.png';

const GRN = () => {
  const [formData, setFormData] = useState({
    grnNo: '4961',
    date: '16/02/2024',
    supplier: 'Impexcor coffee',
    region: '',
    vehicleRegNo: 'RAE 298M',
    moisture: '12.6%',
    parch: '14.4',
    wbridgeRef: '',
    coffeeType: 'Arabica parch fully',
    bags: '160',
    weightOfCoffee: '10920',
    lessNoOfBags: '27',
    subGrossKg: '10,893',
    lessMoistureKg: '-',
    lessQualityKg: '-',
    netWeightKg: '10,893',
    paymentWeight: '10,893',
    rate: '4,575',
    amount: '49,862,708',
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={4} borderWidth={2} borderRadius="md" borderColor="gray.300">
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between" align="flex-start">
          <Flex align="center">
            <Image src={logo} alt="RWACOF logo" mr={2} height="5rem" />
            <Box>
              <Heading size="md">RWACOF EXPORTS LTD</Heading>
              <Text fontSize="xs">P.O BOX:6934 KIGALI</Text>
              <Text fontSize="xs">Tel:+250 252 575872/ Fax: 0252 572024</Text>
            </Box>
          </Flex>
          <Box borderWidth={1} p={2}>
            <Text fontWeight="bold">SOURCE</Text>
          </Box>
        </HStack>

        <Heading size="lg" textAlign="center" my={4}>GOODS RECEIVED NOTE</Heading>

        <Grid templateColumns="repeat(6, 1fr)" gap={2}>
          <GridItem colSpan={2}>
            <Text fontWeight="bold">GRN NO: {formData.grnNo}</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontWeight="bold">DATE: {formData.date}</Text>
          </GridItem>
          <GridItem colSpan={2} />
          <GridItem colSpan={4}>
            <Text fontWeight="bold">SUPPLIER: {formData.supplier}</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontWeight="bold">REGION:</Text>
          </GridItem>
          <GridItem colSpan={4}>
            <Text fontWeight="bold">VEHICLE REG NO: {formData.vehicleRegNo}</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontWeight="bold">W.BRIDGE REF:</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontWeight="bold">MOISTURE: {formData.moisture}</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text fontWeight="bold">PARCH: {formData.parch}%</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text fontWeight="bold">GREEN:</Text>
          </GridItem>
        </Grid>

        <Table variant="simple" borderWidth={1}>
          <Thead>
            <Tr>
              <Th borderWidth={1}>S.NO</Th>
              <Th borderWidth={1}>TYPE OF COFFEE</Th>
              <Th borderWidth={1}>BAGS</Th>
              <Th borderWidth={1}>WEIGHT OF COFFEE</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td borderWidth={1}>1</Td>
              <Td borderWidth={1}>{formData.coffeeType}</Td>
              <Td borderWidth={1}>{formData.bags}</Td>
              <Td borderWidth={1}>{formData.weightOfCoffee}</Td>
            </Tr>
          </Tbody>
        </Table>

        <Grid templateColumns="repeat(2, 1fr)" gap={4} borderWidth={1} p={2}>
          <GridItem>
            <Text fontWeight="bold">WEIGHED BY:</Text>
            <Box borderBottom="1px solid" width="100%" height="30px" />
          </GridItem>
          <GridItem>
            <VStack align="stretch" spacing={1}>
              <HStack justify="space-between">
                <Text fontWeight="bold">LESS NO OF BAGS:</Text>
                <Text>{formData.lessNoOfBags}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">SUB GROSS KG:</Text>
                <Text>{formData.subGrossKg}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">LESS MOISTURE KG:</Text>
                <Text>{formData.lessMoistureKg}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">LESS QUALITY KG:</Text>
                <Text>{formData.lessQualityKg}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">NET WEIGHT KG:</Text>
                <Text>{formData.netWeightKg}</Text>
              </HStack>
            </VStack>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold">SUPPLIER:</Text>
            <Box borderBottom="1px solid" width="100%" height="30px" />
          </GridItem>
          <GridItem>
            <Text fontWeight="bold">APPROVED BY:</Text>
            <Box borderBottom="1px solid" width="100%" height="30px" />
          </GridItem>
        </Grid>

        <Heading size="md" mt={4}>PAYMENT VOUCHER</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          <GridItem>
            <Text fontWeight="bold">DATE:</Text>
            <Box borderBottom="1px solid" width="100%" height="20px" />
          </GridItem>
          <GridItem colSpan={2}>
            <Text fontWeight="bold">Dr. A/C:</Text>
            <Box borderBottom="1px solid" width="100%" height="20px" />
          </GridItem>
          <GridItem colSpan={3}>
            <Text fontWeight="bold">CHEQUE IN FAVOUR OF:</Text>
            <Box borderBottom="1px solid" width="100%" height="20px" />
          </GridItem>
        </Grid>

        <Table variant="simple" borderWidth={1}>
          <Thead>
            <Tr>
              <Th borderWidth={1}>ITEM</Th>
              <Th borderWidth={1}>QTY</Th>
              <Th borderWidth={1}>RATE</Th>
              <Th borderWidth={1}>AMOUNT</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td borderWidth={1}>Payment weight</Td>
              <Td borderWidth={1}>{formData.paymentWeight}</Td>
              <Td borderWidth={1}>{formData.rate}</Td>
              <Td borderWidth={1}>{formData.amount}</Td>
            </Tr>
            <Tr>
              <Td borderWidth={1}>Security Retained</Td>
              <Td borderWidth={1} />
              <Td borderWidth={1} />
              <Td borderWidth={1} />
            </Tr>
            <Tr>
              <Td colSpan={3} borderWidth={1} fontWeight="bold">Total</Td>
              <Td borderWidth={1} />
            </Tr>
          </Tbody>
        </Table>

        <Text fontWeight="bold">In words:</Text>
        <Box borderBottom="1px solid" width="100%" height="20px" />

        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem>
            <Text fontWeight="bold">PREPARED BY:</Text>
            <Box borderBottom="1px solid" width="100%" height="30px" />
          </GridItem>
          <GridItem>
            <Text fontWeight="bold">CHECKED BY:</Text>
            <Box borderBottom="1px solid" width="100%" height="30px" />
          </GridItem>
          <GridItem>
            <Text fontWeight="bold">AUTORIZED BY:</Text>
            <Box borderBottom="1px solid" width="100%" height="30px" />
          </GridItem>
          <GridItem>
            <Text fontWeight="bold">RECEIVED BY:</Text>
            <Box borderBottom="1px solid" width="100%" height="30px" />
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default GRN;