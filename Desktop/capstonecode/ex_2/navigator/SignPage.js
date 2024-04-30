import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, Button } from 'react-native';
import styles from '../style/LoginPageST';

const SignPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true); // 아이디 중복 여부 상태 추가
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [preference, setPreference] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
  };

  const handlePreferenceSelection = (selectedPreference) => {
    setPreference(selectedPreference);
    setModalVisible(false); // 선택 후 모달을 닫습니다.
  };

  const handleCheckDuplicate = () => {
    // 여기에 중복 확인을 위한 로직을 구현합니다.
    // 예를 들어, 클라이언트 측에서 중복을 확인할 수도 있고, 서버와 통신하여 확인할 수도 있습니다.
    console.log('중복 확인을 실행합니다.');
  };

  const handleSignUp = () => {
    // 중복 확인 후 유효한 아이디인 경우에만 회원가입을 처리합니다.
    // 아이디 중복 여부 등의 유효성 검사를 수행하고, 회원가입 요청을 보낼 수 있습니다.
    console.log('회원가입을 처리합니다.');
  };

  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>아이디:</Text>
        <TextInput
          style={styles.input}
          placeholder="숫자, 영어를 포함한 8~12자리"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        {/* 중복확인 버튼 */}
        <TouchableOpacity
          style={styles.checkDuplicateButton}
          onPress={handleCheckDuplicate}
        >
          <Text style={styles.checkDuplicateButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호:</Text>
        <TextInput
          style={styles.input}
          placeholder="숫자, 영어를 포함한 8~12자리"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true} // 비밀번호 입력 시 '*'로 표시
        />
      </View>

      <View style={styles.genderButtonsContainer}>
        <Text style={styles.label}>성별:</Text>
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

      <TouchableOpacity
        style={styles.preferenceContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.label}>성향:</Text>
        <View style={[styles.preferenceBox, preference && styles.preferenceSelected]}>
          <Text style={styles.preferenceText}>{preference || '성향을 입력하세요'}</Text>
        </View>
      </TouchableOpacity>

      {/* 성향 선택 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>성향을 선택하세요</Text>
            <TouchableOpacity
              style={styles.preferenceButton}
              onPress={() => handlePreferenceSelection('추위를 잘타요')}
            >
              <Text style={styles.preferenceButtonText}>추위를 잘타요</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.preferenceButton}
              onPress={() => handlePreferenceSelection('보통')}
            >
              <Text style={styles.preferenceButtonText}>보통</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.preferenceButton}
              onPress={() => handlePreferenceSelection('더위를 잘타요')}
            >
              <Text style={styles.preferenceButtonText}>더위를 잘타요</Text>
            </TouchableOpacity>
            <Pressable
              style={[styles.preferenceButton, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignUp} // 회원가입 처리 함수 호출
        >
          <Text style={styles.signupButtonText}>가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignPage;
