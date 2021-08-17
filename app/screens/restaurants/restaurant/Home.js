import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {icons, images, SIZES, COLORS, FONTS} from '../../../constants';

const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;

const restaurants = [
  {
    id: '1',
    name: 'Silver Restaurant',
    location: 'Green street,Central district',
    price: 120,
    image: require('../../../assets/images/baked-fries.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
  },
  {
    id: '2',
    name: 'Bring Restaurant',
    location: 'Yuki street',
    price: 70,
    image: require('../../../assets/images/burger-restaurant.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
  },
  {
    id: '3',
    name: 'Aluna Restaurant',
    location: 'Almond street',
    price: 90,
    image: require('../../../assets/images/japanese-restaurant.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
  },
  {
    id: '4',
    name: 'Green Restaurant',
    location: 'Main street',
    price: 100,
    image: require('../../../assets/images/kek-lapis-shop.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
  },
];

const HomeScreen = ({navigation}) => {
  const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const CategoryList = ({navigation}) => {
    return (
      <View style={style.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text
                style={{
                  ...style.categoryListText,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.primary
                      : COLORS.grey,
                }}>
                {item}
              </Text>
              {selectedCategoryIndex == index && (
                <View
                  style={{
                    height: 3,
                    width: 30,
                    backgroundColor: COLORS.primary,
                    marginTop: 2,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const Card = ({restaurant, index}) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
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
        activeOpacity={1}
        onPress={() => navigation.navigate('Restaurant', restaurant)}>
        <Animated.View style={{...style.card, transform: [{scale}]}}>
          <Animated.View style={{...style.cardOverLay, opacity}} />
          
          <Image source={restaurant.image} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>
                  {restaurant.name}
                </Text>
                <Text style={{color: COLORS.grey, fontSize: 12}}>
                  {restaurant.location}
                </Text>
              </View>
              <Icon name="bookmark-border" size={26} color={COLORS.primary} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.grey} />
              </View>
              <Text style={{fontSize: 10, color: COLORS.grey}}>365reviews</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const TopRestaurantCard = ({restaurant}) => {
    return (
      <View style={style.topRestaurantCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <Icon name="star" size={15} color={COLORS.orange} />
          <View style={style.priceTag}>
            <Text
              style={{color: COLORS.white, fontWeight: 'bold'}}>
              ${restaurant.price}
            </Text>
          </View>
          
        </View>
        <Image style={style.topRestaurantCardImage} source={restaurant.image} />
        <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>{restaurant.name}</Text>
          <Text style={{fontSize: 7, fontWeight: 'bold', color: COLORS.grey}}>
            {restaurant.location}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View style={{paddingBottom: 15}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            Find your Restaurant
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>in </Text>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.orange}}>
              Zaria
            </Text>
          </View>
        </View>
        <Icon name="person-outline" size={38} color={COLORS.grey} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.searchInputContainer}>
          <Icon name="search" size={30} style={{marginLeft: 20}} />
          <TextInput
            placeholder="Search"
            style={{fontSize: 20, paddingLeft: 10}}
          />
        </View>
        <CategoryList />
        <View>
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
            data={restaurants}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <Card restaurant={item} index={index} />}
            snapToInterval={cardWidth}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: COLORS.grey}}>
            Top Menus
          </Text>
          <TouchableOpacity >
            <Text style={{color: COLORS.grey}}>Show all</Text>
          </TouchableOpacity>
          
        </View>
        <FlatList
          data={restaurants}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({item}) => <TopRestaurantCard restaurant={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 30,
    width: 50,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: -10,
    marginHorizontal: -5
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topRestaurantCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topRestaurantCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default HomeScreen;
