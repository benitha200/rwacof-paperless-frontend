import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { handleDownload, handleUpdate, formatDate, numberToWords } from './ShipmentUtils';
import { Divider, StepSeparator } from '@chakra-ui/react';
import { ChevronRight, Clock, Download, Package, Save } from 'lucide-react';

function ShipmentDetails({ steps, activeStep, setActiveStep, shipment, updateShipment, images }) {
  const handleUpdate = (documentType) => {
    let updatedData = {};

    switch (documentType.toLowerCase()) {
      case 'loadinglist':
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
          billOfLadingNo: document.querySelector('input[name="billOfLadingNo"]')?.value,
          authorizedSignature: "RWACOF",
          InvoiceDate: new Date(document.querySelector('input[name="invoiceDate"]').value + 'T00:00:00Z').toISOString(),
        };
        break;
      case 'vgm':
        const containers = Array.from(document.querySelectorAll('.container-row')).map(row => ({
          containerNumber: row.querySelector('input[name="containerNumber"]').value,
          containerTypeSize: row.querySelector('select[name="containerTypeSize"]').value,
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
        const clientInfo = {
          name: document.querySelector('input[name="client_name"]')?.value || "ILLYCAFFE S.P.A.",
          address: document.querySelector('input[name="client_address"]')?.value || "VIA FLAVIA 110, 34147, TRIESTE, Italy",
          email: document.querySelector('input[name="client_email"]')?.value || "stefano.scanferla@illy.com"
        };

        // Concatenate client information with proper formatting
        const client = `${clientInfo.name}\n${clientInfo.address}\n${clientInfo.email}`;

        const updatedData1 = {
          shipmentId: shipment.id,
          client: client,
          mandate: document.querySelector('input[name="mandate"]')?.value,
          product: document.querySelector('input[name="product"]')?.value,
          packing: document.querySelector('input[name="packing"]')?.value,
          vesselName: document.querySelector('input[name="vesselName"]')?.value,
          billOfLadingNo: document.querySelector('input[name="billOfLadingNo"]')?.value,
          place: document.querySelector('input[name="place"]')?.value,
          stuffingStart: document.querySelector('input[name="stuffingStart"]')?.value,
          stuffingEnd: document.querySelector('input[name="stuffingEnd"]')?.value,
          tempSealTime: document.querySelector('input[name="tempSealTime"]')?.value,
          finalSealTime: document.querySelector('input[name="finalSealTime"]')?.value,
          containerCondition: document.querySelector('input[name="containerCondition"]')?.value,
          container: document.querySelector('input[name="container"]')?.value,
          numberOfBags: document.querySelector('input[name="numberOfBags"]')?.value,
          lots: document.querySelector('input[name="lots"]')?.value,
          illyId: document.querySelector('input[name="illyId"]')?.value,
          authorizedPerson: document.querySelector('input[name="authorizedPerson"]')?.value,
          signatureDate: document.querySelector('input[name="signatureDate"]')?.value
        };

        // Create a FormData object
        const formData = new FormData();

        // Append all the updatedData fields to formData
        Object.keys(updatedData1).forEach(key => {
          formData.append(key, updatedData1[key]);
        });

        // Append images to formData
        try {
          images.forEach((image, index) => {
            formData.append(`image${index + 1}`, image);
          });
        } catch (error) {
          console.error("Error while appending images to form data", error);
        }
        updatedData = formData;

        break;

      default:
        console.error('Unknown document type:', documentType);
        return;
    }

    updateShipment(updatedData, documentType.toLowerCase());
  };

  return (
    <Card className="max-w-full mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100">
        <CardTitle className="text-lg font-semibold text-teal-900 flex items-center gap-2">
          <Package className="h-4 w-4" />
          Shipment Details
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <Accordion type="single" collapsible className="space-y-2">
          {steps.map((step, index) => (
            <AccordionItem
              key={index}
              value={`step-${index}`}
              className="border rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <AccordionTrigger
                onClick={() => setActiveStep(index)}
                className="px-2 py-2 text-lg font-medium hover:bg-gray-50 rounded-t-lg"
              >
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-5 w-5 text-teal-600" />
                  <span className="text-base">{step.title}</span>
                </div>
              </AccordionTrigger>

              <Divider className="mx-4" />

              <AccordionContent className="px-4 py-4">
                <div className="top-4 right-4">
                  
                </div>
                <div className="step-content prose max-w-none text-gray-600">
                  {step.content}
                </div>

                <div className="flex items-center gap-4 mt-6">

                  <Button
                    onClick={() => handleUpdate(step.title)}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700"
                  >
                    <Save className="h-4 w-4" />
                    Update {step.title}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(step.filename, step.title, shipment)}
                    className="flex items-right gap-2 hover:bg-teal-50"
                  >
                    <Download className="h-4 w-4" />
                    Download {step.title}
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
