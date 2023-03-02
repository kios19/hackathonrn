import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import {
  Text,
  Input,
  Icon,
  Stack,
  Heading,
  FormControl,
  VStack,
  HStack,
  Button,
} from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { useToast } from "native-base";

interface Props {}

const Login: React.FC<Props> = () => {
  const toast = useToast();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hide, setHidden] = React.useState(true);
  const [usernameerror, setNameError] = React.useState(false);
  const [passworderror, setPaswordError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  interface Auth {
    password: string;
    username: string;
  }

  const userpassword = useSelector((state: Auth) => state.password);
  const myname = useSelector((state: Auth) => state.username);

  const toggleSecureEntry = () => {
    setHidden(!hide);
  };

  type IconProps = {
    name: string;
  };

  const renderIcon = (props: IconProps) => {
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={hide ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>;
  };

  interface Toastprops {
    description: string;
  }
  const showText = (props: Toastprops) => {
    toast.show({
      description: props.description,
    });
  };

  const validate = (name: String, password: String) => {
    setLoading(true);
    if (name.length <= 0) {
      setNameError(true);
      setLoading(false);
      return;
    }
    if (password.length <= 0) {
      setPaswordError(true);
      setLoading(false);
      return;
    } else {
      console.log("validation invalid");

      if (username != myname) {
        setLoading(false);
        showText({
          description: "invalid cridentials",
        });
      } else if (password != userpassword) {
        setLoading(false);
        showText({
          description: "invalid cridentials",
        });
      }
    }
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.topbbar}>
        <Heading>Login to proceed</Heading>
        <Stack space={4} style={styles.formcontainer}>
          <FormControl isRequired isInvalid={usernameerror}>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              placeholder="username"
              value={username}
              onChangeText={setUsername}
              variant="filled"
              //bg="#e0f1fd"
              style={{
                borderRadius: 10,
              }}
            ></Input>
            <FormControl.ErrorMessage>
              please check username.
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={passworderror}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              style={styles.spacer}
              placeholder="username"
              value={password}
              type="password"
              variant="filled"
              onChangeText={(it) => setPassword(it)}
            ></Input>
            <FormControl.ErrorMessage>
              invalid password
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            isLoading={loading}
            size="md"
            variant="solid"
            colorScheme="blue"
            style={styles.loginbutton}
            onPress={() => {
              validate(username, password);
              console.log(userpassword);
            }}
          >
            Proceed
          </Button>

          <HStack space={2} style={styles.centerhorizontal}>
            <TouchableWithoutFeedback>
              <Text fontSize="sm">Create new account?</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text color="#2537d8" bold fontSize="sm">
                Forgot password
              </Text>
            </TouchableWithoutFeedback>
          </HStack>
        </Stack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginbutton: {
    borderRadius: 10,
    marginTop: "5%",
  },
  centerhorizontal: {
    justifyContent: "center",
    width: "100%",
    marginTop: "4%",
  },
  topbbar: {
    width: "100%",
    marginTop: "50%",
    //alignItems: 'flex-end',
    flexDirection: "column",
  },
  maincontainer: {
    backgroundColor: "#Fff",
    height: "100%",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  formcontainer: {
    marginTop: "45%",
  },
  spacer: {
    marginTop: 10,
  },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "opensans-regular",
    color: "#8F9BB3",
  },
});
export default Login;
