//ThirdPage
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getOutfitForTemperature } from '../Clothes';
import * as Location from 'expo-location';



const ThirdPage = ({ route }) => {
  const { userName, preference } = route.params;
  const [currentTemperature, setCurrentTemperature] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Location permission denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${'4d55c2d1351bd6334eb6060cc0811905'}&units=metric`;
        let response = await fetch(apiUrl);
        let data = await response.json();
        setCurrentTemperature(data.main.temp);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    })();
  }, []);

  const adjustTemperatureForPreference = (temperature, preference) => {
    if (preference === '추위를 잘타요') {
      return (temperature -3);
    } else if (preference === '더위를 잘타요') {
      return (temperature +3);
    } else {
      return temperature;
    }
  };

  const recommendOutfit = (temperature) => {
    temperature = adjustTemperatureForPreference(temperature, preference);
    const outfit = getOutfitForTemperature(temperature);
    if (!outfit) {
      return (
        <View style={styles.outfitContainer}>
          <Text style={styles.outfitTitle}>추천 옷차림 정보가 없습니다.</Text>
        </View>
      );
    }
    return (
      <View style={styles.outfitContainer}>
        <Text style={styles.outfitTitle}></Text>
        {Object.keys(outfit).map((key) => (
          <View key={key} style={styles.outfitSection}>
            <Text style={styles.sectionTitle}>{key}</Text>
            <View style={styles.clothesList}>
              {outfit[key].icons.map((icon, index) => (
                <View key={index} style={[styles.clothesItem, index !== outfit[key].icons.length - 1 && { marginRight: 20 }]}>
                  <Image source={icon} style={styles.icon} />
                  <Text style={styles.clothesName}>{outfit[key].names[index]}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>오늘의 옷차림</Text>
      <View style={styles.divider}></View>
      {currentTemperature !== null && recommendOutfit(currentTemperature)}
    </View>
  );
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#CEE3F6', 
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
    marginBottom: 0,
  },
  outfitContainer: {
    marginTop: 20,
    
  },
  outfitTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'center'
    
    
  },
  outfitSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  clothesList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clothesItem: {
    
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  clothesName: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 5,
  },
});




export default ThirdPage;
