import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";

export type LabelPdfData = {
  businessName: string;
  productName: string;
  ingredients: string;
  allergenStatement?: string;
  netQuantity: string;
  addressLine?: string;
  registrationNumber?: string;
  contactCity: string;
  contactState: string;
  contactZip: string;
  requiredDisclosure: string;
  madeOnDate?: string;
  safeHandling?: boolean;
  safeHandlingText?: string;
  batchCode?: string;
};

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 11,
    lineHeight: 1.4,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 700,
  },
  card: {
    border: "1pt solid #cbd5e1",
    borderRadius: 8,
    padding: 14,
    gap: 6,
  },
  row: {
    marginBottom: 4,
  },
  label: {
    fontSize: 9,
    color: "#475569",
    textTransform: "uppercase",
  },
  value: {
    fontSize: 12,
  },
});

export async function buildLabelPdfBlob(data: LabelPdfData) {
  const doc = (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>Texas Cottage Food Label</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Operation</Text>
            <Text style={styles.value}>{data.businessName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Product</Text>
            <Text style={styles.value}>{data.productName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ingredients</Text>
            <Text style={styles.value}>{data.ingredients}</Text>
          </View>
          {data.allergenStatement ? (
            <View style={styles.row}>
              <Text style={styles.label}>Allergens</Text>
              <Text style={styles.value}>{data.allergenStatement}</Text>
            </View>
          ) : null}
          <View style={styles.row}>
            <Text style={styles.label}>Net Quantity</Text>
            <Text style={styles.value}>{data.netQuantity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address or Registration Number</Text>
            <Text style={styles.value}>
              {data.registrationNumber ||
                [data.addressLine, data.contactCity, `${data.contactState} ${data.contactZip}`]
                  .filter(Boolean)
                  .join(", ")}
            </Text>
          </View>
          {data.batchCode ? (
            <View style={styles.row}>
              <Text style={styles.label}>Batch Code</Text>
              <Text style={styles.value}>{data.batchCode}</Text>
            </View>
          ) : null}
          {data.madeOnDate ? (
            <View style={styles.row}>
              <Text style={styles.label}>Date Made</Text>
              <Text style={styles.value}>{data.madeOnDate}</Text>
            </View>
          ) : null}
          <View style={styles.row}>
            <Text style={styles.label}>Disclosure</Text>
            <Text style={styles.value}>{data.requiredDisclosure}</Text>
          </View>
          {data.safeHandling ? (
            <View style={styles.row}>
              <Text style={styles.label}>Safe Handling</Text>
              <Text style={styles.value}>{data.safeHandlingText}</Text>
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );

  return pdf(doc).toBlob();
}
