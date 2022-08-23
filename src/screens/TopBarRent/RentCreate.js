import React, { useState, useEffect,useContext} from 'react';
import { View,Button, Text,Image, StyleSheet,ScrollView, TouchableOpacity } from 'react-native';
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
const gen = [
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
const gas = [
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
const bachelor = [
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

const CreateRent = (props) => {
     const distric = useAppState("districs");
    const context = useContext(AuthGlobal)
    let [service, setService] = useState("");
    const [token, setToken] = useState();
    // console.log(service);

    const [image, setImage] = useState("https://www.chichester.news/wp-content/uploads/2017/06/to-let.jpg");
    const [title, setTitle] = useState("");
    const [flatRent, setFlatRent] = useState("");
    const [addExp, setAddExp] = useState("");
    const [bed, setBed] = useState("");
    const [bath, setBath] = useState("");
    const [description, setDescription] = useState("");
    const [roomHeigh, setRoomHeight] = useState("");
    const [volume, setVolume] = useState("");
    const [location, setLocation] = useState();

    const [isLift, setIsLift] = useState(false);
    const [isGenerator, setIsGererator] = useState(false);
    const [pipelineGas, setPipeLineGas] = useState(false);
    const [isBachelor, setIsBachelor] = useState(false);
    const [video, setVideo] = useState();

    const [fullName, setFullName] = useState("");
    const [whatsApp, setWhatsApp] = useState("");
    const [mobile, setMobile] = useState("");

    // console.log(context.stateUser.user.id);
    // console.log(token);
    const onChange = () => {
        return (e) => {
            setIsLift(e.check);
            console.log("lift",e.check);
        };
    };
   const onChangeGenerator = () => {
        return (e) => {
            setIsGererator(e.check);
            console.log("generator",e.check);
        };
    };
    const onChangePipelineGas = () => {
        return (e) => {
            setPipeLineGas(e.check);
            console.log("gas",e.check);
        };
    };

    const onChangeBachelor = () =>{
         return (e) => {
            setIsBachelor(e.check);
            console.log("isBachelor",e.check);
        };
    }
 
   useEffect(() => {
     AsyncStorage.getItem("jwt")
     .then((res) => {
         setToken(res)
     })
     .catch((error) => console.log(error))

    }, [])

  const create = () => {
        fetch(`${baseURL}api/rents/create`, {
            method: "POST",
            headers: { 
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "image": image,
                "title": title,
                "flatRent": flatRent,
                "additional_expenses": addExp,
                "bed": bed,
                "bath": bath,
                "description": description,
                "roomHeigh": roomHeigh,
                "bed": bed,
                "volume": volume,

                "location": location,
                "isLift": isLift,
                "isGenerator": isGenerator,
                "pipelineGas": pipelineGas,
                "isBachelor": isBachelor,
                "video":video,
                "fullName": fullName,
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
                    text1: "Post created",
                });
                setTimeout(() => {
                    props.navigation.navigate("RentHome");
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
     <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        // extraHeight={20}
        enableOnAndroid={true}
      >
      <ScrollView>
          <FormContainer>
            <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>Create Post- Flat To Let</Text>
            </View>
          <View style={styles.imageContainer}>
               <Image style={styles.image} 
                 source={{uri: image ? image : "https://www.chichester.news/wp-content/uploads/2017/06/to-let.jpg"}}
               />
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
              </View>
            <View style={{flex:1}}>
                <Text style={{ fontWeight: "bold"}}>Enter a Title here</Text>
            </View>
             <Input 
                placeholder="i.e Flat for rent in CTG"
                name="Title"
                id="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />

           <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Text style={styles.label}>*Flat Rent </Text>
                <Input
                    placeholder={"Net Flat Rent"}
                    name={"flatrent"}
                    id={"flatrent"}
                    keyboardType={"numeric"}
                    value={setFlatRent}
                    onChangeText={(text) => setFlatRent(text)}
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
               <View style={styles.row}>
               <View style={styles.inputWrap}>
                <Text style={styles.label}>*No of bed in Flat </Text>
                <Input
                    placeholder={"i.e:  4"}
                    name={"bed"}
                    id={"bed"}
                    keyboardType={"numeric"}
                    value={bed}
                    onChangeText={(text) => setBed(text)}
                />
                </View>
                <View style={styles.inputWrap}>
                <Text style={styles.label}>*No of Bath </Text>
                <Input
                    placeholder={"i.e: 3"}
                    name={"bath"}
                    id={"bath"}
                    keyboardType={"numeric"}
                    value={bath}
                    onChangeText={(text) => setBath(text)}
                />
                </View>


            </View>



              <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>*Details: Flat Featured  </Text>
              </View>
               <TextArea
                placeholder={"i.e: flat leve, Balconies, Drawing, Dining, parking"}
                name={"description"}
                value={description}
                onChangeText={(text) => setDescription(text)}
               />


          <View style={styles.row}>
                <View style={styles.inputWrap}>
               <Text style={styles.label}>*Room Height </Text>
                <Input
                    placeholder={"Flat bed room height"}
                    name={"Room height"}
                    id={"Room height"}
                    value={roomHeigh}
                    onChangeText={(text) => setRoomHeight(text)}
                />
                </View>
            <View style={styles.inputWrap}>
                <Text style={styles.label}>*Volume Sq:Ft </Text>
                <Input
                    placeholder={"i.e: 1660 Sq:Ft "}
                    name={"volume"}
                    id={"volume"}
                    keyboardType={"numeric"}
                    value={volume}
                    onChangeText={(text) => setVolume(text)}
                />
                </View>
            </View>











              <View style={styles.label2}>
                <Text style={{ fontWeight: "bold"}}>Lift Available?</Text>
               </View>
               <RadioButton arr={size} onPress={onChange()}/>
               <View style={styles.label2}>
                <Text style={{ fontWeight: "bold"}}>Generator Available?</Text>
               </View>
               <RadioButton arr={gen} onPress={onChangeGenerator()}/>
               <View style={styles.label2}>
                <Text style={{ fontWeight: "bold"}}>Pipe Line Gas?</Text>
               </View>
               <RadioButton arr={gas} onPress={onChangePipelineGas()}/>

               <View style={styles.label2}>
                <Text style={{ fontWeight: "bold"}}>Bachelor allow?</Text>
               </View>
               <RadioButton arr={bachelor} onPress={onChangeBachelor()}/>


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
                <Text style={{ fontWeight: "bold"}}>Flat Video (optional)</Text>
            </View>

               <Input 
                placeholder="paste youtube video link here"
                name="video"
                id="video"
                value={video}
                onChangeText={(text) => setVideo(text)}
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
                disabled={ !image || !title || !flatRent || !bed || !bath || !description  || !location || !mobile}
                onPress={() => create()}  
              />
               {/* <EasyButton
                large
                primary
                onPress={() => createRent()}               
               >
                   <Text style={styles.buttonText}>Submit</Text>
               </EasyButton> */}
           </View>
       </FormContainer>
    </ScrollView>
</KeyboardAwareScrollView> 
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

export default CreateRent;