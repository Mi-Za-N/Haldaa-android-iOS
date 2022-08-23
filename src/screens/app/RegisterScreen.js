import React,{useState} from "react";
import axios  from "axios";
import Toast from "react-native-toast-message";
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Button
} from "react-native"
import Input from "../../components/UI/Input";
import EasyButton from "../../components/UI/EasyButton";
import FormContainer from "../../components/UI/FormContainer";
import Icon from "react-native-vector-icons/FontAwesome"
import * as ImagePicker from "expo-image-picker"
import Colors from "../../constants/Colors";
import {baseURL} from "../../../BaseUrl";
import InputCode from "../../components/UI/InputCode";
import InputMobile from "../../components/UI/InputMobile";


const ProductForm = (props) => {
   const [picture,setPicture] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [country, setCountry] = useState("Bangladesh");
   const [city, setCity] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [code, setCode] = useState("+88");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

// fetch("http://localhost:5000/users/send-otp", {
//   method: "POST",
//   headers: { 
//     "Content-type": "application/json"
//   },
//   body: JSON.stringify({
//       "countryCode":"+88", //requerd
//       "number":"01832343212" //requerd
//     })
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));




  const handleSubmit = () => {
       if (email === "" || firstName === "" || lastName === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }

      let user = {
      first_name: firstName,
      last_name: lastName,
      country: country,
      city: city,
      email: email,
      phone: phone,
      password: password,
      pic: picture,
     
    };
      props.navigation.navigate("EditProfile", {user: user});

    // fetch(`${baseURL}users/send-otp`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //       "countryCode":code, //requerd
    //       "number": phone //requerd
    //     })
    // })
    //   .then((res) => {
    //     // console.log(res.data);
    //     if (res.status == 200) {
    //       Toast.show({
    //         topOffset: 60,
    //         type: "success",
    //         text1: "OTP sending",
    //         text2: "Put the OTP correctly",
    //       });
    //       setTimeout(() => {
    //         props.navigation.navigate("EditProfile", {user: user});
    //       }, 500);
    //     }
    //   })
    //   .then((data) => console.log(data));
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
            console.log(err);
        })
   }



    return (
      <ScrollView style={{paddingTop: 50}}>
       <FormContainer title="Register">
           {/* <Image style={{width:"100%", resizeMode:"stretch"}} source={require('../../../assets/logo.png')} /> */}
           <View style={styles.label}>
            <Text style={{paddingLeft: 0, fontWeight: "bold", fontSize: 20}}>Register</Text>
            </View>
           <View style={styles.imageContainer}>
             
               <Image style={styles.image} 
                source={{uri: picture}}
              //  source={{uri: "https://res.cloudinary.com/dsop4plsb/image/upload/v1640688655/e8fd3q7fztsj7bl49vix.jpg"}}
               />
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
           </View>
           <Text style={{paddingLeft: 0, fontWeight: "600", fontSize: 16}}>upload an Image (optional)</Text>
      <View style={styles.row}>
        <View style={styles.inputWrap}>
          {/* <Text style={styles.label}>First Name</Text> */}
          <Input
            placeholder={"First Name"}
            name={"First_Name"}
            id={"First_Name"}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>

        <View style={styles.inputWrap}>
          <Input
            placeholder={"Last Name"}
            name={"Last_Name"}
            id={"Last_Name"}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputWrap}>
          <Input
            placeholder={"country"}
            name={"Country"}
            id={"Country"}
            value={country}
            onChangeText={(text) => setCountry(text)}
          />
        </View>
       <View style={styles.inputWrap}>
          <Input
            placeholder={"city"}
            name={"city"}
            id={"city"}
            value={city}
            onChangeText={(text) => setCity(text)}
          />
        </View>
      </View>
           {/* <Text style={styles.label}>Last Name</Text> */}
           <Input 
            placeholder="Email"
            name="email"
            id="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
           />
            {/* <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Phone</Text>
           </View> */}
           
      <View style={{
            flex: 1,
            flexDirection: "row",
            width: "90%",
            justifyContent:"space-around",
            alignItems: "stretch"
          }}>
 
          {/* <Text style={styles.label}>First Name</Text> */}
           <InputCode 
            placeholder="code Number"
            name="code"
            id="code"
            value={code}
            keyboardType={"numeric"}
            onChangeText={(text) => setCode(text)}
           />
        

        
          <InputMobile 
            placeholder="Phone Number"
            name="phone"
            id="phone"
            value={phone}
            keyboardType={"numeric"}
            onChangeText={(text) => setPhone(text)}
           />
        
      </View>
           {/* <View style={styles.label}>
             <Text style={{ textDecorationLine: "underline"}}>Password</Text>
           </View> */}
         <Input
            placeholder={"Enter Password"}
            name={"password"}
            id={"password"}
            secureTextEntry={true}
            keyboardType={"numeric"}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

           <View style={styles.buttonContainer}>
               {/* <EasyButton
                large
                primary
               onPress={handleSubmit}               
               >
                   <Text style={styles.buttonText}>Confirm</Text>
               </EasyButton> */}
                <Button
                title="Next"
                disabled={!firstName || !lastName || !country 
                  || !email || phone.length <=10 || password.length <=4}
                onPress={handleSubmit}
              />
          <TouchableOpacity 
              onPress={() => props.navigation.navigate("Login")}
              >
            <Text style={styles.middleText}>Already have an account yet?
              <Text style={{ marginTop: 40, color: "#DD502C"}}>Login</Text>
            </Text>
    
          </TouchableOpacity>
           </View>

       </FormContainer>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        width: "90%",
        marginTop: 20
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 5,
        alignItems: "center"
    },
    buttonText: {
       color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
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
        right: 5,
        bottom: 5,
        backgroundColor: Colors.secondary,
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
  inputdate: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  },
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
 middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
  inputcvv: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  }
})
export default ProductForm;