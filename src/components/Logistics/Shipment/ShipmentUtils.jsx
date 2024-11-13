import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from './../../../../assets/img/logo.png'
import API_URL from '../../../constants/Constants';


export const handleDownload = async (filename, title, data) => {
    console.log(`Generating ${filename}`);

    const doc = new jsPDF();

    switch (title.toLowerCase()) {
        case 'invoice':
            generateInvoice(doc, data);
            break;
        case 'loadingtallysheet':
            generateTallySheet(doc, data);
            break;
        case 'vgm':
            generateVGM(doc, data);
            break;
        case 'stuffingreport':
            generateStuffingReport(doc, data);
            break;
        default:
            doc.text('No specific content available for this document type.', 20, 50);
    }

    doc.save(filename);
};

export const handleUpdate = (section, shipment, updateFunction) => {
    console.log(section);
    const sectionData = shipment[section] || {};
    updateSpecificSection(section, sectionData, updateFunction);
};

const updateSpecificSection = (section, sectionData, updateFunction) => {
    // Implement the logic to update the specific section
    // This could involve showing a modal, form, or other UI elements to edit the data
    console.log(`Updating ${section} with data:`, sectionData);
    
    // After getting the updated data, call the updateFunction
    // For now, let's just pass the sectionData back as an example
    updateFunction({ [section]: sectionData });
};


export const generateInvoice = (doc, data) => {
    // Set font size and style
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('RWACOF EXPORTS LTD', 20, 20);

    doc.setFontSize(13);
    doc.text('INVOICE', 20, 30);

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');

    // Seller information
    doc.text('SELLER', 20, 45);
    doc.text('RWACOF EXPORTS LTD', 20, 55);
    doc.text('BP 6934 KIGALI', 20, 65);
    doc.text('RWANDA', 20, 75);

    // Consignee information
    doc.text('CONSIGNEE:', 120, 45);
    doc.text(data.consignee || 'Sucafina SA', 120, 55);
    doc.text('1PLACE ST GERVAIS, SWITZERLAND', 120, 65);
    doc.text(formatDate(data.date) || '10/14/2024', 120, 75);
    doc.text(data.loadingTallySheet.rssSsrwSprw || 'SSRW-90706', 120, 85);

    // Invoice details
    const startY = 95;
    doc.autoTable({
        startY: startY,
        head: [['Description', '']],
        body: [
            ['TRUCK NO:', data.truckNo || 'RAF239R/RL3581'],
            ['CONTAINER No:', data.containerNo || 'MSKU2706542'],
            ['LOT No:', data.lotNo || '228'],
            ['DESCRIPTION:', data.description || 'RWANDA ARABICA COFFEE'],
            ['IN BIG BAGS:', data.quantity || '80'],
            ['NET WEIGHT:', data.netWeight || '78'],
            ['AMOUNT (U.S DOLLARS)', `${data.amount || '15476.29'} USD \n\n(${numberToWords(data.amount || 15476.29)})`],
        ],
        theme: 'grid',
        styles: { fontSize: 12, cellPadding: 5 },
        columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 110 } },
    });

    const finalY = doc.lastAutoTable.finalY || 200;

    // Authorized signature
    doc.text('AUTHORISED SIGNATURE', 20, finalY + 20);
    doc.text('RWACOF', 20, finalY + 30);

    // Total amount
    // doc.setFont(undefined, 'bold');
    // doc.text(data.amount || '15476.29', 170, finalY + 30, { align: 'right' });
};

export const generateTallySheet = (doc, data) => {
    doc.text('Loading List', 20, 60);

    doc.autoTable({
        startY: 70,
        head: [['LOT', 'Loading Day', 'SL','Forwarder', 'RSS / SSRW/SPRW', 'PLATE NO', 'CONTAINER', 'TARE']],
        body: [
            [data.lotNo, data.loadingDay, data?.loadingTallySheet?.sl,data?.loadingTallySheet?.forwarder, data.description, data.truckNo, data.containerNo, data.netWeight]
        ],
        theme:'grid',
        headStyles: { fillColor: [255, 193, 7], textColor: 0, fontStyle: 'bold' },
        styles: { fontSize: 10 },
    });
};


export const generateVGM = (doc, data) => {
    // Set page size to A4
    // doc.setPageSize('a4');

    // Add RWACOF logo (you'll need to replace this with actual logo addition code)
    doc.addImage(logo, 'PNG', 20, 15, 30, 30);


    // RWACOF EXPORTS LTD header
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('RWACOF', 60, 25);
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('RWACOF EXPORTS LTD', 60, 35);
    doc.text('GIKONDO-KIGALI', 60, 45);

    // VERIFIED GROSS MASS (VGM) title
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('VERIFIED GROSS MASS (VGM)', doc.internal.pageSize.width / 2, 70, { align: 'center' });

    // Shipper Name and Booking Number table
    doc.autoTable({
        startY: 80,
        head: [['Shipper Name', 'Booking or B/L Number']],
        body: [['RWACOF EXPORTS LIMITED', data?.vgm?.bookingBlNumber || '']],
        theme: 'grid',
        headStyles: { fillColor: [255, 193, 7], textColor: 0, fontStyle: 'bold' },
        styles: { fontSize: 10 },
    });

    // Container details table
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        head: [['Container number', 'Container type/size', 'VGM (KGS)', 'Cargo G.W. (KGS)', 'Method (I or II)', 'Remarks']],
        body: [
            [data?.vmg?.containerNumber, data?.vgm?.containerTypeSize, data?.vgm?.vgmKgs, data?.vgm?.cargoGwKgs, data?.vgm?.method, data?.vgm?.remarks || 'XXX'],
            // ['SUDU7675134', '20/DV', '39,100.00 KGS', '21,620.00 KGS', '1', 'XXXX']
        ],
        theme: 'grid',
        headStyles: { fillColor: [255, 193, 7], textColor: 0, fontStyle: 'bold' },
        styles: { fontSize: 10 },
    });

    // Vessel Name and Voyage Number
    const vesselY = doc.lastAutoTable.finalY + 20;
    doc.autoTable({
        startY: vesselY,
        body: [
            ['Vessel Name', data?.vgm?.vesselName || ''],
            ['Voyage Number', data.vgm?.voyageNumber || '']
        ],
        theme: 'plain',
        styles: { fontSize: 10 },
        columnStyles: { 0: { cellWidth: 40 } },
    });

    // Authorized Person details
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        head: [['Full Name of Authorized Person (in CAPITAL letters)', 'Position', 'Contact Number']],
        body: [[data?.vgm?.authorizedPerson, data?.vgm?.position, data?.vgm?.contactNumber]],
        theme: 'grid',
        headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: 'bold' },
        styles: { fontSize: 10,margin:5 },
    });

    // Authorized Signature and Date
    const signatureY = doc.lastAutoTable.finalY + 20;
    doc.autoTable({
        startY: signatureY,
        body: [
            ['Authorized Signature', 'Date (dd/mm/yy)'],
            ['Digitally Signed', data?.vgm?.signatureDate.date || '29/Jul/2024']
        ],
        theme: 'plain',
        styles: { fontSize: 10 },
        columnStyles: { 0: { cellWidth: 100 } },
    });

    // KMA Approval no.
    doc.setFontSize(10);
    doc.text('KMA Approval no. (Method 2) or Equipment certificate no. (Method 1)', 20, doc.lastAutoTable.finalY + 20);
    doc.line(20, doc.lastAutoTable.finalY + 25, 190, doc.lastAutoTable.finalY + 25);
};

export const generateStuffingReport = (doc, data) => {
    // Previous PDF generation code remains the same until the last page
    
    // Add RWACOF logo
    doc.addImage(logo, 'PNG', doc.internal.pageSize.width / 2 - 15, 15, 30, 30);

    // Title
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('STUFFING SUPERVISION REPORT', doc.internal.pageSize.width / 2, 60, { align: 'center' });

    // Client information table
    doc.autoTable({
        startY: 70,
        head: [['', '']],
        body: [
            ['Client', data.stuffingReport.client],
            ['Mandate', data.stuffingReport.mandate],
            ['Product', data.stuffingReport.product],
            ['Packing', data.stuffingReport.packing],
            ['Vessel name', data.stuffingReport.vesselName],
            ['Bill of Lading No.', data.stuffingReport.billOfLadingNo],
            ['Place', data.stuffingReport.place],
            ['Export Container stuffed', data.stuffingReport.container],
            ['Commenced Stuffing /loading', new Date(data.stuffingReport.stuffingStart).toLocaleString()],
            ['Completed Stuffing/loading', new Date(data.stuffingReport.stuffingEnd).toLocaleString()],
            ['temporally seal', new Date(data.stuffingReport.tempSealTime).toLocaleString()],
            ['Container sealing/Shipping line seal', new Date(data.stuffingReport.finalSealTime).toLocaleString()]
        ],
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 80 } },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
    });

    // Add new page
    doc.addPage();

    // Add RWACOF logo to the second page
    doc.addImage(logo, 'PNG', doc.internal.pageSize.width / 2 - 15, 15, 30, 30);

    // STUFFING REPORT title
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('STUFFING REPORT', doc.internal.pageSize.width / 2, 60, { align: 'center' });

    // Container Particulars & Condition
    doc.setFontSize(12);
    doc.text('1.0 CONTAINER PARTICULARS & CONDITION', 20, 80);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(`1.1 ${data.containerNo} (20ft Container)`, 20, 90);
    doc.text(`Container Condition: ${data.stuffingReport.containerCondition}`, 20, 100);

    // Descriptions of Goods
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('1.1.1 DESCRIPTIONS OF GOODS:', 20, 120);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(`PRODUCT: ${data.stuffingReport.product}`, 20, 130);
    doc.text(`Number of Bags: ${data.stuffingReport.numberOfBags} BAGS`, 20, 140);
    doc.text('LOTS:', 20, 150);
    doc.text(data.stuffingReport.lots, 20, 160);
    doc.text(`ILLY ID: ${data.stuffingReport.illyId}`, 20, 170);

    // Findings
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('2.0 FINDINGS', 20, 190);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text('Vide instructions from OPERATIONS/RWACOF EXPORTS LTD LOGISTICS.', 20, 200);
    doc.text('We conducted the Stuffing Supervision of', 20, 210);
    doc.text(`${data.stuffingReport.product} into the export container at ${data.stuffingReport.place}`, 20, 220);
    doc.text('and report as follows:', 20, 230);

    // Stuffing
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('2.1 STUFFING', 20, 250);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(`Stuffing of the container at ${data.stuffingReport.place} commenced on ${new Date(data.stuffingReport.stuffingStart).toLocaleDateString()} at`, 20, 260);
    doc.text(`${new Date(data.stuffingReport.stuffingStart).toLocaleTimeString()} and was completed on ${new Date(data.stuffingReport.stuffingEnd).toLocaleDateString()} at ${new Date(data.stuffingReport.stuffingEnd).toLocaleTimeString()}`, 20, 270);
    doc.text(`${data.stuffingReport.numberOfBags} Bags of coffee packed in ${data.stuffingReport.packing} were stuffed into the container.`, 20, 280);

    // Container Sealing
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('2.2 CONTAINER SEALING AFTER STUFFING', 20, 300);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(`After stuffing the ${data.stuffingReport.numberOfBags} ${data.stuffingReport.packing} into the container was completed`, 20, 310);
    doc.text('and the export container was closed and secured by Shipping', 20, 320);
    doc.text(`line seal and RRA seals on ${new Date(data.stuffingReport.finalSealTime).toLocaleString()}`, 20, 330);
    doc.text('Herewith below are the details:', 20, 340);
    doc.text(`- ${data.containerNo} (1*20FT)`, 30, 350);
    doc.text(`- Number of bags: ${data.stuffingReport.numberOfBags} bags (${data.stuffingReport.packing})`, 30, 360);

    // Add Rwacof Exports Ltd. details
    doc.setFontSize(8);
    doc.text('Rwacof Exports Ltd, K425 Street Kanzenze,Gikondo,Kigali,Rwanda', 20, 380);
    doc.text('Tel +250 252 575872 E-mail admin@rwacof.com Web www.rwacof.com', 20, 388);

    // Add new page
    doc.addPage();

    // Add RWACOF logo to the third page
    doc.addImage(logo, 'PNG', doc.internal.pageSize.width / 2 - 15, 15, 30, 30);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(255, 0, 0);  // Set text color to red
    doc.text('NB: all Photos are enclosed at the end of this report', 20, 60);
    doc.setTextColor(0, 0, 0);  // Reset text color to black
    doc.text('This report reflects our findings determined at the time and place of our intervention', 20, 80);
    doc.text('only and does not relieve the parties from their contractual responsibilities.', 20, 90);

    doc.text(`GIVEN AT ${data.stuffingReport.place} ON ${new Date(data.stuffingReport.signatureDate).toLocaleDateString()}`, 20, 120);

    doc.text('Digitally Signed', 20, 160);

    doc.text(data.stuffingReport.authorizedPerson, 20, 190);
    doc.text('Operations', 20, 200);

    const getImages = () => {
        const images = [];
        for (let i = 1; i <= 8; i++) {
            const imagePath = data.stuffingReport[`image${i}`];
            if (imagePath) {
                images.push({
                    id: i,
                    path: `${API_URL}/uploads/${imagePath.split('\\').pop()}`
                });
            }
        }
        return images;
    };

    const images = getImages();

    if (images.length > 0) {
        // Add first image page
        doc.addPage();
        
        // Add RWACOF logo to the images page
        doc.addImage(logo, 'PNG', doc.internal.pageSize.width / 2 - 15, 15, 30, 30);

        // Images section title
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('ATTACHED IMAGES', doc.internal.pageSize.width / 2, 60, { align: 'center' });

        // Calculate image dimensions
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 40; // Margins from page edges
        const imageWidth = pageWidth - (margin * 2);
        const imageHeight = imageWidth * 0.75; // 4:3 aspect ratio

        // Add each image on a new page
        images.forEach((image, index) => {
            if (index > 0) {
                // Add new page for subsequent images
                doc.addPage();
                // Add RWACOF logo to each new page
                doc.addImage(logo, 'PNG', pageWidth / 2 - 15, 15, 30, 30);
            }

            try {
                // Position image vertically centered on the page
                const yPosition = (pageHeight - imageHeight) / 2;

                // Add image
                doc.addImage(
                    image.path,
                    'JPEG',
                    margin,
                    yPosition,
                    imageWidth,
                    imageHeight,
                    `image-${image.id}`,
                    'FAST'
                );

                // Add image number below the image
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text(
                    `Image ${image.id}`,
                    pageWidth / 2,
                    yPosition + imageHeight + 20,
                    { align: 'center' }
                );
            } catch (error) {
                console.error(`Failed to add image ${image.id}:`, error);
                // Add placeholder for failed image
                doc.setFillColor(240, 240, 240);
                doc.rect(margin, (pageHeight - imageHeight) / 2, imageWidth, imageHeight, 'F');
                doc.setFontSize(12);
                doc.text(
                    'Image failed to load',
                    pageWidth / 2,
                    pageHeight / 2,
                    { align: 'center' }
                );
            }
        });
    }

    // Save the PDF
    doc.save('stuffing-report.pdf');
};


// export const generateStuffingReport = (doc, data) => {
//     // Add RWACOF logo
//     doc.addImage(logo, 'PNG', doc.internal.pageSize.width / 2 - 15, 15, 30, 30);

//     // Title
//     doc.setFontSize(16);
//     doc.setFont(undefined, 'bold');
//     doc.text('STUFFING SUPERVISION REPORT', doc.internal.pageSize.width / 2, 60, { align: 'center' });

//     // Client information table
//     doc.autoTable({
//         startY: 70,
//         head: [['', '']],
//         body: [
//             ['Client', data.stuffingReport.client],
//             ['Mandate', data.stuffingReport.mandate],
//             ['Product', data.stuffingReport.product],
//             ['Packing', data.stuffingReport.packing],
//             ['Vessel name', data.stuffingReport.vesselName],
//             ['Bill of Lading No.', data.stuffingReport.billOfLadingNo],
//             ['Place', data.stuffingReport.place],
//             ['Export Container stuffed', data.stuffingReport.container],
//             ['Commenced Stuffing /loading', new Date(data.stuffingReport.stuffingStart).toLocaleString()],
//             ['Completed Stuffing/loading', new Date(data.stuffingReport.stuffingEnd).toLocaleString()],
//             ['temporally seal', new Date(data.stuffingReport.tempSealTime).toLocaleString()],
//             ['Container sealing/Shipping line seal', new Date(data.stuffingReport.finalSealTime).toLocaleString()]
//         ],
//         theme: 'grid',
//         styles: { fontSize: 10, cellPadding: 2 },
//         columnStyles: { 0: { fontStyle: 'bold', cellWidth: 80 } },
//         headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//     });

//     // Add new page
//     doc.addPage();

//     // Add RWACOF logo to the second page
//     doc.addImage(logo, 'PNG', doc.internal.pageSize.width / 2 - 15, 15, 30, 30);

//     // STUFFING REPORT title
//     doc.setFontSize(16);
//     doc.setFont(undefined, 'bold');
//     doc.text('STUFFING REPORT', doc.internal.pageSize.width / 2, 60, { align: 'center' });

//     // Container Particulars & Condition
//     doc.setFontSize(12);
//     doc.text('1.0 CONTAINER PARTICULARS & CONDITION', 20, 80);
//     doc.setFont(undefined, 'normal');
//     doc.setFontSize(10);
//     doc.text(`1.1 ${data.containerNo} (20ft Container)`, 20, 90);
//     doc.text(`Container Condition: ${data.stuffingReport.containerCondition}`, 20, 100);

//     // Descriptions of Goods
//     doc.setFontSize(12);
//     doc.setFont(undefined, 'bold');
//     doc.text('1.1.1 DESCRIPTIONS OF GOODS:', 20, 120);
//     doc.setFont(undefined, 'normal');
//     doc.setFontSize(10);
//     doc.text(`PRODUCT: ${data.stuffingReport.product}`, 20, 130);
//     doc.text(`Number of Bags: ${data.stuffingReport.numberOfBags} BAGS`, 20, 140);
//     doc.text('LOTS:', 20, 150);
//     doc.text(data.stuffingReport.lots, 20, 160);
//     doc.text(`ILLY ID: ${data.stuffingReport.illyId}`, 20, 170);

//     // Findings
//     doc.setFontSize(12);
//     doc.setFont(undefined, 'bold');
//     doc.text('2.0 FINDINGS', 20, 190);
//     doc.setFont(undefined, 'normal');
//     doc.setFontSize(10);
//     doc.text('Vide instructions from OPERATIONS/RWACOF EXPORTS LTD LOGISTICS.', 20, 200);
//     doc.text('We conducted the Stuffing Supervision of', 20, 210);
//     doc.text(`${data.stuffingReport.product} into the export container at ${data.stuffingReport.place}`, 20, 220);
//     doc.text('and report as follows:', 20, 230);

//     // Stuffing
//     doc.setFontSize(12);
//     doc.setFont(undefined, 'bold');
//     doc.text('2.1 STUFFING', 20, 250);
//     doc.setFont(undefined, 'normal');
//     doc.setFontSize(10);
//     doc.text(`Stuffing of the container at ${data.stuffingReport.place} commenced on ${new Date(data.stuffingReport.stuffingStart).toLocaleDateString()} at`, 20, 260);
//     doc.text(`${new Date(data.stuffingReport.stuffingStart).toLocaleTimeString()} and was completed on ${new Date(data.stuffingReport.stuffingEnd).toLocaleDateString()} at ${new Date(data.stuffingReport.stuffingEnd).toLocaleTimeString()}`, 20, 270);
//     doc.text(`${data.stuffingReport.numberOfBags} Bags of coffee packed in ${data.stuffingReport.packing} were stuffed into the container.`, 20, 280);

//     // Container Sealing
//     doc.setFontSize(12);
//     doc.setFont(undefined, 'bold');
//     doc.text('2.2 CONTAINER SEALING AFTER STUFFING', 20, 300);
//     doc.setFont(undefined, 'normal');
//     doc.setFontSize(10);
//     doc.text(`After stuffing the ${data.stuffingReport.numberOfBags} ${data.stuffingReport.packing} into the container was completed`, 20, 310);
//     doc.text('and the export container was closed and secured by Shipping', 20, 320);
//     doc.text(`line seal and RRA seals on ${new Date(data.stuffingReport.finalSealTime).toLocaleString()}`, 20, 330);
//     doc.text('Herewith below are the details:', 20, 340);
//     doc.text(`- ${data.containerNo} (1*20FT)`, 30, 350);
//     doc.text(`- Number of bags: ${data.stuffingReport.numberOfBags} bags (${data.stuffingReport.packing})`, 30, 360);

//     // Add Rwacof Exports Ltd. details
//     doc.setFontSize(8);
//     doc.text('Rwacof Exports Ltd, K425 Street Kanzenze,Gikondo,Kigali,Rwanda', 20, 380);
//     doc.text('Tel +250 252 575872 E-mail admin@rwacof.com Web www.rwacof.com', 20, 388);

//     // Add new page
//     doc.addPage();

//     // Add RWACOF logo to the third page
//     doc.addImage(logo, 'PNG', doc.internal.pageSize.width / 2 - 15, 15, 30, 30);

//     // Footer
//     doc.setFontSize(10);
//     doc.setTextColor(255, 0, 0);  // Set text color to red
//     doc.text('NB: all Photos are enclosed at the end of this report', 20, 60);
//     doc.setTextColor(0, 0, 0);  // Reset text color to black
//     doc.text('This report reflects our findings determined at the time and place of our intervention', 20, 80);
//     doc.text('only and does not relieve the parties from their contractual responsibilities.', 20, 90);

//     doc.text(`GIVEN AT ${data.stuffingReport.place} ON ${new Date(data.stuffingReport.signatureDate).toLocaleDateString()}`, 20, 120);

//     doc.text('Digitally Signed', 20, 160);

//     doc.text(data.stuffingReport.authorizedPerson, 20, 190);
//     doc.text('Operations', 20, 200);

//     // Save the PDF
//     doc.save('stuffing-report.pdf');
// };


export function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

export function numberToWords(num) {
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

    function convertDecimals(n) {
        if (n === 0) {
            return 'Zero';
        }
        let result = '';
        const digits = n.toString().split('');
        for (let i = 0; i < digits.length; i++) {
            result += ones[parseInt(digits[i])] + ' ';
        }
        return result.trim();
    }

    if (num === 0) {
        return 'Zero';
    }

    const parts = num.toString().split('.');
    const wholePart = parseInt(parts[0]);
    const decimalPart = parts.length > 1 ? parseInt(parts[1]) : 0;

    const billion = Math.floor(wholePart / 1000000000);
    const million = Math.floor((wholePart % 1000000000) / 1000000);
    const thousand = Math.floor((wholePart % 1000000) / 1000);
    const remainder = wholePart % 1000;

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

    result = result.trim();

    if (decimalPart > 0) {
        result += ' and ' + convertDecimals(decimalPart) + ' Cents';
    }

    return result;
}