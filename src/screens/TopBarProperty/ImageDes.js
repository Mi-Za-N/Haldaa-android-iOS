import React,{ useState,useEffect} from 'react';
import { View, Text,ScrollView,Image,TouchableOpacity, StyleSheet, Button } from 'react-native';
import * as ImagePicker from "expo-image-picker";

import FormContainer from "../../components/UI/FormContainer";
import Input from "../../components/UI/Input";
import Icon from "react-native-vector-icons/FontAwesome";
import TextArea from "../../components/UI/TextArea";
import EasyButton from "../../components/UI/EasyButton";

const ImageDes = (props) => {
  const mf = props.route.params ? props.route.params.main : "";
  // console.log(mf);
  const [picture,setPicture] = useState("https://www.myrentbd.com/media/com_jomclassifieds/items/11/Banani-Corner-Apartment-South-Facing-Flat-Rent_1_popup.jpg")
  const [video,setVideo] = useState()
  const [title,setTitle] = useState()
  const [location,setLocation] = useState()
  const [description,setDescription] = useState()

  // console.log(props.route.params);


  // useEffect(() => {
  //   if (props.route.params === undefined) {
  //     props.navigation.navigate("MainFeatur");
  //   }
  // }, [props.route.params]);


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

   const goContactInfo = () => {
    const info ={
        rooms: mf.rooms,
        floor: mf.floor,
        livingSpace: mf.livingSpace,
        floorSpace: mf.floorSpace,
        roomHeigh: mf.roomHeigh,
        volume: mf.volume,
        bathRooms: mf.bathRooms,
        bed: mf.bed,
        yearBuild: mf.yearBuild,
        yearBuild2: mf.yearBuild2,
        netRent: mf.netRent,
        additionalExpense: mf.additionalExpense,

          picture,
          video,
          title,
          location,
          description
      }
      props.navigation.navigate("ContactInfo", {info: info});
    }



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
   


  return (
       <ScrollView style={{backgroundColor: "white", marginTop: 5}}>
       <FormContainer title="Add Product">
           <View style={{flex:1,justifyContent:"center"}}>
              <Text style={{ fontWeight: "bold"}}>Image & Description</Text>
           </View>
           <View style={styles.imageContainer}>
               <Image style={styles.image} 
                 source={{uri: picture ? picture : "https://www.myrentbd.com/media/com_jomclassifieds/items/11/Banani-Corner-Apartment-South-Facing-Flat-Rent_1_popup.jpg"}}
               />
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
           </View>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Video link</Text>
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
            placeholder="Flat sale in Boshundra R/A"
            name="Title"
            id="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
           />
          <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Description</Text>
           </View>
          <TextArea
            placeholder={"Describe your flat details here"}
            name={"event des"}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Location</Text>
           </View>
          <Input 
            placeholder="Road no 4, Boshundra, Dhaka"
            name="location"
            id="location"
            value={location}
            onChangeText={(text) => setLocation(text)}
           />
       </FormContainer>
           <View style={styles.buttonContainer}>
              <Button
                title="Next"
                disabled={ !title || !description || !location}
                onPress={() => goContactInfo()}  
              />
           </View>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
        width: "90%",
        marginTop: 10
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
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems:"flex-end",
    margin: 30,
    },
  buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
});

export default ImageDes;