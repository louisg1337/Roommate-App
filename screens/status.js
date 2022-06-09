import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Status() {
  return (
    <View style={styles.container}>
      <Text>Hello Status Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F0EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
