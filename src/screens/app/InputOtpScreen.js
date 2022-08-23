import React, {useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import PinCode  from '../../components/UI/PineCode';
import Colors from "../../constants/Colors";
import EasyButton from "../../components/UI/EasyButton";
import Toast from "react-native-toast-message";
import {baseURL} from "../../../BaseUrl";

const InputOtpScreen = (props) => {
  const user = props.route.params;
  const [pinCode, setPinCode] = useState('');

  const handleSubmit = () => {
    
    
    fetch(`${baseURL}users/verify-otp`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
          "countryCode":"+88", //requerd
          "number": user.user.phone, //requerd
          "otp": pinCode //requerd
        })
    })
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Proved",
            text2: "Thank You",
          });
          setTimeout(() => {
            props.navigation.navigate("EditProfile", { user})
          }, 500);
        }
      })
      .then((err) => {
        if (err) {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Provide correct credential",
            text2: "Thank You",
          });
        }
        
      });
  }



  return (
   <ScrollView style={{paddingTop: 50}}>
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{marginVertical: 5, fontWeight: "bold"}}>Please input code below</Text>
        <Text style={{ color: "#848484", paddingHorizontal: 20}}>Please check your phone for five digit code, 
        please input recieved code below</Text>
        <PinCode onChange={(e) => setPinCode(e)} 
        length={6}
        />
    </View>
     <View style={[{ marginTop: 20 }, styles.buttonGroup]}>
       <EasyButton
        large
        primary
        onPress={handleSubmit}             
        >
        <Text style={styles.buttonText}>Verify</Text>
        </EasyButton>
    </View>
     <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <TouchableOpacity 
        //    onPress={() => props.navigation.navigate("Register")}
          >
        <Text style={styles.middleText}>Don't get yet?
           <Text style={{ color: Colors.secondary}}>Resend Code</Text>
        </Text>
 
      </TouchableOpacity>
      </View>
   </ScrollView>
  );
};



const styles = StyleSheet.create({
    Container: { 
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    buttonGroup: {
        width: "100%",
        alignItems: "center",
    },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
});


export default InputOtpScreen;