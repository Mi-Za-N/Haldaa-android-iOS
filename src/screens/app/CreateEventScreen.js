import React, { useState, useEffect,useContext ,useRef} from "react";
import axios  from "axios";
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormContainer from "../../components/UI/FormContainer";
import Input from "../../components/UI/Input";
import EasyButton from "../../components/UI/EasyButton"
import { baseURL } from "../../../BaseUrl";
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import TextArea from "../../components/UI/TextArea";
import * as ImagePicker from "expo-image-picker";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import RadioButton from "../../components/UI/RadioButton";
import ComboBoxButton from "../../components/UI/ComboBoxButton";

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
const notify = [
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
const virtual = [
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

const CreateEventScreen = (props) => {
     const context = useContext(AuthGlobal)
    const [token, setToken] = useState();

    const [rooms,setRooms] = useState()
    const [floor,setFloor] = useState()
    const [livingSpace,setLivingSpace] = useState()
    const [floorSpace,setFloorSpace] = useState()
    const [roomHeigh,setRoomHeight] = useState()
    const [volume,setVolume] = useState()
    const [bathRooms,setBathRooms] = useState()
    const [bed,setBed] = useState()
    const [yearBuild,setYearBuild] = useState()
    const [yearBuild2,setYearBuild2] = useState()
    const [netRent,setNetRent] = useState()
    const [additionalExpense,setAdditionalExpense] = useState()
    const [description,setDescription] = useState()
    const [title,setTitle] = useState()
    const [video,setVideo] = useState()
    const [pubTransport,setPubTransport] = useState()
    const [shopingTransport,setShopingTransport] = useState()
    const [primarySchool,setPrimarySchool] = useState()
    const [kingdergarten,setKindergarten] = useState()
    const [secondarySchool,setSecondarySchool] = useState()
    const [motorWay,setMotorWay] = useState()
    const [name,setName] = useState()
    const [mobileNo,setMobileNo] = useState()
    const [email,setEmail] = useState()
    const [location,setLocation] = useState()

    const [fullName,setFullName] = useState();
    const [emailForInterView, setEmailForInterview ] = useState();



    const [picture,setPicture] = useState()
    const [phone,setPhone] = useState()
    const [completeAdress,setCompleteAddress] = useState()
    const [featured, setFeatured] = useState(false);



    const onChange = () => {
        return (e) => {
            setFeatured(e.check);
            console.log(e.check);
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
            setPicture(data.url)
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

    const createEvent = () => {
        fetch(`${baseURL}api/events/create`, {
            method: "POST",
            headers: { 
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "rooms": rooms, 
                "floor":floor,
                "living_space": livingSpace,
                "floor_space":floorSpace,
                "room_height": roomHeigh,
                "volume": volume,
                "year_build1": yearBuild,
                "year_build2": yearBuild2,
                "lot_size": "",
                "location":location,
                "category": "",
                "bath_room": bathRooms,
                "bed": bed,
                "net_rent": netRent,
                "additional_expenses": additionalExpense,
                "image": picture,
                "video": video,
                "title": title,
                "description": description,
                "data1": pubTransport,
                "data2": shopingTransport,
                "data3": kingdergarten,
                "data4": primarySchool,
                "data5": secondarySchool,
                "data6": motorWay,
                "isFeatured": featured,
                "name": name,
                "mobile": mobileNo,
                "whats_app": "",
                "email": email,
                "full_name": fullName,
                "email_for_interview": emailForInterView,
                "complete_address": completeAdress,
                "billing_mobile": phone,
                "preset": "anything",
                "user": context.stateUser.user.id


                })
            })
            .then((res) => {
            if (res.status == 200) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Event created",
                });
                setTimeout(() => {
                    props.navigation.navigate("home");
                }, 500);
        }
            })
            .then((data) => console.log(data));
    }
    

   useEffect(() => {
    AsyncStorage.getItem("jwt")
    .then((res) => {
        setToken(res)
    })
    .catch((error) => console.log(error))

    }, [])




    return (
     <ScrollView style={{backgroundColor: "white", marginTop: 50}}>
       <FormContainer title="Add Product">
    <View style={styles.label}>
        <Text style={{ fontWeight: "bold"}}>Main Feature</Text>
    </View>
    <View style={styles.row}>
        <View style={styles.inputWrap}>
          <Input
            placeholder={"rooms"}
            name={"rooms"}
            id={"rooms"}
            value={rooms}
            keyboardType={"numeric"}
            onChangeText={(text) => setRooms(text)}
          />
        </View>
       <View style={styles.inputWrap}>
          <Input
            placeholder={"floor"}
            name={"floor"}
            id={"floor"}
            value={floor}
            keyboardType={"numeric"}
            onChangeText={(text) => setFloor(text)}
          />
        </View>
      </View>
         <View style={styles.row}>
            <View style={styles.inputWrap}>
            <Input
                placeholder={"living Space"}
                name={"livingSpace"}
                id={"livingSpace"}
                value={livingSpace}
                keyboardType={"numeric"}
                onChangeText={(text) => setLivingSpace(text)}
            />
            </View>
        <View style={styles.inputWrap}>
            <Input
                placeholder={"floor Space"}
                name={"floorSpace"}
                id={"floorSpace"}
                value={floorSpace}
                keyboardType={"numeric"}
                onChangeText={(text) => setFloorSpace(text)}
            />
            </View>
        </View>

         <View style={styles.row}>
            <View style={styles.inputWrap}>
            <Input
                placeholder={"Room Heigh"}
                name={"roomHeigh"}
                id={"roomHeigh"}
                value={roomHeigh}
                keyboardType={"numeric"}
                onChangeText={(text) => setRoomHeight(text)}
            />
            </View>
           <View style={styles.inputWrap}>
            <Input
                placeholder={"volume"}
                name={"volume"}
                id={"volume"}
                value={volume}
                keyboardType={"numeric"}
                onChangeText={(text) => setVolume(text)}
            />
            </View>
        </View>

        <View style={styles.row}>
            <View style={styles.inputWrap}>
            <Input
                placeholder={"Bath Rooms"}
                name={"bathRooms"}
                id={"bathRooms"}
                value={bathRooms}
                keyboardType={"numeric"}
                onChangeText={(text) => setBathRooms(text)}
            />
            </View>
           <View style={styles.inputWrap}>
            <Input
                placeholder={"bed"}
                name={"bed"}
                id={"bed"}
                value={bed}
                keyboardType={"numeric"}
                onChangeText={(text) => setBed(text)}
            />
            </View>
        </View>
        
        <View style={styles.row}>
            <View style={styles.inputWrap}>
            <Input
                placeholder={"Year Build"}
                name={"yearBuild"}
                id={"yearBuild"}
                value={yearBuild}
                keyboardType={"numeric"}
                onChangeText={(text) => setYearBuild(text)}
            />
            </View>
           <View style={styles.inputWrap}>
            <Input
                placeholder={"Year Build"}
                name={"yearBuild2"}
                id={"yearBuild2"}
                value={yearBuild2}
                keyboardType={"numeric"}
                onChangeText={(text) => setYearBuild2(text)}
            />
            </View>
        </View>

        <View style={styles.row}>
            <View style={styles.inputWrap}>
            <Input
                placeholder={"Net Rent"}
                name={"netRent"}
                id={"netRent"}
                value={netRent}
                keyboardType={"numeric"}
                onChangeText={(text) => setNetRent(text)}
            />
            </View>
           <View style={styles.inputWrap}>
            <Input
                placeholder={"Additional Expense"}
                name={"additionalExpense"}
                id={"additionalExpense"}
                value={additionalExpense}
                keyboardType={"numeric"}
                onChangeText={(text) => setAdditionalExpense(text)}
            />
            </View>
        </View>


           <View style={styles.label}>
              <Text style={{ fontWeight: "bold"}}>Image & Description</Text>
           </View>
           <View style={styles.imageContainer}>
               <Image style={styles.image} 
                 source={{uri: picture}}
               />
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
           </View>
           <Input 
            placeholder="[paste video link here]"
            name="video"
            id="video"
            value={video}
            onChangeText={(text) => setVideo(text)}
           />
           <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Title</Text>
           </View>
           <Input 
            placeholder="[Title name goes here]"
            name="Title"
            id="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
           />
          <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Location</Text>
           </View>
          <Input 
            placeholder="[location goes here]"
            name="location"
            id="location"
            value={location}
            onChangeText={(text) => setLocation(text)}
           />
           <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Description</Text>
           </View>
          <TextArea
            placeholder={"Event description Lorem ipsum dollar sum emit,Event description Lorem ipsum dollar sum emit"}
            name={"event des"}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <View style={styles.label}>
             <Text style={{ fontWeight: "bold"}}>Sorrounding & Distance</Text>
           </View>

           <View style={styles.row}>
            <View style={styles.inputWrap}>
            <Input
                placeholder={"Public Transport"}
                name={"pubTransport"}
                id={"pubTransport"}
                value={pubTransport}
                keyboardType={"numeric"}
                onChangeText={(text) => setPubTransport(text)}
            />
            </View>
           <View style={styles.inputWrap}>
            <Input
                placeholder={"Shoping Transport"}
                name={"shopingTransport"}
                id={"shopingTransport"}
                value={shopingTransport}
                keyboardType={"numeric"}
                onChangeText={(text) => setShopingTransport(text)}
            />
            </View>
        </View>

        <View style={styles.row}>
            <View style={styles.inputWrap}>
            <Input
                placeholder={"kingder garten"}
                name={"kingdergarten"}
                id={"kingdergarten"}
                value={kingdergarten}
                keyboardType={"numeric"}
                onChangeText={(text) => setKindergarten(text)}
            />
            </View>
           <View style={styles.inputWrap}>
            <Input
                placeholder={"Primary School"}
                name={"primarySchool"}
                id={"primarySchool"}
                value={primarySchool}
                keyboardType={"numeric"}
                onChangeText={(text) => setPrimarySchool(text)}
            />
            </View>
        </View>

    <View style={styles.row}>
        <View style={styles.inputWrap}>
          <Input
            placeholder={"Secondary School"}
            name={"secondarySchool"}
            id={"secondarySchool"}
            value={secondarySchool}
            keyboardType={"numeric"}
            onChangeText={(text) => setSecondarySchool(text)}
          />
        </View>
       <View style={styles.inputWrap}>
          <Input
            placeholder={"Motor Way"}
            name={"motorWay"}
            id={"motorWay"}
            value={motorWay}
            keyboardType={"numeric"}
            onChangeText={(text) => setMotorWay(text)}
          />
        </View>
      </View>

            <View style={styles.label}>
             <Text style={{ fontWeight: "bold"}}>Contact Information</Text>
           </View>
           <Input 
            placeholder="Name"
            name="name"
            id="name"
            value={name}
            onChangeText={(text) => setName(text)}
           />
         <Input 
            placeholder="Mobile No"
            name="mobile"
            id="mobile"
            value={mobileNo}
            keyboardType={"numeric"}
            onChangeText={(text) => setMobileNo(text)}
           />
          <Input 
            placeholder="Email"
            name="email"
            id="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
           />

            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Remote Viewing?</Text>
           </View>
           <RadioButton arr={size} onPress={onChange()}/>
           
           <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Billing Information</Text>
           </View>
            <Input 
            placeholder="Full Name"
            name="full"
            id="full"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
           />
          <Input 
            placeholder="Email for Interview"
            name="Email for Interview"
            id="Email for Interview"
            value={emailForInterView}
            onChangeText={(text) => setEmailForInterview(text)}
           />
           <Input 
            placeholder="Phone Number"
            name="phone"
            id="phone"
            value={phone}
            keyboardType={"numeric"}
            onChangeText={(text) => setPhone(text)}
           />
            <TextArea
            placeholder={"Complete Address"}
            name={"complete adress"}
            value={completeAdress}
            onChangeText={(text) => setCompleteAddress(text)}
            />





           {/* <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Event Name</Text>
           </View>
           <Input 
            placeholder="[event name goes here]"
            name="event"
            id="event"
            value={eventName}
            onChangeText={(text) => setEventName(text)}
           />
           <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Hosted By</Text>
           </View>
           <Input 
            placeholder="[Host name goes here]"
            name="host name"
            id="host name"
            value={context.stateUser.userProfile.email}
            // onChangeText={(text) => setHostName(text)}
           />
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Event Link</Text>
           </View>
           <Input 
            placeholder="[Event link goes here]"
            name="event link"
            id="event link"
            value={eventLink}
            onChangeText={(text) => setEventLink(text)}
           />
           <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Event Description</Text>
           </View>
          <TextArea
            placeholder={"Event description Lorem ipsum dollar sum emit,Event description Lorem ipsum dollar sum emit"}
            name={"event des"}
            value={eventDesc}
            onChangeText={(text) => setEventDesc(text)}
            />
            <View style={{paddingVertical: 2, paddingHorizontal: 18}}>
                <ComboBoxButton checked_color={"#DD502C"} 
                callback={callback_combo_box()}
                />
            </View>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Is Featured?</Text>
           </View>
           <RadioButton arr={size} onPress={onChange()}/>
           <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Notify Member?</Text>
           </View>
           <RadioButton arr={notify} onPress={onChange()}/>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Is Event virtual?</Text>
           </View>
           <RadioButton arr={virtual} onPress={onChange()}/> */}

           
           <View style={styles.buttonContainer}>
               <EasyButton
                large
                primary
                onPress={() => createEvent()}               
               >
                   <Text style={styles.buttonText}>Submit</Text>
               </EasyButton>
           </View>
       </FormContainer>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
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
    imageContainer: {
        width: "95%",
        height: 100,
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
        borderRadius: 100
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
})

export default CreateEventScreen;
