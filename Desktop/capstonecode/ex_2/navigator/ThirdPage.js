import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ThirdPage = ({ route }) => {
  const { userName } = route.params;
  const navigation = useNavigation();

  const handleOtherTimeOutfit = () => {
    navigation.navigate('ThirdPage2');
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/sample4.png")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.userName}>{`${userName}님!`}</Text>
        <Text style={styles.welcomeText}>다음과 같은 옷을 추천드려요</Text>
        <View style={styles.divider}></View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.otherTimeButton} onPress={handleOtherTimeOutfit}>
          <Text style={styles.otherTimeButtonText}>다른 시간 옷차림</Text>
        </TouchableOpacity>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginBottom: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 20,
  },
  otherTimeButton: {
    backgroundColor: 'lightblue',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  otherTimeButtonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default ThirdPage;
