import React from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions , Image, Animated} from 'react-native'
import {Box, Text, Input, FormControl, Button, Menu, Spinner} from 'native-base'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {COLORS, SIZES, FONTS, icons, images} from '../../constants'

const {width, height} = Dimensions.get('window')
const cardWidth = width / 1.8;


const tour = [{id: '1', image: images.hikingWoman}, {id: '2',image: images.womanPhoto}]

const styles = StyleSheet.create({
    card: {
        height: 200,
        width: Dimensions.get('screen').width / 1.25 ,
        borderRadius: 15,
        
      },
      location: {
        height: height /4,
        width: '100%',
        borderRadius: 15
      },
      cardOverLay: {
        height: 200,
        backgroundColor: COLORS.white,
        position: 'absolute',
        zIndex: 100,
        width: Dimensions.get('screen').width,
        borderRadius: 15,
      },
    
})

export default function Home() {
  const [shouldOverlapWithTrigger] = React.useState(false)
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
              <Box   bg='yellow.500' height= {height /5}  borderRadius={15} w={'100%'} shadow={0.5}>
                  <Box m={5}>
                  <Box mb={5}  flexDirection='row' justifyContent='space-between' alignContent='center'>
                      <Text fontSize={15} color='white'>Today, Depart 2 pm</Text>
                      <Entypo name='dots-two-horizontal' size={25} color='white'/>
                  </Box>
                  <Box mb={5} flexDirection='row' justifyContent='space-between' alignContent='center'>
                      <Text color='white' fontSize='2xl'>Abuja</Text>
                      <AntDesign name='arrowright' size={25} color='white'/>
                      <Text fontSize='2xl' color='white'>Abuja</Text>
                  </Box>
                  <Text color='white' fontSize={20} fontWeight='bold'>$10</Text>
                  </Box>
                  
              </Box>
          </TouchableOpacity>
         
         
        </Animated.View>
      </TouchableOpacity>
    );
  };
    return (
        <Box flex={1} bg='white' >
          <Box mt={5} mx={5}>
           <Animated.FlatList
            onMomentumScrollEnd={e => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / Dimensions.get('screen').width),
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            horizontal
            data={tour}
            contentContainerStyle={{
           paddingRight: 30
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <Card image={item} index={index} />}
            snapToInterval={Dimensions.get('screen').width}
          />
          <Box  borderTopRadius={15}  >
          <FormControl>            
                <Box m={5}>
                        
                        <Input
                       
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputRightElement={<Menu
                          shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
                          placement='left'
                          trigger={(triggerProps) => {
                            return (
                              <Button bg='blueGray.50' _pressed={{
                                bg: 'blueGray.50'
                              }} _text={{
                                color:'black'
                              }}  startIcon={<AntDesign name='down'   size={20}/>} alignSelf="center"  {...triggerProps}></Button>
                            )
                          }}
                        >
                          <Menu.Item>Large Menu item 1</Menu.Item>
                          <Menu.Item>Large Menu item 2</Menu.Item>
                          <Menu.Item>Large Menu item 3</Menu.Item>
                        </Menu>}
                        InputLeftElement={<MaterialIcons active size={25} name="business" />}
                        mb={3}
                          placeholder="From"
                          
                        />

                        <Input
                        
                        isReadOnly={true}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<MaterialIcons active size={25} name="business" />}
                        InputRightElement={<Menu
                          shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
                          placement='left'
                          trigger={(triggerProps) => {
                            return (
                              <Button bg='blueGray.50' _pressed={{
                                bg: 'blueGray.50'
                              }} _text={{
                                color:'black'
                              }}  startIcon={<AntDesign name='down'   size={20}/>} alignSelf="center"  {...triggerProps}></Button>
                            )
                          }}
                        >
                          <Menu.Item>Large Menu item 1</Menu.Item>
                          <Menu.Item>Large Menu item 2</Menu.Item>
                          <Menu.Item>Large Menu item 3</Menu.Item>
                        </Menu>}
                        mb={3}
                          placeholder="To"
                         
                        />

                      <Input
                      
                      _focus={{
                        borderColor:"yellow.200"
                      }}
                      mb={3}
                        InputLeftElement={<MaterialIcons active size={25}  name="location-on" />}
                  
                        placeholder="Location"
                         
                        />

                        <Input
                        
                        mb={3}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<MaterialCommunityIcons active size={25} name="latitude" />}
                  
                        placeholder="Latitude"
                     
                        />
                        <Input
                        mb={3}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<MaterialCommunityIcons active size={25} name="longitude" />}
                  
                        placeholder="Longitude"
                    
                        />
                        

                        <Button mt={3} bg='yellow.500' 
                      _pressed={{
                        bg: 'yellow.300'
                      }} 
                      _text={{
                        color: "white",
                      }} spinner={<Spinner color='black' size={20}/>}  >SUBMIT</Button>

                      </Box>
            </FormControl>

          </Box>
          </Box>
        </Box>
    )
}
