import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';
import { Loader2, Package, DollarSign, Weight, Hash } from 'lucide-react';
import axios from 'axios';
import API_URL from '../../../constants/Constants';

const LoadingTallySheet = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/loading-tally-sheets`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch loading tally sheet data');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center h-48 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm text-gray-500">Loading tally sheet data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center h-48 space-y-4">
            <Package className="h-12 w-12 text-gray-400" />
            <p className="text-center text-gray-500">No loading tally sheet data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b bg-gray-50/50">
        <CardTitle className="text-xl font-semibold text-gray-900">Loading Tally Sheet</CardTitle>
      </CardHeader>
      <CardContent className="m-4 border-b">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Loading Day</TableHead>
                <TableHead className="font-semibold">Container/Truck No</TableHead>
                <TableHead className="font-semibold">SL</TableHead>
                <TableHead className="font-semibold">Forwarder</TableHead>
                <TableHead className="font-semibold">RSS/SSRW/SPRW</TableHead>
                <TableHead className="font-semibold">Plate No</TableHead>
                <TableHead className="font-semibold">Tare</TableHead>
                <TableHead className="font-semibold">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow 
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    {format(new Date(item.loadingDay), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>{item.shipment.containerNo}</TableCell>
                  <TableCell>{item.sl}</TableCell>
                  <TableCell>{item.forwarder}</TableCell>
                  <TableCell>{item.rssSsrwSprw}</TableCell>
                  <TableCell>{item.plateNo}</TableCell>
                  <TableCell>{item.tare}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Hash className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Lot No: {item.shipment.lotNo}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Package className="h-4 w-4" />
                        <span>Quantity: {item.shipment.quantity} {item.shipment.quantityUnit}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Weight className="h-4 w-4" />
                        <span>Net Weight: {item.shipment.netWeight} {item.shipment.netWeightUnit}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span>Amount: ${item.shipment.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingTallySheet;