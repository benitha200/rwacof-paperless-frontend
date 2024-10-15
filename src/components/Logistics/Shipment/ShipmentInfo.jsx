import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../../constants/Constants';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '../../ui/button';
import { CheckCircle2, Circle } from "lucide-react";
import { handleDownload, handleUpdate, formatDate, numberToWords } from './ShipmentUtils';
// import logo from "./../../../assets/img/logo.png";
import logo from "./../../../../assets/img/logo.png";
import maersklogo from "./../../../../assets/img/maersklogo.jpg";
import ShipmentDetails from './ShipmentDetails';

function ShipmentInfo() {
    const { id } = useParams();
    const [activeStep, setActiveStep] = useState(0);
    const [shipment, setShipment] = useState({});
    const navigate = useNavigate();
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        fetchShipment();
    }, [id]);

    const handleInputChange = (e, field) => {
        const { name, value } = e.target;
        setResponse(prevState => ({
            ...prevState,
            data: {
                ...prevState.data,
                [field]: {
                    ...prevState.data[field],
                    [name]: name === 'date' ? new Date(value).toISOString() : value
                }
            }
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    const fetchShipment = () => {
        console.log(API_URL);
        axios.get(`${API_URL}/api/shipments/${id}`)
            .then(response => {
                setShipment(response.data);
                console.log('Retrieved shipment:', response.data);
                setSteps([
                    {
                        title: "LoadingTallysheet",
                        content: (
                            <div className="p-2 rounded-lg overflow-auto w-full m-2">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-400 px-2 py-1">LOT</th>
                                            <th className="border border-gray-400 px-2 py-1">Loading Day</th>
                                            <th className="border border-gray-400 px-2 py-1">SL</th>
                                            <th className="border border-gray-400 px-2 py-1">Forwarder</th>
                                            <th className="border border-gray-400 px-2 py-1">Contract Reference</th>
                                            <th className="border border-gray-400 px-2 py-1">PLAQUE</th>
                                            <th className="border border-gray-400 px-2 py-1">CONTAINER</th>
                                            <th className="border border-gray-400 px-2 py-1">TARE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-400 px-2 py-1">
                                                <input
                                                    type="text"
                                                    className="border w-full"
                                                    name="lotNo"
                                                    value={response.data.lotNo || ''}

                                                    onChange={(e) => handleInputChange(e, 'loadingTallySheet')}
                                                />
                                            </td>
                                            <td className="border border-gray-400 px-2 py-1">
                                                <input
                                                    type="date"
                                                    className="border w-full"
                                                    name="date"
                                                    value={response.data.date ? new Date(response.data.date).toISOString().split('T')[0] : '2024-10-10'}
                                                    onChange={(e) => handleInputChange(e, 'loadingTallySheet')}
                                                />
                                            </td>
                                            <td className="border border-gray-400 px-2 py-1">
                                                <input
                                                    type='text'
                                                    name='SL'
                                                    className='border border-1 border-slate-400'
                                                    defaultValue={response.data.loadingTallySheet?.sl}
                                                    onChange={(e) => handleInputChange(e, 'loadingTallySheet')}
                                                />
                                            </td>
                                            <td className="border border-gray-400 px-2 py-1">
                                                <input
                                                    type='text'
                                                    name='Forwarder'
                                                    className='border border-1 border-slate-400'
                                                    defaultValue={response.data.loadingTallySheet?.forwarder}
                                                    onChange={(e) => handleInputChange(e, 'loadingTallySheet')}
                                                />
                                            </td>

                                            {/* <td className="border border-gray-400 px-2 py-1"><input type='text' name='SL' className='border border-1 border-slate-400' value={response.data.loadingTallySheet?.sl}
                                                    onChange={(e) => handleInputChange(e, 'loadingTallySheet')}/></td>
                                            <td className="border border-gray-400 px-2 py-1"><input type='text' name='Forwarder' className='border border-1 border-slate-400'  value={response.data.loadingTallySheet?.forwarder}
                                                    onChange={(e) => handleInputChange(e, 'loadingTallySheet')}/></td> */}
                                            <td className="border border-gray-400 px-2 py-1">
                                                <input
                                                    type="text"
                                                    className="border w-full"
                                                    name="description"
                                                    value={response.data.description || ''}
                                                    onChange={(e) => handleInputChange(e, 'loadingTallySheet')}
                                                />
                                            </td>
                                            <td className="border border-gray-400 px-2 py-1">
                                                <input
                                                    type="text"
                                                    className="border w-full"
                                                    name="truckNo"
                                                    value={response.data.truckNo || ''}
                                                    onChange={(e) => handleInputChange(e, 'loadingTallySheet')}
                                                />
                                            </td>
                                            <td className="border border-gray-400 px-2 py-1">
                                                <input
                                                    type="text"
                                                    className="border w-full"
                                                    name="containerNo"
                                                    value={response.data.containerNo || ''}
                                                    onChange={(e) => handleInputChange(e, 'loadingTallySheet')}
                                                />
                                            </td>
                                            <td className="border border-gray-400 px-2 py-1">
                                                <input
                                                    type="text"
                                                    className="border w-full"
                                                    name="netWeight"
                                                    value={response.data.netWeight || ''}
                                                    onChange={(e) => handleInputChange(e, 'loadingTallySheet')}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ),
                        filename: 'tally-sheet.pdf'
                    },
                    {
                        title: "Invoice",
                        content: (
                            <div className="border border-gray-300 p-4 rounded-lg m-4">
                                <h2 className="text-xl font-bold mb-4">RWACOF EXPORTS LTD</h2>
                                <h3 className="text-lg font-semibold mb-4">INVOICE</h3>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <h4 className="font-semibold">SELLER</h4>
                                        <p>RWACOF EXPORTS LTD</p>
                                        <p>BP 6934 KIGALI</p>
                                        <p>RWANDA</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">CONSIGNEE:</h4>
                                        <p>{response.data.consignee || 'SUCAFINA S.A GENEVA'}</p>
                                        <p>1PLACE ST GERVAIS, SWITZERLAND</p>
                                        <p>{formatDate(response.data.date)}</p>
                                        <p>SSRW-90706</p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 p-2 mb-4 gap-2 ">
                                    <p className="mb-4">
                                        <span className="font-semibold">TRUCK NO:</span> {response.data.truckNo || 'RAE2611/RL2728'}
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">CONTAINER No:</span> {response.data.containerNo || 'MSMU5188197'}

                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold"> LOT No:</span>
                                        <input type="text" className="border ml-1" value={response.data.lotNo || ''} readOnly />
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">DESCRIPTION:</span>
                                        <input type="text" className="border ml-1" value={response.data.description || ''} readOnly />
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">IN BIG BAGS:</span>
                                        <input type="number" className="border ml-1" value={response.data.quantity || ''} readOnly />
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">NET WEIGHT:</span>
                                        <input type="number" className="border ml-1" value={response.data.netWeight || ''} readOnly />
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">AMOUNT: U.S DOLLARS</span> {response.data.amount ? `${response.data.amount.toLocaleString()} (${numberToWords(response.data.amount)})` : 'One Hundred Five Thousand Eight Hundred and Eighty-One'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{response.data.amount ? response.data.amount.toLocaleString() : '105,821'}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">AUTHORISED SIGNATURE</p>
                                    <p className="mb-4">RWACOF</p>
                                </div>

                            </div>
                        ),
                        filename: 'invoice.pdf'
                    },
                    {
                        title: "VGM",
                        content: (
                            <div className="border border-gray-300 p-4 rounded-lg m-4">
                                <form onSubmit={handleSubmit}>
                                    <h3 className="text-lg font-bold text-center mb-4 underline">VERIFIED GROSS MASS (VGM)</h3>

                                    <table className="w-full border-collapse mb-4">
                                        <thead>
                                            <tr className="bg-yellow-400">
                                                <th className="border border-black p-1 text-left">Shipper Name</th>
                                                <th className="border border-black p-1 text-left">Booking or B/L Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-black p-1" colSpan="2">
                                                    <input
                                                        type="text"
                                                        className="border w-full"
                                                        name="bookingBlNumber"
                                                        onChange={handleInputChange}
                                                        defaultValue="RWACOF EXPORTS LIMITED"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="w-full border-collapse mb-4">
                                        <thead>
                                            <tr className="bg-yellow-400">
                                                <th className="border border-black p-1">Container number</th>
                                                <th className="border border-black p-1">Container type/size</th>
                                                <th className="border border-black p-1">VGM (KGS)</th>
                                                <th className="border border-black p-1">Cargo G.W. (KGS)</th>
                                                <th className="border border-black p-1">Method (I or II)</th>
                                                <th className="border border-black p-1">Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-black p-1">
                                                    <input
                                                        type="text"
                                                        className="border w-full"
                                                        name="containerNumber"
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input
                                                        type="text"
                                                        className="border w-full"
                                                        name="containerTypeSize"
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input
                                                        type="text"
                                                        className="border w-full"
                                                        name="vgmKgs"
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input
                                                        type="text"
                                                        className="border w-full"
                                                        name="cargoGwKgs"
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input
                                                        type="text"
                                                        className="border w-full"
                                                        name="method"
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input
                                                        type="text"
                                                        className="border w-full"
                                                        name="remarks"
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="border border-black p-1">
                                            <p className="font-bold">Vessel Name</p>
                                            <input
                                                type="text"
                                                className="border w-full"
                                                name="vesselName"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="border border-black p-1">
                                            <p className="font-bold">Voyage Number</p>
                                            <input
                                                type="text"
                                                className="border w-full"
                                                name="voyageNumber"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <table className="w-full border-collapse mb-4">
                                        <tbody>
                                            <tr>
                                                <th className="border border-black p-1">Full Name of Authorized Person (in CAPITAL letters)</th>
                                                <th className="border border-black p-1">Position</th>
                                                <th className="border border-black p-1">Contact Number</th>
                                            </tr>
                                            <tr>
                                                <td className="border border-black p-1">
                                                    <input
                                                        type="text"
                                                        className="border w-full"
                                                        name="authorizedPerson"
                                                        onChange={handleInputChange}
                                                        defaultValue="Berthe MUKANOHERI"
                                                    />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input
                                                        type="text"
                                                        className="border w-full"
                                                        name="position"
                                                        onChange={handleInputChange}
                                                        defaultValue="LOGISTICS MANAGER"
                                                    />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input
                                                        type="text"
                                                        className="border w-full"
                                                        name="contactNumber"
                                                        onChange={handleInputChange}
                                                        defaultValue="250.788.249.673"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="font-bold mb-2">Authorized Signature</p>
                                            <div className="border border-black h-12"></div>
                                        </div>
                                        <div>
                                            <p className="font-bold mb-2">Date (dd/mm/yy)</p>
                                            <input
                                                type="date"
                                                className="border w-full"
                                                name="signatureDate"
                                                onChange={handleInputChange}
                                                defaultValue="2024-07-26"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p className="font-bold text-blue-600">KMA Approval no. (Method 2) or Equipment certificate no. (Method 1)</p>
                                        <input
                                            type="text"
                                            className="border w-full h-8"
                                            name="kmaApprovalNo"
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Update VGM</button> */}
                                </form>
                            </div>
                        ),
                        filename: 'vgm.pdf',
                    },
                    {
                        title: "STUFFING REPORT",
                        content: (
                            <div className="border border-gray-300 p-4 rounded-lg m-4">
                                <h2 className="text-xl font-bold mb-4">STUFFING SUPERVISION REPORT</h2>
                                <table className="w-full border-collapse mb-4">
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold">Client</td>
                                            <td>
                                                <input type="text" defaultValue="ILLYCAFFE S.P.A." className="border border-gray-300 p-1 w-full" />
                                                <input type="text" defaultValue="VIA FLAVIA 110, 34147, TRIESTE, Italy" className="border border-gray-300 p-1 w-full" />
                                                <input type="email" defaultValue="stefano.scanferla@illy.com" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Mandate</td>
                                            <td>
                                                <input type="text" defaultValue="Stuffing Supervision of 320 JUTE BAGS Containing RWANDA ARABICA COFFEE into 1 export container" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Product</td>
                                            <td>
                                                <input type="text" defaultValue="RWANDA ARABICA COFFEE" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Packing</td>
                                            <td>
                                                <input type="text" defaultValue="JUTE BAGS" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Vessel name</td>
                                            <td>
                                                <input type="text" defaultValue="LANA" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Bill of Lading No.</td>
                                            <td>
                                                <input type="text" defaultValue="227771442" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Place</td>
                                            <td>
                                                <input type="text" defaultValue="RWACOF EXPORTS LTD YARD" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Export Container stuffed</td>
                                            <td>
                                                <input type="text" defaultValue={response.data.containerNo} className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Commenced Stuffing /loading</td>
                                            <td>
                                                <input type="text" defaultValue="2nd June 2023 at 10:30hrs" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Completed Stuffing/loading</td>
                                            <td>
                                                <input type="text" defaultValue="2nd June 2023 at 11:15hrs" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Temporally seal</td>
                                            <td>
                                                <input type="text" defaultValue="2nd June 2023 at 14:10hrs" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Container sealing/Shipping line seal</td>
                                            <td>
                                                <input type="text" defaultValue="2nd June 2023 at 15:00hrs" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h3 className="text-lg font-semibold mb-2">STUFFING REPORT</h3>
                                <h4 className="font-semibold">1.0 CONTAINER PARTICULARS & CONDITION</h4>
                                <p>1.1 <input type="text" defaultValue="MSKU7356560 (20ft Container)" className="border border-gray-300 p-1 w-full" /></p>
                                <p>Container Condition: <input type="text" defaultValue="found to be good, clean, and free from Any spillage and stains." className="border border-gray-300 p-1 w-full" /></p>

                                <h4 className="font-semibold mt-2">1.1.1 DESCRIPTIONS OF GOODS:</h4>
                                <p>PRODUCT: <input type="text" defaultValue="RWANDA ARABICA COFFEE" className="border border-gray-300 p-1 w-full" /></p>
                                <p>Number of Bags: <input type="number" defaultValue="320" className="border border-gray-300 p-1 w-full" /></p>
                                <p>LOTS: <input type="text" defaultValue="28/002/22018" className="border border-gray-300 p-1 w-full" /></p>
                                <p>ILLY ID: <input type="text" defaultValue="340350032" className="border border-gray-300 p-1 w-full" /></p>

                                <h4 className="font-semibold mt-2">2.0 FINDINGS</h4>
                                <p>Vide instructions from OPERATIONS/RWACOF EXPORTS LTD LOGISTICS.</p>
                                <p>We conducted the Stuffing Supervision of RWANDA ARABICA COFFEE into the export container at RWACOF EXPORTS LTD YARD and report as follows:</p>

                                <h4 className="font-semibold mt-2">2.1 STUFFING</h4>
                                <p>Stuffing of the container at RWACOF EXPORTS LTD YARD commenced on <input type="text" defaultValue="2nd June 2023 at 10:30hrs" className="border border-gray-300 p-1 w-full" /> and was completed on the same date <input type="text" defaultValue="2nd June 2023 at 11:10hrs" className="border border-gray-300 p-1 w-full" /></p>
                                <p>320 Bags of coffee packed in Jute bags were stuffed into the container.</p>

                                <h4 className="font-semibold mt-2">2.2 CONTAINER SEALING AFTER STUFFING</h4>
                                <p>After stuffing the 320 JUTE BAGS into the container was completed and the export container was closed and secured by Shipping line seal and RRA seals on <input type="text" defaultValue="2nd June 2023 at 15:00hrs" className="border border-gray-300 p-1 w-full" /></p>
                                <p>Herewith below are the details:</p>
                                <ul className="list-disc list-inside">
                                    <li>MSKU7356560 (1*20FT)</li>
                                    <li>Number of bags: <input type="number" defaultValue="320" className="border border-gray-300 p-1 w-full" /> bags (JUTE BAGS)</li>
                                </ul>

                                <div className="mt-4">
                                    <p>NB: all Photos are enclosed at the end of this report</p>
                                    <p>This report reflects our findings determined at the time and place of our intervention only and does not relieve the parties from their contractual responsibilities.</p>
                                    <p className="mt-2">GIVEN AT RWACOF EXPORTS LTD ON <input type="text" defaultValue="14 June 2023" className="border border-gray-300 p-1 w-full" /></p>
                                    <p className="mt-2">SIGNED: [Signature and Stamp]</p>
                                    <p>Berthe Mukanoheri</p>
                                    <p>Operations</p>
                                </div>

                            </div>
                        ),
                        filename: 'stuffing-report.pdf'
                    }
                ])
            })
            .catch(error => {
                console.error('Error fetching shipment:', error);
            });
    };

    const updateShipment = async (updatedData, documentType) => {
        try {
            let response;
            console.log(response);
            console.log(documentType);
            console.log(shipment);
            console.log("shipment id");
            // console.log(`${shipment.loadingTallySheet.id}`);
            switch (documentType) {
                case 'loadingtallysheet':
                    response = await axios.post(`${API_URL}/api/loading-tally-sheets`, updatedData);
                    break;
                case 'vgm':
                    response = await axios.post(`${API_URL}/api/vgms`, updatedData);
                    break;
                case 'invoice':
                    response = await axios.post(`${API_URL}/api/invoices`, updatedData);
                    break;
                case 'stuffingreport':
                    response = await axios.post(`${API_URL}/api/stuffing-reports`, updatedData);
                    break;
                default:
                    response = await axios.post(`${API_URL}/api/shipments`, updatedData);
            }
            console.log(`Updated ${documentType}:`, response.data);
            fetchShipment();
        } catch (error) {
            console.error(`Error updating ${documentType}:`, error);
        }
    };

    const handleCloseShipment = () => {
        updateShipment({ status: 'Closed' });
        alert('Shipment closed successfully');
        navigate('/shipments');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Shipment Info - ID: {id} Lot No {shipment.lotNo || 'Deserunt aliqua Pro'}</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col space-y-2">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex items-center">
                                        {index <= activeStep ? (
                                            <CheckCircle2 className="w-6 h-6 text-teal-600 mr-2" />
                                        ) : (
                                            <Circle className="w-6 h-6 text-gray-300 mr-2" />
                                        )}
                                        <span className={index <= activeStep ? 'text-teal-600 text-lg' : 'text-gray-600 text-lg'}>
                                            {step.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Button className="mt-4 w-full" onClick={handleCloseShipment}>
                        Close Shipment
                    </Button>
                </div>

                <div className="md:col-span-3">
                    <ShipmentDetails
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        shipment={shipment}
                        updateShipment={updateShipment}
                    />
                </div>
            </div>
        </div>
    );
}

export default ShipmentInfo;