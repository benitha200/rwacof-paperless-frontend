import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Settings, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const data = [
  { name: 'Jan', users: 400, revenue: 2400, shipments: 240 },
  { name: 'Feb', users: 300, revenue: 1398, shipments: 210 },
  { name: 'Mar', users: 200, revenue: 9800, shipments: 290 },
  { name: 'Apr', users: 278, revenue: 3908, shipments: 200 },
  { name: 'May', users: 189, revenue: 4800, shipments: 218 },
  { name: 'Jun', users: 239, revenue: 3800, shipments: 250 },
];

const StatCard = ({ title, value, change }) => (
  <Card className="bg-purple-50 dark:bg-purple-900">
    <CardHeader className="pb-2">
      <h3 className="text-sm font-medium">{title}</h3>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

const ActionCard = ({ title, description, icon, action }) => (
  <Card>
    <CardHeader>
      <h3 className="text-lg font-semibold">{title}</h3>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
    <CardFooter>
      <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
        {React.createElement(icon, { className: "w-4 h-4 mr-2" })}
        {action}
      </button>
    </CardFooter>
  </Card>
);

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <Alert className="mb-8">
        <AlertTitle>Welcome back, Admin!</AlertTitle>
        <AlertDescription>
          Here's an overview of your system's performance and key metrics.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value="1,234" change="↑ 5% from last month" />
        <StatCard title="Active Shipments" value="87" change="↑ 15% from last week" />
        <StatCard title="Total Revenue" value="$5.4M" change="↑ 8% from last month" />
        <StatCard title="System Uptime" value="99.9%" change="Last 30 days" />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" />
            <Bar dataKey="revenue" fill="#82ca9d" />
            <Bar dataKey="shipments" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ActionCard
          title="Manage Users"
          description="Add, remove, or modify user accounts and permissions."
          icon={Users}
          action="User Management"
        />
        <ActionCard
          title="System Settings"
          description="Configure and optimize system parameters for peak performance."
          icon={Settings}
          action="System Settings"
        />
        <ActionCard
          title="Financial Overview"
          description="Review comprehensive financial reports and analytics."
          icon={DollarSign}
          action="Financial Reports"
        />
        <ActionCard
          title="Logistics Overview"
          description="Monitor and manage all shipments and logistics operations."
          icon={TrendingUp}
          action="Logistics Dashboard"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;