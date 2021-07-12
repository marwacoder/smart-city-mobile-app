import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import {Card, CardItem, Icon, Grid, Col} from 'native-base'
import { COLORS } from '../../constants';



const  Places =({navigation})=> {
    const [places, setPlace] = React.useState([
        {id: 1, title: 'Setinsoft Solutions', subTitle: '22, Nasarawa Calabar'},
        {id: 2, title: 'Yustech Solutions', subTitle: '13, Pama, Kadauna'},
        {id:3, title: 'Expedient Tech', subTitle: '19, crecent Road, Abuja'}
    ])

    const [visited, setvisited] = React.useState([
        {subTitle: '22, Nasarawa Calabar'},
        {subTitle: '19, crecent Road, Abuja'},
        {subTitle: '19, crecent Road, Abuja'}
    ])
    const {width, height} = Dimensions.get('window');


    const deleteRow = ( rowKey) => {
        const newData = [...places];
        const prevData = places.findIndex(item => item.id === rowKey);
        newData.splice(prevData, 1);
        setPlace(newData);
      };
    console.log(places,'places')
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <Card style={{borderRadius: 10, marginVertical: 10}}>
            <View style={styles.cardWrapper}>
            
              <Text style={{color: '#E04F5B', fontWeight: 'bold'}}>Drop Location</Text>
              <Icon name="close" size={25} type="MaterialIcons" />

            </View>
            <View style={{marginVertical: 20, marginHorizontal: 20}}>
            <Card style={{borderRadius: 10}}>
          <TouchableOpacity style={styles.search}>
            <View style={styles.inputWrapper}>
              <View style={styles.redDot} />
              <View>
                <Text style={styles.inputTex}>Where are you going?</Text>
              </View>
            </View>
            <View>
              <Icon name="heart-o" type="FontAwesome" style={{color: COLORS.gray}}/>
            </View>
          </TouchableOpacity>
          
          </Card>
          <View style={styles.cardWrapper}>
              <View style={{flexDirection: 'row'}}>
              
              <Icon name="place" size={25} type="MaterialIcons" style={{color: '#E04F5B'}}/>
              <Text style={{color: COLORS.gray, position: 'relative'}}>Tab to elect from map</Text>
              </View>
            <View >
                <Card style={styles.fabIcon}>
                    <TouchableOpacity onPress={()=> navigation.navigate('taxiBooking')}>
                <Icon name="arrow-forward" size={25} type="MaterialIcons" style={{color: COLORS.white}}/>
                </TouchableOpacity>
                </Card>
              
              </View>

            </View>
          </View>
          </Card>

          <View style={styles.favPlaceWrapper}>
                <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 15}}>Favourite Places</Text>
            <View >
                {places.map((place, index)=>(
                    <View key={index} style={styles.placesWrapper}>
                    <View  style={styles.places}>
                    <Icon name="heart"  type="FontAwesome" style={{color: '#0ddda2', marginRight: 10, fontSize: 25}}/>
                    <View>
                        <Text style={{fontWeight: 'bold'}}>{place.title}</Text>
                    <Text style={{color: COLORS.gray}}>{place.subTitle}</Text>
                    </View>
                    </View>
                    <TouchableOpacity onPress={()=> deleteRow( place.id)}>
                    <Icon name="remove-circle-outline"  type='MaterialIcons' style={{color: '#E04F5B', marginRight: 10, fontSize: 25}}/>

                    </TouchableOpacity>

                    </View>
                ))}
            </View>
            </View>
            <View style={styles.favPlaceWrapper}>
                <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 15}}>Recently Visited Places</Text>
            <View >
                {visited.map((place, index)=>(
                    <View key={index} style={styles.placesWrapper}>
                    <View key={index} style={styles.places}>
                    <Icon name="clock-time-three"  type='MaterialCommunityIcons' style={{color: COLORS.grey, marginRight: 10, fontSize: 25}}/>
                    <View>
                    <Text style={{color: COLORS.gray}}>{place.subTitle}</Text>
                    </View>
                    </View>

                    </View>
                ))}
            </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 30,
        backgroundColor: COLORS.white
      },
    cardWrapper: {
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    search: {
        marginVertical: 0,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 20,
        shadowOpacity: 0.9,
      },
      inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      redDot: {
        width: 10,
        height: 10,
        backgroundColor: '#E04F5B',
        borderRadius: 10,
        marginRight: 10,
      },
      inputTex: {
        fontWeight: '600',
        color: '#8b8d96',
      },
      fabIcon:{
          borderRadius: 30,
          width: 50,
          height: 50,
          backgroundColor: COLORS.black,
          justifyContent: 'center',
          alignItems: 'center'
      },
      favPlaceWrapper:{
          marginVertical: 30,
          marginHorizontal: 20
      },
      places:{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 7
      },
      placesWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }

      
})
export default Places;
