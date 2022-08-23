import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen, {
  screenOptions as LoginScreenOptions,
} from "../screens/app/LoginScreen";
import RegisterScreen from "../screens/app/RegisterScreen";
import InputOtpScreen from "../screens/app/InputOtpScreen";
import EditProfileScreen from '../screens/app/EditProfileScreen';



const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
             <Stack.Screen 
                name='Login'
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
             <Stack.Screen 
                name='Resigter'
                component={RegisterScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='otp'
                component={InputOtpScreen}
                options={{
                    headerShown: false,
                }}
            />


            <Stack.Screen 
                name='EditProfile'
                component={EditProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}