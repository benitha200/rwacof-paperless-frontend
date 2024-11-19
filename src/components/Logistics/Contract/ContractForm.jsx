import React, { useState } from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import API_URL from '../../../constants/Constants';
import { useLocation } from 'react-router-dom';

const ContractForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [contract, setContract] = useState({
    contractNumber: '',
    clientName: '',
    startDate: null,
    endDate: null,
    totalQuantity: '',
    quantityUnit: 'MT',
    price: '',
    currency: 'USD',
    terms: '',
    status: 'ACTIVE'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContract(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setContract(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedContract = {
      ...contract,
      totalQuantity: parseInt(contract.totalQuantity, 10),
      price: parseFloat(contract.price),
      startDate: contract.startDate?.toISOString(),
      endDate: contract.endDate?.toISOString()
    };

    try {
      const response = await fetch(`${API_URL}/api/contracts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedContract),
      });

      if (!response.ok) {
        throw new Error('Failed to create contract');
      }

      const data = await response.json();
      toast({
        title: "Success",
        description: "Contract created successfully",
      });
      navigate('/contracts');
    } catch (error) {
      console.error('Error creating contract:', error);
      toast({
        title: "Error",
        description: "Failed to create contract",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-gray-700">New Contract</CardTitle>
        <CardDescription className="font-normal tracking-wide text-sm">
          Create a new trading contract
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contractNumber">Contract Number</Label>
              <Input
                id="contractNumber"
                name="contractNumber"
                value={contract.contractNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                name="clientName"
                value={contract.clientName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {contract.startDate ? format(contract.startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={contract.startDate}
                    onSelect={(date) => setContract(prev => ({ ...prev, startDate: date }))}
                    initialFocus
                    className="rounded-md border bg-white"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center gap-1",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 hover:opacity-70",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-gray-500 rounded-md w-8 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gray-100",
                      day: "h-8 w-8 p-0 font-normal hover:bg-gray-100 rounded-md",
                      day_range_middle: "aria-selected:bg-gray-100",
                      day_selected: "bg-gray-900 text-white hover:bg-gray-900 focus:bg-gray-900",
                      day_today: "bg-gray-100",
                      day_outside: "text-gray-400 opacity-50",
                      day_disabled: "text-gray-400 opacity-50",
                      day_hidden: "invisible"
                    }}
                    components={{
                      IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                      IconRight: () => <ChevronRight className="h-4 w-4" />
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {contract.endDate ? format(contract.endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={contract.endDate}
                    onSelect={(date) => setContract(prev => ({ ...prev, endDate: date }))}
                    initialFocus
                    className="rounded-md border bg-white"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center gap-1",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 hover:opacity-70",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-gray-500 rounded-md w-8 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gray-100",
                      day: "h-8 w-8 p-0 font-normal hover:bg-gray-100 rounded-md",
                      day_range_middle: "aria-selected:bg-gray-100",
                      day_selected: "bg-gray-900 text-white hover:bg-gray-900 focus:bg-gray-900",
                      day_today: "bg-gray-100",
                      day_outside: "text-gray-400 opacity-50",
                      day_disabled: "text-gray-400 opacity-50",
                      day_hidden: "invisible"
                    }}
                    components={{
                      IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                      IconRight: () => <ChevronRight className="h-4 w-4" />
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalQuantity">Total Quantity</Label>
              <div className="flex gap-2">
                <Input
                  id="totalQuantity"
                  name="totalQuantity"
                  type="number"
                  value={contract.totalQuantity}
                  onChange={handleChange}
                  required
                  className="flex-1"
                />
                {/* <Select 
                  value={contract.quantityUnit} 
                  onValueChange={(value) => handleSelectChange('quantityUnit', value)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MT">MT</SelectItem>
                    <SelectItem value="KG">KG</SelectItem>
                    <SelectItem value="LB">LB</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="flex gap-2">
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={contract.price}
                  onChange={handleChange}
                  required
                  className="flex-1"
                />
                {/* <Select 
                  value={contract.currency} 
                  onValueChange={(value) => handleSelectChange('currency', value)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">Terms & Conditions</Label>
            <Textarea
              id="terms"
              name="terms"
              value={contract.terms}
              onChange={handleChange}
              className="min-h-[100px]"
              required
            />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={contract.status} 
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          Create Contract
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContractForm;