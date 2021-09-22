import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {
  TextArea,
Menu,
  Text,
  Button,
  Input,
  FormControl,
  Image,
  Box,
  Spinner
} from 'native-base';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'


import ImagePicker from 'react-native-image-crop-picker';
import {COLORS, icons, images} from '../../constants';
const AddRoom = ({route, navigation}) => {
  
  const dispatch = useDispatch()
  const business = useSelector(state => state.business || {})
  const {rooms, isLoading, error} = useSelector(state => state.rooms || {})
  const [shouldOverlapWithTrigger] = React.useState(false)
  const [businessDetails, setBusinessDetails] = React.useState({
    busName: '',
    location: '',
    latitude: '',
    longitude: '',
    description: '',
    imagePath: '',
  });
  

  console.log(business,'lll')


  const [photo, setPhoto] = React.useState(null);
  const {width, height} = Dimensions.get('window');


  
  const takePhotoFromGallery = () => {
    ImagePicker.openPicker({
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 400,
      cropping: true,
      useFrontCamera: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        console.log(image);
        setPhoto(image);
      })
      .catch(error => {
        console.log(error);
      });
  };

  
  React.useEffect(() => {
    if (typeof route.params !== 'undefined') {
      setBusinessDetails({
        busName: route.params.name,
        location: route.params.location,
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        description: route.params.description,
      });
    }
    
  }, []);

  return (
    <SafeAreaView >
      <ScrollView
         >
        <Box flex={1} bg='white'> 

        <Box >
          <Box mt={12} mx={5}>
            <View >
              <Text color='singletons.black' fontWeight='bold' fontSize='3xl'>
              Add your
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text  fontWeight='bold' color='yellow.500' fontSize='3xl'>
                Comfort{' '}
                </Text>
                <Text color='singletons.black' fontWeight='bold' fontSize='3xl'>
                  Apartment
                </Text>
              </View>
            </View>
          </Box>
          <Box style={{marginVertical: 20, marginHorizontal: 15}}>
            <FormControl>            
                <Box>
                        
                        <Input
                         isReadOnly={true}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<Ionicons  size={25} name="business" />}
                        mb={3}
                          placeholder="Room Name"
                          
                        />

                      <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<Fontisto  name="room" size={20}/>}
                        mb={3}
                          placeholder="Room Number"
                          
                        />
                        <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<MaterialIcons  size={25} name="reduce-capacity"/>}
                        mb={3}
                          placeholder="Capacity"
                          
                        />
                         <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<Entypo  size={25} name="price-tag" />}
                        mb={3}
                          placeholder="Price"
                          
                        />
                   
                        <TextArea
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        mb={3}
                        placeholder="Description"
                       
                        />
                        <Button
                        onPress={takePhotoFromGallery}
                        _text={{
                          color: 'black'
                        }}
                        _pressed={{
                        bg: 'yellow.300'
                      }}    endIcon={photo ? <MaterialIcons name='check-circle'  size={20}/> :<MaterialIcons name='add-a-photo'  size={20}/>} bg='yellow.500'>
                        UPLOAD IMAGE
                      </Button>

                      <Button mt={3} bg='yellow.500' 
                      _pressed={{
                        bg: 'yellow.300'
                      }} 
                      _text={{
                        color: "black",
                      }}  isLoading={isLoading} isLoadingText="Submitting" >SUBMIT</Button>

                        </Box>
                        </FormControl>
                        </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    marginBottom: -210,
  },
  header: {
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  item: {
    marginHorizontal: 40,
    marginVertical: 5,
  },
  button: {
    marginHorizontal: '15%',
    backgroundColor: COLORS.primary,
  },
});

export default AddRoom;