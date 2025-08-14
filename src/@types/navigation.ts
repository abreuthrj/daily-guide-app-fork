import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ParamList<T> = {
  [k: string]: T;
};

export type Screen<T extends object | undefined = object> = React.FC<{
  navigation: StackNavigationProp<
    ParamList<object | undefined>,
    string,
    undefined
  >;
  route: RouteProp<ParamList<T>, string>;
}>;
