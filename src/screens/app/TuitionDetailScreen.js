import React from 'react';
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/Ionicons";
import { 
  View, 
  Text, StyleSheet,
  TouchableOpacity,
  Linking, Platform } from 'react-native'; 
import Card from '../../components/UI/Card';

const TuitionDetailScreen = (props) => {
  const data = props.route.params.item;

   const dialCall = () => {
 
      let phoneNumber = '';
  
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${data.mobile}`;
      }
      else {
        phoneNumber = `telprompt:${data.mobile}`;
      }
  
      Linking.openURL(phoneNumber);
    };

  return (
    <View
       style={{
            height: "100%",
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderColor: '#D3D3D3',
            backgroundColor: '#FAFAFA',
        }}> 
        <Card>
         <View style={{ justifyContent: 'center', paddingLeft: 16}}>
                <Text style={{fontSize: 16,color: "#ff9900"}}>Posted:   
                {dayjs(data.createdAt).format("DD/MMM/YY")}</Text>
                <Text style={{
                      fontSize:18,
                      fontWeight:"bold"
                    }}>{data.title}</Text>
                <View style={{
                    // width: width,
                    flexDirection:"row",
                    alignItems: "center",
                }}>
                <Icon name="location" color="red" size={16} />
                <Text style={{
                      fontSize:18,
                    }}>{data.location}</Text>
                </View>
           </View>
            
                <View style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  paddingLeft: 16
                }}>

                    <Text style={{
                      fontSize:18,
                      fontWeight:"bold"
                    }}>class: {data.classIn}</Text>
                    <Text style={{
                      fontSize:18,
                      fontWeight:"bold"
                    }}>weakly: {data.day} day</Text>
                    <Text style={{
                      fontSize:18,
                      fontWeight:"bold"
                    }}>salary: {data.salary}</Text>
                </View>
       <View style={
           {flexDirection: 'row', paddingVertical:8, flexWrap: 'wrap'}
           }>
        {data.subs.map((x, y) => {
             return (
                 <TouchableOpacity key={y}
                      style={{
                          height: 20,
                          backgroundColor: "#DD502C",
                          paddingHorizontal: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius:25,
                           marginBottom: 5,
                          marginHorizontal: 2,

                          borderWidth: 1
                      }}>
                     <Text style={{color:'#f3f3f3',fontSize:12}}>{x.title}</Text>

                 </TouchableOpacity>
             );
            })
        }
    </View>
    <View style={styles.promptDes}>
            <Text style={{fontSize: 18,fontWeight:"bold", color: '#696969'}}>Details Information</Text>
            <Text style={{fontSize: 16, color: "black", marginTop: 4,color: '#696969'}}>
              {data.details}
            </Text>
    </View>

    
      
        <View style={{
            marginTop: 10,
            alignItems:"center"
        }}>
          
          <Text style={{fontSize: 18, fontWeight: "bold",color:"grey"}}>Contact Information</Text>
        </View>
      <View style={ {
            width: "100%",
            // flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            padding:5,
            // backgroundColor:"#778899"
          }}>
          <View style={{ alignItems:"center", paddingHorizontal:10}}>
          <Text style={{
            color: "#696969",
            fontSize: 22,
            fontWeight: "bold",
          }}>
            Name: {data.name}
          </Text>
         </View>
        
    <View style={styles.MainContainer}>
        <TouchableOpacity onPress={dialCall} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}>call</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={dialCall} activeOpacity={0.7} style={styles.button} >
          <Text style={styles.TextStyle}>whatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Card>
</View>
  );
};

const styles = StyleSheet.create({
    Container: {
     flex:1,
     justifyContent:"center",
     alignItems:"center"
     },
    promptDes: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: "100%",
      elevation: 1,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      backgroundColor: 'white',
    },

   MainContainer: {
    flexDirection:"row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:20,
    paddingVertical:20,
  },
  button: {
    width: 120,
    padding: 6,
    backgroundColor: "#006400",
    borderRadius: 7,
  },
 
  TextStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  }
});

export default TuitionDetailScreen;