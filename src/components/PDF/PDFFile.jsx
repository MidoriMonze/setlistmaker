import React from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: '30px'
  },
  header: {
    textAlign: 'center',
    paddingBottom: '40px',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Helvetica-Bold',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: '20px',
  },
});

const PDFFile = ({ setList, title }) => {
  const names = setList.map((song, index) => <Text key={index} style={styles.text}>{song.name.toUpperCase()}</Text>);
  return (
    <Document>
      <Page wrap size="A4" style={styles.page} >
        <Text fixed style={styles.header}>
          {title}
        </Text>
        {names}
      </Page>
    </Document>
  );

}
export default PDFFile;