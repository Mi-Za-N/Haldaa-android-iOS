import React, { useEffect , useState,useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormContainer from '../../components/UI/FormContainer';
import Input from '../../components/UI/Input';
import Error from "../../components/UI/Error";
import EasyButton from "../../components/UI/EasyButton";
import Colors from "../../constants/Colors";
import Toast from "react-native-toast-message";
import AuthGlobal from "../../contexts/auth/store/AuthGlobal";
import { loginUser } from "../../contexts/auth/actions/Auth.actions";
import { useAppState, useAppDispatch 
} from "../../contexts/app/app.provider";
import axios  from "axios";
import {baseURL} from "../../../BaseUrl";




const Login = (props) => {
  const context = useContext(AuthGlobal);
  const isLogin = useAppState("isLogin");
  // console.log(context.stateUser);
  const [email, setEmail] = useState("mizan.softdev@gmail.com");
  const [password, setPassword] = useState("12255889");
  const [error, setError] = useState("");
  // console.log(email);

  const dispatch = useAppDispatch();

    



     useEffect(() => {
     AsyncStorage.getItem("email")
     .then((res) => {
         setEmail(res)
     })
     .catch((error) => console.log(error))

    }, [])

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("home");
    }
  }, [context.stateUser.isAuthenticated]);


  const handleSubmit = () => {
    dispatch({ type: 'IS_LOGIN', payload: true});
    const user = {
      email,
      password,
    };
    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };


  return (
    <FormContainer>
      {/* <Image style={{width:"100%", resizeMode:"stretch"}} source={require('../../../assets/logo.png')} /> */}
        <View style={styles.label}>
      <Text style={{ fontWeight: "bold", fontSize: 20}}>Welcome Back</Text>
        </View>
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        keyboardType={"numeric"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton
        large
        primary
        onPress={handleSubmit}               
        >
        <Text style={styles.buttonText}>Login</Text>
        </EasyButton>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <TouchableOpacity 
           onPress={() => props.navigation.navigate("Resigter")}
          >
        <Text style={styles.middleText}>Don't have an account yet?
           <Text style={{ marginTop: 40, color: Colors.secondary}}>Register</Text>
        </Text>
 
      </TouchableOpacity>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
  Container: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 100,
    paddingVertical: 9,
    marginHorizontal: 10,
    marginVertical:15
  },
  placeOrder: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
   label: {
        width: "90%",
        marginTop: 10
    },
});

export default Login;

