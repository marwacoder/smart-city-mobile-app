import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions , Image, Animated} from 'react-native'
import {Icon, Grid, Col,Row, Box, Button } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import {COLORS, SIZES, FONTS, icons, images} from '../../constants'
import PaymentButton from '../Payment';

const {width, height} = Dimensions.get('window')
const cardWidth = width / 1.8;


const tour = [{id: '1', image: images.hikingWoman}, {id: '2',image: images.womanPhoto}]
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#F1F1F1',
        marginHorizontal: 20,
        marginVertical: 10
    },
    iconWrapper:{
        width: 15,
        height: 15,
        borderRadius: 15,
        borderWidth: 3, 
        borderColor: COLORS.black,
        backgroundColor: COLORS.white,
        marginVertical: 10
    },
    dot: {
        fontSize: 30, 
        color: COLORS.grey, 
        marginTop: -10,
    },
    rowspacebetween: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignContent:'center',
    },
    btn:{
        backgroundColor: COLORS.black,
       
        borderRadius: 10,
        paddingHorizontal: Dimensions.get('window').width / 50,
        height: 55,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        
    },
    title: {
        
        fontWeight: 'bold',
        fontSize: SIZES.h3
    },
    headerWrapper:{
        justifyContent:'space-between', 
        flexDirection: 'row',
        marginVertical: 15
    },
    location:{
        backgroundColor: COLORS.white,
        borderRadius: 15,
        marginVertical: 20
    },
    info:{
        backgroundColor: COLORS.white,
        borderRadius: 15, 
    },
    card: {
        height: 230,
        width: Dimensions.get('screen').width / 1.25 ,
        borderRadius: 15,
        
      },
      cardImage: {
        height: height /4,
        width: '100%',
        borderRadius: 15
      },
      cardOverLay: {
        height: 280,
        backgroundColor: COLORS.white,
        position: 'absolute',
        zIndex: 100,
        width: Dimensions.get('screen').width,
        borderRadius: 15,
      },
      
      
      
})

export default function CheckOut({route,navigation}) {

  const {selectedIndex} = route.params
  const [showPayment, setShowPayment] = React.useState(false);
    const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const Card = ({image, index}) => {
    const inputRange = [
      (index - 1) * Dimensions.get('screen').width,
      index * Dimensions.get('screen').width,
      (index + 1) * Dimensions.get('screen').width,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}>
        <Animated.View style={{...styles.card, transform: [{scale}]}}>
          <Animated.View style={{...styles.cardOverLay, opacity}} />
          <TouchableOpacity>
               <Image source={image.image} style={styles.cardImage} />
          </TouchableOpacity>
         
         
        </Animated.View>
      </TouchableOpacity>
    );
  };
  
    return (
        <View style={styles.container}>
          {showPayment && 
            <PaymentButton setShowPayment={setShowPayment} showPayment={showPayment} route='flightCheckoutInfo' amount={'2000'}
            billingEmail={'setinsoft@gmail.com'} billingMobile={'08034074748'} billingName={'Jibril Mohammed'}/>}
           <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <MaterialCommunityIcons size={25}  name='keyboard-backspace' 
            />
            
          </TouchableOpacity>
          <Text style={styles.title}>Checkout</Text>
          <MaterialIcons name='help-outline' size={25}/>
            </View>
            
            <View style={styles.location}>
            <View style={[styles.rowspacebetween,{marginHorizontal: 30,marginVertical: 20}]}>
                <View style={styles.iconWrapper}/>
                <Text style={styles.dot}>...............{selectedIndex == 0 ? <SimpleLineIcons name='plane' size={25} />
               : <Image  source={icons.train} style={{width: 25, height: 25}}/>}...............</Text>
                <View style={styles.iconWrapper}/>
            </View>
            <View style={[styles.rowspacebetween,{marginHorizontal: 30, marginBottom: 20}]}>
                    <View >
                    <Text style={{...FONTS.h3}}>San Francisco</Text>
                    <Text style={{color: COLORS.grey, ...FONTS.h4}}>5 may, 19:15</Text>
                    </View>
                    <View>
                    <Text style={{...FONTS.h3, textAlign: 'right'}}>London</Text>
                    <Text style={{color: COLORS.grey, ...FONTS.h4}}>6 may, 13:45</Text>
                    </View>
                </View>
            </View>
            <View style={styles.info}>
               
                    <View style={[styles.rowspacebetween,{marginHorizontal: 30,marginVertical: 20}]}>
                        <Text style={{...FONTS.h4, color: COLORS.grey}}>Full Name</Text>
                        <Text style={{...FONTS.h4}}>Jibril Mohammed</Text>
                    </View>
                    <View style={{marginHorizontal: 10}}><Box /></View>
                    
                    <View style={[styles.rowspacebetween,{marginHorizontal: 30,marginVertical: 20}]}>
                        <Text style={{...FONTS.h4, color: COLORS.grey}}>Passport ID</Text>
                        <Text style={{...FONTS.h4}}>31995889</Text>
                    </View>
                    <View style={{marginHorizontal: 10}}><Box /></View>
                    <View style={[styles.rowspacebetween,{marginHorizontal: 30,marginVertical: 20}]}>
                        <Text style={{...FONTS.h4, color: COLORS.grey}}>Date of birth</Text>
                        <Text style={{...FONTS.h4}}>April, 12 1993</Text>
                    </View>
            </View>
            <View><Text style={{...FONTS.h3, fontWeight: 'bold', marginVertical: 25}}>Payment Method</Text></View>
            <View>
          <Animated.FlatList
            onMomentumScrollEnd={e => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / Dimensions.get('screen').width),
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            horizontal
            data={tour}
            contentContainerStyle={{
              
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <Card image={item} index={index} />}
            snapToInterval={Dimensions.get('screen').width}
          />
        </View>
        <Button full style={styles.btn} 
          onPress={()=> navigation.navigate('flightCheckoutInfo',{'selectedIndex': selectedIndex})}
        >
                   <View style={styles.rowspacebetween}>
                   <Text
              style={{fontSize: 20, fontWeight: 'bold',marginHorizontal: 50, color: COLORS.white}}>
              Confirm Payment
            </Text>
            <Text style={{color: COLORS.grey, fontSize: SIZES.h3, }}>$512</Text>
            <Ionicons  name='md-chevron-forward-sharp' size={25} color='white'/>
                   </View>
            
          </Button>
        </View>
    )
}
