import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { DollarSign, AlertCircle, Calendar, TrendingUp } from 'lucide-react';
import API_URL from '../../constants/Constants';

const Payments = () => {
  const [grnData, setGrnData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGRNData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/grn/`);
        const data = await response.json();
        setGrnData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGRNData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading payment data...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load payment data: {error}</AlertDescription>
      </Alert>
    );
  }

  // Calculate payment metrics
  const totalPayments = grnData.reduce((sum, grn) => sum + grn.payment_amount, 0);
  const averagePaymentRate = grnData.reduce((sum, grn) => sum + grn.payment_rate, 0) / grnData.length;
  const totalQuantity = grnData.reduce((sum, grn) => sum + parseFloat(grn.payment_quantity), 0);

  // Payment summary cards data
  const summaryCards = [
    {
      title: "Total Payments",
      value: `$${totalPayments.toLocaleString()}`,
      icon: DollarSign,
      description: "Total amount paid for all GRNs"
    },
    {
      title: "Average Rate",
      value: `$${averagePaymentRate.toLocaleString()}/kg`,
      icon: TrendingUp,
      description: "Average payment rate per kg"
    },
    {
      title: "Total Quantity",
      value: `${totalQuantity.toLocaleString()} kg`,
      icon: Calendar,
      description: "Total quantity processed"
    }
  ];

  // Sort GRNs by payment date
  const sortedGRNs = [...grnData].sort((a, b) => 
    new Date(b.paymentDate) - new Date(a.paymentDate)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-gray-500">
          Overview of all GRN payments and financial metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <card.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <h2 className="text-2xl font-bold">{card.value}</h2>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>


      {/* Recent Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Coffee Type</TableHead>
                <TableHead className="text-right">Quantity (kg)</TableHead>
                <TableHead className="text-right">Rate ($/kg)</TableHead>
                <TableHead className="text-right">Amount ($)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedGRNs.map((grn) => (
                <TableRow key={grn.id}>
                  <TableCell>{new Date(grn.paymentDate).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{grn.supplierName}</TableCell>
                  <TableCell>{grn.coffee_type}</TableCell>
                  <TableCell className="text-right">{parseFloat(grn.payment_quantity).toLocaleString()}</TableCell>
                  <TableCell className="text-right">${grn.payment_rate.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${grn.payment_amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${grn.status === 'Received' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {grn.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Payment Notes</AlertTitle>
              <AlertDescription>
                All payments are processed in favor of {grnData[0].cheque_in_favor_of}.
                Payment rates are subject to market conditions and quality assessment.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;