import React from 'react'
import {  ImageBackground } from 'react-native';
import {Box,Text, Center, Button} from 'native-base'
import {images} from '../../constants';

export default function ScreenTwo({navigation}) {
    return (
        <Box flex={1}>
            <ImageBackground style={{flex: 1}}
            source={images.onboarding2}/>
            <Box position='absolute' right={0} left={0} bottom={'20%'}>
            <Box >
                <Center>
                <Text alignItems='center' fontSize={20} mb={2} fontWeight='bold'>Destination</Text>
                <Box>
                    <Text fontWeight={400} fontSize={18} color='black' w={300}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut</Text>
                </Box>
                </Center>
            </Box>
            </Box>
            <Box top={5} left={'80%'} position='absolute'>
            <Button
            shadow={1}
            w={70}
            h={50}
            _pressed={{bg: 'yellow.300'}}
            borderRadius={50}
            onPress={() => {
                navigation.navigate('Login');
              }}
              bg='yellow.500'
      >Skip</Button>
            </Box>
        </Box>
    )
}
