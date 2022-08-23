import React,{ useState, useEffect,useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios  from "axios";
import {baseURL} from "../../../BaseUrl";
import  Colors  from '../../constants/Colors';
import PopUpModal from "../../components/app/PopUpModal";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButtons";
import Banner from "../../components/UI/Banner";
import TitleCard from "../../components/UI/TitleCard";
import Icon from "react-native-vector-icons/Ionicons";

const Dashboard = (props) => {
      const context = useContext(AuthGlobal)
      const dispatch = useAppDispatch();
      const [token, setToken] = useState();
      const [error, setError] = useState(false)
      const [loading, setLoading] = useState(true);
      const [isAddMode, setIsAddMode] = useState(false);

  const cancelModal = () => {
      setIsAddMode(false);
    };

    const openModal = () => {
      setIsAddMode(true)
    }

        useEffect(() => {
      if(!context.stateUser.isAuthenticated){
        setTimeout(() => {
          openModal();
          }, 4000);
      }
    },[context.stateUser.isAuthenticated]);

     useEffect(() => {
      AsyncStorage.getItem("jwt")
      .then((res) => {
          setToken(res)
      })
      .catch((error) => console.log(error))

      fetch(`${baseURL}api/events`, {
        method: "get",
        headers: { 
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then((res) => res.json())
        .then((data) =>{
          setLoading(false);
          dispatch({ type: 'SAVE_FEATURED_DATA', payload: data.filter(sp => sp.isFeatured === true)});

          dispatch({ type: 'SAVE_EVENTS', payload: data});
        }).catch((error) => {
        setError(true)
      });

     fetch(`${baseURL}api/tolets`, {
        method: "get",
        headers: { 
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then((res) => res.json())
        .then((data) =>{
          setLoading(false);
          dispatch({ type: 'SAVE_TOLETS', payload: data});
        }).catch((error) => {
        setError(true)
      });

     fetch(`${baseURL}api/tutors`, {
        method: "get",
        headers: { 
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then((res) => res.json())
        .then((data) =>{
          setLoading(false);
          dispatch({ type: 'SAVE_TUTORS', payload: data});
        }).catch((error) => {
        setError(true)
      });

      fetch(`${baseURL}api/rents`, {
        method: "get",
        headers: { 
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then((res) => res.json())
        .then((data) =>{
          setLoading(false);
          dispatch({ type: 'SAVE_RENTS', payload: data});
        }).catch((error) => {
        setError(true)
      });

    axios.get(`${baseURL}api/tuitions`)
      .then((res) => {
        dispatch({ type: 'SAVE_TUTION', payload: res.data});
      })
      .catch((error) => {
        console.log('Api call error');
         setError(true)
      });

    axios.get(`${baseURL}api/districs`)
      .then((res) => {
        dispatch({ type: 'SAVE_DISTRICS', payload: res.data});
        // setDistrics(res.data);
      })
      .catch((error) => {
        console.log('Api call error');
        //  setError(true)
      });

      axios.get(`${baseURL}api/courses`)
      .then((res) => {
        dispatch({ type: 'SAVE_COURSES', payload: res.data});
      })
      .catch((error) => {
        console.log('Api call error');
        //  setError(true)
      });


    axios.get(`${baseURL}api/events/${context.stateUser.user.id}`)
      .then((res) => {
        dispatch({ type: 'SAVE_USER_PROPERTY', payload: res.data});
      })
      .catch((error) => {
        console.log('Api call error');
         setError(true)
      });

    axios.get(`${baseURL}api/tolets/${context.stateUser.user.id}`)
      .then((res) => {
        dispatch({ type: 'SAVE_USER_TOLET', payload: res.data});
      })
      .catch((error) => {
        console.log('Api call error');
         setError(true)
      });


    // fetch(`${baseURL}api/events/${context.stateUser.user.id}`, {
    //     method: "get", 
    //     headers: { 
    //       "Content-type": "application/json",
    //       "Authorization": `Bearer ${token}`
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((data) =>{
    //       setLoading(false);  
    //       dispatch({ type: 'SAVE_USER_EVENT', payload: data});
    //     }).catch((error) => {
    //     setError(true)
    //   });
    }, [])


     if (loading) {
        return (
          <View style={{flex:1, justifyContent: "center",alignItems: "center"}}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        );
      }




  let TouchableComp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  return (
    <>
    {/* <TitleCard text='Sponsored by'/>
    <Banner /> */}
    
    <ScrollView style={{backgroundColor: "white"}}>
    <View style={{flexDirection:"row", backgroundColor: "white"}}>
      <View style={styles.GridItem}>
      <TouchableComp style={{ flex: 1 }} 
       onPress={() => { props.navigation.navigate("TutorScreen")}} >
        <View style={{ ...styles.container, ...{ backgroundColor: "#f5a445" } }}>
        <Image source={{ uri: "https://funwithtutors.com/wp-content/uploads/2021/03/cropped-Fun_with_Tutors_logo_big-removebg-preview-1.png"}}
            style={ styles.ImgContainer}/>
          <Text style={styles.title} numberOfLines={2}>
            Tutors
          </Text>
        </View>
      </TouchableComp>
    </View>
      <View style={styles.GridItem}>
        <TouchableComp style={{ flex: 1 }}
        onPress={() => { props.navigation.navigate("Tuition")}} >
          <View style={{ ...styles.container, ...{ backgroundColor: "#f3d149"}}}>
          <Image source={{ uri: "http://maryimmaculateschool.org/wp-content/uploads/2018/05/TUITION03-380x380.png"}}
              style={ styles.ImgContainer}/>
            <Text style={styles.title} numberOfLines={2}>
              Tuitions
            </Text>
          </View>
        </TouchableComp>
      </View>
    </View>

    <View style={{flexDirection:"row",}}>
      <View style={styles.GridItem}>
      <TouchableComp style={{ flex: 1 }} 
        onPress={() => { props.navigation.navigate("Courses")}} >
        <View style={{ ...styles.container, ...{ backgroundColor: "#b9ffb0"}}}>
        <Image source={{ uri: "https://www.questpond.com/img/2.png"}}
            style={ styles.ImgContainer}/>
          <Text style={styles.title} numberOfLines={2}>
            Courses
          </Text>
        </View>
      </TouchableComp>
      </View>
      <View style={styles.GridItem}>
        <TouchableComp style={{ flex: 1 }}
         onPress={() => { props.navigation.navigate("Sublet")}} >
          <View style={{ ...styles.container, ...{ backgroundColor: "#47fced"}}}>
          <Image source={{ uri: "https://cdn.dribbble.com/users/124813/screenshots/2943896/media/04b6cfbfa3b08b61b58b884cef914f52.png"}}
              style={ styles.ImgContainer}/>
            <Text style={styles.title} numberOfLines={2}>
              Sublet
            </Text>
          </View>
        </TouchableComp>
      </View>

      
    </View>
    
       <View style={{flexDirection:"row",}}>
          <View style={styles.GridItem}>
          <TouchableComp style={{ flex: 1 }} 
            onPress={() => { props.navigation.navigate("Haldaa Store")}}
              >
            <View style={{ ...styles.mathContainer, ...{ backgroundColor: "#ff1493"}}}>
            <Image source={{ uri: "https://aptgadget.com/wp-content/uploads/2019/06/softwaare-for-online-shop.jpg"}}
                style={ styles.ImgContainerMath}/>
              <Text style={{
                  fontSize: 22,
                  fontWeight:"700",
                  color:"white"
                }} numberOfLines={2}>
                Haldaa Online Store
              </Text>
            </View>
            </TouchableComp>
          </View>
        </View>

     <View style={{flexDirection:"row",}}>
       <View style={styles.GridItem}>
        <TouchableComp style={{ flex: 1 }}
         onPress={() => { props.navigation.navigate("Flat Rent")}} >
          <View style={{ ...styles.container, ...{ backgroundColor: "#368dff"}}}>
          <Image source={{ uri: "https://cdn3.vectorstock.com/i/1000x1000/13/27/house-for-rent-flat-vector-20021327.jpg"}}
              style={ styles.ImgContainer}/>
            <Text style={styles.title} numberOfLines={2}>
              Flat Rent
            </Text>
          </View>
        </TouchableComp>
      </View>
      <View style={styles.GridItem}>
      <TouchableComp style={{ flex: 1 }}
       onPress={() => { props.navigation.navigate("Flat Sale")}} >
        <View style={{ ...styles.container, ...{ backgroundColor: "#ffc7ff"}}}>
        <Image source={{ uri: "https://cdn4.vectorstock.com/i/1000x1000/62/68/house-for-sale-icon-selling-apartments-vector-30346268.jpg"}}
            style={ styles.ImgContainer}/>
          <Text style={styles.title} numberOfLines={2}>
            Flat Sale
          </Text>
        </View>
      </TouchableComp>
     </View>

      
      
    </View>

    <View style={{flexDirection:"row",}}>
      <View style={styles.GridItem}>
       <TouchableComp style={{ flex: 1 }} 
        onPress={() => { props.navigation.navigate("Tshirt-Design")}}>
        <View style={{ ...styles.container, ...{ backgroundColor: "#9eecff"}}}>
        <Image source={{ uri: "https://cdn5.vectorstock.com/i/1000x1000/92/29/creative-tee-shirt-symbol-drops-colors-logo-vector-22539229.jpg"}}
            style={ styles.ImgContainer}/>
          <Text style={styles.title} numberOfLines={2}>
            T-shirt Design
          </Text>
        </View>
        </TouchableComp>
       </View>
      <View style={styles.GridItem}>
        <TouchableComp style={{ flex: 1 }} 
        onPress={() => { props.navigation.navigate("Photo contest")}} >
          <View style={{ ...styles.container, ...{ backgroundColor: "#41d95d"}}}>
          <Image source={{ uri: "https://ics-seville.org/wp-content/uploads/2018/11/Photo-contest.jpg"}}
              style={ styles.ImgContainer}/>
            <Text style={styles.title} numberOfLines={2}>
              Photo Contest
            </Text>
          </View>
        </TouchableComp>
      </View>
    </View>

        
    
    {/* <PopUpModal
              visible={isAddMode}
              onCancel={cancelModal}
              onTutor={() => {
                // props.navigation.navigate("TutorScreen");
                cancelModal()
              }}
              onTuition={() => {
                 props.navigation.navigate("Tuition");
                cancelModal()
              }}
               onCourse={() => {
                 props.navigation.navigate("Courses");
                cancelModal()
              }}
              onContest={() => {
                 props.navigation.navigate("Photo contest");
                cancelModal()
              }}
              onDesign={() => {
                 props.navigation.navigate("Tshirt-Design");
                cancelModal()
              }}
              onRent={() => {
                 props.navigation.navigate("Flat Rent");
                cancelModal()
              }}
              onSublet={() => {
                 props.navigation.navigate("Sublet");
                cancelModal()
              }}
              onSale={() => {
                 props.navigation.navigate("Flat Sale");
                cancelModal()
              }}
             /> */}


    </ScrollView>
  </>
  );
};


export const screenOptions = (navData) => {
  return {
    headerTitle: "Halda BD",
    headerLeft: () => (
      <View style={{flex: 1,flexDirection: "row"}}>
      
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "menu-unfold" : "menu-unfold"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={{padding: 6}}
        onPress={() => navData.navigation.navigate("notification")}
      >
        <Icon name="notifications-circle-outline" color="white" size={32} />
      </TouchableOpacity>
    ),
  };
};


const styles = StyleSheet.create({
  GridItem: {
    flex: 1,
    margin: 10,
    height: 120,
    borderRadius: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    elevation: 5,
    backgroundColor:"white"
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  mathContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
   width:70,
   height:60
  },
  title: {
    fontSize: 19,
    textAlign: "right",
  },
  ImgContainer: {
    width:110, 
    height: 80, 
    resizeMode: 'contain',
    borderRadius: 10,
  },
  ImgContainerMath: {
    width: 220, 
    height: 80, 
    resizeMode: 'contain',
    borderRadius: 10,
  }

});

export default Dashboard;
