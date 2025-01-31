import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Users, FileText, Clock, Award 
} from 'lucide-react';

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesRes, departmentsRes] = await Promise.all([
          fetch('https://cherryapp.sucafina.com:8012/api/employees'),
          fetch('https://cherryapp.sucafina.com:8012/api/departments')
        ]);
        
        const employeesData = await employeesRes.json();
        const departmentsData = await departmentsRes.json();
        
        setEmployees(employeesData);
        setDepartments(departmentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to trim "Department" from department names
  const trimDepartmentName = (name) => {
    return name.replace(' Department', '');
  };

  // Calculate department distribution with trimmed names
  const departmentDistribution = departments.reduce((acc, dept) => {
    const trimmedName = trimDepartmentName(dept.name);
    acc[trimmedName] = employees.filter(emp => emp.departmentId === dept.id).length;
    return acc;
  }, {});

  // Calculate status distribution
  const statusDistribution = employees.reduce((acc, emp) => {
    const status = emp.status === 'ACTIVE' ? 'Active' : 'Inactive';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, { Active: 0, Inactive: 0 });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Administration Dashboard</h1>
          <p className="text-sm text-gray-700">Workforce and Department Insights</p>
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
                <h3 className="text-lg font-bold text-gray-700">{employees.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <FileText className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-xs font-medium text-gray-700">Departments</p>
                <h3 className="text-lg font-bold text-gray-700">{departments.length}</h3>
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
                  {employees.filter(e => e.status === 'ACTIVE').length}
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
                <p className="text-xs font-medium text-gray-700">Departments Active</p>
                <h3 className="text-lg font-bold text-gray-700">
                  {departments.filter(d => d.status === 'ACTIVE').length}
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
                margin={{ left: 20, right: 20, bottom: 50 }}
              >
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#374151' }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  interval={0}
                />
                <YAxis tick={{ fontSize: 12, fill: '#374151' }} />
                <Tooltip 
                  contentStyle={{ fontSize: 12 }}
                  formatter={(value, name, props) => [value, 'Employees']}
                />
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
                  data={Object.entries(statusDistribution).map(([name, value]) => ({ name, value }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {Object.keys(statusDistribution).map((_, index) => (
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