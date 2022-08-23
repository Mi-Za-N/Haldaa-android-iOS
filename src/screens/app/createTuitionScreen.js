import React, { useState, useEffect,useContext} from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import FormContainer from "../../components/UI/FormContainer";
import Input from "../../components/UI/Input";
import { baseURL } from "../../../BaseUrl";
import EasyButton from "../../components/UI/EasyButton"
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";

const CreateTolet = (props) => {
    const context = useContext(AuthGlobal)
    const [token, setToken] = useState();
    const [title, setTitle] = useState("");
    const [preset, setPreset] = useState("");
    const [medium, setMedium] = useState("");
    const [sub, setSub] = useState("");
    const [isfeatured, setIsFeatured] = useState(false);
    const [day, setDay] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [fee, setFee] = useState("");
    const [whatsApp, setWhatsApp] = useState("");
    const [mobile, setMobile] = useState("");

    // console.log(context.stateUser.user.id);
    // console.log(token);
 
   useEffect(() => {
     AsyncStorage.getItem("jwt")
     .then((res) => {
         setToken(res)
     })
     .catch((error) => console.log(error))

    }, [])

  const createTolet = () => {
        fetch(`${baseURL}api/tuitions/create`, {
            method: "POST",
            headers: { 
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "title": title,
                "preset": preset,
                "medium": medium,
                "sub": sub,
                "isfeatured": isfeatured,
                "day": day,
                "salary": salary,
                "location": location,
                "fee": fee,
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
                    text1: "tuition created",
                });
                setTimeout(() => {
                    props.navigation.navigate("Community");
                }, 500);
        }
            })
            .then((data) => console.log(data));
    }

  return (
       <ScrollView>
          <FormContainer>

             <View style={styles.label}>
                <Text style={{ fontWeight: "bold"}}>Main Feature</Text>
            </View>
             <Input 
                placeholder="[eg: CMC male tutors Needed]"
                name="Title"
                id="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Input
                    placeholder={"Class"}
                    name={"preset"}
                    id={"preset"}
                    value={preset}
                    onChangeText={(text) => setPreset(text)}
                />
                </View>
            <View style={styles.inputWrap}>
                <Input
                    placeholder={"Medium"}
                    name={"medium"}
                    id={"medium"}
                    value={medium}
                    onChangeText={(text) => setMedium(text)}
                />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Input
                    placeholder={"Subjects"}
                    name={"sub"}
                    id={"sub"}
                    value={sub}
                    onChangeText={(text) => setSub(text)}
                />
                </View>
            <View style={styles.inputWrap}>
                <Input
                    placeholder={"Day per weak"}
                    name={"Day"}
                    id={"Day"}
                    keyboardType={"numeric"}
                    value={day}
                    onChangeText={(text) => setDay(text)}
                />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Input
                    placeholder={"salary"}
                    name={"salary"}
                    id={"salary"}
                    value={salary}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setSalary(text)}
                />
                </View>
            <View style={styles.inputWrap}>
                <Input
                    placeholder={"Fee, eg: if media"}
                    name={"fee"}
                    id={"fee"}
                    // keyboardType={"numeric"}
                    value={fee}
                    onChangeText={(text) => setFee(text)}
                />
                </View>
            </View>
              <Input 
                placeholder="[location goes here]"
                name="location"
                id="location"
                value={location}
                onChangeText={(text) => setLocation(text)}
              />
             <View style={styles.label}>
                <Text style={{ fontWeight: "bold"}}>Contact Info</Text>
            </View>
             <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Input
                    placeholder={"Contact No"}
                    name={"mobile"}
                    id={"mobile"}
                    keyboardType={"numeric"}
                    value={mobile}
                    onChangeText={(text) => setMobile(text)}
                />
                </View>

            <View style={styles.inputWrap}>
                <Input
                    placeholder={"What's App No"}
                    name={"whatsApp"}
                    id={"whatsApp"}
                    keyboardType={"numeric"}
                    value={whatsApp}
                    onChangeText={(text) => setWhatsApp(text)}
                />
                </View>
            </View>
             <View style={styles.buttonContainer}>
               <EasyButton
                large
                primary
                onPress={() => createTolet()}               
               >
                   <Text style={styles.buttonText}>Submit</Text>
               </EasyButton>
           </View>
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
});

export default CreateTolet;