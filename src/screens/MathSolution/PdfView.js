import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import PDFReader from 'rn-pdf-reader-js'


 const PdfView =(props)=> {
     const [show, setShow] = useState(false);
     const link = props.route.params.item;
    //  console.log(link);

      useEffect(()=>{ 
            setTimeout(() => {
            setShow(true)
            },500);
        },[]);

     if (!show) {
        return (
          <View style={{flex:1, justifyContent: "center",alignItems: "center"}}>
            <ActivityIndicator size="large" color="red" />
          </View>
        );
      }
    return <PDFReader
        source={{
          uri: link,
        }}
      />;
          
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
  },
});

export default PdfView