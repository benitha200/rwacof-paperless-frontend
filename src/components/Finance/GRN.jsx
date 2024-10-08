import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';

const EditableField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
    />
  </div>
);

const GRN = () => {
  const [formData, setFormData] = useState({
    grnNo: '4961',
    date: '2024-02-16',
    supplier: 'Impexcor coffee',
    region: '',
    vehicleRegNo: 'RAE 298M',
    moisture: '12.6%',
    parch: '14.4',
    wbridgeRef: '',
    coffeeType: 'Arabica parch fully',
    bags: '160',
    weightOfCoffee: '10920',
    lessNoOfBags: '27',
    subGrossKg: '10,893',
    lessMoistureKg: '-',
    lessQualityKg: '-',
    netWeightKg: '10893',
    paymentWeight: '10893',
    rate: '4575',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const calculateAmount = () => {
    const paymentWeight = parseFloat(formData.paymentWeight.replace(/,/g, ''));
    const rate = parseFloat(formData.rate.replace(/,/g, ''));
    return isNaN(paymentWeight) || isNaN(rate) ? '0' : (paymentWeight * rate).toFixed(2);
  };

  const supplierOptions = [
    'Impexcor coffee',
    'Rwanda Trading Company',
    'Kivu Belt Coffee',
    'Buf Coffee',
    'Other'
  ];

  const coffeeTypeOptions = [
    'Arabica parch fully',
    'Arabica green',
    'Robusta parch',
    'Robusta green',
    'Other'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mr-4">
                <img src="/api/placeholder/80/80" alt="Company Logo" className="w-16 h-16" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">RWACOF EXPORTS LTD</h1>
                <p className="text-sm text-gray-600">P.O BOX:6934 KIGALI</p>
                <p className="text-sm text-gray-600">Tel:+250 252 575872/ Fax: 0252 572024</p>
              </div>
            </div>
            <div className="border border-gray-300 p-2 rounded">
              <p className="font-semibold">SOURCE</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl font-bold text-center my-6 text-teal-600">GOODS RECEIVED NOTE</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <EditableField label="GRN NO" name="grnNo" value={formData.grnNo} onChange={handleInputChange} />
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">DATE</label>
              <DatePicker
                selected={new Date(formData.date)}
                onChange={(date) => setFormData((prevData) => ({ ...prevData, date: date.toISOString().split('T')[0] }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">SUPPLIER</label>
              <Select
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              >
                {supplierOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            </div>
            <EditableField label="REGION" name="region" value={formData.region} onChange={handleInputChange} />
            <EditableField label="VEHICLE REG NO" name="vehicleRegNo" value={formData.vehicleRegNo} onChange={handleInputChange} />
            <EditableField label="W.BRIDGE REF" name="wbridgeRef" value={formData.wbridgeRef} onChange={handleInputChange} />
            <EditableField label="MOISTURE" name="moisture" value={formData.moisture} onChange={handleInputChange} />
            <EditableField label="PARCH" name="parch" value={formData.parch} onChange={handleInputChange} />
          </div>

          <table className="min-w-full divide-y divide-gray-200 mb-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.NO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TYPE OF COFFEE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BAGS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WEIGHT OF COFFEE</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">1</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select
                    name="coffeeType"
                    value={formData.coffeeType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                  >
                    {coffeeTypeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </Select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <EditableField name="bags" value={formData.bags} onChange={handleInputChange} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <EditableField name="weightOfCoffee" value={formData.weightOfCoffee} onChange={handleInputChange} />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Weighing Details</h3>
              <EditableField label="LESS NO OF BAGS" name="lessNoOfBags" value={formData.lessNoOfBags} onChange={handleInputChange} />
              <EditableField label="SUB GROSS KG" name="subGrossKg" value={formData.subGrossKg} onChange={handleInputChange} />
              <EditableField label="LESS MOISTURE KG" name="lessMoistureKg" value={formData.lessMoistureKg} onChange={handleInputChange} />
              <EditableField label="LESS QUALITY KG" name="lessQualityKg" value={formData.lessQualityKg} onChange={handleInputChange} />
              <EditableField label="NET WEIGHT KG" name="netWeightKg" value={formData.netWeightKg} onChange={handleInputChange} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Approvals</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">WEIGHED BY:</p>
                  <div className="h-8 border-b border-gray-300"></div>
                </div>
                <div>
                  <p className="font-medium">SUPPLIER:</p>
                  <div className="h-8 border-b border-gray-300"></div>
                </div>
                <div>
                  <p className="font-medium">APPROVED BY:</p>
                  <div className="h-8 border-b border-gray-300"></div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-teal-600">PAYMENT VOUCHER</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <EditableField label="DATE" name="paymentDate" value="" onChange={handleInputChange} />
            <EditableField label="Dr. A/C" name="drAccount" value="" onChange={handleInputChange} />
            <EditableField label="CHEQUE IN FAVOUR OF" name="chequeInFavourOf" value="" onChange={handleInputChange} />
          </div>

          <table className="min-w-full divide-y divide-gray-200 mb-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITEM</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Payment weight</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <EditableField name="paymentWeight" value={formData.paymentWeight} onChange={handleInputChange} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <EditableField name="rate" value={formData.rate} onChange={handleInputChange} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {calculateAmount()}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Security Retained</td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
              <tr className="bg-gray-50">
                <td colSpan="3" className="px-6 py-4 whitespace-nowrap font-bold">Total</td>
                <td className="px-6 py-4 whitespace-nowrap font-bold">{calculateAmount()}</td>
              </tr>
            </tbody>
          </table>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">In words:</label>
            <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 h-10 bg-gray-100"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="font-medium">PREPARED BY:</p>
              <div className="h-8 border-b border-gray-300"></div>
            </div>
            <div>
              <p className="font-medium">CHECKED BY:</p>
              <div className="h-8 border-b border-gray-300"></div>
            </div>
            <div>
              <p className="font-medium">AUTHORIZED BY:</p>
              <div className="h-8 border-b border-gray-300"></div>
            </div>
            <div>
              <p className="font-medium">RECEIVED BY:</p>
              <div className="h-8 border-b border-gray-300"></div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Alert className="mt-6">
        <AlertDescription>
          This is an enhanced version of the Goods Received Note (GRN) form. All fields are editable. Please review and confirm all information before submission.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default GRN;