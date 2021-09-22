import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Input, Flex, Box, Center, Text, useToast, Spinner} from 'native-base';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {getBusiness} from '../../store/actions'


import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
  GOOGLE_API_KEY,
} from '../../constants';
import {getDriversCurrentLocation, getDriverPositionRefresh} from '../../store/actions';
import BottomSheet from './BottomSheet';
import mapStyle from '../style';

import {restaurant} from '../../service';

const tour = [
  {
    id: '1',
    title: `Erik's Bay`,
    subtitle: 'Water, Active Nature',
    located: 'Slokas lela 34-A',
    image: images.hikingWoman,
  },
  {
    id: '2',
    title: `City of Lights`,
    subtitle: 'Town, Historical, Kids',
    located: 'Avotu, lela 104-B',
    image: images.womanPhoto,
  },
];

const {width, height} = Dimensions.get('screen');
const cardWidth = width / 2.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  searchWrapper: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
  },

  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 0,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  categoryBtn: {
    borderRadius: 50,
    width: 115,
    height: 50,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: height / 3.5,
    width: Dimensions.get('screen').width / 2.1,
    elevation: 15,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: height / 8,
    width: '100%',
    borderRadius: 15,
  },

  cardDetails: {
    borderRadius: 5,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    marginVertical: 10,
    padding: 10,
    width: '100%',
  },
  cardOverLay: {
    height: 230,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },

  marker: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  dotWrapper: {
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 10,
  },
  toolTips: {
    width: 180,
    position: 'relative',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderLeftWidth: 6,
    justifyContent: 'space-between',
    padding: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    borderRadius: 5,
    marginBottom: 20,
  },
  marker: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowDown: {
    position: 'absolute',
    bottom: -20,
    left: 80,
    color: COLORS.gray,
  },
  rowspacebetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  nearby: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
    height: height / 4,
    marginVertical: height / 9,
    marginHorizontal: 20,
  },
  cardWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    bottom: 0,
  },
});

 function Home({navigation}) {
  const dispatch = useDispatch();
  const categories = [
    {id: 1, category: 'All'},
    {id: 2, category: 'Restaurant'},
    {id: 3, category: 'Hotel'},
    {id: 4, category: 'Apartment'},
    {id: 5, category: 'Airport'},
    {id: 6, category: 'Hospital'},
    {id: 7, category: 'Taxi'},
    {id: 8, category: 'Logistics'},
  ];

  const bs = React.useRef();
  const toast = useToast();
  const {data, isLoading, message, error} = useSelector(state => state.driver);
  const {business} = useSelector(state => state.business);

  const [sheetContent, setSheetContent] = React.useState({});

  const [businessName, setBusinessName] = React.useState('');

  const [toLocation, setToLocation] = React.useState([]);
  const [region, setRegion] = React.useState(null);

  

  
  React.useEffect(() => {
    setBusinessName('Aluna Hotel');

    
    dispatch(getDriversCurrentLocation());
    dispatch(getBusiness())
    setToLocation(business)

    if(error === true ) {
        toast.show({
          title: message,
          status: "error",
          placement: 'top-right',
          description: "Location Unavailable"
        })
      dispatch(getDriverPositionRefresh()) 
  }


  }, []);

  const mapView = React.useRef();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(1);

  let mapRegion = {
    latitude: (data && data.latitude) || 0,
    longitude: (data && data.longitude) || 0,
    latitudeDelta: 0.001522,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) *
      0.001522,
  };

  function zoomIn() {
    let newRegion = {
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
      latitudeDelta: mapRegion.latitudeDelta / 10,
      longitudeDelta: mapRegion.longitudeDelta / 10,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 100);
  }

  function zoomOut() {
    let newRegion = {
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
      latitudeDelta: mapRegion.latitudeDelta * 10,
      longitudeDelta: mapRegion.longitudeDelta * 10,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 100);
  }
  function renderButtons() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height * 0.35,
          right: SIZES.padding * 2,
          width: 60,
          height: 130,
          justifyContent: 'space-between',
        }}>
        {/* Zoom In */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => zoomIn()}>
          <Text style={{...FONTS.body1}}>+</Text>
        </TouchableOpacity>

        {/* Zoom Out */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => zoomOut()}>
          <Text style={{...FONTS.body1}}>-</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const setSelectedHandler = item => {
    setSelectedCategoryIndex(item.id);
    const buzName = business.filter(
      biz => biz.typeofBusiness === item.category,
    );
    if (item.category === 'All') return setToLocation(business);
    if (buzName) {
      setToLocation(buzName);
    }
  };


  

  // const Card = ({item, index}) => {
    
  //   const inputRange = [
  //     (index - 1) * cardWidth,
  //     index * cardWidth,
  //     (index + 1) * cardWidth,
  //   ];
  //   const opacity = scrollX.interpolate({
  //     inputRange,
  //     outputRange: [0.7, 0, 0.7],
  //   });
  //   const scale = scrollX.interpolate({
  //     inputRange,
  //     outputRange: [0.8, 1, 0.8],
  //   });
  //   return (
  //     <View>
        
  //       <TouchableOpacity disabled={activeCardIndex != index} activeOpacity={1}>
  //         <Animated.View style={{...styles.card, transform: [{scale}]}}>
  //           <Animated.View style={{...styles.cardOverLay, opacity}} />
  //           <View style={{margin: 10}}>
  //             <Image source={item.image} style={styles.cardImage} />
  //           </View>

  //           <View style={styles.cardDetails}>
  //             <View>
  //               <Text
  //                 style={{
  //                   fontWeight: 'bold',
  //                   fontSize: SIZES.h4,
  //                   marginVertical: 10,
  //                 }}>
  //                 {item.title}
  //               </Text>
  //               <Text style={{color: COLORS.grey}}>{item.subtitle}</Text>
  //               <View
  //                 style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
  //                 <icons.FontAwesome
  //                   style={{fontSize: 15, color: '#3F67FF'}}
  //                   name="map-marker"
  //                 />
  //                 <Text
  //                   style={{
  //                     fontSize: SIZES.h5,
  //                     marginHorizontal: 10,
  //                     color: COLORS.grey,
  //                   }}>
  //                   {item.located}
  //                 </Text>
  //               </View>
  //               <View style={styles.rowspacebetween}>
  //                 <View style={styles.rowspacebetween}>
  //                   <icons.FontAwesome
  //                     style={{fontSize: 15, color: '#FFBB00', marginRight: 5}}
  //                     name="star"
  //                   />
  //                   <Text>5.0</Text>
  //                 </View>

  //                 <Text style={{color: COLORS.grey}}>500m</Text>
  //               </View>
  //             </View>
  //           </View>
  //         </Animated.View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  function CategoryList() {
    const renderItem = ({item}) => {
      return (
        <View style={styles.categoryListContainer}>
          <View
            key={item.id}
            style={[
              styles.categoryBtn,
              {
                backgroundColor:
                  selectedCategoryIndex == item.id ? '#3F67FF' : null,
              },
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedHandler(item)}>
              <View>
                <Text
                  fontWeight="bold"
                  fontSize={20}
                  color={
                    selectedCategoryIndex == item.id ? 'white' : 'gray.200'
                  }>
                  {item.category}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    };
      const flat = React.useMemo(()=> (
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        />
      ))
    return (
      <View>
        {flat}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      
      { !isLoading ?
      <MapView
      showsBuildings
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        initialRegion={mapRegion}
        customMapStyle={mapStyle}
        style={StyleSheet.absoluteFillObject}>
        <Marker
          coordinate={{
            latitude: (data && data.latitude) || 0,
            longitude: (data && data.longitude) || 0,
          }}>
          <Box direction="column">
            <Center>
              <icons.FontAwesome5
                name="walking"
                size={30}
                color={COLORS.blue}
              />
            </Center>
            <Center>
              <View
                style={[
                  styles.dotWrapper,
                  {backgroundColor: 'rgba(274, 70, 86, .25)'},
                ]}>
                <View style={[styles.dot, {backgroundColor: '#E04F5B'}]} />
              </View>
            </Center>
          </Box>
        </Marker>
        {/* onPress={()=> navigation.navigate(cor.typeofBusiness)} */}
    
        {toLocation.length > 0 &&
          toLocation.map((cor, index) => (
            <Marker
              key={index}
              onPress={() => {
                setSheetContent(cor);
                bs.current.snapTo(0);
              }}
              coordinate={{
                longitude: parseFloat(cor.longitude),
                latitude: parseFloat(cor.latitude),
              }}>
              {cor.typeofBusiness === 'Restaurant' ? (
                <Box direction="column">
                  <Center>
                    <Text fontSize="xs">{cor.businessName}</Text>
                    <icons.Ionicons
                      name="fast-food-outline"
                      size={25}
                      color="#02b59d"
                    />
                  </Center>
                  <Center mt={-1}>
                    <icons.FontAwesome
                      name="map-marker"
                      size={25}
                      color="#02b59d"
                    />
                  </Center>
                </Box>
              ): cor.typeofBusiness === 'Hospital' ? (
                <Box direction="column">
                  <Center>
                    <Text fontSize="xs">{cor.businessName}</Text>
                    <icons.Ionicons
                      name="hospital-o"
                      size={25}
                      color="#02b59d"
                    />
                  </Center>
                  <Center mt={-1}>
                    <icons.FontAwesome
                      name="map-marker"
                      size={25}
                      color="#02b59d"
                    />
                  </Center>
                </Box>
              )
               : cor.typeofBusiness === 'Hotel' ? (
                <Box direction="column">
                  <Center>
                    <Text fontSize="xs">{cor.businessName}</Text>
                    {console.log(cor.typeofBusiness,'checking')}
                    <icons.Fontisto name="hotel" size={25} color="#02b59d" />
                  </Center>
                  <Center>
                    <icons.FontAwesome
                      name="map-marker"
                      size={25}
                      color="#02b59d"
                    />
                  </Center>
                </Box>
              ) : cor.typeofBusiness === 'Airport' ? (
                <Box direction="column">
                  <Center>
                    <Text fontSize="xs">{cor.businessName}</Text>
                    <icons.MaterialCommunityIcons
                      name="airport"
                      size={25}
                      color="#02b59d"
                    />
                  </Center>
                  <Center>
                    <icons.FontAwesome
                      name="map-marker"
                      size={25}
                      color="#02b59d"
                    />
                  </Center>
                </Box>
              ) : cor.typeofBusiness === 'Taxi' ? (
                <Box direction="column">
                  <Center>
                    <Text fontSize="xs">{cor.businessName}</Text>
                    <Image source={icons.car} style={{width: 70, height: 70}} />
                  </Center>
                </Box>
              )  : console.log('no route')}
            </Marker>
          ))}

        {/* <MapViewDirections
            origin={{
                latitude: fromLocation.latitude,
            longitude: fromLocation.longitude
            }}
            destination={{
              longitude: toLocation.longitude,
              latitude: toLocation.latitude
            }}
            apikey={GOOGLE_API_KEY} 
            mode='WALKING'
            strokeColor='#5b5c69' strokeWidth={4} lineDashPattern={[6,6]}
            /> */}
      </MapView>
      : <Spinner color='#3F67FF' position='absolute' left='50%' top='50%'/>}
      {/* <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }> */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Box w={'100%'} style={styles.searchWrapper}>
          <Flex direction="row" alignItems="center" justifyContent="center">
            <icons.FontAwesome
              name="search"
              type="FontAwesome"
              style={{color: '#3F67FF', fontSize: 20}}
            />
            <Input
              variant="unstyled"
              w={'80%'}
              placeholder="Search for anything"
              placeholderTextColor={COLORS.grey}
            />
            <Box
              alignItems="center"
              borderRadius={30}
              bg="#E6EBF1"
              w={30}
              h={30}
              justifyContent="center">
              <icons.FontAwesome color="#3F67FF" name="microphone" size={20} />
            </Box>
          </Flex>
        </Box>

        {CategoryList()}
      </View>
      {/* <View style={[styles.nearby, styles.rowspacebetween]}>
        <Text style={{...FONTS.h3, marginHorizontal: 10, fontWeight: 'bold'}}>
          Places near by
        </Text>
        <icons.FontAwesome
          name="angle-down"
          style={{color: COLORS.blue}}
          size={25}
        />
      </View>
      <View style={styles.cardWrapper}>
        <Animated.FlatList
          onMomentumScrollEnd={e => {
            setActiveCardIndex(
              Math.round(e.nativeEvent.contentOffset.x / cardWidth),
            );
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          horizontal
          data={tour}
          contentContainerStyle={{
            paddingLeft: 50,
            paddingRight: 120,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => <Card item={item} index={index} />}
          snapToInterval={cardWidth}
        />
      </View> */}
      {renderButtons()}
      <BottomSheet bs={bs} sheetContent={sheetContent} />
      {/* </ScrollView> */}
    </View>
  );
}

export default Home;