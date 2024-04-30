import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';

const SettingPage = ({ route, navigation }) => {
  const { userName: initialName, userGender: initialGender, userPreference: initialPreference } = route.params;
  const [name, setName] = useState(initialName);
  const [gender, setGender] = useState(initialGender);
  const [preference, setPreference] = useState(initialPreference);

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
  };

  const handlePreferenceSelection = (selectedPreference) => {
    setPreference(selectedPreference);
  };

  const handleSave = () => {
    console.log('저장 버튼이 클릭되었습니다.');
    console.log('수정된 이름:', name);
    console.log('수정된 성별:', gender);
    console.log('수정된 체질:', preference);

    // 수정된 정보를 저장한 후에 다시 SecondPage로 이동합니다.
    navigation.navigate('SecondPage', { userName: name, userGender: gender, userPreference: preference });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>나의 정보</Text>
      <View style={styles.divider} />

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>이름:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      
      </View>
      <View style={styles.divider} />
    

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>성별:</Text>
        <View style={styles.genderButtonsContainer}>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'male' && styles.maleButton]}
            onPress={() => handleGenderSelection('male')}
          >
            <Text style={styles.genderButtonText}>남</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'female' && styles.femaleButton]}
            onPress={() => handleGenderSelection('female')}
          >
            <Text style={styles.genderButtonText}>여</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>체질:</Text>
        <View style={styles.preferenceButtonsContainer}>
          <TouchableOpacity
            style={[styles.preferenceButton, preference === '추위를 잘타요' && styles.selectedPreferenceButton]}
            onPress={() => handlePreferenceSelection('추위를 잘타요')}
          >
            <Text style={styles.preferenceButtonText}>추위를 잘타요</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.preferenceButton, preference === '보통' && styles.selectedPreferenceButton]}
            onPress={() => handlePreferenceSelection('보통')}
          >
            <Text style={styles.preferenceButtonText}>보통</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.preferenceButton, preference === '더위를 잘타요' && styles.selectedPreferenceButton]}
            onPress={() => handlePreferenceSelection('더위를 잘타요')}
          >
            <Text style={styles.preferenceButtonText}>더위를 잘타요</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
  <Text style={styles.buttonText}>저장</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    
    paddingHorizontal: 20,
    paddingTop: 50, // 맨 위에서부터 채우기 위한 패딩 추가
  },
  title: {
    fontSize: 30,
    
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '120%',
    
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  genderButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  genderButton: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  maleButton: {
    backgroundColor: 'lightblue',
  },
  femaleButton: {
    backgroundColor: 'pink',
  },
  genderButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
  preferenceButtonsContainer: {
    flexDirection: 'row',
  },
  preferenceButton: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedPreferenceButton: {
    backgroundColor: 'lightgreen',
  },
  preferenceButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    backgroundColor: 'rgba(0, 122, 255, 1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center', // 좌측 정렬
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SettingPage;