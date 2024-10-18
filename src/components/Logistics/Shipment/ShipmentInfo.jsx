import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../../constants/Constants';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '../../ui/button';
import { CheckCircle2, Circle } from "lucide-react";
import { handleDownload, handleUpdate, formatDate, numberToWords } from './ShipmentUtils';
import ShipmentDetails from './ShipmentDetails';
import { useToast } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

function ShipmentInfo() {
    const { id } = useParams();
    const [activeStep, setActiveStep] = useState(0);
    const [shipment, setShipment] = useState({});
    const navigate = useNavigate();
    const [steps, setSteps] = useState([]);
    const [containerCount, setContainerCount] = useState(1);
    const [images, setImages] = useState([]);
    const toast = useToast(true);
    const [selectedImages, setSelectedImages] = useState([]);

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


    const handleImageUpload = (event) => {
        const newImages = Array.from(event.target.files);
        setImages(prevImages => [...prevImages, ...newImages].slice(0, 8));
    };
    
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedImages(files);
        handleImageUpload(event);  // Pass the event directly
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        images.forEach((image, index) => {
            formData.append(`image${index + 1}`, image);
        });
        onSubmit(formData);
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
                        title: "invoice",
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
                                        <input
                                            type="text"
                                            className="border w-full mb-2"
                                            name="consignee"
                                            defaultValue={shipment.consignee || 'SUCAFINA S.A GENEVA'}
                                        />
                                        <p>1PLACE ST GERVAIS, SWITZERLAND</p>
                                        <input
                                            type="date"
                                            className="border w-full"
                                            name="invoiceDate"
                                            defaultValue={shipment.date ? new Date(shipment.date).toISOString().split('T')[0] : '2024-10-10'}
                                        />
                                        <input
                                            type="text"
                                            className="border w-full"
                                            name="billOfLadingNo"
                                            defaultValue={'SSRW-90706'}
                                        />
                                        {/* <p>SSRW-90706</p> */}
                                    </div>
                                </div>
                                <div className="border border-gray-300 p-2 mb-4 gap-2">
                                    <p className="mb-4">
                                        <span className="font-semibold">TRUCK NO:</span>
                                        <input
                                            type="text"
                                            className="border ml-1"
                                            name="truckNo"
                                            defaultValue={response.data.truckNo || 'RAE2611/RL2728'}
                                        />
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">CONTAINER No:</span>
                                        <input
                                            type="text"
                                            className="border ml-1"
                                            name="containerNo"
                                            defaultValue={response.data.containerNo || 'MSMU5188197'}
                                        />
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">LOT No:</span>
                                        <input
                                            type="text"
                                            className="border ml-1"
                                            name="lotNo"
                                            defaultValue={response.data.lotNo || ''}
                                        />
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">DESCRIPTION:</span>
                                        <input
                                            type="text"
                                            className="border ml-1"
                                            name="description"
                                            defaultValue={response.data.description || ''}
                                        />
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">IN BIG BAGS:</span>
                                        <input
                                            type="number"
                                            className="border ml-1"
                                            name="quantity"
                                            defaultValue={response.data.quantity || ''}
                                        />
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">NET WEIGHT:</span>
                                        <input
                                            type="number"
                                            className="border ml-1"
                                            name="netWeight"
                                            defaultValue={response.data.netWeight || ''}
                                        />
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">AMOUNT: U.S DOLLARS</span>
                                        <input
                                            type="number"
                                            className="border ml-1"
                                            name="amount"
                                            defaultValue={response.data.amount || ''}
                                        />
                                        {response.data.amount && <span> ({numberToWords(response.data.amount)})</span>}
                                    </p>
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
                                <form>
                                    <h3 className="text-lg font-bold text-center mb-4 underline">VERIFIED GROSS MASS (VGM)</h3>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block mb-1">Shipper Name</label>
                                            <input
                                                type="text"
                                                className="border w-full p-1"
                                                name="shipperName"
                                                defaultValue="RWACOF EXPORTS LIMITED"
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Booking or B/L Number</label>
                                            <input
                                                type="text"
                                                className="border w-full p-1"
                                                name="bookingBlNumber"
                                            />
                                        </div>
                                    </div>

                                    {[...Array(containerCount)].map((_, index) => (
                                        <div key={index} className="container-row mb-4">
                                            <h4 className="font-bold mb-2">Container {index + 1}</h4>
                                            <table className="w-full border-collapse mb-2">
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
                                                                defaultValue={response.data.vgm?.containerNumber}
                                                            />
                                                        </td>
                                                        <td className="border border-black p-1">
                                                            <input
                                                                type="text"
                                                                className="border w-full"
                                                                name="containerTypeSize"
                                                                defaultValue={response.data.vgm?.containerTypeSize}
                                                            />
                                                        </td>
                                                        <td className="border border-black p-1">
                                                            <input
                                                                type="number"
                                                                className="border w-full"
                                                                name="vgmKgs"
                                                                defaultValue={response.data.vgm?.vgmKgs}
                                                            />
                                                        </td>
                                                        <td className="border border-black p-1">
                                                            <input
                                                                type="number"
                                                                className="border w-full"
                                                                name="cargoGwKgs"
                                                                value={response.data.vgm?.cargoGwKgs}
                                                            />
                                                        </td>
                                                        <td className="border border-black p-1">
                                                            <input
                                                                type="text"
                                                                className="border w-full"
                                                                name="method"
                                                                value={response.data?.vgm?.method}
                                                            />
                                                        </td>
                                                        <td className="border border-black p-1">
                                                            <input
                                                                type="text"
                                                                className="border w-full"
                                                                name="remarks"
                                                                defaultValue={response.data?.vgm?.remarks || ""}
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        onClick={() => setContainerCount(prev => prev + 1)}
                                        className="mb-4"
                                    >
                                        Add Container
                                    </Button>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block mb-1">Vessel Name</label>
                                            <input
                                                type="text"
                                                className="border w-full p-1"
                                                name="vesselName"
                                                value={response.data?.vgm?.vesselName || ""}
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Voyage Number</label>
                                            <input
                                                type="text"
                                                className="border w-full p-1"
                                                name="voyageNumber"
                                                value={response.data?.vgm?.voyageNumber || ""}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <label className="block mb-1">Authorized Person</label>
                                            <input
                                                type="text"
                                                className="border w-full p-1"
                                                name="authorizedPerson"
                                                defaultValue="Berthe MUKANOHERI"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Position</label>
                                            <input
                                                type="text"
                                                className="border w-full p-1"
                                                name="position"
                                                defaultValue="LOGISTICS MANAGER"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Contact Number</label>
                                            <input
                                                type="text"
                                                className="border w-full p-1"
                                                name="contactNumber"
                                                defaultValue="250788249673"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block mb-1">Signature Date</label>
                                            <input
                                                type="date"
                                                className="border w-full p-1"
                                                name="signatureDate"
                                                defaultValue="2024-07-26"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1">KMA Approval no. (Method 2) or Equipment certificate no. (Method 1)</label>
                                            <input
                                                type="text"
                                                className="border w-full p-1"
                                                name="kmaApprovalNo"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ),
                        filename: 'vgm.pdf',
                    },
                    {
                        title: "StuffingReport",
                        content: (
                            <div className="border border-gray-300 p-4 rounded-lg m-4">
                                <h2 className="text-xl font-bold mb-4">STUFFING SUPERVISION REPORT</h2>
                                <table className="w-full border-collapse mb-4">
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold">Client</td>
                                            <td>
                                                <input type="text" name='client_name' defaultValue="ILLYCAFFE S.P.A." className="border border-gray-300 p-1 w-full" />
                                                <input type="text" name='client_address' defaultValue="VIA FLAVIA 110, 34147, TRIESTE, Italy" className="border border-gray-300 p-1 w-full" />
                                                <input type="email" name='client_email' defaultValue="stefano.scanferla@illy.com" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Mandate</td>
                                            <td>
                                                <input type="text" name='mandate' defaultValue="Stuffing Supervision of 320 JUTE BAGS Containing RWANDA ARABICA COFFEE into 1 export container" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Product</td>
                                            <td>
                                                <input type="text" name='product' value="RWANDA ARABICA COFFEE" defaultValue="RWANDA ARABICA COFFEE" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Packing</td>
                                            <td>
                                                <input type="text" value={response?.data?.stuffingReport?.packing || ''} name='packing' defaultValue="JUTE BAGS" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Vessel name</td>
                                            <td>
                                                <input type="text" value={response?.data?.stuffingReport?.vesselName || ''} name='vesselName' defaultValue="" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Bill of Lading No.</td>
                                            <td>
                                                <input type="text" value={response?.data?.stuffingReport?.billOfLadingNo || ''} name='billOfLadingNo' defaultValue="227771442" className="border border-gray-300 p-1 w-full" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Place</td>
                                            <td>
                                                <input type="text" name='place' value={response?.data?.stuffingReport?.place || ''} defaultValue="RWACOF EXPORTS LTD YARD" className="border border-gray-300 p-1 w-full" />
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
                                                <input
                                                    type="datetime-local"
                                                    name="stuffingStart"
                                                    // value={response?.data?.stuffingReport?.stuffingStart || ''}
                                                    className="border border-gray-300 p-1 w-full"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Completed Stuffing/loading</td>
                                            <td>
                                                <input
                                                    type="datetime-local"
                                                    name="stuffingEnd"
                                                    className="border border-gray-300 p-1 w-full"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Temporally seal</td>
                                            <td>
                                                <input
                                                    type="datetime-local"
                                                    name="tempSealTime"
                                                    className="border border-gray-300 p-1 w-full"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Container sealing/Shipping line seal</td>
                                            <td>
                                                <input
                                                    type="datetime-local"
                                                    name="finalSealTime"
                                                    className="border border-gray-300 p-1 w-full"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h3 className="text-lg font-semibold mb-2">STUFFING REPORT</h3>
                                <h4 className="font-semibold">1.0 CONTAINER PARTICULARS & CONDITION</h4>
                                <p>1.1 <input type="text" name='container' value={response.data.containerNo} defaultValue="MSKU7356560 " className="border border-gray-300 p-1 w-full" />(20ft Container)</p>
                                <p>Container Condition: <input type="text" name='containerCondition' defaultValue="found to be good, clean, and free from Any spillage and stains." className="border border-gray-300 p-1 w-full" /></p>

                                <h4 className="font-semibold mt-2">1.1.1 DESCRIPTIONS OF GOODS:</h4>
                                <p>PRODUCT: <input type="text" value="RWANDA ARABICA COFFEE" defaultValue="RWANDA ARABICA COFFEE" className="border border-gray-300 p-1 w-full" /></p>
                                <p>Number of Bags: <input type="number" name='numberOfBags' value={response.data.quantity || ''} defaultValue="320" className="border border-gray-300 p-1 w-full" /></p>
                                <p>LOTS: <input type="text" name='lots' value={response.data.lotNo} defaultValue="28/002/22018" className="border border-gray-300 p-1 w-full" /></p>
                                <p>ILLY ID: <input type="text" name='illyId' defaultValue="340350032" className="border border-gray-300 p-1 w-full" /></p>

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
                                    <li>{response.data.containerNo} (1*20FT)</li>
                                    <li>Number of bags: <input type="number" value={response.data.quantity} defaultValue="320" className="border border-gray-300 p-1 w-full" /> bags (JUTE BAGS)</li>
                                </ul>

                                <div className="mt-4">
                                    <p>NB: all Photos are enclosed at the end of this report</p>
                                    <p>This report reflects our findings determined at the time and place of our intervention only and does not relieve the parties from their contractual responsibilities.</p>
                                    <p className="mt-2">GIVEN AT RWACOF EXPORTS LTD ON <input type='date' name='signatureDate' defaultValue='2024-10-10' className="border border-gray-300 p-1 w-full" /></p>
                                    <p className="mt-2">SIGNED: Digitally Signed</p>
                                    <p><input type="number" name='authorizedPerson' value={response.data.authorizedPerson} defaultValue="320" className="border border-gray-300 p-1 w-full" /></p>
                                    <p>Operations</p>
                                </div>

                                <div className="mt-4">
                                    <h4 className="font-semibold">Upload Images (up to 8):</h4>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="border border-gray-300 p-2 w-full"
                                    />
                                    {selectedImages.length > 0 && (
                                        <div className="mt-2">
                                            <p>Selected Images:</p>
                                            <ul>
                                                {selectedImages.map((file, index) => (
                                                    <li key={index}>{file.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                {/* <div className="mt-4">
                                    <h4 className="font-semibold">Upload Images (up to 8):</h4>
                                    <input type="file" multiple onChange={handleImageUpload} accept="image/*" />
                                </div> */}
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

    // const updateShipment = async (updatedData, documentType) => {
    //     try {
    //         let response;
    //         console.log(response);
    //         console.log(documentType);
    //         console.log(shipment);
    //         console.log("shipment id");
    //         // console.log(`${shipment.loadingTallySheet.id}`);
    //         switch (documentType.toLowerCase()) {
    //             case 'loadingtallysheet':
    //                 response = await axios.post(`${API_URL}/api/loading-tally-sheets`, updatedData);
    //                 break;
    //             case 'vgm':
    //                 response = await axios.post(`${API_URL}/api/vgms`, updatedData);
    //                 break;
    //             case 'invoice':
    //                 response = await axios.post(`${API_URL}/api/invoices`, updatedData);
    //                 break;
    //             case 'stuffingreport':
    //                 response = await axios.post(`${API_URL}/api/stuffing-reports`, updatedData);
    //                 break;
    //             default:
    //                 response = await axios.post(`${API_URL}/api/shipments`, updatedData);
    //         }
    //         console.log(`Updated ${documentType}:`, response.data);
    //         toast({
    //             title: `${documentType} updated successfully`,
    //             // description: `Welcome back, ${firstName}!`,
    //             status: "success",
    //             duration: 3000,
    //             isClosable: true,
    //         });


    //         fetchShipment();
    //     } catch (error) {
    //         console.error(`Error updating ${documentType}:`, error);
    //     }
    // };

    const updateShipment = async (updatedData, documentType) => {
        try {
            let response;
            console.log(documentType);
            console.log(shipment);
            console.log("shipment id");

            switch (documentType.toLowerCase()) {
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
                    response = await axios.post(`${API_URL}/api/stuffing-reports`, updatedData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    break;
                default:
                    response = await axios.post(`${API_URL}/api/shipments`, updatedData);
            }

            console.log(`Updated ${documentType}:`, response.data);
            toast({
                title: `${documentType} updated successfully`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            fetchShipment();
        } catch (error) {
            console.error(`Error updating ${documentType}:`, error);
            toast({
                title: `Error updating ${documentType}`,
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
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
                        images={images}
                        selectedImages={selectedImages}
                        updateShipment={updateShipment}
                    />
                </div>
            </div>
        </div>
    );
}

export default ShipmentInfo;