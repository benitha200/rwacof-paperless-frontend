import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Edit, Eye } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import API_URL from '../../../constants/Constants';


const ContractList = () => {
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/contracts`)
      .then(response => response.json())
      .then(data => {
        setContracts(data);
        setFilteredContracts(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const results = contracts.filter(contract =>
      (contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.clientName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || contract.status === statusFilter)
    );
    setFilteredContracts(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, contracts]);

  const handleView = (contractId) => {
    navigate(`/contract/${contractId}`);
  };

  const handleEdit = (contractId) => {
    navigate(`/contract/edit/${contractId}`);
  };

  const handleAddShipment = (contractId, contractNumber) => {
    navigate('/new-shipment', {
      state: {
        contractId,
        contractNumber
      }
    });
  };

  const downloadCSV = () => {
    const csvData = filteredContracts.map(contract => ({
      ...contract,
      startDate: new Date(contract.startDate).toLocaleDateString(),
      endDate: new Date(contract.endDate).toLocaleDateString()
    }));

    const headers = [
      'Contract Number', 'Client Name', 'Start Date', 'End Date',
      'Total Quantity', 'Quantity Unit', 'Price', 'Currency', 'Status'
    ];

    const csvContent = [
      headers.join(','),
      ...csvData.map(contract => [
        contract.contractNumber,
        `"${contract.clientName}"`,
        contract.startDate,
        contract.endDate,
        contract.totalQuantity,
        contract.quantityUnit,
        contract.price,
        contract.currency,
        contract.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contracts_${new Date().toLocaleDateString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContracts.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredContracts.length / itemsPerPage);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold">Contracts</CardTitle>
            <CardDescription className="text-sm text-gray-700">
              Manage your contracts and their shipments
            </CardDescription>
          </div>
          <Button onClick={() => navigate('/new-contract')} className="text-sm">
            <Plus className="mr-2 h-4 w-4" />
            New Contract
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6 gap-4">
          <div className="flex gap-4 flex-1">
            <Input
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs text-sm"
            />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px] text-sm bg-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="EXPIRED">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            onClick={downloadCSV}
            className="text-sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium text-gray-700">Contract No</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Client</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Start Date</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">End Date</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Quantity</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Price</TableHead>
                {/* <TableHead className="text-xs font-medium text-gray-700">Status</TableHead> */}
                <TableHead className="text-xs font-medium text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="text-sm text-gray-700">{contract.contractNumber}</TableCell>
                  <TableCell className="text-sm text-gray-700">{contract.clientName}</TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {new Date(contract.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {new Date(contract.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {contract.totalQuantity} {contract.quantityUnit}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {contract.price} {contract.currency}
                  </TableCell>
                  {/* <TableCell className="text-sm text-gray-700">
                    <span className={`px-2 py-1 rounded-full text-xs ${contract.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      contract.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {contract.status}
                    </span>
                  </TableCell> */}
                  <TableCell className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(contract.id)}
                      className="h-8 w-8 hover:bg-gray-100"
                      title="View Contract"
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                    </Button>
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(contract.id)}
                      className="h-8 w-8 hover:bg-gray-100"
                      title="Edit Contract"
                    >
                      <Edit className="h-4 w-4 text-gray-600" />
                    </Button> */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddShipment(contract.id, contract.contractNumber,contract.price)}
                      className="flex items-center px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Shipment
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-sm"
          >
            Previous
          </Button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="text-sm"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className="text-sm"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractList;