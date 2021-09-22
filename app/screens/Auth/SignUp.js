import * as React from 'react';

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
import {useDispatch, useSelector} from 'react-redux'
import {addUser, addUserRefresh} from '../../store/actions'

import {icons} from '../../constants'

export default function SignUp({navigation}) {

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
    const [showPass, setShowPass] = React.useState(false);

  const onShowPass =()=> setShowPass(!showPass)
  const { message, error, success, isLoading} = useSelector(state => state.register || {})
  const dispatch = useDispatch()
  const toast = useToast()

  const onSubmitHandler = ()=> {
    
   
    dispatch(addUser({name, email, password}))
   
    if (error === true ){
      toast.show({
      title: message,
      status: "error",
      placement: 'top-right',
      description: "Auth Failed",
    })
    }if(success) {
        toast.show({
        title: message,
        status: "success",
        placement: 'top-right',
        description: "Registered success",
        
      })
     navigation.navigate('Login')
    }  
    
    }

 return (
      <NativeBaseProvider>
      <Box
        safeArea
        flex={1}
    my={10}
        mx={5}
      >
        <Heading size="lg" mt={10} color='yellow.500'>
          Welcome
        </Heading>
        <Heading color="black" size="xs">
          Sign up to continue!
        </Heading>

        <VStack space={2} mt={10}>
          <FormControl>
            
            <Input
            value={name}
            onChangeText={(text)=> setName(text)}
                        _focus={{
                          borderColor:"yellow.200"
                        }}
                        InputLeftElement={<icons.AntDesign name='user'  size={20}/>}
                        mb={3}
                          placeholder="Full Name"
                          
                        />
          </FormControl>
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
          <FormControl>
          
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
          </FormControl>
          <VStack  space={2}  mt={5}>
          <Button isLoading={isLoading} isLoadingText="Submitting"  onPress={onSubmitHandler} _pressed={{bg: 'yellow.300'}} bg="yellow.500" _text={{color: 'black' }}>
              REGISTER
          </Button>

<HStack justifyContent="center" alignItem='center' >
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
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}