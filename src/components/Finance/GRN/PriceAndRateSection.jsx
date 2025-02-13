import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const PriceAndRateSection = ({ grnData, currentUserRole, onUpdate }) => {
    const [priceData, setPriceData] = useState({
        contractRef: '',
        price: '',
        rate: ''
    });
    const toast = useToast();

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setPriceData(prev => ({
            ...prev,
            [name]: value
        }));

        if (currentUserRole === 'FINANCE' && name === 'rate') {
            // Calculate and update payment details when Finance enters the rate
            const newRate = parseFloat(value) || 0;
            const qty = parseFloat(grnData.payment_quantity) || 0;
            const amount = newRate * qty;

            try {
                await axios.post(`${API_URL}/api/grn`, {
                    ...grnData,
                    payment_rate: newRate,
                    payment_amount: amount
                });

                onUpdate && onUpdate({
                    ...grnData,
                    payment_rate: newRate,
                    payment_amount: amount
                });

                toast({
                    title: "Rate updated successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: "Error updating rate",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const handleCOOSubmit = async () => {
        try {
            await axios.post(`${API_URL}/api/grn`, {
                ...grnData,
                contractRef: priceData.contractRef,
                price: parseFloat(priceData.price)
            });

            toast({
                title: "Price information updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error updating price information",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        if (grnData) {
            setPriceData({
                contractRef: grnData.contractRef || '',
                price: grnData.price || '',
                rate: grnData.payment_rate || ''
            });
        }
    }, [grnData]);

    if (currentUserRole !== 'COO' && currentUserRole !== 'FINANCE') {
        return null;
    }

    return (
        <Table variant="simple" mb={4}>
            <Thead>
                <Tr>
                    <Th>Contract Ref</Th>
                    <Th>Price (USD)</Th>
                    <Th>Rate (RWF)</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>
                        <Input
                            name="contractRef"
                            value={priceData.contractRef}
                            onChange={handleInputChange}
                            isReadOnly={currentUserRole !== 'COO'}
                            placeholder="Enter contract reference"
                        />
                    </Td>
                    <Td>
                        <Input
                            name="price"
                            value={priceData.price}
                            onChange={handleInputChange}
                            isReadOnly={currentUserRole !== 'COO'}
                            placeholder="Enter price in USD"
                            type="number"
                        />
                    </Td>
                    <Td>
                        <Input
                            name="rate"
                            value={priceData.rate}
                            onChange={handleInputChange}
                            isReadOnly={currentUserRole !== 'FINANCE'}
                            placeholder="Enter rate in RWF"
                            type="number"
                        />
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    );
};

export default PriceAndRateSection;