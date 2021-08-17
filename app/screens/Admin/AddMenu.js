import React from 'react';
import {
  Spinner,
  TextArea,
  Text,
  Box,
 FormControl,
  Button,
  Image,
  Input,
 Menu,
 useToast,
 Modal
} from 'native-base';

import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,

} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker'


import {useDispatch, useSelector} from 'react-redux'

import {addFoodMenu, getFoodMenus, addFoodMenuCategory, addFoodMenuRefresh, addFoodMenuCategoriesRefresh} from '../../store/actions'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {icons} from '../../constants';

const AddMenu = ({}) => {

  const [shouldOverlapWithTrigger] = React.useState(false)
  const [categoryPhoto, setCategoryPhoto] = React.useState(null);
  const [menuPhoto, setMenuPhoto] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [menuName, setMenuName] = React.useState('')
  const [menuType, setMenuType] = React.useState('')
  const [categoryName, setCategoryName] = React.useState({})
  const [menuId, setMenuId] = React.useState('')
  const [calory, setCalory] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
  const {width} = Dimensions.get('window');

  const {menus, message, isLoading, error } =  useSelector(state => state.restaurant || [])
const dispatch = useDispatch();
  const toast = useToast();

  React.useEffect(()=>{
    const controller = new AbortController();

    return ()=> {
      controller.abort()
    }
  },[])




 
const onSubmitMenu =()=>{
  dispatch(addFoodMenu({photo: menuPhoto, menuName, menuType}))
  if (error === true ){
    toast.show({
    title: message,
    status: "error",
    placement: 'top-right',
    description: "Error Adding Menu",
  })
  dispatch(addFoodMenuRefresh())
  }else {
    toast.show({
      title: message,
      status: "success",
      placement: 'top-right',
      description: "Success Adding Food Menu",
    })
    dispatch(addFoodMenuRefresh())
  }  

}


const onSubmitCategory =()=>{
  dispatch(addFoodMenuCategory({photo: categoryPhoto, categoryName, menuId: menuId.menuId, calory, price, description}))
  if (error === true ){
    toast.show({
    title: message,
    status: "error",
    placement: 'top-right',
    description: "Error Adding Food Category",
  })
  dispatch(addFoodMenuCategoriesRefresh())
  }else {
    toast.show({
      title: message,
      status: "success",
      placement: 'top-right',
      description: "Success Adding Food Category"
    })
    dispatch(addFoodMenuCategoriesRefresh())
  }  

}

  
 const takeCategoryPhotoFromGallery = () => {
  launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setCategoryPhoto(response);
      }
    });
};


const takeMenuPhotoFromGallery = () => {
  launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setMenuPhoto(response);
      }
    });
};




  

  

  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>

        
        <Modal isOpen={showModal} onClose={()=>setShowModal(false)}>
        <Modal.Content maxWidth={'400px'}>
          <Modal.CloseButton/>
          <Modal.Header>ADD MENU</Modal.Header>
          <Modal.Body>
          <Box >
            <FormControl>

          <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        value={menuName}
                        onChangeText={(text)=> setMenuName(text)}
                        InputLeftElement={<icons.MaterialIcons name='restaurant-menu'  size={20}/>}
                        mb={3}
                          placeholder="Menu Name"
                          
                        />
                        <Input
                        value={menuType}
                        onChangeText={(text)=> setMenuType(text)}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<icons.Ionicons name='ios-fast-food'  size={20}/>}
                        mb={3}
                          placeholder="Menu Type"
                          
                        />
                        <Button mt={3} bg='yellow.500' 
                        onPress={takeMenuPhotoFromGallery}
                      _pressed={{
                        bg: 'yellow.300'
                      }} 
                      _text={{
                        color: "black",
                      }}  endIcon={menuPhoto ? <icons.MaterialIcons name='check-circle'  size={20}/> :<icons.MaterialIcons name='add-a-photo'  size={20}/>}  >UPLOAD PHOTO</Button>

                      <Button mt={3} bg='yellow.500' 
                      _pressed={{
                        bg: 'yellow.300'
                      }} 
                      onPress={onSubmitMenu}
                      _text={{
                        color: "black",
                      }} isLoading={isLoading} isLoadingText="Submitting"   >SUBMIT</Button>
  </FormControl>
                       
          </Box>
          </Modal.Body>
        </Modal.Content>
        </Modal>
      <Box >
          <Box mt={12} mx={5}>
            <View >
              <Text color='singletons.black' fontWeight='bold' fontSize='3xl'>
              Add your Delicious
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text  fontWeight='bold' color='yellow.500' fontSize='3xl'>
                Food Menu{' '}
                </Text>
                <Text color='singletons.black' fontWeight='bold' fontSize='3xl'>
                  Anywhere
                </Text>
              </View>
            </View>
          </Box>
          <Box>
          <Box position="absolute" w="100%" ml={width / 1.3}>
            <Button
            
            borderRadius={50}
            onPress={()=> setShowModal(true)}
             mr={5}
            _pressed={{
              bg:'yellow.300'
            }}
            bg='yellow.500'
            w={50}
            h={50}
            placement="top-right"
              startIcon={<icons.AntDesign color='white' size={20} name='plus'/>}
            />
    </Box>
          </Box>
          <Box style={{marginVertical: 70, marginHorizontal: 15}}>
            <FormControl>            
                <Box>
                <Input
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        onChangeText={(text)=>setCategoryName(text)}
                        value={categoryName}

                        InputLeftElement={<icons.Ionicons name='ios-fast-food'  size={20}/>}
                        mb={3}
                          placeholder="Category Name"
                          
                        />
                        <Input
                        
                        value={menuId.menuType}
                         isReadOnly={true}
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
                              }}  startIcon={<icons.AntDesign name='down'   size={20}/>} alignSelf="center"  {...triggerProps}></Button>
                            )
                          }}
                        >
                          {Array.isArray(menus) == true && menus.length > 0 ? menus.map(item =><Box key={item.id}><Menu.Item onPress={()=>setMenuId({menuId: item.id, menuType: item.menuType})}  children={item.menuType}/></Box>): <Menu.Item>Add Menu</Menu.Item>}
                          
                        </Menu>}
                        InputLeftElement={<Ionicons  size={25} name="grid-outline" />}
                        mb={3}
                          placeholder="Menu Type"
                          
                        />

                        <Input
                        value={calory}
                        onChangeText={(text)=> setCalory(text)}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<Image alt='cl'
                          source={icons.calory}
                          style={{width: 25, height: 25, marginRight: 10}}
                        />}
                        mb={3}
                          placeholder="calory"
                          
                        />
                         <Input
                         value={price}
                         onChangeText={(text)=> setPrice(text)}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<Entypo  size={25} name="price-tag" />}
                        mb={3}
                          placeholder="Price"
                          
                        />
                        <TextArea
                        value={description}
                        onChangeText={(text)=> setDescription(text)}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        mb={3}
                        placeholder="Description"
                       
                        />
                        <Button
                        onPress={takeCategoryPhotoFromGallery}
                        _text={{
                          color: 'black'
                        }}
                        _pressed={{
                        bg: 'yellow.300'
                      }}    endIcon={categoryPhoto ? <MaterialIcons name='check-circle'  size={20}/> :<MaterialIcons name='add-a-photo'  size={20}/>} bg='yellow.500'>
                        UPLOAD IMAGE
                      </Button>

                      <Button mt={3} bg='yellow.500' 
                      isLoading={isLoading} isLoadingText="Submitting" 
                      onPress={onSubmitCategory}
                      _pressed={{
                        bg: 'yellow.300'
                      }} 
                      _text={{
                        color: "black",
                      }}  >SUBMIT</Button>

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
    marginBottom: -110,
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

export default AddMenu;
