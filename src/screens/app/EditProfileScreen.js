import React, { useEffect } from "react"
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from "react-native";
import axios  from "axios";
import Toast from "react-native-toast-message";
import Input from "../../components/UI/Input";
import EasyButton from "../../components/UI/EasyButton";
import FormContainer from "../../components/UI/FormContainer";
import Icon from "react-native-vector-icons/FontAwesome"
import * as ImagePicker from "expo-image-picker";
import TextArea from '../../components/UI/TextArea';
import HF from "../../components/app/Hf";
import Colors from "../../constants/Colors";
import {baseURL} from "../../../BaseUrl";


const ProductForm = (props) => {
  const data = props.route.params;
  const user = data.user
  // console.log(data);

  const handleSubmit =  () => {
    axios.post(`${baseURL}users`, user)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Provide Correnct phone No, Email & Image",
          text2: "Please try again",
        });
      });




    // props.navigation.navigate("home");
        // Toast.show({
        //     topOffset: 60,
        //     type: "success",
        //     text1: "Regitration Success",
        //     });
    };

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1
    //     });

    //     // if (!result.cancelled) {
    //     //     setMainImage(result.uri);
    //     //     setImage(result.uri);
    //     // }
    // };

    return (
      <ScrollView style={{paddingTop: 50}}>
       <FormContainer>
           <View style={styles.imageContainer}>
               <Image style={styles.image} 
                 source={{uri: user.pic}}
              //  source={{uri: "https://res.cloudinary.com/dsop4plsb/image/upload/v1640688655/e8fd3q7fztsj7bl49vix.jpg"}}
               />
               <TouchableOpacity  style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
           </View>
           <View style={styles.row}>
        <View style={styles.inputWrap}>
          {/* <Text style={styles.label}>First Name</Text> */}
                <Input
                  placeholder={"First Name"}
                  name={"Name"}
                  id={"name"}
                  value={user.first_name}
                  // onChangeText={(text) => setEmail(text)}
                />
        </View>

        <View style={styles.inputWrap}>
          {/* <Text style={styles.label}>Last Name</Text> */}
          <Input
            placeholder={"Last Name"}
            name={"Name"}
            id={"name"}
            value={user.last_name}
            // onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>
            <View style={styles.row}>
        <View style={styles.inputWrap}>
          <Input
            placeholder={"country"}
            name={"Country"}
            id={"Country"}
            value={user.country}
            // onChangeText={(text) => setCountry(text)}
          />
        </View>
       <View style={styles.inputWrap}>
          <Input
            placeholder={"city"}
            name={"city"}
            id={"city"}
            value={user.city}
            // onChangeText={(text) => setCity(text)}
          />
        </View>
      </View>
           {/* <Text style={styles.label}>Last Name</Text> */}
           <Input 
            placeholder="Email"
            name="email"
            id="email"
            value={user.email}
            // onChangeText={(text) => setEmail(text)}
           />
            {/* <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Phone</Text>
           </View> */}
           
           <Input 
            placeholder="Phone Number"
            name="phone"
            id="phone"
            value={user.phone}
            keyboardType={"numeric"}
            // onChangeText={(text) => setPrice(text)}
           />
           {/* <View style={styles.label}>
             <Text style={{ textDecorationLine: "underline"}}>Password</Text>
           </View> */}
         <Input
            placeholder={"Enter Password"}
            name={"password"}
            id={"password"}
            secureTextEntry={true}
            value={user.password}
            // onChangeText={(text) => setPassword(text)}
          />
           <View style={styles.buttonContainer}>
               <EasyButton
                large
                primary
               onPress={handleSubmit}               
               >
                   <Text style={styles.buttonText}>Finish profile</Text>
               </EasyButton>
           </View>
       </FormContainer>
     </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
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
        width: 120,
        height: 120,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        marginTop: 20,
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
        backgroundColor:  Colors.secondary,
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
    row: {
    flex: 1,
    flexDirection: "row",
    width: "95%"
  },
  inputWrap: {
    flex: 1,
    borderColor: "#000",
    // borderBottomWidth: 1,
    marginBottom: 10
  },
  inputdate: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  },
  inputcvv: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595"
  }
})
export default ProductForm;
