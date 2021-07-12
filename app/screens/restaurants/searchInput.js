import React from 'react';
import {View} from 'react-native';
import {Icon, Input, InputGroup} from 'native-base';
import PropTypes from 'prop-types';
import {COLORS, SIZES} from '../../constants';
const SearchInput = ({name}) => {
  return (
    <View
      style={{
        width: '70%',
        height: '100%',
        backgroundColor: COLORS.lightGray3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
      }}>
      <InputGroup borderType="rounded">
        <Input
          placeholder="Search"
          returnKeyType="search"
          value={name}
          onChangeText={name => setName(name)}
        />
        <Icon name="ios-search" style={{color: COLORS.primary}} />
      </InputGroup>
    </View>
  );
};

SearchInput.propTypes = {};

export default SearchInput;
