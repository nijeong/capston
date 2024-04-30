import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const ThirdPage2 = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/sample4.png")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>다른 시간대 옷차림도 알려드려요</Text>
        <View style={styles.divider}></View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // 수정된 부분
    alignItems: 'center',
    marginTop: 70, // 수정된 부분
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginBottom: 20,
    marginTop: 10
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ThirdPage2;
