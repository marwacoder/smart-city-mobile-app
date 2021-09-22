import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  useToast
} from 'native-base';
import {authenticated, authRefresh} from '../../store/actions'

import {icons} from '../../constants'

export default function Login({navigation}) {

  const [showPass, setShowPass] = React.useState(false);

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onShowPass =()=> setShowPass(!showPass)

  const dispatch = useDispatch()
  const { message, error, isLoggedIn, isLoading, role} = useSelector(state => state.auth || {})
  const toast = useToast()

  const onSubmitHandler = ()=> {
   
    dispatch(authenticated({ email, password}))
    if (error === true ){
      toast.show({
      title: message,
      status: "error",
      placement: 'top-right',
      description: "Auth Failed",
      duration: 2000
    })
    }if(isLoggedIn && role === 'superAdmin') {
     navigation.navigate('Home')
    }else if (isLoggedIn && role === 'user' || role === 'businessAdmin') {
      navigation.navigate('Places')
     }
    
    }
  
    

 return (
      <NativeBaseProvider>
      <Box
        safeArea
        flex={1}
        mx={5}
        my={10}

       
      >
        <Heading size="lg" mt={10} color='yellow.500'>
          Welcome
        </Heading>
        <Heading color="black"  size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={2} mt={10}>
          <FormControl>
           
            <Input
            value={email}
            onChangeText={(text)=> setEmail(text)}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<icons.Fontisto name='email'  size={20}/>}
                        mb={3}
                          placeholder="Email Address"
                          
                        />
          </FormControl>
          <FormControl mb={5}>
          <Input
          value={password}
          onChangeText={(text)=> setPassword(text)}
                         type={ showPass ? 'text' : 'password'}
                         
                        mb={3}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<icons.MaterialCommunityIcons active size={25} name="lock" />}
                        InputRightElement={<Box mr={2} >{showPass ? <icons.Ionicons  onPress={onShowPass} size={25} name="ios-eye" />:<icons.Ionicons onPress={onShowPass}  size={25} name="ios-eye-off" />}</Box> }
                  
                        placeholder="Password"
                        
                        />
            <Link
              _text={{ fontSize: 'xs', fontWeight: '700', color:'yellow.500' }}
              alignSelf="flex-end"
              mt={1}
            >
              Forget Password?
            </Link>
          </FormControl>
          <VStack  space={2}>
          <Button _pressed={{bg: 'yellow.300'}}  isLoadingText="Submitting"  onPress={onSubmitHandler} bg='yellow.500'  _text={{color: 'black' }}>
              LOGIN
          </Button>

<HStack justifyContent="center" alignItem='center'>
          <IconButton
            variant='unstyled'
            startIcon={
              <Icon
                as={< icons.MaterialCommunityIcons name="facebook" />}
                color='muted.700'
                size='sm'
              />
            }
          />
          <IconButton
            variant='unstyled'
            startIcon={
              <Icon
                as={< icons.MaterialCommunityIcons name="google" />}
                color='muted.700'
                size="sm"
              />
            }
          />
          <IconButton
            variant='unstyled'
            startIcon={
              <Icon
                as={< icons.MaterialCommunityIcons name="github" />}
                color='muted.700'
                size="sm"
              />
            }
          />
          </HStack>
          </VStack>
          <HStack justifyContent="center">
            <Text fontSize='sm' color='muted.700' fontWeight={400}>I'm a new user. </Text>
            <Button variant='unstyled'  onPress={()=>navigation.navigate('SignUp')} mt={-3}  _text={{ color: 'yellow.500', bold: true, fontSize: 'sm' }} href="#">
              Sign Up
            </Button>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}