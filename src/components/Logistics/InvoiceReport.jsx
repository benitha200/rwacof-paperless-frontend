import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 30, textAlign: 'center' },
  section: { margin: 10, padding: 10, borderWidth: 1, borderColor: '#000' },
  text: { fontSize: 12, marginBottom: 5 },
  header: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
});

function InvoiceReport({ shipment }) {
  return (
    <Card className="w-full h-screen">
      <CardHeader>
        <CardTitle>RWACOF EXPORTS LTD INVOICE</CardTitle>
        <CardDescription>Preview of the generated invoice</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <PDFViewer style={{width: '100%', height: '100%'}}>
          <Document>
            <Page size="A4" style={styles.page}>
              <Text style={styles.title}>RWACOF EXPORTS LTD INVOICE</Text>
              <View style={styles.section}>
                <Text style={styles.header}>Shipment Details</Text>
                <Text style={styles.text}>Container No: {shipment.containerNo}</Text>
                <Text style={styles.text}>Truck No: {shipment.truckNo}</Text>
                <Text style={styles.text}>Lot No: {shipment.lotNo}</Text>
                <Text style={styles.text}>Description: {shipment.description}</Text>
                <Text style={styles.text}>Quantity: {shipment.quantity}</Text>
                <Text style={styles.text}>Net Weight: {shipment.netWeight} kg</Text>
                <Text style={styles.text}>Amount: ${shipment.amount}</Text>
                <Text style={styles.text}>Consignee: {shipment.consignee}</Text>
                <Text style={styles.text}>Date: {new Date(shipment.date).toLocaleDateString()}</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </CardContent>
    </Card>
  );
}

export default InvoiceReport;
