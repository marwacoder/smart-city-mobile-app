import React from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions ,ScrollView, SafeAreaView, Image} from 'react-native'
import {  Box, Button, Text } from 'native-base';
import {Grid, Col} from 'react-native-easy-grid'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import {COLORS, SIZES, FONTS, icons} from '../../constants'


const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#F1F1F1',
        marginHorizontal: 20,
        marginVertical: 10
    },
    btn: {
        height: 50,
        backgroundColor: COLORS.black,
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 100
      },
    iconWrapper:{
        width: 15,
        height: 15,
        borderRadius: 15,
        borderWidth: 3, 
        borderColor: COLORS.black,
        backgroundColor: COLORS.white,
        marginVertical: 40
    },
    dot: {
        fontSize: 30, 
        color: COLORS.grey, 
        marginTop: 20,
    },
    location:{
        marginHorizontal: 10,
        marginVertical: 20
    },
    roundTrip: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15
    },
    iconwap: {
        height: 30,
        width: 30,
        borderRadius: 50,
        borderColor: COLORS.black,
        borderWidth: 2,
        alignContent: 'center',
        alignItems: 'center',
    },
    round: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    date:{
        marginVertical: 20,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15
    },
    classPassenger: {
        marginVertical: 20,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15

    },
    rowspacebetween: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignContent:'center',
    },
    minus: {
        marginLeft: 85,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    plus:{
        alignContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        width: 50,
        height: 50,
        marginLeft: 5,
        backgroundColor: '#F1F1F1'
    }
    
})
export default function Flight({route,navigation}) {
    const {selectedIndex}= route.params
    const [passenger, setPassenger] = React.useState(1);

    const minusHandler =()=>{
        if(passenger != 1) {
            setPassenger(passenger - 1)
        }
    }
    const plusHandler =()=>{
        setPassenger( passenger + 1)
    }

    for(let i=0; i<width.length; i++){
        console.log('.')
    }

    return (
        <SafeAreaView>
            <ScrollView>
    <Box flex={1} mx={5} mt={5} bg='blueGray.100'>
            <View style={styles.rowspacebetween}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <MaterialCommunityIcons name='keyboard-backspace'
            size={25} />
          </TouchableOpacity>
            </View>
            <Box flexDirection='row' justifyContent='space-between' alignContent='center'>
                <View style={styles.iconWrapper}/>
                <Text style={styles.dot}>....................{selectedIndex == 0 ? <SimpleLineIcons name='plane' size={25} />
               : <Image  source={icons.train} style={{width: 25, height: 25}}/>}....................</Text>
                <View style={styles.iconWrapper}/>
            </Box>
            <View style={[styles.location,styles.rowspacebetween]}>
                <View >
                    <Text style={{fontWeight: 'bold', ...FONTS.body1}}>SFO</Text>
                    <Text style={{...FONTS.body4, color: COLORS.grey}}>San Francisco</Text>
                </View>
                <View>
                <Text style={{fontWeight: 'bold', ...FONTS.body1}}>LCY</Text>
                    <Text style={{...FONTS.body4, color: COLORS.grey}}>London</Text>
                </View>
            </View>
            <Box >
                <View style={[styles.roundTrip, styles.rowspacebetween]}>
                   <View style={styles.rowspacebetween}>
                   <View style={styles.iconwap}><AntDesign name='swap' size={25} my={1}/></View>
                    <View style={styles.round}><Text style={{fontWeight: 'bold', fontSize: SIZES.h4}}>Round Trip?</Text></View>
                   </View>
                   <TouchableOpacity>
                       <FontAwesome name='toggle-on' size={25} type='FontAwesome' />
                   </TouchableOpacity>
                    
                </View>   
                <View style={[styles.date, styles.rowspacebetween]}>
                <Grid>
                        <Col>
                        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                        <View style={styles.iconwap}><MaterialIcons name='call-made'size={25} /></View>
                        <Text style={{marginHorizontal: 10}}><Text style={{fontWeight: 'bold', fontSize: SIZES.h4}}>Mar 5</Text>, Fri</Text>
                        </View>
                        
                    <Box style={{ marginVertical: 10}}/>
                    <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                        <View style={styles.iconwap}><MaterialIcons name='call-received'size={25} /></View>
                        <Text style={{marginHorizontal: 10}}><Text style={{fontWeight: 'bold', fontSize: SIZES.h4}}>Mar 14</Text>, Sun</Text>
                        </View>
                        </Col>
                        </Grid>
                    
                </View>
                <View style={[styles.classPassenger, styles.rowspacebetween]}>
                    <Grid>
                        <Col>
                        <Box flexDirection= 'row' justifyContent='flex-start'>
                        <Image source={icons.chair} style={{
                            width: 25,
                            height: 25
                        }}/>
                        <Text style={{fontSize: SIZES.h4, marginHorizontal: 3}}> <Text style={{fontWeight: 'bold'}}>Business</Text> Class</Text>
                        </Box>
                        
                        <Box style={{ marginVertical: 10}}/>
                        
                        <Box flexDirection='row' justifyContent='space-between' alignContent='center'>
                            <Box flexDirection='row' justifyContent='space-between' alignContent='center'>
                                <Box alignSelf='center' mr={2}>
                                    <AntDesign  name='user' size={25} />
                                </Box>
                            
                            <Text  alignSelf='center' fontWeight='bold' fontSize={{fontSize: SIZES.h4}}>{passenger} Passenger</Text>
                            </Box>
                      
                        <Box flexDirection='row' justifyContent='space-between' alignContent='center'>
                            <TouchableOpacity onPress={minusHandler} style={[styles.minus,styles.plus]}><Text style={{marginTop: 15, fontWeight: 'bold', fontSize: 20}}>-</Text></TouchableOpacity>
                            <TouchableOpacity onPress={plusHandler} style={[styles.plus,{
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                            }]}><Text style={{marginTop: 15, fontWeight: 'bold', fontSize: 20}}>+</Text></TouchableOpacity>
                            </Box>
                        </Box>
                        </Col>
                    </Grid>
                    
                </View>
            </Box>
            <Button
            bg='black'
            _pressed={{
                bg: 'blueGray.500'
            }}
             _text={{
                fontWeight:'bold'
            }} endIcon={
                <Ionicons  color='white' size={25} name='md-chevron-forward-sharp'/>
            }   onPress={()=> navigation.navigate('flightSeat',{"selectedIndex": selectedIndex})}>
                   CONTINUE
          </Button>
            
        </Box>
        </ScrollView>
        </SafeAreaView>
    )
}
