import React, { useState, useEffect,useContext} from 'react';
import { View, Text,Image, StyleSheet,ScrollView, TouchableOpacity,Button,SafeAreaView } from 'react-native';
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormContainer from "../../components/UI/FormContainer";
import Input from "../../components/UI/Input";
import TextArea from "../../components/UI/TextArea";
// import FooterTabs from "../components/nav/FooterTabs";
// import Text from "@kaloraat/react-native-text";
import SubmitButton from "../../components/app/SubmitButton";
import ogs from "@uehreka/open-graph-scraper-react-native";
import urlRegex from "url-regex";
import PreviewCard from "../../components/app/PreviewCard";
import axios from "axios";
import { LinkContext } from "../../contexts/link";
import {baseURL} from "../../../BaseUrl";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";

const PostLink = ( props ) => {
  // context
  const context = useContext(AuthGlobal)
  const [links, setLinks] = useContext(LinkContext);
  // state
  const [token, setToken] = useState();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [camera, setCamera] = useState();
  const [description, setDescription] = useState();

   useEffect(() => {
      if(!context.stateUser.isAuthenticated){
        setTimeout(() => {
           Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please Sign up first",
             text2: "without sing up, can't join contest",
          });
             props.navigation.navigate("Sign Up");
          }, 5000);
      }
    },[context.stateUser.isAuthenticated]);

   useEffect(() => {
      AsyncStorage.getItem("jwt")
      .then((res) => {
          setToken(res)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleChange = async (text) => {
    try {
      setImage(text);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // console.log("title and link => ", title, link, urlPreview);
    if (!image || !title) {
      alert("Upload Image and give it a nice title 😎");
      return;
    }

    fetch(`${baseURL}api/post-link`, {
            method: "POST",
            headers: { 
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "image": image,
                "title": title,
                "camera":camera,
                "description":description,
                "user": context.stateUser.user.id
                })
            })
            .then((res) => {
            if (res.status == 200) {
              setImage("")
              setTitle("")
              setDescription("")
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Post created",
                });
                setTimeout(() => {
                    // props.navigation.navigate("RentHome");
                }, 500);
        }
            })
            .then((data) => console.log(data));





    // try {
    //   const { data } = await axios.post(`${baseURL}api/post-link`, {
    //     link,
    //     title,
    //     urlPreview,
    //   });
    //   // console.log("data => ", data);
    //   // update link context
    //   setLinks([data, ...links]);
    //   setTimeout(() => {
    //     alert("🎊 Link posted");
    //     navigation.navigate("Home");
    //   }, 500);
    // } catch (err) {
    //   console.log(err);
    // }

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





  return (
    <SafeAreaView style={{ flex: 1,marginTop:6, justifyContent:"center",alignItems:"center" }}>
      <ScrollView showsVerticalScrollIndicator={false}>

     <FormContainer>
            <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>To Join contest upload image and give a nice title</Text>
            </View>
          <View style={styles.imageContainer}>
               <Image style={styles.image} 
                 source={{uri: image ? image : "https://dcassetcdn.com/design_img/2794792/521537/521537_15368415_2794792_9b1e95a2_image.jpg"}}
               />
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
              </View>
            <View style={{flex:1}}>
                <Text style={{ fontWeight: "bold"}}>Enter a Title here</Text>
            </View>
             <Input 
                placeholder="Give it a title"
                name="Title"
                id="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />

 

             <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>Clicked By</Text>
            </View>

               <Input 
                placeholder="Clicked by"
                name="camera"
                id="camera"
                value={camera}
                onChangeText={(text) => setCamera(text)}
               />
             <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{ fontWeight: "bold"}}>*Description here</Text>
            </View>
               <TextArea
                placeholder={"Enter Details Here"}
                name={" Details"}
                value={description}
                onChangeText={(text) => setDescription(text)}
               />


             <View style={styles.buttonContainer}>
            {/* <Button
                title="Submit"
                disabled={  !image || !title || !fullName || !location  || !mobile || !service }
                onPress={() => createTolet()}  
            /> */}
             <View style={{ paddingTop: 25, width:"100%" }}>
              <SubmitButton
                title="Submit"
                loading={loading}
                handleSubmit={handleSubmit}
              />
            </View>
            



               
           </View>
       </FormContainer>



        {/* <View style={{ flex: 1, justifyContent:"center",alignItems:"center" }}>
          <Text  style={{ paddingTop: 90 }}>
            PASTE WEBSITE URL
          </Text>
        </View>

        {/* {urlPreview.success && (
          <View
            style={{
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <PreviewCard {...urlPreview} />
          </View>
        )} 

        <View style={{ paddingTop: 25 }}>
          <SubmitButton
            title="Submit"
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </View> */}

        {/* <Text>{JSON.stringify(urlPreview, null, 4)}</Text> */}
      </ScrollView>

      {/* <FooterTabs /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    Container: {
     flex:1,
     marginTop:120,
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

export default PostLink;