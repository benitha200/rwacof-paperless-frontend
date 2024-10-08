import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const handleDownload = async (filename, title, data) => {
    console.log(`Generating ${filename}`);

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`RWACOF EXPORTS LTD - ${title.toUpperCase()}`, 20, 20);

    doc.setFontSize(12);
    doc.text(`Shipment ID: ${data.id}`, 20, 30);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 40);

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

export const generateInvoice = (doc, data) => {
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

export const generateVGM = (doc, data) => {
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

export const generateStuffingReport = (doc, data) => {
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