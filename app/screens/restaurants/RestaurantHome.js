import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  RefreshControl
} from 'react-native';


import {useDispatch, useSelector} from 'react-redux'

import {getFoodMenus, addFoodMenu} from '../../store/actions'
import {Box, Button, Center,Image,  Input, Item, Spinner} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {icons, images, SIZES, COLORS, FONTS} from '../../constants';


const Home = ({navigation}) => {

  const dispatch = useDispatch();
  const {menus, message, isLoading, } = useSelector(state => state.restaurant)


  const [name, setName] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(menus);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const [refreshing, setRefreshing] = React.useState(false);




  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

  function onSelectCategory(index, category) {
    //filter restaurant
    let restaurantList = menus.filter(a => a.id === category.menuId)
    setSelectedIndex(index)
    setRestaurants(restaurantList);
    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
   
    let category = Array.isArray(selectedCategory) && selectedCategory.filter(a => a.id === id);

    if (category.length > 0) {
      return category[0].categoryName;
    }

    return '';
  }

  React.useEffect(()=>{
    const controller = new AbortController();
dispatch(getFoodMenus())

setSelectedCategory( Array.isArray(menus) && menus.length > 0   ? menus[0].categories : [])
setSelectedIndex  (menus.length > 0 ? menus[0].id : null)

    return ()=> {
      controller.abort()
    }
  },[])



  
  function renderMainCategories() {
    const renderItem = ({item}) => {


      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
             item.id === selectedIndex ? '#eab308' : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item.id, item.categories)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
              item.id ===   selectedIndex
                  ? COLORS.white
                  : COLORS.lightGray,
            }}
            
            >
            <Image
            resizeMode='contain'
            borderRadius={500}
            alt='mainpic'
            w='100%'
            h='100%'
            source={{uri:
              item.photo != null
                ? item.photo
                : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=',
          }}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              color: item.id === selectedIndex ? COLORS.white : COLORS.black,
              ...FONTS.body3,
            }}>
            {item.menuType}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{padding: SIZES.padding * 2}}>
        <Box style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={30} ml={20} />
          <Input
          w={'100%'}
           variant='unstyled'
            value={name}
            onChangeText={name => setName(name)}
            placeholder="Search"
          />
        </Box>
        <Text style={{...FONTS.h1}}>Main</Text>
        <Text style={{...FONTS.h1}}>Categories</Text>

        <FlatList
          data={menus ? menus : []}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        />
      </View>
    );
  }

  function renderRestaurantList() {
    
    const renderItem = ({item}) => (

      <SafeAreaView>
      <ScrollView>
        
        <TouchableOpacity
          style={{marginBottom: SIZES.padding * 2}}
          onPress={() =>
            navigation.navigate('Eat', {item})
          }>
          {/* Image */}
          <View
            style={{
              marginBottom: SIZES.padding,
            }}>
            <Image
            alt='menupic'
            
              source={{uri:
                item.photo != null
                  ? item.photo
                  : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=',
            }}
              
              style={{
                width: '100%',
                height: 200,
                borderRadius: SIZES.radius,
              }}
            />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow,
              }}>
              <Text style={{...FONTS.h4}}>{item.categoryName}</Text>
            </View>
          </View>

          {/* Restaurant Info */}
          {/* <Text style={{...FONTS.body2}}>{item.categoryName}</Text> */}

          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: 'row',
            }}>
            {/* Rating */}
            <Image
            alt="icon"
              source={icons.star}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
            <Text style={{...FONTS.body3}}>{item.rating}</Text>

            {/* Categories */}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
              }}>
              {item.length > 0 &&  item.map(category => {
                return (
                  <View style={{flexDirection: 'row'}} key={category.id}>
                    <Text style={{...FONTS.body3}}>
                      {getCategoryNameById(category.id)}
                    </Text>
                    <Text style={{...FONTS.h3, color: COLORS.darkgray}}>
                      {' '}
                      .{' '}
                    </Text>
                  </View>
                );
              })}

              {/* Price */}
                <Text
                  style={{
                    ...FONTS.body3,
                  }}>
                  ${item.price}
                </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      </SafeAreaView>
    );
    // if (selectedCategory.length > 0) {
    //       return category[0].name;
    //     }

    //     return '';
    // let f = selectedCategory.filter(
    //   a => a.categoryName.substring(0, 1) || a.categoryName.substring(0, 2) == categoryName.substring(0, 2),
    // );
      
    return (
      <Box>
        <FlatList
        data={selectedCategory || []}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
      </Box>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <Spinner color='#eab308' position='absolute' left='50%' top='50%'/> : 
      <Box>
        {renderMainCategories()}
        {renderRestaurantList()}
       
      </Box>
    
      }
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 0,
    marginHorizontal: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Home;
