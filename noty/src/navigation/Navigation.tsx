import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Param} from './types';

const Stack = createNativeStackNavigator<Param>();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="onboarding"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="onboarding" component={() => <></>} />
    </Stack.Navigator>
  );
};

export default Navigation;
