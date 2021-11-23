import React, { useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  useToast,
} from "native-base";
import authStore from "../../store/authStore";

const Signin = ({ navigation }) => {
  const toast = useToast();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    authStore.signin(user, navigation, toast);
    navigation.replace("Home");
  };
  return (
    <Center flex={1} px="3">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          You have to sign in to continue.
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              onChangeText={(username) => setUser({ ...user, username })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={(password) => setUser({ ...user, password })}
            />
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={handleSubmit}
            backgroundColor="#0000ff"
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Signup")}
            >
              Sign up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signin;

// export default () => {
//   return (
//     <NativeBaseProvider>
//       <Center flex={1} px="3">
//         <Example />
//       </Center>
//     </NativeBaseProvider>
//   )
// }
