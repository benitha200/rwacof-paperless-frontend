import React from "react";
import {
  Box,
  Skeleton,
  SkeletonText,
  Flex,
  SimpleGrid,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";

const TripsLoadingSkeleton = () => {
  // Use responsive utilities to match the main component
  const displayMode = useBreakpointValue({
    base: "card",
    sm: "card",
    md: "card",
    lg: "table",
    xl: "table"
  });

  const columnCount = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 2,
    lg: 2,
    xl: 3
  });

  const cardPadding = useBreakpointValue({ base: 3, md: 4 });
  const tableSize = useBreakpointValue({ base: "sm", md: "md", lg: "md" });

  // Card skeleton for mobile and tablet view
  const TripCardSkeleton = () => (
    <Box
      p={cardPadding}
      mb={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
      width="100%"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Skeleton height="20px" width="120px" />
        <Skeleton height="24px" width="100px" borderRadius="md" />
      </Flex>

      <SkeletonText mt="2" noOfLines={1} width="180px" skeletonHeight="3" mb={3} />

      <Box mb={3}>
        <Flex align="flex-start" mb={2}>
          <Skeleton height="16px" width="16px" mr={2} />
          <Box width="100%">
            <Skeleton height="16px" width="80%" mb={1} />
            <Skeleton height="14px" width="60%" />
          </Box>
        </Flex>

        <Flex align="flex-start" mb={2}>
          <Skeleton height="16px" width="16px" mr={2} />
          <Box width="100%">
            <Skeleton height="14px" width="70%" mb={1} />
            <Skeleton height="14px" width="65%" />
          </Box>
        </Flex>

        <Flex align="flex-start" mb={2}>
          <Skeleton height="16px" width="16px" mr={2} />
          <Box width="100%">
            <Skeleton height="14px" width="50%" mb={1} />
            <Skeleton height="14px" width="65%" />
          </Box>
        </Flex>

        <Flex align="flex-start">
          <Skeleton height="16px" width="16px" mr={2} />
          <Box width="100%">
            <Skeleton height="14px" width="40%" mb={1} />
            <Skeleton height="14px" width="45%" />
          </Box>
        </Flex>
      </Box>

      <Skeleton height="36px" width="100%" borderRadius="md" />
    </Box>
  );

  // Table skeleton for desktop view
  const TableSkeleton = () => (
    <Box overflowX="auto">
      <TableContainer>
        <Table variant="simple" size={tableSize}>
          <Thead>
            <Tr>
              <Th>Employee</Th>
              <Th>Details</Th>
              <Th>Dates</Th>
              <Th>Vehicle</Th>
              <Th>Mileage</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array(5).fill(0).map((_, index) => (
              <Tr key={index}>
                <Td>
                  <Flex align="center">
                    <Skeleton height="16px" width="16px" mr={2} />
                    <Box>
                      <Skeleton height="16px" width="120px" mb={1} />
                      <Skeleton height="14px" width="80px" mb={1} />
                      <Skeleton height="14px" width="100px" />
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center">
                    <Skeleton height="16px" width="16px" mr={2} />
                    <Box maxW="200px">
                      <Skeleton height="16px" width="180px" mb={1} />
                      <Skeleton height="14px" width="150px" />
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Box>
                    <Flex align="center" mb={1}>
                      <Skeleton height="16px" width="16px" mr={2} />
                      <Skeleton height="14px" width="140px" />
                    </Flex>
                    <Flex align="center">
                      <Skeleton height="16px" width="16px" mr={2} />
                      <Skeleton height="14px" width="130px" />
                    </Flex>
                  </Box>
                </Td>
                <Td>
                  <Box>
                    <Flex align="center" mb={1}>
                      <Skeleton height="16px" width="16px" mr={2} />
                      <Skeleton height="16px" width="120px" />
                    </Flex>
                    <Skeleton height="14px" width="100px" mb={1} />
                    <Skeleton height="14px" width="80px" />
                  </Box>
                </Td>
                <Td>
                  <Box>
                    <Flex align="center" mb={1}>
                      <Skeleton height="16px" width="16px" mr={2} />
                      <Skeleton height="14px" width="90px" />
                    </Flex>
                    <Flex align="center" mb={1}>
                      <Skeleton height="16px" width="16px" mr={2} />
                      <Skeleton height="14px" width="90px" />
                    </Flex>
                    <Skeleton height="14px" width="100px" />
                  </Box>
                </Td>
                <Td>
                  <Skeleton height="24px" width="100px" borderRadius="md" />
                </Td>
                <Td>
                  <Skeleton height="36px" width="100px" borderRadius="md" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );

  // Pagination skeleton
  const PaginationSkeleton = () => (
    <Flex justify="space-between" align="center" mt={4} wrap="wrap" gap={4}>
      <Flex align="center" gap={2}>
        <Skeleton height="16px" width="80px" />
        <Skeleton height="32px" width="60px" />
      </Flex>
      
      <Flex align="center" gap={2}>
        <Skeleton height="16px" width="200px" />
      </Flex>
      
      <Flex>
        <Skeleton height="32px" width="200px" />
      </Flex>
    </Flex>
  );

  return (
    <Box>
      <Skeleton height="32px" width="200px" mb={6} />

      {displayMode === "card" ? (
        <>
          <SimpleGrid columns={columnCount} spacing={4}>
            {Array(6).fill(0).map((_, index) => (
              <TripCardSkeleton key={index} />
            ))}
          </SimpleGrid>
          <PaginationSkeleton />
        </>
      ) : (
        <>
          <TableSkeleton />
          <PaginationSkeleton />
        </>
      )}
    </Box>
  );
};

export default TripsLoadingSkeleton;