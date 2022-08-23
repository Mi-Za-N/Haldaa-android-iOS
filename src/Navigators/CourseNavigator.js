import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"


import CourseList, {
  screenOptions as CourseListOptions,
} from "../screens/course/CourseList";
import SingleCourse from "../screens/course/SingleCourse";
import PlayVideo from "../screens/course/PlayVideo";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "#006400" : "",
  },
//   headerTitleStyle: {
//     fontFamily: "open-sans-bold",
//   },
//   headerBackTitleStyle: {
//     fontFamily: "open-sans",
//   },
  headerTintColor: Platform.OS === "android" ? "white" : "red",
};


const Stack = createStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator screenOptions={defaultNavOptions}>
            <Stack.Screen 
                name="CourseHome"
                component={CourseList}
                options={CourseListOptions}
            
            />
            <Stack.Screen 
                name="Single Course"
                component={SingleCourse}
                // options={{
                //     headerShown: false
                // }}
            />
            <Stack.Screen 
                name="Play Video"
                component={PlayVideo}
                // options={{
                //     headerShown: false
                // }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}