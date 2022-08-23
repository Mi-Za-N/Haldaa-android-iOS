import React,{useEffect} from 'react';
import axios from "axios";
import Toast from "react-native-toast-message";
import MainButton from "../../components/shop/MainButton";
import {Text, View,Image, StyleSheet, Dimensions, ScrollView,} from 'react-native'
// import { Select, Box, CheckIcon } from "native-base";
import { useNetInfo } from "@react-native-community/netinfo";
import { baseURL } from "../../../BaseUrl";
import { useCart } from '../../contexts/cart/use-cart';

var { width, height } = Dimensions.get('window')

const ConfirmScreen = (props) => {
    const netInfo = useNetInfo();
    const { items, clearCart } = useCart();
    const finalOrder = props.route.params;
    console.log("ITEMS",items.length);

        useEffect(() => {
            if(!items.length){
             props.navigation.navigate("ProductOverView");     
            }
        },[items.length]);

    const confirmOrder = () => {
        const order = finalOrder.order;
        // console.log("oder info",order);
    if (netInfo.isInternetReachable === true){
            axios.post(`${baseURL}api/user/cash-order`,  order).then((res) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Order Completed",
                        text2: "thanks for order",
                    })
                    setTimeout(() => {
                        clearCart();
                        props.navigation.navigate("Home")
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                })
            })
        } else {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "You're Offline",
                text2: "No Internet Connection",
            })
        };       
    }
  
 
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
                    Confirm Order
                </Text>
                {props.route.params ? 
                <View style={{ borderWidth: 1, borderColor: 'orange'}}>
                    <Text style={styles.title}>Shipping to:</Text>
                     <View style={{
                            width: width,
                            alignItems: 'center',
                            elevation: 1,
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.3
                        }}>
                    <Text>Address: {finalOrder.order.shippingAddress1}</Text>

                        <Text>Mobile: {finalOrder.order.phone}</Text>
                        <Text>City: {finalOrder.order.city}</Text>
                        
                    </View>
                    <Text style={styles.title}>Items:</Text>
                    {items.map((data) => {
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
            : null } 
            </View>
             {items.length > 0  &&(
                  <MainButton 
                  onPress={confirmOrder}
                  >
                      Confirm Order
                    </MainButton>
                )}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        // height: "100%",
        padding: 8,
        alignContent: 'center',
        backgroundColor: 'white',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        
    },
    title: {
        alignSelf: 'center', 
        margin: 8, 
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


export default ConfirmScreen;


