import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CartProvider } from '../context/CartContext';
import { CartScreen } from '../screens/CartScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { ProductListScreen } from '../screens/ProductListScreen';
import { RootStackParamList, RootTabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const ShopStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Products' }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <Tab.Navigator>
          <Tab.Screen
            name="Shop"
            component={ShopStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: 'Shopping Cart' }}
          />
        </Tab.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
};
