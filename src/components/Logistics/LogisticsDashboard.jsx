import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import API_URL from '../../constants/Constants';


const LogisticsDashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch(`${API_URL}/api/shipments`);
        if (!response.ok) {
          throw new Error('Failed to fetch shipments');
        }
        const data = await response.json();
        setShipments(data);
      } catch (err) {
        setError('Failed to load shipments. Please try again later.');
        console.error('Error fetching shipments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const prepareChartData = () => {
    const sortedShipments = [...shipments].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedShipments.map(shipment => ({
      date: new Date(shipment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      shipments: 1, // Each entry represents one shipment
    }));
  };

  const calculateStats = () => {
    const totalShipments = shipments.length;
    const pendingShipments = shipments.filter(s => s.status === 'Pending').length;
    const avgQuantity = shipments.reduce((sum, s) => sum + s.quantity, 0) / totalShipments || 0;

    return {
      activeShipments: totalShipments,
      pendingPercentage: (pendingShipments / totalShipments * 100).toFixed(1),
      averageQuantity: avgQuantity.toFixed(1)
    };
  };

  const stats = calculateStats();

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Logistics Dashboard</h1>
      <p className="text-xl text-center text-gray-600">Manage your shipments efficiently</p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Active Shipments</h3>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeShipments}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Pending Shipments</h3>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.pendingPercentage}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Average Quantity</h3>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.averageQuantity}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Shipments Over Time</h3>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={prepareChartData()}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="shipments" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Create New Shipment</h3>
            </CardHeader>
            <CardContent>
              <p>Initiate a new shipment and streamline the export process.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/new-shipment')}>New Shipment</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Shipment Management</h3>
            </CardHeader>
            <CardContent>
              <p>Monitor and manage all active shipments in real-time.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2" onClick={() => navigate('/tracking')}>
                Track Shipments
              </Button>
              <Button variant="outline" onClick={() => navigate('/inventory')}>
                Inventory
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;