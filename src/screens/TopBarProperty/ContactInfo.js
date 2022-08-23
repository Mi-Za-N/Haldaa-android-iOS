import React, { useState, useEffect,useContext ,useRef} from "react";
import axios  from "axios";
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Button,
    ScrollView
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormContainer from "../../components/UI/FormContainer";
import Input from "../../components/UI/Input";
import EasyButton from "../../components/UI/EasyButton"
import { baseURL } from "../../../BaseUrl";
import Toast from "react-native-toast-message"
import TextArea from "../../components/UI/TextArea";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import RadioButton from "../../components/UI/RadioButton";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import { Select, Box, CheckIcon } from "native-base";


const size = [
    {
        check: true,
        title: 'Sale',
        value: 'Sale',
    }, {
        check: false,
        title: 'Rent',
        value: 'Rent',
    }
];


const CreateEventScreen = (props) => {
    const data = props.route.params? props.route.params.info : "";
    // console.log(data);
     const distric = useAppState("districs");
     const [service, setService] = useState("");
     const context = useContext(AuthGlobal)
    const [token, setToken] = useState();

    const [pubTransport,setPubTransport] = useState()
    const [shopingTransport,setShopingTransport] = useState()
    const [primarySchool,setPrimarySchool] = useState()
    const [kingdergarten,setKindergarten] = useState()
    const [secondarySchool,setSecondarySchool] = useState()
    const [motorWay,setMotorWay] = useState()
    const [name,setName] = useState()
    const [mobileNo,setMobileNo] = useState()
    const [email,setEmail] = useState()


    const [fullName,setFullName] = useState();
    const [emailForInterView, setEmailForInterview ] = useState();
    const [phone,setPhone] = useState()
    const [completeAdress,setCompleteAddress] = useState()
    const [featured, setFeatured] = useState();
    // console.log(featured)



    const onChange = () => {
        return (e) => {
            setFeatured(e.check);
            // console.log(e.check);
        };
    };



    const createEvent = () => {
        fetch(`${baseURL}api/events/create`, {
            method: "POST",
            headers: { 
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "rooms": data.rooms, 
                "floor": data.floor,
                "living_space": data.livingSpace,
                "floor_space": data.floorSpace,
                "room_height": data.roomHeigh,
                "volume": data.volume,
                "year_build1": data.yearBuild,
                "year_build2": data.yearBuild2,
                "lot_size": "",
                "location": data.location,
                "category": "",
                "bath_room": data.bathRooms,
                "bed": data.bed,
                "net_rent": data.netRent,
                "additional_expenses": data.additionalExpense,
                "image": data.picture,
                "video": data.video,
                "title": data.title,
                "description": data.description,

                "data1": pubTransport,
                "data2": shopingTransport,
                "data3": kingdergarten,
                "data4": primarySchool,
                "data5": secondarySchool,
                "data6": motorWay,
                "isFeatured": featured,
                "name": name,
                "mobile": mobileNo,
                "whats_app": mobileNo,
                "email": email,
                "full_name": fullName,
                "email_for_interview": emailForInterView,
                "complete_address": completeAdress,
                "billing_mobile": phone,
                "preset": "anything",
                "distric": service,
                "user": context.stateUser.user.id


                })
            })
            .then((res) => {
            if (res.status == 200) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Property created",
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
     <ScrollView style={{backgroundColor: "white", marginTop: 5}}>
       <FormContainer title="Add Product">
          <View style={{flex:1,justifyContent:"center"}}>
             <Text style={{ fontWeight: "bold"}}>Sorrounding & Distance</Text>
           </View>

           <View style={styles.row}>
            <View style={styles.inputWrap}>
             <Text style={styles.label}>*Public Transport Distance</Text>
            <Input
                placeholder={"i.e: 4"}
                name={"pubTransport"}
                id={"pubTransport"}
                value={pubTransport}
                keyboardType={"numeric"}
                onChangeText={(text) => setPubTransport(text)}
            />
            </View>
           <View style={styles.inputWrap}>
             <Text style={styles.label}>*Shoping Distance</Text>
            <Input
                placeholder={"i.e: 3"}
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
                <Text style={styles.label}>*kingder garten</Text>
            <Input
                placeholder={"i.e: 2"}
                name={"kingdergarten"}
                id={"kingdergarten"}
                value={kingdergarten}
                keyboardType={"numeric"}
                onChangeText={(text) => setKindergarten(text)}
            />
            </View>
           <View style={styles.inputWrap}>
            <Text style={styles.label}>*Primary School</Text>
            <Input
                placeholder={"i.e: 2"}
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
            <Text style={styles.label}>*Secondary School</Text>
          <Input
            placeholder={"i.e: 2"}
            name={"secondarySchool"}
            id={"secondarySchool"}
            value={secondarySchool}
            keyboardType={"numeric"}
            onChangeText={(text) => setSecondarySchool(text)}
          />
        </View>
       <View style={styles.inputWrap}>
           <Text style={styles.label}>*High way </Text>
          <Input
            placeholder={"i.e: 6"}
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
               <Text style={{ fontWeight: "bold"}}>Please select one</Text>
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

            <TextArea
            placeholder={"Complete Address"}
            name={"complete adress"}
            value={completeAdress}
            onChangeText={(text) => setCompleteAddress(text)}
            />
          <Input 
            placeholder="Phone Number"
            name="phone"
            id="phone"
            value={phone}
            keyboardType={"numeric"}
            onChangeText={(text) => setPhone(text)}
           />


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


       </FormContainer>
        <View style={styles.buttonContainer}>
              <Button
                accessibilityLabel="Tap to Decrypt Data"
                title="Submit"
                disabled={!fullName || !emailForInterView || !completeAdress || !service}
                onPress={() => createEvent()}  
              />
           </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  label: { 
    fontSize:12, 
    color:"gray", 
    fontWeight:"bold", 
    marginHorizontal:5
  },
    buttonContainer: {
        // width: "90%",
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
})

export default CreateEventScreen;
