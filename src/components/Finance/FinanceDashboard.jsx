import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { DollarSign, Package, Scale, Droplet, TrendingUp, Clock } from 'lucide-react';
import API_URL from '../../constants/Constants';

const DashboardFinance = () => {
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
    return <div className="p-6">Loading dashboard data...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load GRN data: {error}</AlertDescription>
      </Alert>
    );
  }

  // Calculate total values and averages
  const totalPaymentAmount = grnData.reduce((sum, grn) => sum + grn.payment_amount, 0);
  const totalBags = grnData.reduce((sum, grn) => sum + grn.bags, 0);
  const averageMoisture = grnData.reduce((sum, grn) => sum + grn.moisture, 0) / grnData.length;
  const totalWeight = grnData.reduce((sum, grn) => sum + grn.netWeightKg, 0);

  // Stats cards data
  const statsCards = [
    {
      title: "Total Payment Amount",
      value: `$${totalPaymentAmount.toLocaleString()}`,
      icon: DollarSign,
      description: "Total payments for all GRNs"
    },
    {
      title: "Total Net Weight",
      value: `${totalWeight.toLocaleString()} kg`,
      icon: Scale,
      description: "Combined processed weight"
    },
    {
      title: "Total Bags",
      value: totalBags,
      icon: Package,
      description: "Total bags received"
    },
    {
      title: "Avg Moisture",
      value: `${averageMoisture.toFixed(1)}%`,
      icon: Droplet,
      description: "Average moisture content"
    }
  ];

  // Prepare chart data for quality metrics
  const qualityData = grnData.map(grn => ({
    name: grn.supplierName,
    moisture: grn.moisture,
    parch: grn.parch,
    payment: grn.payment_amount / 1000 // Convert to thousands for better visualization
  }));

  // Recent GRN status summary
  const latestGRN = grnData[0];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Finance Dashboard</h1>
        <p className="text-gray-500">
          {grnData.length} GRNs processed - Last updated: {new Date(latestGRN.updatedAt).toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics by Supplier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <BarChart
                width={500}
                height={300}
                data={qualityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="moisture" fill="#3b82f6" name="Moisture %" />
                <Bar dataKey="parch" fill="#10b981" name="Parch %" />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent GRN Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Latest Supplier</p>
                  <p className="text-lg font-semibold">{latestGRN.supplierName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Coffee Type</p>
                  <p className="text-lg font-semibold">{latestGRN.coffee_type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Quality Grade</p>
                  <p className="text-lg font-semibold">{latestGRN.qualityGrade}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-lg font-semibold">{latestGRN.status}</p>
                </div>
              </div>

              <Alert className={latestGRN.status === 'Received' ? 'bg-green-50' : 'bg-yellow-50'}>
                <AlertTitle>Current Status</AlertTitle>
                <AlertDescription>
                  {latestGRN.status === 'Received' 
                    ? `${latestGRN.supplierName} delivery successfully received and processed`
                    : `${latestGRN.supplierName} delivery is in ${latestGRN.status} status`}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardFinance;