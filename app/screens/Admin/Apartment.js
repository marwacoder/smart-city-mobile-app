import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import {
  Container,
  Header,
  VStack,
  HStack,
 Box,
  Stack,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Avatar,
  Center,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {COLORS, FONTS} from '../../constants/';

const {width, height} = Dimensions.get('screen')

const hotels = [
  {
    id: '1',
    name: 'Silver Hotel & SPA',
    location: 'Green street,Central district',
    price: 120,
    image: require('../../assets/images/hotel1.jpg'),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
  },
  {
    id: '2',
    name: 'Bring Hotel',
    location: 'Yuki street',
    price: 70,
    image: require('../../assets/images/hotel2.jpg'),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
  },
  {
    id: '3',
    name: 'Aluna Hotel',
    location: 'Almond street',
    price: 90,
    image: require('../../assets/images/hotel3.jpg'),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
  },
  {
    id: '4',
    name: 'Green Hotel',
    location: 'Main street',
    price: 100,
    image: require('../../assets/images/hotel4.jpg'),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
  },
];

function Business({navigation}) {
  const [hotel, setHotels] = React.useState(hotels);

  const VisibleItem = props => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      leftActionState,
      rightActionState,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <TouchableHighlight style={styles.rowFrontVisible}>
        <Box >
            <List.Item avatar>
              <Stack space={3} alignItems="center">
        <HStack space={1}  alignItems="center">
         
        <Center>
        <Avatar source={data.item.image} />
        </Center>
        <Center>
          <Box >
          <Box flexDirection='row' justifyContent='space-between' alignContent='center'>
            <Center>
              <Text  fontWeight='bold' >{data.item.name}</Text>
            </Center>
            <Center>
            <Text mr={width / 9}  fontSize={12}>
                  {data.item.location}
                </Text>
            </Center>
          </Box>
          
          <Text mr={12}  noOfLines={3} style={styles.description}>
                  {data.item.description}
                </Text>
          </Box>
          
        
        </Center>
        </HStack>
        </Stack>
                          </List.Item>
        </Box>
   
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const editRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].editRow();
    }
  };
  const deleteRow = (rowMap, rowKey) => {
    editRow(rowMap, rowKey);
    const newData = [...hotels];
    const prevData = hotels.findIndex(item => item.id === rowKey);
    newData.splice(prevData, 1);
    setHotels(newData);
  };
  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(100);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.id)}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onEdit,
      onDelete,
    } = props;
    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
      }).start();
    }
    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        <Text>Left</Text>

        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={onEdit}>
          <FontAwesome  name="edit" size={25} style={styles.trash} />
        </TouchableOpacity>
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <FontAwesome
                  name="trash"
                  size={25}
                  color={COLORS.red}
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(100);
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onEdit={() => navigation.navigate('AddApartment', data.item)}
        onDelete={() => deleteRow(rowMap, data.item.id)}
      />
    );
  };
  return (
    <Box flex={1} bg={COLORS.white}>
      <Box style={styles.header}>
        <View style={{paddingBottom: 15}}>
          <Text fontSize='3xl' fontWeight='bold' color='singletons.black'>All Great</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}> </Text>
            <Text fontSize='3xl' fontWeight='bold' color='yellow.500'>
              Apartment
            </Text>
          </View>
        </View>

        <Button
        _text={{
          color: "white",
        }}
        _pressed={{
          bg:'blueGray.500'
        }}
        h={12}
        variant={"solid"} bg='blueGray.700'
        startIcon={<MaterialIcons size={20} type="MaterialIcons" name="business" />}
          onPress={() => navigation.navigate('AddApartment')}>
          ADD ROOM
        </Button>
      </Box>
      <View style={styles.searchInputContainer}>
        <FontAwesome name="search" size={30} style={{marginLeft: 20}} />
        <TextInput
          placeholder="Search"
          style={{fontSize: 20, paddingLeft: 10}}
        />
      </View>
      <View style={{marginBottom: 250}}>
        <SwipeListView
          data={hotel}
          renderHiddenItem={renderHiddenItem}
          renderItem={renderItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          disableRightSwipe
          leftActivationValue={100}
          rightActivationValue={-200}
          leftActionValue={0}
          rightActionValue={-500}
        />
      </View>
    </Box>
  );
}
const styles = StyleSheet.create({
  backTextWhite: {
    color: '#fff',
  },
  rowFront: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    right: 75,
  },
  backRightBtnRight: {
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
    color: COLORS.primary,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  description: {
    fontSize: 12,
    color: '#999',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginHorizontal: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Business;
