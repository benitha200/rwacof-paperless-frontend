import jsPDF from 'jspdf';
import 'jspdf-autotable';

// export const handleDownload = async (filename, title, data) => {
//     console.log(`Generating ${filename}`);

//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text(`RWACOF EXPORTS LTD - ${title.toUpperCase()}`, 20, 20);

//     doc.setFontSize(12);
//     doc.text(`Shipment ID: ${data.id}`, 20, 30);
//     doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 40);

//     switch (title.toLowerCase()) {
//         case 'invoice':
//             generateInvoice(doc, data);
//             break;
//         case 'loading tally sheet':
//             generateTallySheet(doc, data);
//             break;
//         case 'vgm':
//             generateVGM(doc, data);
//             break;
//         case 'stuffing report':
//             generateStuffingReport(doc, data);
//             break;
//         default:
//             doc.text('No specific content available for this document type.', 20, 50);
//     }

//     doc.save(filename);
// };

export const handleDownload = async (filename, title, data) => {
    console.log(`Generating ${filename}`);

    const doc = new jsPDF();

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

// export const generateInvoice = (doc, data) => {
//     doc.text('INVOICE', 20, 60);

//     doc.autoTable({
//         startY: 70,
//         head: [['Description', 'Value']],
//         body: [
//             ['SELLER', 'RWACOF EXPORTS LTD\nBP 6934 KIGALI\nRWANDA'],
//             ['CONSIGNEE', `${data.consignee}\n1PLACE ST GERVAIS, SWITZERLAND\n${data.date}\nSSRW-90706`],
//             ['TRUCK NO', data.truckNo],
//             ['CONTAINER No', data.containerNo],
//             ['LOT No', data.lotNo],
//             ['DESCRIPTION', data.description],
//             ['IN BIG BAGS', data.quantity],
//             ['NET WEIGHT', data.netWeight],
//             ['AMOUNT: U.S DOLLARS', `${data.amount} (${numberToWords(data.amount)})`],
//         ],
//     });

//     const finalY = doc.lastAutoTable.finalY || 200;
//     doc.text('AUTHORISED SIGNATURE', 20, finalY + 10);
//     doc.text('RWACOF', 20, finalY + 20);
// };

export const generateInvoice = (doc, data) => {
    // Set font size and style
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('RWACOF EXPORTS LTD', 20, 20);

    doc.setFontSize(16);
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
    doc.text(data.ssrw || 'SSRW-90706', 120, 85);

    // Invoice details
    const startY = 95;
    doc.autoTable({
        startY: startY,
        head: [['Description', 'Value']],
        body: [
            ['TRUCK NO:', data.truckNo || 'RAF239R/RL3581'],
            ['CONTAINER No:', data.containerNo || 'MSKU2706542'],
            ['LOT No:', data.lotNo || '228'],
            ['DESCRIPTION:', data.description || 'RWANDA ARABIC COFFEE'],
            ['IN BIG BAGS:', data.quantity || '80'],
            ['NET WEIGHT:', data.netWeight || '78'],
            ['AMOUNT: U.S DOLLARS', `${data.amount || '15476.29'} (${numberToWords(data.amount || 15476.29)})`],
        ],
        theme: 'plain',
        styles: { fontSize: 12, cellPadding: 5 },
        columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 110 } },
    });

    const finalY = doc.lastAutoTable.finalY || 200;

    // Authorized signature
    doc.text('AUTHORISED SIGNATURE', 20, finalY + 20);
    doc.text('RWACOF', 20, finalY + 30);

    // Total amount
    doc.setFont(undefined, 'bold');
    doc.text(data.amount || '15476.29', 170, finalY + 30, { align: 'right' });
};

export const generateTallySheet = (doc, data) => {
    doc.text('LOADING TALLY SHEET', 20, 60);

    doc.autoTable({
        startY: 70,
        head: [['LOT', 'Loading Day', 'SL/Forwarder', 'RSS / SSRW/SPRW', 'PLAQUE', 'CONTAINER', 'TARE']],
        body: [
            [data.lotNo, data.loadingDay, 'PIC/MSK', data.description, data.truckNo, data.containerNo, data.netWeight]
        ],
    });
};

// export const generateVGM = (doc, data) => {
//     // Add RWACOF logo (you'll need to replace this with actual logo addition code)
//     // doc.addImage(logoData, 'PNG', 20, 50, 30, 30);

//     doc.setFontSize(16);
//     doc.text('RWACOF EXPORTS LTD', 60, 60);
//     doc.setFontSize(12);
//     doc.text('GIKONDO-KIGALI', 60, 70);

//     doc.setFontSize(14);
//     doc.text('VERIFIED GROSS MASS (VGM)', 20, 90);

//     doc.autoTable({
//         startY: 100,
//         head: [['Shipper Name', 'Booking or B/L Number']],
//         body: [
//             ['RWACOF EXPORTS LIMITED', '']
//         ],
//     });

//     doc.autoTable({
//         startY: doc.lastAutoTable.finalY + 10,
//         head: [['Container number', 'Container type/size', 'VGM (KGS)', 'Cargo G.W. (KGS)', 'Method (I or II)', 'Remarks']],
//         body: [
//             ['MRKU7019589', '20/DV', '40,320.00 KGS', '21,620.00 KGS', '1', 'XXXX'],
//             ['SUDU7675134', '20/DV', '39,100.00 KGS', '21,620.00 KGS', '1', 'XXXX']
//         ],
//     });

//     const finalY = doc.lastAutoTable.finalY + 10;

//     doc.text(`Vessel Name: ${data.vesselName}`, 20, finalY);
//     doc.text(`Voyage Number: ${data.voyageNumber}`, 120, finalY);

//     doc.autoTable({
//         startY: finalY + 10,
//         head: [['Full Name of Authorized Person (in CAPITAL letters)', 'Position', 'Contact Number']],
//         body: [
//             ['Berthe MUKANOHERI', 'LOGISTICS MANAGER', '250.788.249.673']
//         ],
//     });

//     doc.text('Authorized Signature', 20, doc.lastAutoTable.finalY + 20);
//     doc.text('Date (dd/mm/yy)', 120, doc.lastAutoTable.finalY + 20);
// };

export const generateVGM = (doc, data) => {
    // Set page size to A4
    // doc.setPageSize('a4');

    // Add RWACOF logo (you'll need to replace this with actual logo addition code)
    // doc.addImage(logoData, 'PNG', 20, 15, 30, 30);

    // Add Maersk logo (you'll need to replace this with actual logo addition code)
    // doc.addImage(maerskLogo, 'PNG', 170, 15, 30, 30);

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
        body: [['RWACOF EXPORTS LIMITED', data.bookingNumber || '']],
        theme: 'grid',
        headStyles: { fillColor: [255, 193, 7], textColor: 0, fontStyle: 'bold' },
        styles: { fontSize: 10 },
    });

    // Container details table
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        head: [['Container number', 'Container type/size', 'VGM (KGS)', 'Cargo G.W. (KGS)', 'Method (I or II)', 'Remarks']],
        body: [
            ['MRKU7019589', '20/DV', '40,320.00 KGS', '21,620.00 KGS', '1', 'XXXX'],
            ['SUDU7675134', '20/DV', '39,100.00 KGS', '21,620.00 KGS', '1', 'XXXX']
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
            ['Vessel Name', data.vesselName || 'Your Vessel Name'],
            ['Voyage Number', data.voyageNumber || 'Your Voyage Number']
        ],
        theme: 'plain',
        styles: { fontSize: 10 },
        columnStyles: { 0: { cellWidth: 40 } },
    });

    // Authorized Person details
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        head: [['Full Name of Authorized Person (in CAPITAL letters)', 'Position', 'Contact Number']],
        body: [['Berthe MUKANOHERI', 'LOGISTICS MANAGER', '250.788.249.673']],
        theme: 'grid',
        headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: 'bold' },
        styles: { fontSize: 10 },
    });

    // Authorized Signature and Date
    const signatureY = doc.lastAutoTable.finalY + 20;
    doc.autoTable({
        startY: signatureY,
        body: [
            ['Authorized Signature', 'Date (dd/mm/yy)'],
            ['', data.signatureDate || '26/Jul/2024']
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

export const generateStuffingReport = (data) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text('STUFFING SUPERVISION REPORT', 20, 20);

    // Client information table
    doc.autoTable({
        startY: 30,
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

    // Stuffing Report
    doc.setFontSize(14);
    doc.text('STUFFING REPORT', 20, doc.lastAutoTable.finalY + 10);

    // Container Particulars & Condition
    doc.setFontSize(12);
    doc.text('1.0 CONTAINER PARTICULARS & CONDITION', 20, doc.lastAutoTable.finalY + 20);
    doc.text('1.1 MSKU7356560 (20ft Container)', 20, doc.lastAutoTable.finalY + 30);
    doc.text('Container Condition: found to be good, clean, and free from Any spillage and stains.', 20, doc.lastAutoTable.finalY + 40);

    // Descriptions of Goods
    doc.text('1.1.1 DESCRIPTIONS OF GOODS:', 20, doc.lastAutoTable.finalY + 50);
    doc.text('PRODUCT: RWANDA ARABICA COFFEE', 30, doc.lastAutoTable.finalY + 60);
    doc.text('Number of Bags: 320', 30, doc.lastAutoTable.finalY + 70);
    doc.text('LOTS: 28/002/22018', 30, doc.lastAutoTable.finalY + 80);
    doc.text('ILLY ID: 340350032', 30, doc.lastAutoTable.finalY + 90);

    // Findings
    doc.text('2.0 FINDINGS', 20, doc.lastAutoTable.finalY + 100);
    doc.setFontSize(10);
    doc.text('Vide instructions from OPERATIONS/RWACOF EXPORTS LTD LOGISTICS.', 20, doc.lastAutoTable.finalY + 110);
    doc.text('We conducted the Stuffing Supervision of RWANDA ARABICA COFFEE into the export container', 20, doc.lastAutoTable.finalY + 120);
    doc.text('at RWACOF EXPORTS LTD YARD and report as follows:', 20, doc.lastAutoTable.finalY + 130);

    // Stuffing
    doc.setFontSize(12);
    doc.text('2.1 STUFFING', 20, doc.lastAutoTable.finalY + 140);
    doc.setFontSize(10);
    doc.text('Stuffing of the container at RWACOF EXPORTS LTD YARD commenced on 2nd June 2023 at 10:30hrs', 20, doc.lastAutoTable.finalY + 150);
    doc.text('and was completed on the same date 2nd June 2023 at 11:10hrs', 20, doc.lastAutoTable.finalY + 160);
    doc.text('320 Bags of coffee packed in Jute bags were stuffed into the container.', 20, doc.lastAutoTable.finalY + 170);

    // Container Sealing
    doc.setFontSize(12);
    doc.text('2.2 CONTAINER SEALING AFTER STUFFING', 20, doc.lastAutoTable.finalY + 180);
    doc.setFontSize(10);
    doc.text('After stuffing the 320 JUTE BAGS into the container was completed and the export container', 20, doc.lastAutoTable.finalY + 190);
    doc.text('was closed and secured by Shipping line seal and RRA seals on 2nd June 2023 at 15:00hrs', 20, doc.lastAutoTable.finalY + 200);
    doc.text('Herewith below are the details:', 20, doc.lastAutoTable.finalY + 210);
    doc.text('• MSKU7356560 (1*20FT)', 30, doc.lastAutoTable.finalY + 220);
    doc.text('• Number of bags: 320 bags (JUTE BAGS)', 30, doc.lastAutoTable.finalY + 230);

    // Footer
    doc.setFontSize(10);
    doc.text('NB: all Photos are enclosed at the end of this report', 20, doc.lastAutoTable.finalY + 240);
    doc.text('This report reflects our findings determined at the time and place of our intervention only', 20, doc.lastAutoTable.finalY + 250);
    doc.text('and does not relieve the parties from their contractual responsibilities.', 20, doc.lastAutoTable.finalY + 260);
    doc.text('GIVEN AT RWACOF EXPORTS LTD ON 14 June 2023', 20, doc.lastAutoTable.finalY + 270);
    doc.text('SIGNED: [Signature and Stamp]', 20, doc.lastAutoTable.finalY + 280);
    doc.text('Berthe Mukanoheri', 20, doc.lastAutoTable.finalY + 290);
    doc.text('Operations', 20, doc.lastAutoTable.finalY + 300);

    // Save the PDF
    doc.save('stuffing-report.pdf');
};

// You may want to move these utility functions to a separate file
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