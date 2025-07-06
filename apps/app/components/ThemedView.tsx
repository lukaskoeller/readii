import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  padding?: number;
};

export function ThemedView({ padding, style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  return <View style={[style, { padding }]} {...otherProps} />;
}
