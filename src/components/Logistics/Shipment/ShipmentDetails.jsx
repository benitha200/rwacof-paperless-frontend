// import React from 'react';
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Heading,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Button,
//   Box,
//   VStack,
//   HStack,
// } from "@chakra-ui/react";
// import { handleDownload } from './ShipmentUtils';

// function ShipmentDetails({ steps, activeStep, setActiveStep, shipment, updateShipment }) {
//     const handleUpdate = (documentType) => {
//         let updatedData = {};

//         // switch (documentType.toLowerCase()) {
//         //     case 'loadingtallysheet':
//         //         updatedData = {
//         //             shipmentId: shipment.id,
//         //             loadingDay: "2024-10-31T01:30:00.000-05:00",
//         //             slForwarder: "PIC/MSK",
//         //             rssSsrwSprw: document.querySelector('input[name="containerNo"]').value,
//         //             plaque: document.querySelector('input[name="netWeight"]').value,
//         //             tare: 10.00,
//         //         };
//         //         break;
//         //     case 'invoice':
//         //         updatedData = {
//         //             shipmentId: shipment.id,
//         //             consignee: shipment.consignee,
//         //             consigneeAddress: "1PLACE ST GERVAIS, SWITZERLAND",
//         //             seller: "Rwacof Exports Ltd",
//         //             sellerAddress: "BP 6934 KIGALI RWANDA",
//         //             billOfLadingNo: "76878",
//         //             authorizedSignature: "signature",
//         //             amountWords: "Ninety two dollars",
//         //         };
//         //         break;
//         //     case 'vgm':
//         //         updatedData = {
//         //             containerTypeSize: document.querySelector('input[value="20/DV"]').value,
//         //             vgmKgs: 40320.00,
//         //             cargoGwKgs: 21620.00,
//         //             method: document.querySelector('input[value="1"]').value,
//         //             vesselName: document.querySelector('input[value="Your Vessel Name"]').value,
//         //             voyageNumber: document.querySelector('input[value="Your Voyage Number"]').value,
//         //             authorizedPerson: document.querySelector('input[value="Berthe MUKANOHERI"]').value,
//         //             position: document.querySelector('input[value="LOGISTICS MANAGER"]').value,
//         //             contactNumber: document.querySelector('input[value="250.788.249.673"]').value,
//         //             bookingBlNumber: "100",
//         //             kmaApprovalNo: "120",
//         //             shipmentId: shipment.id,
//         //             signatureDate: "2024-10-31T01:30:00.000-05:00"
//         //         };
//         //         break;
//         //     case 'stuffingreport':
//         //         updatedData = {
//         //             client: document.querySelector('input[value="ILLYCAFFE S.P.A."]').value,
//         //             mandate: document.querySelector('input[value="Stuffing Supervision of 320 JUTE BAGS Containing RWANDA ARABICA COFFEE into 1 export container"]').value,
//         //             product: document.querySelector('input[value="RWANDA ARABICA COFFEE"]').value,
//         //             packing: document.querySelector('input[value="JUTE BAGS"]').value,
//         //             vesselName: document.querySelector('input[value="LANA"]').value,
//         //             billOfLadingNo: document.querySelector('input[value="227771442"]').value,
//         //             place: document.querySelector('input[value="RWACOF EXPORTS LTD YARD"]').value,
//         //             stuffingStart: "2024-10-31T01:30:00.000-05:00",
//         //             stuffingEnd: "2024-10-31T01:30:00.000-05:00",
//         //             tempSealTime: "2024-10-31T01:30:00.000-05:00",
//         //             finalSealTime: "2024-10-31T01:30:00.000-05:00",
//         //             authorizedPerson: "Berthe MUKANOHERI",
//         //             containerCondition: document.querySelector('input[value="found to be good, clean, and free from Any spillage and stains."]').value,
//         //             illyId: document.querySelector('input[value="340350032"]').value,
//         //             signatureDate: "2024-10-31T01:30:00.000-05:00",
//         //             shipmentId: shipment.id 
//         //         };
//         //         break;
//         //     default:
//         //         console.error('Unknown document type:', documentType);
//         //         return;
//         // }

//         switch (documentType.toLowerCase()) {
//             case 'loadingtallysheet':
//                 updatedData = {
//                     shipmentId: shipment.id,
//                     loadingDay: document.querySelector('input[name="date"]').value,
//                     slForwarder: document.querySelector('input[type="text"][placeholder="SL/Forwarder"]').value,
//                     rssSsrwSprw: document.querySelector('input[name="containerNo"]').value,
//                     plaque: document.querySelector('input[name="truckNo"]').value,
//                     tare: parseFloat(document.querySelector('input[name="netWeight"]').value) || 0,
//                 };
//                 break;
//             case 'invoice':
//                 updatedData = {
//                     shipmentId: shipment.id,
//                     consignee: document.querySelector('input[placeholder="Consignee"]').value,
//                     consigneeAddress: document.querySelector('input[placeholder="Consignee Address"]').value,
//                     seller: document.querySelector('input[placeholder="Seller"]').value,
//                     sellerAddress: document.querySelector('input[placeholder="Seller Address"]').value,
//                     billOfLadingNo: document.querySelector('input[placeholder="Bill of Lading No."]').value,
//                     authorizedSignature: document.querySelector('input[placeholder="Authorized Signature"]').value,
//                     amountWords: document.querySelector('input[placeholder="Amount in Words"]').value,
//                 };
//                 break;
//             case 'vgm':
//                 updatedData = {
//                     containerTypeSize: document.querySelector('input[placeholder="Container Type/Size"]').value,
//                     vgmKgs: parseFloat(document.querySelector('input[placeholder="VGM (KGS)"]').value) || 0,
//                     cargoGwKgs: parseFloat(document.querySelector('input[placeholder="Cargo G.W. (KGS)"]').value) || 0,
//                     method: document.querySelector('input[placeholder="Method (I or II)"]').value,
//                     vesselName: document.querySelector('input[placeholder="Vessel Name"]').value,
//                     voyageNumber: document.querySelector('input[placeholder="Voyage Number"]').value,
//                     authorizedPerson: document.querySelector('input[placeholder="Authorized Person"]').value,
//                     position: document.querySelector('input[placeholder="Position"]').value,
//                     contactNumber: document.querySelector('input[placeholder="Contact Number"]').value,
//                     bookingBlNumber: document.querySelector('input[placeholder="Booking or B/L Number"]').value,
//                     kmaApprovalNo: document.querySelector('input[placeholder="KMA Approval no."]').value,
//                     shipmentId: shipment.id,
//                     signatureDate: document.querySelector('input[type="date"]').value,
//                 };
//                 break;
//             case 'stuffingreport':
//                 updatedData = {
//                     client: document.querySelector('input[placeholder="Client"]').value,
//                     mandate: document.querySelector('input[placeholder="Mandate"]').value,
//                     product: document.querySelector('input[placeholder="Product"]').value,
//                     packing: document.querySelector('input[placeholder="Packing"]').value,
//                     vesselName: document.querySelector('input[placeholder="Vessel Name"]').value,
//                     billOfLadingNo: document.querySelector('input[placeholder="Bill of Lading No."]').value,
//                     place: document.querySelector('input[placeholder="Place"]').value,
//                     stuffingStart: document.querySelector('input[placeholder="Commenced Stuffing"]').value,
//                     stuffingEnd: document.querySelector('input[placeholder="Completed Stuffing"]').value,
//                     tempSealTime: document.querySelector('input[placeholder="Temporally Seal"]').value,
//                     finalSealTime: document.querySelector('input[placeholder="Container Sealing"]').value,
//                     authorizedPerson: document.querySelector('input[placeholder="Authorized Person"]').value,
//                     containerCondition: document.querySelector('input[placeholder="Container Condition"]').value,
//                     illyId: document.querySelector('input[placeholder="ILLY ID"]').value,
//                     signatureDate: document.querySelector('input[placeholder="Signature Date"]').value,
//                     shipmentId: shipment.id 
//                 };
//                 break;
//             default:
//                 console.error('Unknown document type:', documentType);
//                 return;
//         }

//         updateShipment(updatedData, documentType.toLowerCase());
//     };

//     return (
//         <Card>
//             <CardHeader>
//                 <Heading size="md">Details</Heading>
//             </CardHeader>
//             <CardBody>
//                 <Accordion allowToggle>
//                     {steps.map((step, index) => (
//                         <AccordionItem key={index}>
//                             <h2>
//                                 <AccordionButton
//                                     onClick={() => setActiveStep(index)}
//                                     color={index <= activeStep ? 'teal.600' : 'gray.600'}
//                                     fontSize="lg"
//                                 >
//                                     <Box flex="1" textAlign="left">
//                                         {step.title}
//                                     </Box>
//                                     <AccordionIcon />
//                                 </AccordionButton>
//                             </h2>
//                             <AccordionPanel pb={4}>
//                                 {step.content}
//                                 <VStack spacing={4} align="stretch" mt={4}>
//                                     <HStack spacing={4}>
//                                         <Button
//                                             colorScheme="teal"
//                                             variant="outline"
//                                             onClick={() => handleDownload(step.filename, step.title, shipment)}
//                                         >
//                                             Download {step.title}
//                                         </Button>
//                                         <Button
//                                             colorScheme="teal"
//                                             onClick={() => handleUpdate(step.title.toLowerCase().replace(' ', ''))}
//                                         >
//                                             Save {step.title}
//                                         </Button>
//                                     </HStack>
//                                 </VStack>
//                             </AccordionPanel>
//                         </AccordionItem>
//                     ))}
//                 </Accordion>
//             </CardBody>
//         </Card>
//     );
// }

// export default ShipmentDetails;


// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { Button } from '@/components/ui/button';
// import { handleDownload, handleUpdate, formatDate, numberToWords } from './ShipmentUtils';

// function ShipmentDetails({ steps, activeStep, setActiveStep, shipment, updateShipment }) {
//     const handleUpdate = (documentType) => {
//         let updatedData = {};

//         switch (documentType.toLowerCase()) {
//             case 'loadingtallysheet':
//                 updatedData = {
//                     shipmentId: shipment.id,
//                     loadingDay: new Date(document.querySelector('input[name="date"]').value + 'T00:00:00Z').toISOString(),
//                     sl: document.querySelector('input[name="SL"]').value,
//                     forwarder: document.querySelector('input[name="Forwarder"]').value,
//                     rssSsrwSprw: document.querySelector('input[name="containerNo"]').value,
//                     plateNo: document.querySelector('input[name="truckNo"]').value,
//                     tare: parseFloat(document.querySelector('input[name="netWeight"]').value).toFixed(2) || 0,

//                 };
//                 break;
//             case 'invoice':
//                 updatedData = {
//                     shipmentId: shipment.id,
//                     consignee: document.querySelector('input[placeholder="Consignee"]').value,
//                     consigneeAddress: document.querySelector('input[placeholder="Consignee Address"]').value,
//                     seller: document.querySelector('input[placeholder="Seller"]').value,
//                     sellerAddress: document.querySelector('input[placeholder="Seller Address"]').value,
//                     billOfLadingNo: document.querySelector('input[placeholder="Bill of Lading No."]').value,
//                     authorizedSignature: document.querySelector('input[placeholder="Authorized Signature"]').value,
//                     amountWords: document.querySelector('input[placeholder="Amount in Words"]').value,
//                 };
//                 break;
//             case 'vgm':
//                 updatedData = {
//                     containerTypeSize: document.querySelector('input[placeholder="Container Type/Size"]').value,
//                     vgmKgs: parseFloat(document.querySelector('input[placeholder="VGM (KGS)"]').value) || 0,
//                     cargoGwKgs: parseFloat(document.querySelector('input[placeholder="Cargo G.W. (KGS)"]').value) || 0,
//                     method: document.querySelector('input[placeholder="Method (I or II)"]').value,
//                     vesselName: document.querySelector('input[placeholder="Vessel Name"]').value,
//                     voyageNumber: document.querySelector('input[placeholder="Voyage Number"]').value,
//                     authorizedPerson: document.querySelector('input[placeholder="Authorized Person"]').value,
//                     position: document.querySelector('input[placeholder="Position"]').value,
//                     contactNumber: document.querySelector('input[placeholder="Contact Number"]').value,
//                     bookingBlNumber: document.querySelector('input[placeholder="Booking or B/L Number"]').value,
//                     kmaApprovalNo: document.querySelector('input[placeholder="KMA Approval no."]').value,
//                     shipmentId: shipment.id,
//                     signatureDate: document.querySelector('input[type="date"]').value,
//                 };
//                 break;
//             case 'stuffingreport':
//                 updatedData = {
//                     client: document.querySelector('input[placeholder="Client"]').value,
//                     mandate: document.querySelector('input[placeholder="Mandate"]').value,
//                     product: document.querySelector('input[placeholder="Product"]').value,
//                     packing: document.querySelector('input[placeholder="Packing"]').value,
//                     vesselName: document.querySelector('input[placeholder="Vessel Name"]').value,
//                     billOfLadingNo: document.querySelector('input[placeholder="Bill of Lading No."]').value,
//                     place: document.querySelector('input[placeholder="Place"]').value,
//                     stuffingStart: document.querySelector('input[placeholder="Commenced Stuffing"]').value,
//                     stuffingEnd: document.querySelector('input[placeholder="Completed Stuffing"]').value,
//                     tempSealTime: document.querySelector('input[placeholder="Temporally Seal"]').value,
//                     finalSealTime: document.querySelector('input[placeholder="Container Sealing"]').value,
//                     authorizedPerson: document.querySelector('input[placeholder="Authorized Person"]').value,
//                     containerCondition: document.querySelector('input[placeholder="Container Condition"]').value,
//                     illyId: document.querySelector('input[placeholder="ILLY ID"]').value,
//                     signatureDate: document.querySelector('input[placeholder="Signature Date"]').value,
//                     shipmentId: shipment.id 
//                 };
//                 break;
//             default:
//                 console.error('Unknown document type:', documentType);
//                 return;
//         }

//         updateShipment(updatedData, documentType.toLowerCase());
//     };

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Shipment Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <Accordion type="single" collapsible>
//                     {steps.map((step, index) => (
//                         <AccordionItem key={index} value={`item-${index}`}>
//                             <AccordionTrigger>{step.title}</AccordionTrigger>
//                             <AccordionContent>
//                                 {step.content}
//                                 <div className="flex justify-between mt-4">
//                                     <Button onClick={() => handleDownload(step.content, step.filename)}>
//                                         Download
//                                     </Button>
//                                     <Button onClick={() => handleUpdate(step.title)}>
//                                         Update
//                                     </Button>
//                                 </div>
//                             </AccordionContent>
//                         </AccordionItem>
//                     ))}
//                 </Accordion>
//             </CardContent>
//         </Card>
//     );
// }

// export default ShipmentDetails;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { handleDownload, handleUpdate, formatDate, numberToWords } from './ShipmentUtils';

function ShipmentDetails({ steps, activeStep, setActiveStep, shipment, updateShipment }) {
    const handleUpdate = (documentType) => {
        let updatedData = {};

        switch (documentType.toLowerCase()) {
            case 'loadingtallysheet':
                updatedData = {
                    shipmentId: shipment.id,
                    loadingDay: new Date(document.querySelector('input[name="date"]').value + 'T00:00:00Z').toISOString(),
                    sl: document.querySelector('input[name="SL"]').value,
                    forwarder: document.querySelector('input[name="Forwarder"]').value,
                    rssSsrwSprw: document.querySelector('input[name="containerNo"]').value,
                    plateNo: document.querySelector('input[name="truckNo"]').value,
                    tare: parseFloat(document.querySelector('input[name="netWeight"]').value).toFixed(2) || 0,
                };
                break;
            case 'invoice':
                updatedData = {
                    shipmentId: shipment.id,
                    consignee: document.querySelector('input[name="consignee"]').value,
                    consigneeAddress: "1PLACE ST GERVAIS, SWITZERLAND",
                    // date: document.querySelector('input[name="date"]').value,
                    // truckNo: document.querySelector('input[name="truckNo"]').value,
                    // containerNo: document.querySelector('input[name="containerNo"]').value,
                    // lotNo: document.querySelector('input[name="lotNo"]').value,
                    // description: document.querySelector('input[name="description"]').value,
                    // quantity: document.querySelector('input[name="quantity"]').value,
                    // netWeight: document.querySelector('input[name="netWeight"]').value,
                    // amount: document.querySelector('input[name="amount"]').value,
                    seller: "RWACOF EXPORTS LTD",
                    sellerAddress: "BP 6934 KIGALI RWANDA",
                    billOfLadingNo: "SSRW-90706",
                    authorizedSignature: "RWACOF",
                    InvoiceDate: new Date(document.querySelector('input[name="invoiceDate"]').value + 'T00:00:00Z').toISOString(),
                };
                break;
            case 'vgm':
                const containers = Array.from(document.querySelectorAll('.container-row')).map(row => ({
                    containerNumber: row.querySelector('input[name="containerNumber"]').value,
                    containerTypeSize: row.querySelector('input[name="containerTypeSize"]').value,
                    vgmKgs: parseFloat(row.querySelector('input[name="vgmKgs"]').value) || 0,
                    cargoGwKgs: parseFloat(row.querySelector('input[name="cargoGwKgs"]').value) || 0,
                    method: row.querySelector('input[name="method"]').value,
                    remarks: row.querySelector('input[name="remarks"]').value,
                }));

                updatedData = {
                    shipmentId: shipment.id,
                    bookingBlNumber: document.querySelector('input[name="bookingBlNumber"]').value,
                    vesselName: document.querySelector('input[name="vesselName"]').value,
                    voyageNumber: document.querySelector('input[name="voyageNumber"]').value,
                    authorizedPerson: document.querySelector('input[name="authorizedPerson"]').value,
                    position: document.querySelector('input[name="position"]').value,
                    contactNumber: document.querySelector('input[name="contactNumber"]').value,
                    signatureDate: new Date(document.querySelector('input[name="signatureDate"]').value + 'T00:00:00Z').toISOString(),
                    kmaApprovalNo: document.querySelector('input[name="kmaApprovalNo"]').value,
                    containers: containers
                };
                break;
            case 'stuffingreport':
                updatedData = {
                    client: document.querySelector('input[placeholder="Client"]').value,
                    mandate: document.querySelector('input[placeholder="Mandate"]').value,
                    product: document.querySelector('input[placeholder="Product"]').value,
                    packing: document.querySelector('input[placeholder="Packing"]').value,
                    vesselName: document.querySelector('input[placeholder="Vessel Name"]').value,
                    billOfLadingNo: document.querySelector('input[placeholder="Bill of Lading No."]').value,
                    place: document.querySelector('input[placeholder="Place"]').value,
                    stuffingStart: document.querySelector('input[placeholder="Commenced Stuffing"]').value,
                    stuffingEnd: document.querySelector('input[placeholder="Completed Stuffing"]').value,
                    tempSealTime: document.querySelector('input[placeholder="Temporally Seal"]').value,
                    finalSealTime: document.querySelector('input[placeholder="Container Sealing"]').value,
                    authorizedPerson: document.querySelector('input[placeholder="Authorized Person"]').value,
                    containerCondition: document.querySelector('input[placeholder="Container Condition"]').value,
                    illyId: document.querySelector('input[placeholder="ILLY ID"]').value,
                    signatureDate: document.querySelector('input[placeholder="Signature Date"]').value,
                    shipmentId: shipment.id,
                };
                break;
            default:
                console.error('Unknown document type:', documentType);
                return;
        }

        updateShipment(updatedData, documentType.toLowerCase());
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Shipment Details</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible>
                    {steps.map((step, index) => (
                        <AccordionItem key={index} value={`step-${index}`}>
                            <AccordionTrigger onClick={() => setActiveStep(index)}>{step.title}</AccordionTrigger>
                            <AccordionContent>
                                <div className="step-content">{step.content}</div>
                                <div className="actions mt-4 space-x-4">
                                    <Button variant="outline" onClick={() => handleDownload(step.filename, step.title, shipment)}>
                                        Download {step.title}
                                    </Button>
                                    <Button onClick={() => handleUpdate(step.title)}>
                                        Save {step.title}
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}

export default ShipmentDetails;
