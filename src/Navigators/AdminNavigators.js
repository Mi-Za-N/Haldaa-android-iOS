import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PropertyScreen from "../screens/admin/PropertScreen";
import ToletScreen from "../screens/admin/ToletScreen";
import TuitionScreen from "../screens/admin/TuitionScreen";
// import Categories from "../Screens/Admin/Categories"

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="adminProperty"
                component={PropertyScreen}
                options={{
                    title: "Property"
                }}
            />
            <Stack.Screen name="adminTolet" component={ToletScreen} />
            <Stack.Screen name="adminTuition" component={TuitionScreen} />
            {/* <Stack.Screen name="ProductForm" component={ProductForm} /> */}
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}