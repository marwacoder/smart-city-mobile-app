import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Text} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import {images, COLORS, FONTS, SIZES, icons} from '../constants/';

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
};

const OptionItem = ({bgColor, icon, label, onPress}) => {
  return (
    <TouchableOpacity
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      onPress={onPress}>
      <View style={[styles.shadow, {width: 60, height: 60}]}>
        <LinearGradient
          style={[
            {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              backgroundColor: 'red',
            },
          ]}
          colors={bgColor}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <Image
            source={icon}
            resizeMode="cover"
            style={{
              tintColor: COLORS.white,
              width: 30,
              height: 30,
            }}
          />
        </LinearGradient>
        
      </View>
      <Text
        style={{marginTop: SIZES.base, color: COLORS.res_grey, ...FONTS.body3}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          marginTop: SIZES.base,
          paddingHorizontal: SIZES.padding,
        }}>
        <Image
          source={images.homeBanner}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 15,
            zIndex: -1,
          }}
        />
      </View>

      {/* Options */}
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.base,
          }}>
          <OptionItem
            icon={icons.airplane}
            bgColor={['#46aeff', '#5884ff']}
            label="Flight"
            onPress={() => {
              navigation.navigate('Airline');
            }}
          />
          <OptionItem
            icon={icons.train}
            bgColor={['#fddf90', '#fcda13']}
            label="Train"
            onPress={() => {
              navigation.navigate('Train');
            }}
          />
          <OptionItem
            icon={icons.bus}
            bgColor={['#e973ad', '#da5df2']}
            label="Bus"
            onPress={() => {
              console.log('Bus');
            }}
          />
          <OptionItem
            icon={icons.taxi}
            bgColor={['#fcaba8', '#fe6bba']}
            label="Taxi"
            onPress={() => {
              navigation.navigate('taxiHome');
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.base,
          }}>
          <OptionItem
            icon={icons.bed}
            bgColor={['#ffc465', '#ff9c5f']}
            label="Hotel"
            onPress={() => navigation.navigate('HotelTabs')}
          />
          <OptionItem
            icon={icons.eat}
            bgColor={['#7cf1fb', '#4ebefd']}
            label="Eats"
            onPress={() => navigation.navigate('restaurants')}
          />
          <OptionItem
            icon={icons.compass}
            bgColor={['#7be993', '#46caaf']}
            label="Adventure"
            onPress={() => {
              navigation.navigate('placesHome')
            }}
          />
          <OptionItem
            icon={icons.event}
            bgColor={['#fca397', '#fc7b6c']}
            label="Event"
            onPress={() => {
              console.log('Event');
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Home;
