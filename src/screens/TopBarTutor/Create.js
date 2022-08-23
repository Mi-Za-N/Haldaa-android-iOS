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
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import { Select, Box, CheckIcon } from "native-base";

const screenWidth = Dimensions.get('window').width;

const size = [
    {
        check: true,
        title: 'Female',
        value: 'Female',
    }, {
        check: false,
        title: 'Male',
        value: 'Male',
    }
];

const CreateTutors = (props) => {
    const distric = useAppState("districs");
    const context = useContext(AuthGlobal)
    const [service, setService] = useState("");
    const [token, setToken] = useState();
    const [image, setImage] = useState("https://media.istockphoto.com/vectors/student-id-card-university-school-college-identity-card-vector-vector-id1154987560");
    const [name, setName] = useState("");
    const [institute, setInstitute] = useState("");
    const [experience, setExperience] = useState("");
    const [salary, setSalary] = useState("");
    const [day, setDay] = useState("");
    const [location, setLocation] = useState("");
    const [gender, setGender] = useState(false);
    const [tutoringLocation, setTutoringLocation] = useState("");
    const [expertSubs, setExpertSubs] = useState([]);

    const [whatsApp, setWhatsApp] = useState("");
    const [mobile, setMobile] = useState("");
 
    // console.log(context.stateUser.user.id);
    // console.log(service);
 
   useEffect(() => {
     AsyncStorage.getItem("jwt")
     .then((res) => {
         setToken(res)
     })
     .catch((error) => console.log(error))

    }, [])

    const onChange = () => {
        return (e) => {
            setGender(e.check);
            console.log("gender",e.check);
        };
    };

   const callback_combo_box = () => {
        return (e) => {
          setExpertSubs(e);
            console.log(e)
        };
    };

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


  const createTolet = () => {
        fetch(`${baseURL}api/tutors/create`, {
            method: "POST",
            headers: { 
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "idCard": image,
                "name": name,
                "institute": institute,
                "experience": experience,
                "salary": salary,
                "day": day,
                "location": location,
                "gender": gender,
                "tutoringLocation": tutoringLocation,
                "expertSubs": expertSubs,
   
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
                    text1: "Tutor created",
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
         }}>
           Create Tutors Profile
          </Text>
          </View>
      </View>


            <Text style={{ fontWeight: "bold"}}>*upload your ID Card</Text>
          <View style={styles.imageContainer}>
               <Image style={styles.image} 
                 source={{uri: image ? image : "https://media.istockphoto.com/vectors/student-id-card-university-school-college-identity-card-vector-vector-id1154987560"}}
               />
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
          </View>

            <View style={{flex:1,justifyContent:"center"}}>
            <Text style={{ fontWeight: "bold"}}>Enter Your Name Here</Text>
            </View>
             <Input 
                placeholder="Your Full Name"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />

           <View style={{flex:1,justifyContent:"center"}}>
            <Text style={{ fontWeight: "bold"}}>Your Institute Name</Text>
            </View>
             <Input 
                placeholder="[e.g: University of Dhaka]"
                name="institute"
                id="institute"
                value={institute}
                onChangeText={(text) => setInstitute(text)}
            />

            <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Text style={styles.label2}>*Exp Salary </Text>
                <Input
                    placeholder={"e.g: 500"}
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
                <Text style={{ fontWeight: "bold"}}>*Your Location </Text>
            </View>
              <Input 
                placeholder="i.e: Alfala goli, 2 no gate, ctg"
                name="location"
                id="location"
                value={location}
                onChangeText={(text) => setLocation(text)}
              />

              <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>*Your Experience </Text>
            </View>
              <Input 
                placeholder="i.e: 2.5"
                name="experience"
                id="experience"
                 keyboardType="numeric"
                value={experience}
                onChangeText={(text) => setExperience(text)}
              />

             <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>*Interested Location For Tutoring </Text>
              </View>
               <TextArea
                placeholder={"i.e: Nasirabad housing society, muradpur, Gec,  wasa, lal khan Bazar, kazir dewry, Halishahar"}
                name={"tutoringLocation"}
                value={tutoringLocation}
                onChangeText={(text) => setTutoringLocation(text)}
               />

           <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>Tutors Contact Info</Text>
            </View>
             <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Text style={styles.label2}>Contact No</Text>
                <Input
                    placeholder={"Tutor phone No"}
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
                    placeholder={"Tutor WhatsApp No"}
                    name={"whatsApp"}
                    id={"whatsApp"}
                    keyboardType={"numeric"}
                    value={whatsApp}
                    onChangeText={(text) => setWhatsApp(text)}
                />
                </View>
            </View>
            <View style={{
                    width: "90%",
                    marginTop: 10
                }}>
                <Text style={{ fontWeight: "bold"}}>*Select Your Gender</Text>
               </View>
               <RadioButton arr={size} onPress={onChange()}/>

            <View style={{paddingTop: 5, paddingBottom: 5}}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingHorizontal:15 
                    }}>Select Your Most Experience Subjects</Text>
                    <View style={{paddingVertical: 2, paddingHorizontal: 18}}>
                        <ComboBoxButton checked_color={"#DD502C"} 
                        callback={callback_combo_box()}
                        />
                    </View>
            </View>
    

     <View style={{
        justifyContent:"center",
        alignItems:"center",
        width: "90%",
        marginTop: 10
    }}>
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
                disabled={!image || !name || !institute || !tutoringLocation || !expertSubs.length >=2 || !mobile || !service}
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

export default CreateTutors;