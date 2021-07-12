import React, {useCallback} from 'react';
import ImagePicker from 'react-native-image-crop-picker'
import {
  TextArea,
  Text,
  Button,
  Box,
  Input,
  Menu,
  Spinner,
  FormControl,
} from 'native-base';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const AddItem = ({route, navigation}) => {
  const [shouldOverlapWithTrigger] = React.useState(false)
  const [businessDetails, setBusinessDetails] = React.useState({
    busName: '',
    location: '',
    latitude: '',
    longitude: '',
    description: '',
    imagePath: '',
  });

  const [photo, setPhoto] = React.useState(null);


 
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


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView  >
        <Box >
          <Box mt={12} mx={5}>
            <View >
              <Text color='singletons.black' fontWeight='bold' fontSize='3xl'>
                Create your
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text  fontWeight='bold' color='yellow.500' fontSize='3xl'>
                  Business{' '}
                </Text>
                <Text color='singletons.black' fontWeight='bold' fontSize='3xl'>
                  Anywhere
                </Text>
              </View>
            </View>
          </Box>

          <Box style={{marginVertical: 20, marginHorizontal: 15}}>
            <FormControl>            
                <Box>
                        
                        <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<MaterialIcons active size={25} name="business" />}
                        mb={3}
                          placeholder="Business Name"
                          value={businessDetails.busName}
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
                          placeholder="Business Type"
                          value={businessDetails.busName}
                        />

                      <Input
                      _focus={{
                        borderColor:"yellow.200"
                      }}
                      mb={3}
                        InputLeftElement={<MaterialIcons active size={25}  name="location-on" />}
                  
                        placeholder="Location"
                          value={businessDetails.location}
                        />

                        <Input
                        mb={3}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<MaterialCommunityIcons active size={25} name="latitude" />}
                  
                        placeholder="Latitude"
                        value={businessDetails.latitude}
                        />
                        <Input
                        mb={3}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<MaterialCommunityIcons active size={25} name="longitude" />}
                  
                        placeholder="Longitude"
                        value={businessDetails.longitude}
                        />
                        <TextArea
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        mb={3}
                        placeholder="Description of Business"
                       value={businessDetails.description}
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
                      }} spinner={<Spinner color='black' size={20}/>} isLoading={true} >SUBMIT</Button>

                      </Box>
            </FormControl>
            
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    marginBottom: -210,
    marginHorizontal: 20
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
  },
});

export default AddItem;
