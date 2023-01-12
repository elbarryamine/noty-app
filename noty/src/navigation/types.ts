import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type ParamRoot = {
  onboarding: undefined;
  auth: {screen?: keyof {}};
  app: {screen?: keyof {}; params?: {screen?: keyof {}}};
};

export type Param = ParamRoot;
/**
 * ParamRoot
 */
export type OnBoardingProps = NativeStackScreenProps<Param, 'onboarding'>;
