// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   Card, 
//   CardHeader, 
//   CardTitle, 
//   CardDescription, 
//   CardContent 
// } from "@/components/ui/card";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Edit, Eye, Download } from 'lucide-react';
// import API_URL from '../../../constants/Constants';

// const ContractDetails = () => {
//   const [contract, setContract] = useState(null);
//   const [shipments, setShipments] = useState([]);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch contract details
//     fetch(`${API_URL}/api/contracts/${id}`)
//       .then(response => response.json())
//       .then(data => {
//         setContract(data);
//         setShipments(data.shipments || []);
//       })
//       .catch(error => console.error('Error fetching contract details:', error));
//   }, [id]);

// //   const handleViewShipment = (shipmentId) => {
// //     navigate(`/shipments/${shipmentId}`);
// //   };

// const handleViewShipment = (shipment) => {
//     console.log(shipment)
//     if (!shipment.lotNo) {
//       navigate('/update-shipment', {
//         state: {
//           ...shipment,
//           date: shipment.date ? new Date(shipment.date) : null,
//           price: shipment?.contract?.price || null,
//         }
//       });
//     } else {
//       navigate(`/shipments/${shipment.id}`);
//     }
//   };

//   const handleEditShipment = (shipment) => {
//     navigate('/update-shipment', {
//       state: {
//         ...shipment,
//         date: shipment.date ? new Date(shipment.date) : null
//       }
//     });
//   };

//   const downloadCSV = () => {
//     const csvData = shipments.map(shipment => ({
//       ...shipment,
//       date: new Date(shipment.date).toLocaleDateString()
//     }));

//     const headers = [
//       'Shipment ID', 'Container No', 'Lot No', 'Description', 
//       'Quantity', 'Net Weight', 'Amount', 'Consignee', 'Date', 'Status'
//     ];

//     const csvContent = [
//       headers.join(','),
//       ...csvData.map(shipment => [
//         shipment.id,
//         shipment.containerNo,
//         shipment.lotNo,
//         `"${shipment.description}"`,
//         shipment.quantity,
//         shipment.netWeight,
//         shipment.amount,
//         shipment.consignee,
//         shipment.date,
//         shipment.status
//       ].join(','))
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `contract_${id}_shipments_${new Date().toLocaleDateString()}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleAddShipment = () => {
//     navigate('/new-shipment', {
//       state: {
//         contractId: id,
//         contractNumber: contract?.contractNumber
//       }
//     });
//   };

//   if (!contract) return <div>Loading...</div>;

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <div>
//             <CardTitle className="text-xl font-semibold">
//               Contract Details: {contract.contractNumber}
//             </CardTitle>
//             <CardDescription className="text-sm text-gray-700">
//               {contract.clientName} | {contract.status}
//             </CardDescription>
//           </div>
//           {/* <Button onClick={() => navigate(`/contracts/edit/${id}`)} className="text-sm">
//             <Edit className="mr-2 h-4 w-4" />
//             Edit Contract
//           </Button> */}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-md">
//           <div>
//             <p className="text-sm font-medium text-gray-600">Start Date</p>
//             <p className="text-sm">{new Date(contract.startDate).toLocaleDateString()}</p>
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-600">End Date</p>
//             <p className="text-sm">{new Date(contract.endDate).toLocaleDateString()}</p>
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-600">Total Quantity</p>
//             <p className="text-sm">{contract.totalQuantity} {contract.quantityUnit}</p>
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-600">Price</p>
//             <p className="text-sm">{contract.price} {contract.currency}</p>
//           </div>
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Shipments</h2>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               onClick={downloadCSV}
//               className="text-sm"
//             >
//               <Download className="mr-2 h-4 w-4" />
//               Download CSV
//             </Button>
//             <Button
//               onClick={handleAddShipment}
//               className="text-sm"
//             >
//               Add Shipment
//             </Button>
//           </div>
//         </div>

//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Container No</TableHead>
//                 <TableHead>Lot No</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Net Weight</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {shipments.map((shipment) => (
//                 <TableRow key={shipment.id}>
//                   <TableCell>{shipment.containerNo}</TableCell>
//                   <TableCell>{shipment.lotNo}</TableCell>
//                   <TableCell>{shipment.description}</TableCell>
//                   <TableCell>{shipment.quantity} {contract.quantityUnit}</TableCell>
//                   <TableCell>{shipment.netWeight}</TableCell>
//                   <TableCell>{shipment.amount} {contract.currency}</TableCell>
//                   <TableCell>{new Date(shipment.date).toLocaleDateString()}</TableCell>
//                   <TableCell className="flex space-x-2">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleViewShipment(shipment)}
//                       className="h-8 w-8"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleEditShipment(shipment)}
//                       className="h-8 w-8"
//                     >
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//         {shipments.length === 0 && (
//           <div className="text-center py-4 text-gray-500">
//             No shipments found for this contract
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ContractDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Download, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import API_URL from '../../../constants/Constants';

const ContractDetails = () => {
  const [contract, setContract] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [shipmentToDelete, setShipmentToDelete] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchContractDetails = () => {
    fetch(`${API_URL}/api/contracts/${id}`)
      .then(response => response.json())
      .then(data => {
        setContract(data);
        setShipments(data.shipments || []);
      })
      .catch(error => console.error('Error fetching contract details:', error));
  };

  useEffect(() => {
    fetchContractDetails();
  }, [id]);

  const handleViewShipment = (shipment) => {
    if (!shipment.lotNo) {
      navigate('/update-shipment', {
        state: {
          ...shipment,
          date: shipment.date ? new Date(shipment.date) : null,
          price: shipment?.contract?.price || null,
        }
      });
    } else {
      navigate(`/shipments/${shipment.id}`);
    }
  };

  const handleEditShipment = (shipment) => {
    navigate('/update-shipment', {
      state: {
        ...shipment,
        date: shipment.date ? new Date(shipment.date) : null
      }
    });
  };

  const handleDeleteClick = (shipment) => {
    setShipmentToDelete(shipment);
    onOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!shipmentToDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/shipments/${shipmentToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 204) {
        setShipments(prevShipments =>
          prevShipments.filter(s => s.id !== shipmentToDelete.id)
        );
        onClose();
        setShipmentToDelete(null);
        fetchContractDetails();
      } else {
        console.error('Failed to delete shipment');
        alert('Failed to delete shipment. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting shipment:', error);
      alert('An error occurred while deleting the shipment.');
    }
  };

  const downloadCSV = () => {
    const csvData = shipments.map(shipment => ({
      ...shipment,
      date: new Date(shipment.date).toLocaleDateString()
    }));

    const headers = [
      'Shipment ID', 'Container No', 'Lot No', 'Description',
      'Quantity', 'Net Weight', 'Amount', 'Consignee', 'Date', 'Status'
    ];

    const csvContent = [
      headers.join(','),
      ...csvData.map(shipment => [
        shipment.id,
        shipment.containerNo,
        shipment.lotNo,
        `"${shipment.description}"`,
        shipment.quantity,
        shipment.netWeight,
        shipment.amount,
        shipment.consignee,
        shipment.date,
        shipment.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contract_${id}_shipments_${new Date().toLocaleDateString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddShipment = () => {
    navigate('/new-shipment', {
      state: {
        contractId: id,
        contractNumber: contract?.contractNumber
      }
    });
  };

  if (!contract) return <div>Loading...</div>;

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold">
                Contract Details: {contract.contractNumber}
              </CardTitle>
              <CardDescription className="text-sm text-gray-700">
                {contract.clientName} | {contract.status}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-md">
            <div>
              <p className="text-sm font-medium text-gray-600">Start Date</p>
              <p className="text-sm">{new Date(contract.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">End Date</p>
              <p className="text-sm">{new Date(contract.endDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Quantity</p>
              <p className="text-sm">{contract.totalQuantity} {contract.quantityUnit}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Price</p>
              <p className="text-sm">{contract.price} {contract.currency}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Shipments</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={downloadCSV}
                className="text-sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
              <Button
                onClick={handleAddShipment}
                className="text-sm"
              >
                Add Shipment
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Container No</TableHead>
                  <TableHead>Lot No</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Net Weight</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell>{shipment.containerNo}</TableCell>
                    <TableCell>{shipment.lotNo}</TableCell>
                    <TableCell>{shipment.description}</TableCell>
                    <TableCell>{shipment.quantity} {contract.quantityUnit}</TableCell>
                    <TableCell>{shipment.netWeight}</TableCell>
                    <TableCell>{shipment.amount} {contract.currency}</TableCell>
                    <TableCell>{new Date(shipment.date).toLocaleDateString()}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewShipment(shipment)}
                        className="h-8 w-8"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditShipment(shipment)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(shipment)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {shipments.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No shipments found for this contract
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={null} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Shipment
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete this shipment? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter className="gap-5">
              <Button
                className="gray"
                style={{ backgroundColor: 'lightgray', color: 'black' }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="red"
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={handleDeleteConfirm}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </div>
  );
};

export default ContractDetails;
