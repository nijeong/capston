import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, Button,Alert } from 'react-native';
import styles from '../style/LoginPageST';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const SignPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [isNameValid, setIsNameValid] = useState(true); // 아이디 중복 여부 상태 추가
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [preference, setPreference] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // 여기에 중복 확인을 위한 로직을 구현합니다.
  // 예를 들어, 클라이언트 측에서 중복을 확인할 수도 있고, 서버와 통신하여 확인할 수도 있습니다.
  const handleCheckDuplicate = async () => {
    try {
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // 중복된 이메일이 이미 존재할 때
        setIsNameValid(false);
        Alert.alert("이미 사용 중인 이메일입니다.");
      } else {
        // 중복되지 않은 이메일일 때
        setIsNameValid(true);
        Alert.alert("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.error("Error checking duplicate:", error);
    }
  };
  
  const onHandleSignup = async () => {
    try {
      await handleCheckDuplicate();
  
      if (isNameValid) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          displayName: name,
          email: email,
          uid: user.uid,
          preference: preference,
          createdAt: new Date().toUTCString(),
        });
        Alert.alert("회원가입이 완료되었습니다.");
        // 회원가입이 완료되면 LoginPage로 이동
        navigation.navigate('LoginPage', { preference });
      }
    } catch (error) {
      Alert.alert("이미 가입한 계정입니다.");
      navigation.navigate('LoginPage', { preference });
    }
  };
  

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
  };

  const handlePreferenceSelection = (selectedPreference) => {
    setPreference(selectedPreference);
    setModalVisible(false); // 선택 후 모달을 닫습니다.
  };

  

  return (
    <View style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
      <Text style={styles.label}>이메일 :</Text>
      <TextInput
        style={styles.input}
        placeholder="email를 입력해주세요"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
   </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호 :</Text>
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
  onPress={() => {
    onHandleSignup(); // 회원가입 처리
  }} 
> 
  <Text style={styles.signupButtonText}>가입하기</Text>
</TouchableOpacity>

      </View>
    </View>
  );
};

export default SignPage;
