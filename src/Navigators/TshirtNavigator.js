import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

// import RentScreen from "../screens/app/RentScreen";

import TshirtDesignScreen, {
  screenOptions as TshirtDesignScreenOptions,
} from "../screens/app/TshirtDesignScreen";
// import RentDetailScreen from "../screens/app/RentDetailScreen";
// import TopBarRentNavigators from "./TopBarRentNavigators";


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
                name="Tshirt Design"
                component={TshirtDesignScreen}
                options={TshirtDesignScreenOptions}
                    
                //     {
                //     headerShown: false
                // }
            
            />
            {/* <Stack.Screen 
                name="TopRent"
                component={TopBarRentNavigators}
                options={{
                    headerShown: false
                }}
            /> */}
            {/* <Stack.Screen 
                name="RentDetails"
                component={RentDetailScreen}
                options={{
                    headerShown: false
                }}
            /> */}
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}