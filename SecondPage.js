//SecondPage
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

const API_KEY = 'b69c4e6c78f3a5453e74fb6635e1bc13';
const API_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

const SecondPage = ({ navigation, route }) => {
  
  const { userName, userGender,preference } = route.params;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    const getLocationWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Location permission not granted');
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const response = await axios.get(`${API_URL}&lat=${latitude}&lon=${longitude}&units=metric`);
        setWeatherData(response.data);
        setLoading(false);

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        setCurrentDate(`${month}월 ${date}일`);
        setCurrentTime(`${hours}:${minutes}`);

        setLocationName(response.data.city.name); // 위치 정보의 지역 이름 설정
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    getLocationWeather();
  }, []);

  const renderHourlyForecast = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const hourlyForecast = [];

    for (let i = 1; i <= 24; i++) {
      const hour = (currentHour + i) % 24; // 현재 시간을 기준으로 24시간 후까지의 시간대 계산
      const forecastItem = weatherData.list.find(item => {
        const itemDate = new Date(item.dt * 1000);
        return itemDate.getHours() === hour;
      });

      if (forecastItem) {
        const temperature = forecastItem.main.temp.toFixed(0);
        const weatherIcon = forecastItem.weather[0].icon;
        hourlyForecast.push(
          <View key={i} style={styles.forecastItem}>
            <Text style={styles.forecastDate}>{`${hour}시`}</Text>
            <Image
              style={styles.weatherIcon}
              source={{ uri: `http://openweathermap.org/img/w/${weatherIcon}.png` }}
            />
            <Text style={styles.forecastTemperature}>{`${temperature}°C`}</Text>
          </View>
        );
      }
    }

    return hourlyForecast;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>날씨 정보를 가져오는 데 문제가 발생했습니다.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("../assets/sample6.png")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* SettingPage로 이동하는 버튼 */}
        <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate('SettingPage', { userName, userGender, userPreference })}>
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>
  
        {/* SearchPage로 이동하는 버튼 */}
        <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('SearchPage')}>
          <MaterialIcons name="search" size={24} color="white" />
        </TouchableOpacity>
  
        <View style={styles.topContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.currentDate}>{currentDate}</Text>
            <View style={styles.location}>
              <MaterialIcons name="location-on" size={24} color="white" />
              <Text style={styles.locationText}>{locationName}</Text>
            </View>
          </View>
          <View style={styles.currentWeatherContainer}>
            <Text style={styles.temperature}>{weatherData.list[0].main.temp.toFixed(0)}°C</Text>
          </View>
        </View>
  
        {/* 시간별 날씨 섹션 */}
        <View style={styles.divider} />
        <View style={[styles.titleContainer, styles.hourlyTitleContainer]}>
          <Text style={styles.sectionTitle}>시간별 날씨</Text>
        </View>
        <View style={styles.divider} />
  
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hourlyForecastContainer}>
          {renderHourlyForecast()}
        </ScrollView>
  
        {/* 주간 날씨 섹션 */}
        <View style={styles.divider} />
        <View style={[styles.titleContainer, styles.dailyTitleContainer]}>
          <Text style={styles.sectionTitle}>주간 날씨</Text>
        </View>
        <View style={styles.divider} />
  
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dailyForecastContainer}>
          {weatherData.list.map((item, index) => {
            if (index % 8 === 0) { // 각 날의 첫 번째 시간마다 날씨 정보 표시
              const date = new Date(item.dt * 1000);
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const weatherIcon = item.weather[0].icon;
              const minTemp = findMinTemperature(weatherData.list, item.dt);
              const maxTemp = findMaxTemperature(weatherData.list, item.dt);
              return (
                <TouchableOpacity key={index} style={styles.forecastItem}>
                  <View style={styles.forecastBox}>
                    <Text style={styles.forecastDate}>{`${month}월 ${day}일`}</Text>
                    <ImageBackground
                      style={styles.weatherIcon}
                      source={{ uri: `http://openweathermap.org/img/w/${weatherIcon}.png` }}
                    />
                    <Text style={styles.forecastTemperature}>{`${minTemp}°C\n${maxTemp}°C`}</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
  
        {/* 오늘의 옷차림 버튼 */}
        <TouchableOpacity onPress={() => navigation.navigate('ThirdPage', { preference })}>
          <Text style={styles.button}>오늘의 옷차림</Text>
        </TouchableOpacity>
  
      </View>
    </ImageBackground>
  );
};

const findMinTemperature = (list, date) => {
  let minTemp = Infinity;
  list.forEach(item => {
    if (item.dt >= date && item.dt < date + 86400) {
      minTemp = Math.min(minTemp, item.main.temp_min);
    }
  });
  return minTemp.toFixed(0);
};

const findMaxTemperature = (list, date) => {
  let maxTemp = -Infinity;
  list.forEach(item => {
    if (item.dt >= date && item.dt < date + 86400) {
      maxTemp = Math.max(maxTemp, item.main.temp_max);
    }
  });
  return maxTemp.toFixed(0);
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 'auto',
    marginRight: 10,
  },
  temperature: {
    fontSize: 70,
    color: 'white',
    marginBottom: 30
  },
  currentDate: {
    fontSize: 20,
    color: 'white',
    marginRight: 10,
  },
  currentTime: {
    fontSize: 70,
    marginTop: 0,
    color: 'white',
  },
  locationText: {
    color: 'white',
    marginLeft: 5,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius:10,
    marginTop: 20,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'underline',
  },
  currentWeatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // 온도와 다음 섹션 간의 간격 추가
  },
  hourlyForecastContainer: {
    alignItems: 'center',
    marginTop: 0, // 시간별 날씨 섹션과 다음 섹션 간의 간격 추가
  },
  dailyForecastContainer: {
    alignItems: 'flex-start', // 왼쪽 정렬
    marginTop: 0,
  },
  forecastItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  forecastBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  forecastDate: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  forecastTemperature: {
    fontSize: 16,
    color: 'white',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 10, // 적절한 간격 설정
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  hourlyTitleContainer: {
    alignItems: 'flex-start',
    marginLeft: 30

  },
  dailyTitleContainer: {
    alignItems: 'flex-start',
    marginLeft: 30
  },
  topContainer: {
    alignItems: 'center', // 센터 정렬
  },
  settingButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  searchButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1,
  },
});

export default SecondPage;
