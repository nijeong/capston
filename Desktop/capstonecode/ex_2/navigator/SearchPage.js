import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import axios from 'axios';

const API_KEY = '4d55c2d1351bd6334eb6060cc0811905'; // OpenWeatherMap API 키 입력

const SearchPage = ({ navigation }) => {
  const [newLocation, setNewLocation] = useState('');
  const [locations, setLocations] = useState([]);

  // 사용자 친화적인 지역 이름으로 변환하는 함수
  const transformLocationName = (location) => {
    const locationMap = {
      "Daegu": "대구",
      "Chuncheon": "춘천",
      "Seoul": "서울",
      "incheon": "인천"
      // 필요한 다른 지역들을 여기에 추가할 수 있습니다.
    };
    return locationMap[location] || location;
  };

  const fetchWeatherData = async (location) => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
      const temperature = response.data.main.temp.toFixed(0);
      const transformedLocation = transformLocationName(location); // 지역 이름 변환
      const newLocationInfo = { name: transformedLocation, temperature: temperature };
      setLocations([...locations, newLocationInfo]);
      setNewLocation('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = () => {
    fetchWeatherData(newLocation);
  };

  const handleDelete = (index) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  const handleLocationPress = (location) => {
    navigation.navigate('SecondPage', { location });
  };

  const handleManageLocations = () => {
    // '지역 관리' 버튼이 눌렸을 때 처리할 내용을 작성합니다.
    // 예를 들어, navigation.navigate를 사용하여 지역 관리 페이지로 이동합니다.
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/sample4.png")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.text}>다른 지역 날씨</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="지역 이름을 입력하세요"
            onChangeText={text => setNewLocation(text)}
            value={newLocation}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>추가</Text>
          </TouchableOpacity>
          
        </View>
        <View style={[styles.separator, {borderStyle: 'dashed'}]}></View>
        <FlatList
          data={locations}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleLocationPress(item.name)}>
              <View style={styles.locationItem}>
                <Text style={styles.locationText}>{item.name}: {item.temperature} °C</Text>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Text style={styles.deleteButton}>삭제</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* '지역 관리' 버튼 */}
        <TouchableOpacity style={styles.manageButton} onPress={handleManageLocations}>
          <Text style={styles.manageButtonText}>지역 관리</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 10, // 동그란 모양으로 변경
    borderWidth: 1, // 테두리 두께를 1로 설정
    borderColor: 'black', // 테두리 색상을 검정색으로 설정
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
    marginHorizontal: -20,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 5,
  },
  locationText: {
    fontSize: 19,
  },
  deleteButton: {
    color: 'red',
  },
  background: {
    width: "100%",
    height: "100%",
  },
  // '지역 관리' 버튼 스타일
  manageButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 20, // 동그란 모양으로 변경
    marginTop: 20,
    marginBottom:10,
    alignItems: 'center',
  },
  manageButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default SearchPage;