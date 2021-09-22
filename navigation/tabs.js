import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Svg, {Path} from 'react-native-svg';
import {isIphoneX} from 'react-native-iphone-x-helper';

import {
  RestaurantHome,
  AddMenu,
  Search_Screen,
  User_Screen,
  Business,
  Home,
  Hotel_Home,
  AdminRooms,
  AirlineHome,
  AddFlight,
  Room_Screen,
  Rooms,
  AddApartment,
  Apartment,
  Login
} from '../app/screens/';

import {COLORS, icons} from '../app/constants';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: COLORS.white,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = props => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: COLORS.white,
          }}></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

const RestaurantTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <Tab.Screen
        name="Restaurant"
        component={RestaurantHome}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.cutlery}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.orange : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Like"
        component={RestaurantHome}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.like}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.orange : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="User"
        component={AddMenu}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.admin_with_cogwheels}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.orange : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const HotelTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <Tab.Screen
        name="Hotel"
        component={Rooms}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home"
              size={25}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search_Screen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="User"
        component={User_Screen}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="user-circle"
              size={25}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Admin"
        component={AdminRooms}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.admin_with_cogwheels}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const ApartmentTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <Tab.Screen
        name="Hotel"
        component={Apartment}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home"
              size={25}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search_Screen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="User"
        component={User_Screen}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="user-circle"
              size={25}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Admin"
        component={AddApartment}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.admin_with_cogwheels}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};
const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home"
              type="Ionicons"
              size={25}
              style={{
               
                color: focused ? '#eab308' : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    
     

     
      <Tab.Screen
        name="Admin"
        component={Business}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.admin_with_cogwheels}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#eab308' : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
    
  );
};
const FlightTrainTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <Tab.Screen
        name="Airline"
        component={AirlineHome}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home"
              size={25}
              style={{
                color: focused ? '#eab308' : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search_Screen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#eab308' : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="User"
        component={User_Screen}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="user-circle"
              size={25}
              style={{
                color: focused ? '#eab308' : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Admin"
        component={AddFlight}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.admin_with_cogwheels}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#eab308' : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

module.exports = {RestaurantTabs, HomeTabs, HotelTabs, FlightTrainTabs, ApartmentTabs};
