import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Box} from 'native-base';
import {COLORS, SIZES, FONTS, icons} from '../../../constants/';

import {rooms, hotels} from '../../../service/';

const {width} = Dimensions.get('screen');

const Rooms = ({navigation}) => {
  return (
    <SafeAreaView style={styles.roomsContainer}>
      <View style={styles.header}>
        <View style={{paddingBottom: 15}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>All </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}> </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: COLORS.orange,
              }}>
              Suites
            </Text>
          </View>
        </View>
        
      </View>
      <View style={styles.searchInputContainer}>
        <icons.FontAwesome name="search" size={30} style={{marginLeft: 20}} />
        <TextInput
          placeholder="Search"
          style={{fontSize: 20, paddingLeft: 10}}
        />
      </View>
      <ScrollView>
        <View style={{marginBottom: 80}}>
          {rooms.map((room, index) => (
            <TouchableOpacity
              style={styles.roomItem}
              key={index}
              onPress={() => navigation.navigate('roomBookingScreen', room)}>
              <Grid>
                <Col>
                  <Box>
                    <View style={{width: '100%'}}>
                      <Image
                        source={room.image}
                        resizeMode="cover"
                        style={{
                          width: '100%',
                          height: 150,
                          borderRadius: SIZES.radius,
                        }}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          height: 20,
                          width: '100%',
                          backgroundColor: COLORS.white,
                          borderTopRightRadius: SIZES.radius,
                          borderBottomLeftRadius: SIZES.radius,
                          alignItems: 'center',
                          justifyContent: 'center',
                          ...styles.shadow,
                        }}>
                        <Text style={{...FONTS.h4}}>Room {room.number}</Text>
                      </View>
                    </View>
                  </Box>
                </Col>
                <Col>
                  <Box style={{width: '100%'}}>
                    <Grid>
                      <Col>
                        <Text note style={{fontWeight: 'bold'}}>
                          Room {room.name}
                        </Text>
                        <Text note numberOfLines={3} style={{...FONTS.body4}}>
                          {room.description}
                        </Text>
                        <Text
                          style={{
                            color: COLORS.black,
                            ...FONTS.body3,
                            marginVertical: 10,
                          }}>
                          Max capacity{'  '}
                          <Text style={{color: COLORS.orange, ...FONTS.body4}}>
                            {room.maxCapacity}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: COLORS.black,
                            ...FONTS.body3,
                          }}>
                          Status{'  '}
                          <Text style={{color: COLORS.orange, ...FONTS.body4}}>
                            {room.status}
                          </Text>
                        </Text>
                      </Col>
                    </Grid>
                  </Box>
                </Col>
              </Grid>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  roomsContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 130,
    shadowRadius: 2,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginHorizontal: 20,
    marginVertical: 15,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomItem: {
    backgroundColor: '#fff',
    borderRadius: 5,

    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default Rooms;
