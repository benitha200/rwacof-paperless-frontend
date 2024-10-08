import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
  Button,
  Alert,
  AlertIcon,
  Image,
  Container,
  Divider,
} from '@chakra-ui/react';

const EditableField = ({ label, name, value, onChange, type = "text" }) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </FormControl>
);

const GRN = () => {
  const [formData, setFormData] = useState({
    grnNo: '4961',
    date: '2024-02-16',
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
    netWeightKg: '10893',
    paymentWeight: '10893',
    rate: '4575',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const calculateAmount = () => {
    const paymentWeight = parseFloat(formData.paymentWeight.replace(/,/g, ''));
    const rate = parseFloat(formData.rate.replace(/,/g, ''));
    return isNaN(paymentWeight) || isNaN(rate) ? '0' : (paymentWeight * rate).toFixed(2);
  };

  const supplierOptions = [
    'Impexcor coffee',
    'Rwanda Trading Company',
    'Kivu Belt Coffee',
    'Buf Coffee',
    'Other'
  ];

  const coffeeTypeOptions = [
    'Arabica parch fully',
    'Arabica green',
    'Robusta parch',
    'Robusta green',
    'Other'
  ];

  return (
    <Container maxW="6xl" py={6}>
      <Box bg="white" shadow="lg" rounded="lg" p={6}>
        <HStack justify="space-between" align="start" mb={6}>
          <HStack spacing={4}>
            <Image src="/api/placeholder/80/80" alt="Company Logo" boxSize="80px" />
            <Box>
              <Heading as="h1" size="lg">RWACOF EXPORTS LTD</Heading>
              <Text fontSize="sm">P.O BOX:6934 KIGALI</Text>
              <Text fontSize="sm">Tel:+250 252 575872/ Fax: 0252 572024</Text>
            </Box>
          </HStack>
          <Box border="1px" borderColor="gray.300" p={2} rounded="md">
            <Text fontWeight="semibold">SOURCE</Text>
          </Box>
        </HStack>

        <Heading as="h2" size="xl" textAlign="center" my={6} color="teal.600">
          GOODS RECEIVED NOTE
        </Heading>
        
        <VStack spacing={6} align="stretch">
          <HStack spacing={6}>
            <EditableField label="GRN NO" name="grnNo" value={formData.grnNo} onChange={handleInputChange} />
            <FormControl>
              <FormLabel>DATE</FormLabel>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </FormControl>
          </HStack>

          <HStack spacing={6}>
            <FormControl>
              <FormLabel>SUPPLIER</FormLabel>
              <Select
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
              >
                {supplierOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            </FormControl>
            <EditableField label="REGION" name="region" value={formData.region} onChange={handleInputChange} />
          </HStack>

          <HStack spacing={6}>
            <EditableField label="VEHICLE REG NO" name="vehicleRegNo" value={formData.vehicleRegNo} onChange={handleInputChange} />
            <EditableField label="W.BRIDGE REF" name="wbridgeRef" value={formData.wbridgeRef} onChange={handleInputChange} />
          </HStack>

          <HStack spacing={6}>
            <EditableField label="MOISTURE" name="moisture" value={formData.moisture} onChange={handleInputChange} />
            <EditableField label="PARCH" name="parch" value={formData.parch} onChange={handleInputChange} />
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
                <Td>1</Td>
                <Td>
                  <Select
                    name="coffeeType"
                    value={formData.coffeeType}
                    onChange={handleInputChange}
                  >
                    {coffeeTypeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </Select>
                </Td>
                <Td>
                  <Input name="bags" value={formData.bags} onChange={handleInputChange} />
                </Td>
                <Td>
                  <Input name="weightOfCoffee" value={formData.weightOfCoffee} onChange={handleInputChange} />
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <HStack spacing={6} align="start">
            <Box flex={1}>
              <Heading as="h3" size="md" mb={2}>Weighing Details</Heading>
              <VStack align="stretch" spacing={3}>
                <EditableField label="LESS NO OF BAGS" name="lessNoOfBags" value={formData.lessNoOfBags} onChange={handleInputChange} />
                <EditableField label="SUB GROSS KG" name="subGrossKg" value={formData.subGrossKg} onChange={handleInputChange} />
                <EditableField label="LESS MOISTURE KG" name="lessMoistureKg" value={formData.lessMoistureKg} onChange={handleInputChange} />
                <EditableField label="LESS QUALITY KG" name="lessQualityKg" value={formData.lessQualityKg} onChange={handleInputChange} />
                <EditableField label="NET WEIGHT KG" name="netWeightKg" value={formData.netWeightKg} onChange={handleInputChange} />
              </VStack>
            </Box>
            <Box flex={1}>
              <Heading as="h3" size="md" mb={2}>Approvals</Heading>
              <VStack align="stretch" spacing={4}>
                {['WEIGHED BY:', 'SUPPLIER:', 'APPROVED BY:'].map((label) => (
                  <Box key={label}>
                    <Text fontWeight="medium">{label}</Text>
                    <Divider borderColor="gray.400" />
                  </Box>
                ))}
              </VStack>
            </Box>
          </HStack>

          <Heading as="h3" size="lg" mb={4} color="teal.600">PAYMENT VOUCHER</Heading>
          <HStack spacing={6}>
            <EditableField label="DATE" name="paymentDate" value="" onChange={handleInputChange} />
            <EditableField label="Dr. A/C" name="drAccount" value="" onChange={handleInputChange} />
            <EditableField label="CHEQUE IN FAVOUR OF" name="chequeInFavourOf" value="" onChange={handleInputChange} />
          </HStack>

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
                <Td>
                  <Input name="paymentWeight" value={formData.paymentWeight} onChange={handleInputChange} />
                </Td>
                <Td>
                  <Input name="rate" value={formData.rate} onChange={handleInputChange} />
                </Td>
                <Td>{calculateAmount()}</Td>
              </Tr>
              <Tr>
                <Td>Security Retained</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
              <Tr fontWeight="bold">
                <Td colSpan={3}>Total</Td>
                <Td>{calculateAmount()}</Td>
              </Tr>
            </Tbody>
          </Table>

          <FormControl>
            <FormLabel>In words:</FormLabel>
            <Input bg="gray.100" readOnly />
          </FormControl>

          <HStack justify="space-between">
            {['PREPARED BY:', 'CHECKED BY:', 'AUTHORIZED BY:', 'RECEIVED BY:'].map((label) => (
              <Box key={label}>
                <Text fontWeight="medium">{label}</Text>
                <Divider borderColor="gray.400" />
              </Box>
            ))}
          </HStack>
        </VStack>
      </Box>
      
      <Alert status="info" mt={6}>
        <AlertIcon />
        This is an enhanced version of the Goods Received Note (GRN) form. All fields are editable. Please review and confirm all information before submission.
      </Alert>
    </Container>
  );
};

export default GRN;