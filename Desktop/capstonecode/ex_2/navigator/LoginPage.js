import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, Button, ImageBackground, Image } from 'react-native';
import styles from '../style/LoginPageST';

const LoginPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const handleNext = () => {
    // "다음" 버튼이 클릭되었을 때 실행되는 함수
    // 이곳에 "다음" 버튼이 눌렸을 때의 동작을 추가하세요.
    // 예를 들어, 다음 화면으로 이동하는 등의 동작을 수행할 수 있습니다.
    console.log('다음 버튼이 클릭되었습니다.');
  };

  return (
      
    <View style={styles.container}>
      <Text style={styles.welcomeText}>환영합니다!</Text>
      <Text style={styles.subText}>아래 정보를 입력하세요</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true} // 비밀번호 입력 시 '*'로 표시
        />
      </View>
    
      
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('SignPage')}
      >
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('SecondPage', { userName: name })}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      </View>
    </View>
    

    
      )
};



export default LoginPage;






