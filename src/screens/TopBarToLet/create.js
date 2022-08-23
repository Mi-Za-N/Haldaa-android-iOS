import React, { useState, useEffect,useContext} from 'react';
import { View, Text,Image, StyleSheet,ScrollView, TouchableOpacity,Button } from 'react-native';
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormContainer from "../../components/UI/FormContainer";
import Input from "../../components/UI/Input";
import { baseURL } from "../../../BaseUrl";
import EasyButton from "../../components/UI/EasyButton"
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import RadioButton from "../../components/UI/RadioButton";
import TextArea from "../../components/UI/TextArea";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import { Select, Box, CheckIcon } from "native-base";


const size = [
    {
        check: true,
        title: 'Yes',
        value: 'Yes',
    }, {
        check: false,
        title: 'No',
        value: 'No',
    }
];

const CreateTolet = (props) => {
    const context = useContext(AuthGlobal)
    const distric = useAppState("districs");
    const [service, setService] = useState("");
    const [token, setToken] = useState();
    const [title, setTitle] = useState("");
    const [room, setRoom] = useState("");
    const [floor, setFloor] = useState("");
    const [bed, setBed] = useState("");
    const [isAttachedBath, setIsAttachedBath] = useState(false);
    const [isWifi, setIsWifi] = useState(false);
    const [rent, setRent] = useState("");
    const [addExp, setAddExp] = useState("");
    const [location, setLocation] = useState();
    const [image, setImage] = useState("https://www.mwakilishi.com/sites/default/files/styles/large/public/2016-09/ROOMMATE-WANTED.png?itok=zrnpDwP8");
    const [fullName, setFullName] = useState("");
    const [whatsApp, setWhatsApp] = useState("");
    const [mobile, setMobile] = useState("");

    // console.log(context.stateUser.user.id);
    // console.log(token);
    const onChange = () => {
        return (e) => {
            setIsAttachedBath(e.check);
            console.log(e.check);
        };
    };
    const onChangeWifi = () => {
        return (e) => {
            setIsWifi(e.check);
            console.log(e.check);
        };
    };
 
   useEffect(() => {
     AsyncStorage.getItem("jwt")
     .then((res) => {
         setToken(res)
     })
     .catch((error) => console.log(error))

    }, [])

  const createTolet = () => {
        fetch(`${baseURL}api/tolets/create`, {
            method: "POST",
            headers: { 
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "title": title,
                "room": room,
                "floor": floor,
                "bed": bed,
                "isAttachedBath": isAttachedBath,
                "isWifi": isWifi,
                "rent": rent,
                "additional_expenses": addExp,
                "image": image,
                "location": location,
                "full_name": fullName,
                "whatsApp": whatsApp,
                "mobile": mobile,
                "distric": service,
                "user": context.stateUser.user.id


                })
            })
            .then((res) => {
            if (res.status == 200) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Room Mate Post created",
                });
                setTimeout(() => {
                    props.navigation.navigate("ToletHome");
                }, 500);
        }
            })
            .then((data) => console.log(data));
    }

     const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });
        if(!result.cancelled){
              let newfile = { 
                uri:result.uri,
                type:`test/${result.uri.split(".")[1]}`,
                name:`test.${result.uri.split(".")[1]}` 

            }
              handleUpload(newfile)
          }
    };




   const handleUpload = (image)=>{
        const data =  new FormData()
        data.append('file',image)
        data.append('upload_preset','xn3cwer5')
        data.append("cloud_name","dsop4plsb")

        fetch("https://api.cloudinary.com/v1_1/dsop4plsb/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
            setImage(data.url)
            console.log(data.url)
        }).catch(err=>{
             Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Image upload failed",
                });
            console.log(err);
        })
   }

  return (
       <ScrollView>
          <FormContainer>
            <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>Create Post Roommate WANTED</Text>
            </View>
          <View style={styles.imageContainer}>
               <Image style={styles.image} 
                 source={{uri: image ? image : "https://www.mwakilishi.com/sites/default/files/styles/large/public/2016-09/ROOMMATE-WANTED.png?itok=zrnpDwP8"}}
               />
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
              </View>
            <View style={{flex:1}}>
                <Text style={{ fontWeight: "bold"}}>Enter a Title here</Text>
            </View>
             <Input 
                placeholder="i.e male/female roommate wanted"
                name="Title"
                id="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />

          <View style={styles.row}>
                <View style={styles.inputWrap}>
               <Text style={styles.label}>*No of Available Seat </Text>
                <Input
                    placeholder={"available Seat"}
                    name={"Bed"}
                    id={"Bed"}
                    keyboardType={"numeric"}
                    value={bed}
                    onChangeText={(text) => setBed(text)}
                />
                </View>
            <View style={styles.inputWrap}>
                <Text style={styles.label}>*Floor Level </Text>
                <Input
                    placeholder={"i.e: 5th"}
                    name={"floor"}
                    id={"floor"}
                    value={floor}
                    onChangeText={(text) => setFloor(text)}
                />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Text style={styles.label}>*Rent Per Seat </Text>
                <Input
                    placeholder={"Seat Rent"}
                    name={"rent"}
                    id={"rent"}
                    keyboardType={"numeric"}
                    value={rent}
                    onChangeText={(text) => setRent(text)}
                />
                </View>

            <View style={styles.inputWrap}>
                <Text style={styles.label}>*Extra Cost </Text>
                <Input
                    placeholder={"i.e: wifi, current, gas"}
                    name={"addExp"}
                    id={"addExp"}
                    keyboardType={"numeric"}
                    value={addExp}
                    onChangeText={(text) => setAddExp(text)}
                />
                </View>
            </View>
              <View style={styles.label2}>
                <Text style={{ fontWeight: "bold"}}>Attached Bath?</Text>
               </View>
               <RadioButton arr={size} onPress={onChange()}/>
               <View style={styles.label2}>
                <Text style={{ fontWeight: "bold"}}>Wifi Available?</Text>
               </View>
               <RadioButton arr={size} onPress={onChangeWifi()}/>

             <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>*Location : within 50 characters</Text>
            </View>

               <Input 
                placeholder="i.e: Alfala goli, 2 no gate, ctg"
                name="location"
                id="location"
                value={location}
                onChangeText={(text) => setLocation(text)}
               />
             <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>*Description : Room Details</Text>
            </View>
               <TextArea
                placeholder={"Enter Details Here"}
                name={"Room Details"}
                value={room}
                onChangeText={(text) => setRoom(text)}
               />
               <View style={styles.label}>
                  <Text style={{ fontWeight: "bold"}}>Contact Info</Text>
               </View>
               <Input 
                placeholder="[Your Full Name]"
                name="fullName"
                id="fullName"
                value={fullName}
                onChangeText={(text) => setFullName(text)}
               />

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


                 <View style={styles.label}>
                  <Text style={{ fontWeight: "bold"}}>*Select Your Distric</Text>
               </View>
                <Box w="3/4" maxW="300">
                    <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Distric" placeholder="Choose Distric" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                    {distric.map((c) => {
                    return <Select.Item key={c._id} label={c.name} value={c._id} />
                    })}
                    </Select>
                </Box>


             <View style={styles.buttonContainer}>
            <Button
                title="Submit"
                disabled={  !image || !title || !fullName || !location  || !mobile || !service }
                onPress={() => createTolet()}  
            />
               {/* <EasyButton
                large
                primary
                onPress={() => createTolet()}               
               >
                   <Text style={styles.buttonText}>Submit</Text>
               </EasyButton> */}
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
  label2: {
        width: "90%",
        marginTop: 10
    },
  label: { 
    fontSize:12, 
    color:"gray", 
    fontWeight:"bold", 
    marginHorizontal:5
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

export default CreateTolet;