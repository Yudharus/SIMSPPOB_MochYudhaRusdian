import React, { Fragment, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, StatusBar, Alert } from 'react-native';
import Splash from '../screens/Splash.screens';
import { Provider } from 'react-redux';
import Redux from '../configs/redux/Redux.config';
import {
  navigationRef,
  isReadyRef,
} from '../libs/helpers/RootNavigation';
import Login from '../screens/Login.screens';
import Register from '../screens/Register.screens';
import Homepage from '../screens/Homepage.screens';
import Pembayaran from '../screens/Pembayaran.screens';
import TopUp from '../screens/TopUp.screens';
import Transaction from '../screens/Transaction.screens';
import Akun from '../screens/Akun.screens';

const Stack = createNativeStackNavigator();

const Core = () => {
  LogBox.ignoreAllLogs(true);

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <Fragment>
      <Provider store={Redux}>
        <StatusBar backgroundColor={'#467D7F '} translucent={false} />

        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: true,
              animation: 'none',
            }}>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Homepage"
              component={Homepage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Pembayaran"
              component={Pembayaran}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TopUp"
              component={TopUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Transaction"
              component={Transaction}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Akun"
              component={Akun}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </Fragment>
  );
};

export default Core;
