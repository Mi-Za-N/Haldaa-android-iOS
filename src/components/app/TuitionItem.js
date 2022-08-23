import React from 'react';
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';

const TuitionItem = ({data,onSelect }) => {
    // console.log(data.length);
  return (
      <TouchableOpacity
       onPress={onSelect}
       style={{
            height: 100,
            paddingHorizontal: 10,
            marginVertical:3,
            borderBottomWidth: 1,
            borderColor: '#D3D3D3',
            backgroundColor: '#FAFAFA',
        }}>  
       <View style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            borderColor: '#D3D3D3',
            backgroundColor: '#FAFAFA',
        }}>
            
            <View style={{flex: 1, justifyContent: "flex-start", paddingLeft: 16}}>
                <Text style={{fontSize: 16,color: "#ff9900"}}>Posted:   
                {dayjs(data.createdAt).format("DD/MMM/YY")}</Text>
                <Text numberOfLines={1}>{data.title}</Text>
                <View style={{
                    // width: width,
                    flexDirection:"row",
                    alignItems: "center",
                }}>
                <Icon name="location" color="red" size={16} />
                <Text numberOfLines={1}>{data.location}</Text>
                </View>
            </View>
            <View style={{justifyContent: 'center'}}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    <Text>class: {data.classIn}</Text>
                    <Text>weakly: {data.day} day</Text>
                    <Text>salary: {data.salary}</Text>
                </View>
            </View>
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
</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    Container: { },
});

export default TuitionItem;