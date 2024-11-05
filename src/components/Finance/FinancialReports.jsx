import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  TrendingUp, 
  BarChart2, 
  PieChart as PieChartIcon,
  Download,
  FileSpreadsheet,
  FileText,
  ClipboardList,
  TrendingDown,
  Scale
} from 'lucide-react';

const FinancialReports = () => {
  const [grnData, setGrnData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGRNData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/grn/');
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

  const handleDownloadReport = (reportType) => {
    // In a real implementation, this would trigger the report generation and download
    console.log(`Downloading ${reportType} report...`);
  };

  const downloadableReports = [
    {
      title: "GRN Summary Report",
      description: "Complete summary of all GRN transactions with payment details",
      icon: FileText,
      type: "grn-summary",
      color: "blue"
    },
    {
      title: "Supplier Analysis Report",
      description: "Detailed breakdown of supplier performance and payments",
      icon: ClipboardList,
      type: "supplier-analysis",
      color: "green"
    },
    {
      title: "Financial Statement",
      description: "Comprehensive financial statement including all transactions",
      icon: FileSpreadsheet,
      type: "financial-statement",
      color: "yellow"
    }
  ];

  if (loading) {
    return <div className="p-6">Loading financial reports...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load financial data: {error}</AlertDescription>
      </Alert>
    );
  }

  // Calculate financial metrics
  const totalRevenue = grnData.reduce((sum, grn) => sum + grn.payment_amount, 0);
  const totalVolume = grnData.reduce((sum, grn) => sum + grn.netWeightKg, 0);
  const averagePrice = totalRevenue / totalVolume;

  // Group data by supplier
  const supplierData = grnData.reduce((acc, grn) => {
    if (!acc[grn.supplierName]) {
      acc[grn.supplierName] = {
        totalAmount: 0,
        totalVolume: 0,
        transactions: 0
      };
    }
    acc[grn.supplierName].totalAmount += grn.payment_amount;
    acc[grn.supplierName].totalVolume += grn.netWeightKg;
    acc[grn.supplierName].transactions += 1;
    return acc;
  }, {});

  // Prepare supplier summary for pie chart
  const supplierSummary = Object.entries(supplierData).map(([name, data]) => ({
    name,
    value: data.totalAmount,
    volume: data.totalVolume,
    transactions: data.transactions
  }));

  // Prepare time series data
  const timeSeriesData = grnData
    .sort((a, b) => new Date(a.receivedDate) - new Date(b.receivedDate))
    .map(grn => ({
      date: new Date(grn.receivedDate).toLocaleDateString(),
      amount: grn.payment_amount,
      volume: grn.netWeightKg,
      rate: grn.payment_rate
    }));

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 space-y-6">
       {/* Downloadable Reports Section */}
       <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Financial Reports</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {downloadableReports.map((report) => {
            const IconComponent = report.icon;
            return (
              <Card key={report.type} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 bg-${report.color}-100 rounded-lg`}>
                        <IconComponent className={`h-6 w-6 text-${report.color}-600`} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-gray-500">{report.description}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadReport(report.type)}
                    className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;