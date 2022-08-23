import React,{ useState} from 'react';
import { View, Text,ScrollView, StyleSheet,Button } from 'react-native';
import Error from "../../components/UI/Error";

import FormContainer from "../../components/UI/FormContainer";
import Input from "../../components/UI/Input";
import EasyButton from "../../components/UI/EasyButton";

const MainFeature = (props) => {
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
    const [additionalExpense,setAdditionalExpense] = useState();
    const [err, setError] = useState();

    
    const goImgFeature = () => {
        // if (
        //     rooms == undefined ||
        //     floor == undefined ||
        //     roomHeigh == undefined ||
        //     volume == undefined ||
        //     bathRooms == undefined ||
        //     bed == undefined ||
        //     netRent == undefined ||
        //     additionalExpense == undefined
        // ) {
        //     setError("Please fill in the form correctly")
        // }


      const mf ={
        rooms,
        floor,
        livingSpace,
        floorSpace,
        roomHeigh,
        volume,
        bathRooms,
        bed,
        yearBuild,
        yearBuild2,
        netRent,
        additionalExpense

      }
        props.navigation.navigate("ImageDes", { main:mf });
      
    }


  return (
       <ScrollView style={{backgroundColor: "white", marginTop: 5}}>
       <FormContainer title="Add Product">
    <View style={{flex:1,justifyContent:"center"}}>
        <Text style={{ fontWeight: "bold"}}>Main Feature</Text>
    </View>
      <View style={styles.row}>
        <View style={styles.inputWrap}>
          <Text style={styles.label}>*No of rooms in flat</Text>
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
         <Text style={styles.label}>*Floor No ie:5th</Text>
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
             <Text style={styles.label}>living space</Text>
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
           <Text style={styles.label}>Floor Space</Text>
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
            <Text style={styles.label}>Room Height</Text>
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
             <Text style={styles.label}>*volume: Sq:Ft</Text>
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
              <Text style={styles.label}>*No of Bath</Text>
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
             <Text style={styles.label}>*No of Bed</Text>
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
            <Text style={styles.label}>Build year start</Text>
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
             <Text style={styles.label}>Build year end</Text>
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
              <Text style={styles.label}>*Net Rent</Text>
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
             <Text style={styles.label}>*Extra Cost  i.e:gas,lift</Text>
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
        {err ? <Error message={err} /> : null}
       </FormContainer>
        <View style={styles.buttonContainer}>
                 <Button
                    title="Next"
                    disabled={!additionalExpense || !bathRooms || !bed || !netRent}
                    onPress={() => goImgFeature()}  
                  />
           </View>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: { 
    fontSize:12, 
    color:"gray", 
    fontWeight:"bold", 
    marginHorizontal:5
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

export default MainFeature;