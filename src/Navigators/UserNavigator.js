import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import UserProfileScreen, {
  screenOptions as UserProfileScreenOptions,
}  from '../screens/app/UserProfileScreen';
import PostAd from "../screens/app/PostAd";



const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='profile'
                component={UserProfileScreen}
                options={UserProfileScreenOptions}
            />
             <Stack.Screen 
                name='PostAd'
                component={PostAd}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}