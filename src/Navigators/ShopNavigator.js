import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

// import RentScreen from "../screens/app/RentScreen";

import ProductOverView, {
  screenOptions as ProductOverViewOptions,
} from "../screens/shop/ProductOverView";
import CategoryScreen from "../screens/shop/CategoryScreen";
import ProductScreen , {
  screenOptions as ProductDetailOptions,
} from "../screens/shop/ProductScreen";
import CheckoutScreen , {
  screenOptions as CheckoutDetailOptions,
} from "../screens/shop/CheckoutScreen";
import ConfirmScreen , {
  screenOptions as ConfirmScreenOptions,
} from "../screens/shop/ConfirmScreen";



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
                name="ProductOverView"
                component={ProductOverView}
                options={ProductOverViewOptions}
                    
                //     {
                //     headerShown: false
                // }
            
            />
            <Stack.Screen 
                name="ProductScreen"
                component={ProductScreen}
                options={ProductDetailOptions}
                // options={{
                //     headerShown: false
                // }}
            />
            <Stack.Screen 
                name="Category"
                component={CategoryScreen}
                options={{
                    headerShown: false
                }}
            />
              <Stack.Screen 
                name="Checkout"
                component={CheckoutScreen}
                // options={{
                //     headerShown: false
                // }}
            />

           <Stack.Screen 
                name="confirm"
                component={ConfirmScreen}
                // options={{
                //     headerShown: false
                // }}
            />
        </Stack.Navigator>
    )
}

export default function ShopNavigator() {
    return <MyStack />
}