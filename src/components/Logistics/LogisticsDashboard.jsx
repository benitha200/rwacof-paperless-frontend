import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Package, DollarSign, ShoppingBag, Calendar 
} from 'lucide-react';
import { Scale } from 'lucide-react';
import API_URL from '../../constants/Constants';

const LogisticsDashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0] // today
  });

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch(`${API_URL}/api/shipments`);
        const data = await response.json();
        setShipments(data);
        filterShipmentsByDate(data, dateRange.startDate, dateRange.endDate);
      } catch (error) {
        console.error('Error fetching shipments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const filterShipmentsByDate = (shipmentsData, start, end) => {
    const filtered = shipmentsData.filter(shipment => {
      const shipmentDate = new Date(shipment.date).toISOString().split('T')[0];
      return shipmentDate >= start && shipmentDate <= end;
    });
    setFilteredShipments(filtered);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newDateRange = { ...dateRange, [name]: value };
    setDateRange(newDateRange);
    filterShipmentsByDate(shipments, newDateRange.startDate, newDateRange.endDate);
  };

  // Calculate key metrics using filtered shipments
  const totalShipments = filteredShipments.length;
  const totalQuantity = filteredShipments.reduce((sum, s) => sum + s.quantity, 0);
  const totalValue = filteredShipments.reduce((sum, s) => sum + parseFloat(s.amount), 0);
  const avgPrice = filteredShipments.reduce((sum, s) => sum + parseFloat(s.price), 0) / (totalShipments || 1);
  const totalWeight = filteredShipments.reduce((sum, s) => sum + parseFloat(s.netWeight), 0);

  // Prepare data for charts using filtered shipments
  const weightDistribution = filteredShipments.map(s => ({
    name: `Container ${s.containerNo.slice(0, 8)}...`,
    weight: parseFloat(s.netWeight)
  }));

  const quantityDistribution = filteredShipments.map(s => ({
    name: `Container ${s.containerNo.slice(0, 8)}...`,
    quantity: s.quantity
  }));

  const statusDistribution = {
    pending: filteredShipments.filter(s => s.status === "Pending").length,
    completed: filteredShipments.filter(s => s.status !== "Pending").length
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <p className="text-gray-700">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Logistics Dashboard</h1>
          <p className="text-sm text-gray-700">Real-time insights for all shipments</p>
        </div>
        
        {/* Date Range Filter */}
        <Card className="mt-4 md:mt-0">
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <input
                  type="date"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                  className="px-2 py-1 border rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <span className="text-gray-500">to</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <input
                  type="date"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleDateChange}
                  className="px-2 py-1 border rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Package className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-700">Total Shipments</p>
                <h3 className="text-lg font-bold text-gray-700">{totalShipments}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <ShoppingBag className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-xs font-medium text-gray-700">Total Quantity</p>
                <h3 className="text-lg font-bold text-gray-700">{totalQuantity} bags</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <DollarSign className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="text-xs font-medium text-gray-700">Total Value</p>
                <h3 className="text-lg font-bold text-gray-700">{formatCurrency(totalValue)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Scale className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-xs font-medium text-gray-700">Total Weight</p>
                <h3 className="text-lg font-bold text-gray-700">{totalWeight} Kgs</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-gray-700">Weight Distribution by Container</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weightDistribution}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#374151' }} />
                <YAxis tick={{ fontSize: 12, fill: '#374151' }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="weight" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base text-gray-700">Quantity Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quantityDistribution}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#374151' }} />
                <YAxis tick={{ fontSize: 12, fill: '#374151' }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="quantity" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-gray-700">Shipment Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Pending', value: statusDistribution.pending },
                    { name: 'Completed', value: statusDistribution.completed }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[0, 1].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base text-gray-700">Shipment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Average Price per Unit:</span>
                <span className="font-bold text-gray-700">{formatCurrency(avgPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Primary Consignee:</span>
                <span className="font-bold text-gray-700">Sucafina SA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Main Product:</span>
                <span className="font-bold text-gray-700">RWANDA ARABICA COFFEE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Shipping Status:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  {totalShipments} Active Shipments
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogisticsDashboard;