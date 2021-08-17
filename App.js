import React from 'react';
import {Image, TouchableOpacity, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider, extendTheme} from 'native-base'
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

// screens
import {
  Onboarding,
  Restaurants,
  Search_Screen,
  Room_Screen,
  Hotel_Home,
  Restaurant,
  Add_Business,
  AddRoom,
  Rooms,
  Taxi,
  Places,
  Booking,
  Dummy,
  BusinessLocation,
  AirlineHome,
  Flight,
  FlightSeat,
  FlightCheckout,
  FlightCheckoutInfo,
  HomePlaces,
  HomeTrain
} from './app/screens/index';
// extra screens
import { PersistGate } from 'redux-persist/integration/react';
navigator.geolocation = require('@react-native-community/geolocation');
import {RestaurantTabs, HomeTabs, HotelTabs, FlightTrainTabs} from './navigation/tabs';
import {COLORS} from './app/constants/';
import { Provider } from 'react-redux';
import {store, persistor} from './app/store/index'


const theme = extendTheme({
  colors: {
    // Add new color
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    blueGray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    gray:{
      200: '#e4e4e7'
    },
    yellow: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
    },
    singletons: {
      white: '#FFFFFF',
      black: '#000000',
      lightText: '#FFFFFF',
      darkText: '#27272a'
    },
    fontSizes: {
      xxs: 10,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
      '7xl': 72,
      '8xl': 96,
      '9xl': 128,
    },
    // Redefinig only one shade, rest of the color will remain same.
    
  },
  
});


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
         <NativeBaseProvider theme={theme}>
    <NavigationContainer >
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator initialRouteName={'Home'}>
        {/* Screens */}
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Restaurant"
          component={RestaurantTabs}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Eat"
          component={Restaurant}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="restaurants"
          component={Restaurants}
        />
        

        {/* Tabs */}
       
        <Stack.Screen
          name="Hotel"
          component={HotelTabs}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="Airport"
          component={FlightTrainTabs}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="Flight"
          component={Flight}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="flightSeat"
          component={FlightSeat}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="flightCheckout"
          component={FlightCheckout}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="Train"
          component={HomeTrain}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="flightCheckoutInfo"
          component={FlightCheckoutInfo}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="Taxi"
          component={Taxi}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="taxiPlaces"
          component={Places}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="taxiBooking"
          component={Booking}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="taxiDummy"
          component={Dummy}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="Search_Screen"
          component={Search_Screen}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="roomBookingScreen"
          component={Room_Screen}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="AddBusiness"
          component={Add_Business}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="AddRoom"
          component={AddRoom}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="businessLocation"
          component={BusinessLocation}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />

        {/* Placess */}
        {/* <Stack.Screen
          name="Home"
          component={HomePlaces}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        /> */}
        {/* Placess */}
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerShown: false,
            title: null,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
     </PersistGate>
   </Provider>
  );
};

export default () => {
  return <App />;
};
