import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Param} from './types';
import OnBoardingScreen from '@screens/onboarding/OnBoardingScreen';

const Stack = createNativeStackNavigator<Param>();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="onboarding"
      screenOptions={{headerShown: true}}>
      <Stack.Screen name="onboarding" component={OnBoardingScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
