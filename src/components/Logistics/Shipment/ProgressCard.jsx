// import React from 'react';
// import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
// import { CheckCircle2, Circle } from "lucide-react";

// function ProgressCard({ steps, activeStep }) {
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Progress</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="flex flex-col space-y-2">
//                     {steps.map((step, index) => (
//                         <div key={index} className="flex items-center">
//                             {index <= activeStep ? (
//                                 <CheckCircle2 className="w-6 h-6 text-teal-600 mr-2" />
//                             ) : (
//                                 <Circle className="w-6 h-6 text-gray-300 mr-2" />
//                             )}
//                             <span className={index <= activeStep ? 'text-teal-600 text-lg' : 'text-gray-600 text-lg'}>
//                                 {step.title}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

// export default ProgressCard;

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
        <VStack align="stretch" spacing={2}>
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