import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button} from 'native-base';
import {COLORS, icons} from '../../constants/';



import PaymentButton from '../Payment';

const DetailsScreen = ({navigation, route}) => {
  const [showPayment, setShowPayment] = React.useState(false);
  const rooms = route.params;
  return (
    <View>
      {showPayment && <PaymentButton  setShowPayment={setShowPayment} amount={rooms.price} billingEmail={'setinsoft@gmail.com'} billingMobile={'08034074748'} billingName={'Jibril Mohammed'}/>}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: COLORS.white,
          paddingBottom: 20,
        }}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="rgba(0,0,0,0)"
        />
        <ImageBackground style={style.headerImage} source={rooms.image}>
          <View style={style.header}>
            <icons.MaterialIcons
              name="arrow-back-ios"
            
              size={28}
              color={COLORS.white}
              onPress={navigation.goBack}
            />
            <icons.MaterialIcons
              name="bookmark-border"
            
              size={28}
              color={COLORS.white}
            />
          </View>
        </ImageBackground>
        <View>
          <View style={style.iconContainer}>
            <icons.MaterialIcons
              name="place"
            
              color={COLORS.white}
              size={28}
            />
          </View>
          <View style={{marginTop: 20, paddingHorizontal: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{rooms.name}</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color:
                  rooms.status === 'Available'
                    ? COLORS.green
                    : rooms.status === 'Occupied'
                    ? COLORS.red
                    : COLORS.yellow,
                marginTop: 5,
              }}>
              {rooms.status}
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <icons.MaterialIcons
                    name="star"
                    size={20}
                    style={style.icon}
                  />
                  <icons.MaterialIcons
                    name="star"
                    size={20}
                    style={style.icon}
                  />
                  <icons.MaterialIcons
                    name="star"
                    size={20}
                    style={style.icon}
                  />
                  <icons.MaterialIcons
                    name="star"
                    size={20}
                    style={style.icon}
                  />
                  <icons.MaterialIcons
                    name="star"
                    size={20}
                    style={{color: COLORS.grey}}
                  />
                </View>
                <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 5}}>
                  4.0
                </Text>
              </View>
              <Text style={{fontSize: 13, color: COLORS.grey}}>365reviews</Text>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{lineHeight: 20, color: COLORS.grey}}>
                {rooms.description}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 20,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Price per night
            </Text>
            <View style={style.priceTag}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.grey,
                  marginLeft: 5,
                }}>
                ${rooms.price}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.grey,
                  marginLeft: 5,
                }}>
                +breakfast
              </Text>
            </View>
          </View>

          <Button full style={style.btn} onPress={() => setShowPayment(true)}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
              Book Now
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.hot_secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  icon: {
    color: COLORS.orange,
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.hot_primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
});

export default DetailsScreen;
