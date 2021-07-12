// import React from 'react';
// import {FlatList, List} from 'react-native';

// import {Separator, ListItem} from 'native-base';
// import {SearchBar} from 'react-native-elements';

// // import {icons, images, SIZES, COLORS, FONTS} from '../constants/';

// const Search_Screen = ({navigation}) => {
//   const [name, setName] = React.useState('');
//   const [data, setData] = React.useState(null);
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState(null);

//   let arrayHolder = [];

//   React.useEffect(() => {
//     makeRemoteRequest();
//   }, []);
//   const makeRemoteRequest = () => {
//     const url = `https://randomuser.me/api/?&results=20`;
//     setLoading(true);

//     fetch(url)
//       .then(res => res.json())
//       .then(res => {
//         setLoading(false);
//         setData(res.results);
//         setError(res.error || null);

//         arrayHolder = res.results;
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   };
//   const searchFilterFunction = text => {
//     const newData = this.arrayHolder.filter(item => {
//       const itemData = `${item.name.title.toUpperCase()}
//     ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;

//       const textData = text.toUpperCase();

//       return itemData.indexOf(textData) > -1;
//     });

//     setData(newData);
//   };

//   renderHeader = () => {
//     return (
//       <SearchBar
//         placeholder="Type Here..."
//         lightTheme
//         round
//         onChangeText={text => searchFilterFunction(text)}
//         autoCorrect={false}
//       />
//     );
//   };
//   return (
//     <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
//       <FlatList
//         data={data}
//         renderItem={({item}) => (
//           <ListItem
//             roundAvatar
//             title={`${item.name.first} ${item.name.last}`}
//             subtitle={item.email}
//             avatar={{uri: item.picture.thumbnail}}
//             containerStyle={{borderBottomWidth: 0}}
//           />
//         )}
//         keyExtractor={item => item.email}
//         ItemSeparatorComponent={<Separator />}
//         ListHeaderComponent={renderHeader}
//       />
//     </List>
//   );
// };
// export default Search_Screen;

import React from 'react';
import {View, Text} from 'react-native';

export default function Search_Screen() {
  return (
    <View>
      <Text>Search Screen</Text>
    </View>
  );
}
