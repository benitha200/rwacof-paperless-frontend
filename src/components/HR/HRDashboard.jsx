import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Users, FileText, Clock, Award 
} from 'lucide-react';

const HRDashboard = () => {
  const [employeeData] = useState([
    { id: 1, name: 'John Doe', department: 'HR', status: 'Active', performanceScore: 85 },
    { id: 2, name: 'Jane Smith', department: 'Finance', status: 'Active', performanceScore: 92 },
    { id: 3, name: 'Mike Johnson', department: 'IT', status: 'Inactive', performanceScore: 78 },
    { id: 4, name: 'Sarah Williams', department: 'Marketing', status: 'Active', performanceScore: 88 },
    { id: 5, name: 'Tom Brown', department: 'Sales', status: 'Active', performanceScore: 90 }
  ]);

  const departmentDistribution = {
    HR: employeeData.filter(e => e.department === 'HR').length,
    Finance: employeeData.filter(e => e.department === 'Finance').length,
    IT: employeeData.filter(e => e.department === 'IT').length,
    Marketing: employeeData.filter(e => e.department === 'Marketing').length,
    Sales: employeeData.filter(e => e.department === 'Sales').length
  };

  const statusDistribution = {
    Active: employeeData.filter(e => e.status === 'Active').length,
    Inactive: employeeData.filter(e => e.status === 'Inactive').length
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Administration Dashboard</h1>
          <p className="text-sm text-gray-700">Workforce and Performance Insights</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Users className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-700">Total Employees</p>
                <h3 className="text-lg font-bold text-gray-700">{employeeData.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <FileText className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-xs font-medium text-gray-700">Avg Performance</p>
                <h3 className="text-lg font-bold text-gray-700">
                  {(employeeData.reduce((sum, e) => sum + e.performanceScore, 0) / employeeData.length).toFixed(1)}%
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Clock className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="text-xs font-medium text-gray-700">Active Employees</p>
                <h3 className="text-lg font-bold text-gray-700">
                  {employeeData.filter(e => e.status === 'Active').length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Award className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-xs font-medium text-gray-700">Top Performers</p>
                <h3 className="text-lg font-bold text-gray-700">
                  {employeeData.filter(e => e.performanceScore > 90).length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-gray-700">Department Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={Object.entries(departmentDistribution).map(([name, value]) => ({ name, value }))}
              >
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#374151' }} />
                <YAxis tick={{ fontSize: 12, fill: '#374151' }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base text-gray-700">Employee Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Active', value: statusDistribution.Active },
                    { name: 'Inactive', value: statusDistribution.Inactive }
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
      </div>
    </div>
  );
};

export default HRDashboard;