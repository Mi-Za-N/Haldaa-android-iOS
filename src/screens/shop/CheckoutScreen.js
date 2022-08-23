import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import Input from '../../components/UI/Input';
import TextArea from '../../components/UI/TextArea';
import FormContainer from '../../components/UI/FormContainer';
import { useCart } from '../../contexts/cart/use-cart';
import Toast from "react-native-toast-message";
import {saveUserAddress} from "../../function/user";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";


const CheckoutScreen = (props) => {
  const context = useContext(AuthGlobal)
//   console.log(context);
  const [ orderItems, setOrderItems ] = useState();
  const [phone, setPhone] = useState();
  const [ city, setCity ] = useState();
  const [ address, setAddress ] = useState();
  const [addressSaved, setAddressSaved] = useState(false);
  const [token, setToken] = useState();
//   console.log(token);
   
 

 



   useEffect(() => {
     AsyncStorage.getItem("jwt")
      .then((res) => {
          setToken(res)
      })
      .catch((error) => console.log(error))
   },[]);


  const {calculatePrice, items } = useCart();


    useEffect(() => {
      setOrderItems(items)
    }, [])

    useEffect(() => {
      if (!context.stateUser.isAuthenticated) {
            props.navigation.navigate("Login");
      }
    }, [context.stateUser.isAuthenticated]);

  const saveAddressToDb = () => {
      saveUserAddress(token, address).then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Address Saved",
          });
        }
      });
    };


  
 

 
  const handleSubmit = async() => {
    let orderInfo = {
      orderItems,
      shippingAddress1: address,
      city: city,
      phone: phone,
      dateOrdered: Date.now(),
      user: context.stateUser.user.id,
    }
    props.navigation.navigate("confirm", {order: orderInfo});
    // dispatch({ type: 'IS_LOGIN', payload: true });
  };

    return (
      <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
      
          <View style={styles.main}>
            
            <FormContainer title={"Shipping Address"}>
                    <TextArea
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    />

                  <TouchableOpacity onPress={saveAddressToDb}>
                    <Card style={styles.Container}>
                      <Text style={styles.placeOrder}>Save Address</Text>
                    </Card>
                  </TouchableOpacity>


                    <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                   />
                  <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                   />
                  
              {addressSaved && (
                <TouchableOpacity onPress={handleSubmit}>
                <Card style={styles.Container}>
                  <Text style={styles.placeOrder}>Submit</Text>
                </Card>
              </TouchableOpacity>
              )}
                
            </FormContainer>
         </View>
        
        </KeyboardAwareScrollView>
    );
}


export const screenOptions = (navData) => {
  return {
    headerTitle: "Customer Info",
  };
};

const styles = StyleSheet.create({
  main: {
    flex: 1, 
    backgroundColor: '#f1f5f7'
  },
  title:{marginTop: 85, fontSize: 20, alignSelf: 'center'},
    Container: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical:15
  },
  placeOrder: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default CheckoutScreen;