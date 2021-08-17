import React from 'react';
import {
  TouchableOpacity,
  FlatList,

} from 'react-native';
import {Box, Text} from 'native-base';
import {
    SIZES
  } from '../../constants';

const CategoryList =(props)=> {

    const {setSelectedHandler, categories, selectedCategoryIndex} = props


    const renderItem = ({item}) => {
      return (
        <Box flexDirection='row' justifyContent='space-between' marginX={10} mt={20} mb={0}>
          <Box
          borderRadius={50}
          w={115}
          h={50}
          marginX={5}
          alignItems='center'
          justifyContent='center'
            key={item.id}
            bg={selectedCategoryIndex == item.id ? '#3F67FF' : null}
            >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedHandler(item)}>
              <Box>
                <Text
                  fontWeight="bold"
                  fontSize={20}
                  color={
                    selectedCategoryIndex == item.id ? 'white' : 'gray.200'
                  }>
                  {item.category}
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      );
    };
const flat = React.useMemo(()=>(
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
      <Box>
        {flat}
      </Box>
    );
  }

  export default CategoryList