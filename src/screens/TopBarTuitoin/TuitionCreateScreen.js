import React, { useState, useEffect,useContext} from 'react';
import { View, Text, StyleSheet,ScrollView,Dimensions, Image,TouchableOpacity,Button } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import FormContainer from "../../components/UI/FormContainer";
import RadioButton from "../../components/UI/RadioButton";
import Input from "../../components/UI/Input";
import TextArea from "../../components/UI/TextArea";
import { baseURL } from "../../../BaseUrl";
import EasyButton from "../../components/UI/EasyButton"
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import ComboBoxButton from "../../components/UI/ComboBoxButton";
// import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
// import { Select, Box, CheckIcon } from "native-base";

const screenWidth = Dimensions.get('window').width;


const RequestTutor = (props) => {
    const context = useContext(AuthGlobal)
    const [token, setToken] = useState();

    const [title, setTitle] = useState("");
    const [subs, setSubs] = useState([]);
    const [location, setLocation] = useState("");
    const [details, setDetails] = useState("");
    const [salary, setSalary] = useState("");
    const [day, setDay] = useState("");
    const [classIn, setClassIn] = useState("");
    const [name, setName] = useState("");
    const [whatsApp, setWhatsApp] = useState("");
    const [mobile, setMobile] = useState("");

    useEffect(() => {
      if(!context.stateUser.isAuthenticated){
        setTimeout(() => {
           Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please Sign up first",
             text2: "Great to see you here, Thanks",
          });
            props.navigation.navigate("Sign Up");
          }, 1000);
      }
    },[context.stateUser.isAuthenticated]);

 
   useEffect(() => {
     AsyncStorage.getItem("jwt")
     .then((res) => {
         setToken(res)
     })
     .catch((error) => console.log(error))

    }, [])


   const callback_combo_box = () => {
        return (e) => {
          setSubs(e);
            console.log(e)
        };
    };


  const reqTutors = () => {
        fetch(`${baseURL}api/tuitions/create`, {
            method: "POST",
            headers: { 
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "title": title,
                "subs": subs,
                "location": location,
                "details": details,
                "salary": salary,
                "day": day,
                "classIn": classIn,
                "name": name,
                "whatsApp": whatsApp,
                "mobile": mobile,
                "user": context.stateUser.user.id
                })
            })
            .then((res) => {
            if (res.status == 200) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Request Accepted",
                });
                setTimeout(() => {
                    props.navigation.navigate("TutorScreen");
                }, 500);
        }
            })
            .then((data) => console.log(data));
    }

  return (
       <ScrollView>
          <FormContainer>
            <View style={styles.PriceContainer}>
              <View style={{ overFlow: "hidden", paddingHorizontal:10}}>
              <Text style={{
                  color: '#f8f8ff',
                  fontSize:16,
                  fontWeight:"bold",
              }}>Request us to get your expected Tutor</Text>
                </View>
            </View>



            <View style={{flex:1,justifyContent:"center"}}>
            <Text style={{ fontWeight: "bold"}}>Enter title Here</Text>
            </View>
             <Input 
                placeholder="i.e => CU male/female tutor needed"
                title="title"
                id="title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />

           <View style={{flex:1,justifyContent:"center"}}>
            <Text style={{ fontWeight: "bold"}}>student class</Text>
            </View>
             <Input 
                placeholder="[which class student read in?]"
                name="classIn"
                id="classIn"
                keyboardType="numeric"
                value={classIn}
                onChangeText={(text) => setClassIn(text)}
            />

            <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Text style={styles.label2}>*Salary </Text>
                <Input
                    placeholder={"as you can"}
                    name={"salary"}
                    id={"salary"}
                    value={salary}
                    keyboardType="numeric"
                    onChangeText={(text) => setSalary(text)}
                />
                </View>
            <View style={styles.inputWrap}>
                <Text style={styles.label2}>*Weekly per days </Text>
                <Input
                    placeholder={"e.g: 4/5"}
                    name={"day"}
                    id={"day"}
                    keyboardType="numeric"
                    value={day}
                    onChangeText={(text) => setDay(text)}
                />
                </View>
            </View>

             <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>*Student home Location </Text>
            </View>
              <Input 
                placeholder="i.e: Alfala goli, 2 no gate, ctg"
                name="location"
                id="location"
                value={location}
                onChangeText={(text) => setLocation(text)}
              />

             <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>*Describe here </Text>
              </View>
               <TextArea
                placeholder={"describe here, as your requirement"}
                name={"details"}
                value={details}
                onChangeText={(text) => setDetails(text)}
               />

           <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold",fontSize:20}}> Contact Info</Text>
            </View>

             <View style={{flex:1,justifyContent:"center"}}>
             <Text style={{ fontWeight: "bold"}}>Enter Guardian/Student  Name Here</Text>
            </View>
             <Input 
                placeholder="Guardian/Student Full Name"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />

             <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Text style={styles.label2}>Contact No</Text>
                <Input
                    placeholder={"Guardian phone No"}
                    name={"mobile"}
                    id={"mobile"}
                    keyboardType={"numeric"}
                    value={mobile}
                    onChangeText={(text) => setMobile(text)}
                />
                </View>

            <View style={styles.inputWrap}>
                <Text style={styles.label2}>Whats No</Text>
                <Input
                    placeholder={" Whats App No"}
                    name={"whatsApp"}
                    id={"whatsApp"}
                    keyboardType={"numeric"}
                    value={whatsApp}
                    onChangeText={(text) => setWhatsApp(text)}
                />
                </View>
            </View>

            <View style={{paddingTop: 5, paddingBottom: 5}}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingHorizontal:15 
                    }}>Select Subjects for Tutoring</Text>
                    <View style={{paddingVertical: 2, paddingHorizontal: 18}}>
                        <ComboBoxButton checked_color={"#DD502C"} 
                        callback={callback_combo_box()}
                        />
                    </View>
            </View>
    

        {context.stateUser.isAuthenticated? (
           <View style={styles.buttonContainer}>
            <Button
                title="Submit"
                disabled={!name   || !subs.length >=2 || !mobile}
                onPress={() => reqTutors()}  
              />
           </View>
           ): null}
            

       </FormContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    Container: {
     flex:1,
     justifyContent:"center",
     alignItems: "center"
     },
   label2: { 
    fontSize:12, 
    color:"gray", 
    fontWeight:"bold", 
    marginHorizontal:5
  },
    label: {
        width: "90%",
        marginTop: 10
    },
    buttonContainer: {
        width: "90%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
row: {
    flex: 1,
    flexDirection: "row",
    width: "90%"
  },
  inputWrap: {
    flex: 1,
    borderColor: "#000",
    // borderBottomWidth: 1,
    // marginBottom: 2
  },
  PriceContainer: {
     width: screenWidth,
     flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding:5,
    backgroundColor:"#778899"
  },
   imageContainer: {
        width: "95%",
        height: 180,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 10,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10
    },
    imagePicker: {
        position: "absolute",
        // justifyContent: "center",
        // alignItems: "center",
        right: 5,
        bottom: 5,
        backgroundColor: "#ffa500",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
});

export default RequestTutor;




// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const TuitionCreateScreen = () => {
//   return (
//        <View style={styles.Container}>
//           <Text>this is tuition details screen</Text>
//         </View>
//   );
// };

// const styles = StyleSheet.create({
//     Container: { 
//       flex:1,
//       justifyContent:"center",
//       alignItems:"center"
//     },
// });

// export default TuitionCreateScreen;