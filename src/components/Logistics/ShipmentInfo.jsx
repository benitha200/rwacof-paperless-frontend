import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from '../ui/button';
import axios from 'axios';
import logo from './../../assets/img/logo.png';
import maersklogo from './../../assets/img/maersklogo.jpg';
import 'jspdf-autotable'
import API_URL from '../../constants/Constants';

function ShipmentInfo() {
    const { id } = useParams();
    const [activeStep, setActiveStep] = useState(0);
    const [shipment, setShipment] = useState({});
    const navigate=useNavigate();
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/api/shipments/${id}`)
            .then(response => {
                setShipment(response.data);
                console.log('Retrieved shipment:', response.data);

                setSteps([
                    {
                        title: "Loading Tally sheet",
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
                                                    value={formatDate(response.data.date)} 

                                                    onChange={(e) => handleInputChange(e, 'loadingTallySheet')}
                                                />
                                            </td>
                                            <td className="border border-gray-400 px-2 py-1"><input type='text' className='border border-1 border-slate-400'/></td>
                                            <td className="border border-gray-400 px-2 py-1"><input type='text' className='border border-1 border-slate-400'/></td>
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
                                <div className="border border-gray-300 p-2 mb-4">
                                    <p>
                                        <span className="font-semibold">TRUCK NO:</span> {response.data.truckNo || 'RAE2611/RL2728'}
                                    </p>
                                    <p>
                                        <span className="font-semibold">CONTAINER No:</span> {response.data.containerNo || 'MSMU5188197'}
                                        <span className="font-semibold"> LOT No:</span>
                                        <input type="text" className="border ml-1" value={response.data.lotNo || ''} readOnly />
                                    </p>
                                    <p>
                                        <span className="font-semibold">DESCRIPTION:</span>
                                        <input type="text" className="border ml-1" value={response.data.description || ''} readOnly />
                                    </p>
                                    <p>
                                        <span className="font-semibold">IN BIG BAGS:</span>
                                        <input type="number" className="border ml-1" value={response.data.quantity || ''} readOnly />
                                    </p>
                                    <p>
                                        <span className="font-semibold">NET WEIGHT:</span>
                                        <input type="number" className="border ml-1" value={response.data.netWeight || ''} readOnly />
                                    </p>
                                    <p>
                                        <span className="font-semibold">AMOUNT: U.S DOLLARS</span> {response.data.amount ? `${response.data.amount.toLocaleString()} (${numberToWords(response.data.amount)})` : 'One Hundred Five Thousand Eight Hundred and Eighty-One'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{response.data.amount ? response.data.amount.toLocaleString() : '105,821'}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">AUTHORISED SIGNATURE</p>
                                    <p>RWACOF</p>
                                </div>
                               
                            </div>
                        ),
                        filename: 'invoice.pdf'
                    },
                    {
                        title: "VGM",
                        content: (
                            <div className="border border-gray-300 p-4 rounded-lg m-4">
                                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                                    <div className="flex items-center mb-4 md:mb-0">
                                        <div className="mr-2"><img src={logo} width="100" height="300" /></div>
                                        <div>
                                            <h2 className="text-xl font-bold">RWACOF</h2>
                                            <p className="text-sm">RWACOF EXPORTS LTD</p>
                                            <p className="text-sm">GIKONDO-KIGALI</p>
                                        </div>
                                    </div>
                                    <img src={maersklogo} alt="Maersk logo" className="h-20 w-30" />
                                </div>

                                <h3 className="text-lg font-bold text-center mb-4 underline">VERIFIED GROSS MASS (VGM)</h3>

                                <table className="w-full border-collapse mb-4 overflow-auto w-full">
                                    <thead>
                                        <tr className="bg-yellow-400">
                                            <th className="border border-black p-1 text-left">Shipper Name</th>
                                            <th className="border border-black p-1 text-left">Booking or B/L Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-black p-1" colSpan="2">
                                                <input type="text" className="border w-full" defaultValue="RWACOF EXPORTS LIMITED" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="w-full overflow-auto border-collapse mb-4">
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
                                        {[
                                            { containerNumber: "MRKU7019589", type: "20/DV", vgm: "40,320.00 KGS", cargoGW: "21,620.00 KGS", method: "1", remarks: "XXXX" },
                                            { containerNumber: "SUDU7675134", type: "20/DV", vgm: "39,100.00 KGS", cargoGW: "21,620.00 KGS", method: "1", remarks: "XXXX" },
                                        ].map((row, index) => (
                                            <tr key={index}>
                                                <td className="border border-black p-1">
                                                    <input type="text" className="border w-full" defaultValue={row.containerNumber} />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input type="text" className="border w-full" defaultValue={row.type} />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input type="text" className="border w-full" defaultValue={row.vgm} />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input type="text" className="border w-full" defaultValue={row.cargoGW} />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input type="text" className="border w-full" defaultValue={row.method} />
                                                </td>
                                                <td className="border border-black p-1">
                                                    <input type="text" className="border w-full" defaultValue={row.remarks} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="border border-black p-1">
                                        <p className="font-bold">Vessel Name</p>
                                        <input type="text" className="border w-full" defaultValue="Your Vessel Name" />
                                    </div>
                                    <div className="border border-black p-1">
                                        <p className="font-bold">Voyage Number</p>
                                        <input type="text" className="border w-full" defaultValue="Your Voyage Number" />
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
                                                <input type="text" className="border w-full" defaultValue="Berthe MUKANOHERI" />
                                            </td>
                                            <td className="border border-black p-1">
                                                <input type="text" className="border w-full" defaultValue="LOGISTICS MANAGER" />
                                            </td>
                                            <td className="border border-black p-1">
                                                <input type="text" className="border w-full" defaultValue="250.788.249.673" />
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
                                        <input type="date" className="border w-full" defaultValue="2024-07-26" />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="font-bold text-blue-600">KMA Approval no. (Method 2) or Equipment certificate no. (Method 1)</p>
                                    <input type="text" className="border w-full h-8" />
                                </div>

                             
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
                if (error.response && error.response.status === 404) {
                    console.log('Shipment not found');
                }
            });
    }, [id]);

    const updateShipment = async (updatedData) => {
        try {
            const response = await axios.put(`${API_URL}/api/shipments/${id}`, updatedData);
            console.log('Updated shipment:', response.data);
            setShipment(response.data);
        } catch (error) {
            console.error('Error updating shipment:', error);
        }
    };

    const updateSpecificSection = async (section, updatedData) => {
        const endpoint = {
            loadingTallySheet: 'loading-tally-sheets',
            invoice: 'invoices',
            vgm: 'vgms',
            stuffingReport: 'stuffing-reports'
        }[section];

        if (!endpoint) {
            console.error('Invalid section specified');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/${endpoint}`, updatedData);
            console.log(`Updated ${section}:`, response.data);
            fetchShipment(); // Refresh the shipment data
        } catch (error) {
            console.error(`Error updating ${section}:`, error);
        }
    };

    const handleInputChange = (e, section) => {
        const { name, value } = e.target;
        const updatedShipment = { ...shipment, [name]: value };
        setShipment(updatedShipment);
    };

    const handleUpdate = (section) => {
        const sectionData = shipment[section] || {};
        updateSpecificSection(section, sectionData);
    };


    function handleCloseShipment() {
        updateShipment({ status: 'Closed' });
        alert('Shipment closed successfully');
        navigate('/shipments');
    }


    const handleDownload = async (filename, title, data) => {
        console.log(`Generating ${filename}`);
    
        // Ensure jsPDF and autoTable are imported properly
        const { default: jsPDF } = await import('jspdf');
        const { default: autoTable } = await import('jspdf-autotable');
    
        const doc = new jsPDF();  // Create jsPDF instance
    
        // Set the document's title and metadata
        doc.setFontSize(18);
        doc.text(`RWACOF EXPORTS LTD - ${title.toUpperCase()}`, 20, 20);
    
        doc.setFontSize(12);
        doc.text(`Shipment ID: ${data.id}`, 20, 30);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 40);
    
    
    
        // Populate table body based on data. Adjust according to your data structure.
        if (data.items && data.items.length) {
            tableBody = data.items.map(item => [item.field1, item.field2, item.field3]); // Adjust fields as necessary
        } else {
            console.warn('No data available for the table.');
        }

    
        // Add specific content based on the document type
        switch (title.toLowerCase()) {
            case 'invoice':
                generateInvoice(doc, data);
                break;
            case 'loading tally sheet':
                generateTallySheet(doc, data);
                break;
            case 'vgm':
                generateVGM(doc, data);
                break;
            case 'stuffing report':
                generateStuffingReport(doc, data);
                break;
            default:
                doc.text('No specific content available for this document type.', 20, 50);
        }
    
        // Save the PDF document
        doc.save(filename);
    };
    
    

    const generateInvoice = (doc, data) => {
        doc.text('INVOICE', 20, 60);

        doc.autoTable({
            startY: 70,
            head: [['Description', 'Value']],
            body: [
                ['SELLER', 'RWACOF EXPORTS LTD\nBP 6934 KIGALI\nRWANDA'],
                ['CONSIGNEE', `${data.consignee}\n1PLACE ST GERVAIS, SWITZERLAND\n${data.date}\nSSRW-90706`],
                ['TRUCK NO', data.truckNo],
                ['CONTAINER No', data.containerNo],
                ['LOT No', data.lotNo],
                ['DESCRIPTION', data.description],
                ['IN BIG BAGS', data.quantity],
                ['NET WEIGHT', data.netWeight],
                ['AMOUNT: U.S DOLLARS', `${data.amount} (${numberToWords(data.amount)})`],
            ],
        });

        const finalY = doc.lastAutoTable.finalY || 200;
        doc.text('AUTHORISED SIGNATURE', 20, finalY + 10);
        doc.text('RWACOF', 20, finalY + 20);
    };

    const generateTallySheet = (doc, data) => {
        doc.text('LOADING TALLY SHEET', 20, 60);

        doc.autoTable({
            startY: 70,
            head: [['LOT', 'Loading Day', 'SL/Forwarder', 'RSS / SSRW/SPRW', 'PLAQUE', 'CONTAINER', 'TARE']],
            body: [
                [data.lotNo, data.loadingDay, 'PIC/MSK', data.description, data.truckNo, data.containerNo, data.netWeight]
            ],
        });
    };

    const generateVGM = (doc, data) => {
        // Add RWACOF logo (you'll need to replace this with actual logo addition code)
        // doc.addImage(logoData, 'PNG', 20, 50, 30, 30);

        doc.setFontSize(16);
        doc.text('RWACOF EXPORTS LTD', 60, 60);
        doc.setFontSize(12);
        doc.text('GIKONDO-KIGALI', 60, 70);

        doc.setFontSize(14);
        doc.text('VERIFIED GROSS MASS (VGM)', 20, 90);

        doc.autoTable({
            startY: 100,
            head: [['Shipper Name', 'Booking or B/L Number']],
            body: [
                ['RWACOF EXPORTS LIMITED', '']
            ],
        });

        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Container number', 'Container type/size', 'VGM (KGS)', 'Cargo G.W. (KGS)', 'Method (I or II)', 'Remarks']],
            body: [
                ['MRKU7019589', '20/DV', '40,320.00 KGS', '21,620.00 KGS', '1', 'XXXX'],
                ['SUDU7675134', '20/DV', '39,100.00 KGS', '21,620.00 KGS', '1', 'XXXX']
            ],
        });

        const finalY = doc.lastAutoTable.finalY + 10;

        doc.text(`Vessel Name: ${data.vesselName}`, 20, finalY);
        doc.text(`Voyage Number: ${data.voyageNumber}`, 120, finalY);

        doc.autoTable({
            startY: finalY + 10,
            head: [['Full Name of Authorized Person (in CAPITAL letters)', 'Position', 'Contact Number']],
            body: [
                ['Berthe MUKANOHERI', 'LOGISTICS MANAGER', '250.788.249.673']
            ],
        });

        doc.text('Authorized Signature', 20, doc.lastAutoTable.finalY + 20);
        doc.text('Date (dd/mm/yy)', 120, doc.lastAutoTable.finalY + 20);
    };

    const generateStuffingReport = (doc, data) => {
        doc.setFontSize(16);
        doc.text('STUFFING SUPERVISION REPORT', 20, 60);

        doc.autoTable({
            startY: 70,
            body: [
                ['Client', 'ILLYCAFFE S.P.A.\nVIA FLAVIA 110, 34147, TRIESTE, Italy\nstefano.scanferla@illy.com'],
                ['Mandate', 'Stuffing Supervision of 320 JUTE BAGS Containing RWANDA ARABICA COFFEE into 1 export container'],
                ['Product', 'RWANDA ARABICA COFFEE'],
                ['Packing', 'JUTE BAGS'],
                ['Vessel name', 'LANA'],
                ['Bill of Lading No.', '227771442'],
                ['Place', 'RWACOF EXPORTS LTD YARD'],
                ['Export Container stuffed', data.containerNo],
                ['Commenced Stuffing /loading', '2nd June 2023 at 10:30hrs'],
                ['Completed Stuffing/loading', '2nd June 2023 at 11:15hrs'],
                ['Temporally seal', '2nd June 2023 at 14:10hrs'],
                ['Container sealing/Shipping line seal', '2nd June 2023 at 15:00hrs']
            ],
        });

        doc.setFontSize(14);
        doc.text('STUFFING REPORT', 20, doc.lastAutoTable.finalY + 10);

        doc.setFontSize(12);
        doc.text('1.0 CONTAINER PARTICULARS & CONDITION', 20, doc.lastAutoTable.finalY + 20);
        doc.text('1.1', 20, doc.lastAutoTable.finalY + 30);
        doc.text('MSKU7356560 (20ft Container)', 30, doc.lastAutoTable.finalY + 40);
        doc.text('Container Condition:', 20, doc.lastAutoTable.finalY + 50);
        doc.text('found to be good, clean, and free from Any spillage and stains.', 30, doc.lastAutoTable.finalY + 60);

        doc.text('1.1.1 DESCRIPTIONS OF GOODS:', 20, doc.lastAutoTable.finalY + 70);
        doc.text('PRODUCT: RWANDA ARABICA COFFEE', 30, doc.lastAutoTable.finalY + 80);
        doc.text('Number of Bags: 320', 30, doc.lastAutoTable.finalY + 90);
        doc.text('LOTS: 28/002/22018', 30, doc.lastAutoTable.finalY + 100);
        doc.text('ILLY ID: 340350032', 30, doc.lastAutoTable.finalY + 110);

        // Add more sections as needed...
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    function numberToWords(num) {
        const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

        function convertLessThanOneThousand(n) {
            if (n === 0) {
                return '';
            }

            let result = '';

            if (n >= 100) {
                result += ones[Math.floor(n / 100)] + ' Hundred ';
                n %= 100;
            }

            if (n >= 20) {
                result += tens[Math.floor(n / 10)] + ' ';
                n %= 10;
            } else if (n >= 10) {
                result += teens[n - 10] + ' ';
                return result.trim();
            }

            if (n > 0) {
                result += ones[n] + ' ';
            }

            return result.trim();
        }

        if (num === 0) {
            return 'Zero';
        }

        const billion = Math.floor(num / 1000000000);
        const million = Math.floor((num % 1000000000) / 1000000);
        const thousand = Math.floor((num % 1000000) / 1000);
        const remainder = num % 1000;

        let result = '';

        if (billion) {
            result += convertLessThanOneThousand(billion) + ' Billion ';
        }

        if (million) {
            result += convertLessThanOneThousand(million) + ' Million ';
        }

        if (thousand) {
            result += convertLessThanOneThousand(thousand) + ' Thousand ';
        }

        if (remainder) {
            result += convertLessThanOneThousand(remainder);
        }

        return result.trim();
    }

    return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Shipment Info - ID: {id} Lot No {shipment.lotNo || ''}</h1>
          
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
              <Button className="p-4 mt-4 w-full md:w-auto" onClick={handleCloseShipment}>
                Close Shipment
              </Button>
            </div>
            
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {steps.map((step, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger
                          onClick={() => setActiveStep(index)}
                          className={index <= activeStep ? 'text-teal-600 text-lg' : 'text-gray-600 text-lg'}
                        >
                          {step.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          {step.content}
                          <div className="mt-4 flex flex-col md:flex-row gap-4 mb-4">
                            <Button 
                              className="mt-4 bg-white text-teal-800 border border-2 hover:bg-teal-100" 
                              onClick={() => handleDownload(step.filename, step.title, shipment)}
                            >
                              Download {step.title}
                            </Button>
                            <Button 
                              className="mt-4 bg-white text-teal-800 border border-2 hover:bg-teal-100" 
                              onClick={() => handleAttachOnEmail(step.filename, step.title)}
                            >
                              Attach On Email
                            </Button>
                            <Button 
                              className="mt-4" 
                              onClick={() => handleUpdate(step.title.toLowerCase().replace(' ', ''))}
                            >
                              Update {step.title}
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    };

export default ShipmentInfo;