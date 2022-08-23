import React from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView,Image} from 'react-native'

var { width, height } = Dimensions.get('window')

const OrderCartItem = ({order}) => {
//   console.log(order);
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <View style={{ borderWidth: 1, borderColor: 'orange'}}>
                    <Text style={styles.title}>Items:</Text>
                    
                  
                    {order.map((data) => {
                        return (
                       <View style={{
                            width: width,
                            flexDirection: 'row',
                            alignItems: 'center',
                            elevation: 1,
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.3
                        }}>
                            <View style={{
                                width: '100%',
                                paddingVertical: 5,
                                flexDirection: 'row',
                                paddingLeft: 8,
                                backgroundColor: 'white',
                                alignItems: 'center'
                            }}>
                                <Image source={{ uri: data.image}}
                                style={ {
                                width: 115, 
                                height: 115, 
                                resizeMode: 'cover',
                                borderRadius: 10,
                                }}/>


                    <View style={{flex:1}}>
                    
                    <View style={styles.detailContainer}>
                        <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
                        <Text numberOfLines={1} style={styles.text}>
                            {data.name}
                        </Text>
                        </View>
                        </View>
                        <View style={styles.detailContainer}>
                        <View style={{ overFlow: "hidden",paddingHorizontal:10}}>
                        <Text style={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center',
                            color: '#696969',
                            fontSize:16,
                        }}>Price:  
                        <Text style={{fontWeight:"bold"}}> {data.price}</Text> </Text>
                        </View>
                    </View>

                        </View>
                    </View>
                    </View>
                            
                        )
                    })}
                </View>    
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        // height: "100%",
        // padding: 8,
        alignContent: 'center',
        backgroundColor: 'white',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 8,
        
    },
    title: {
        alignSelf: 'center', 
        // margin: 8, 
        fontSize: 16,
        fontWeight: 'bold' 
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width / 1.2
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
})


export default OrderCartItem;
