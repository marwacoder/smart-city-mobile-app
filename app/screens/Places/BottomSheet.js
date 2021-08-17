import React from 'react';
import { StyleSheet, View,  } from 'react-native';
import {Box, Text,Heading,Button,Image, Divider} from 'native-base'
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';


import {COLORS, icons} from '../../constants'
import { TouchableOpacity } from 'react-native';


const style = StyleSheet.create({
  marker: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: 'rgba(63, 103, 255, .1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15
  },
  
})
export default function Sheet(props) {


  
    const {bs, sheetContent} = props;
    const navigation = useNavigation(); 

    const fall = new Animated.Value(1);
    const renderContent = () => (
        <Box bg={COLORS.white} h={'100%'} borderRadius={30}>
          <Image source={sheetContent.image} borderTopRadius={30} alt="bg" height={200} w={'100%'}/>
         <Box m={5}>
         <Text fontSize='2xl' fontWeight='bold'>{sheetContent.businessName} {sheetContent.typeofBusiness}</Text>
         <Divider/>
          <Text  noOfLines={5} my={3}>Magna eu ut magna magna sit. Mollit nisi excepteur laboris irure culpa laboris non. Sit do ipsum deserunt aliqua laboris elit consectetur eiusmod deserunt culpa laboris.

Sint reprehenderit veniam ut mollit sit tempor aliquip amet pariatur ipsum elit eu voluptate commodo. In ipsum esse mollit dolore commodo non sint. Aliqua cupidatat sunt id est.</Text>
              <Divider/>
              
         </Box>
         <Box ml={5} mb={3} flexDirection='row' justifyContent='flex-start' alignItems='center'>
          
         <Box alignItems='center'>
         <TouchableOpacity>
         <View style={style.marker} >
            <icons.FontAwesome size={20} color={COLORS.blue}  name='star' />
            </View>
            </TouchableOpacity>
            <Text>Rate</Text>
         </Box>
        
         
         <Box alignItems='center'>
         <TouchableOpacity>
         <View style={style.marker} >
            <icons.FontAwesome5 name="route" size={20} color={COLORS.blue}/>
            
            </View>
            </TouchableOpacity>
            <Text>Route</Text>
         </Box>
         
         
         <Box alignItems='center'>
         <TouchableOpacity>
         <View style={style.marker} >

<icons.FontAwesome size={20} color={COLORS.blue}  name='shopping-basket' />
</View>
</TouchableOpacity>
<Text>Oder</Text>
         </Box>  
         <Box alignItems='center'>
         <TouchableOpacity>
         <View style={style.marker} >

<icons.Ionicons size={20} color={COLORS.blue}  name='share' />
</View>
</TouchableOpacity>
<Text>Share</Text>
         </Box> 
         </Box>
         
         <Divider/>
         <Box my={10} mx={5}>
          
         <Button  variant={"solid"} bg={COLORS.blue}
         onPress={()=> navigation.navigate(sheetContent.typeofBusiness)}
         _pressed={{
           bg: 'blue.400'
         }}
        _text={{
          color: "white",
        }}>
      Book
    </Button>
         </Box>
         
            </Box>
      );
      
      return (
        <>
          <View
          >
        
          </View>
          <BottomSheet
            ref={bs}
            snapPoints={[570, 0]}
            renderHeader = {renderContent}
            initialSnap={1}
            callbackNode={fall}
            enabledContentGestureInteraction={true}
            enabledContentTapInteraction={true}
          />
        </>
      );
    }