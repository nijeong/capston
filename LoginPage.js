import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import styles from '../style/LoginPageST';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginPage = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    
    // useRef를 사용하여 preferenceRef 변수 생성
    const preferenceRef = useRef(null);

    useEffect(() => {
        if (route.params && route.params.preference) {
            const { preference } = route.params;
            preferenceRef.current = preference; // preference 값을 useRef로 저장
        }
    }, [route.params]);

    const onHandleLogin = async (e) => {
        e.preventDefault();

        if (!(email && password)) {
            return alert("빈칸을 채워주세요.");
        }

        // preference 값을 useRef를 통해 가져옴
        const preference = preferenceRef.current;

        // 정상 입력시 firebase 인증 진행
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert(`환영합니다.`);
            // 로그인 완료시 home으로 이동
            navigation.navigate('SecondPage', { userName: email, preference });
        } catch (err) {
            if (err.code === "auth/user-not-found") {
                setErrorMsg("존재하지 않는 이메일 입니다.");
            } else if (err.code === "auth/wrong-password") {
                setErrorMsg("비밀번호가 일치하지 않습니다.");
            } else {
                setErrorMsg("로그인 실패하였습니다.");
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setErrorMsg("");
        }, 4000);
    }, [errorMsg]);

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    };

    const handleLogout = () => {
        auth.signOut();
    };

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("user", user);
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.welcomeText}>환영합니다!</Text>
            <Text style={styles.subText}>아래 정보를 입력하세요</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="이메일"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true} // 비밀번호 입력 시 '*'로 표시
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            {/* 에러 메시지 표시 */}
            {errorMsg !== "" && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMsg}</Text>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => navigation.navigate('SignPage')}
                >
                    <Text style={styles.signupButtonText}>회원가입</Text>
                </TouchableOpacity>
            </View>

            {/* 로그인 버튼 */}
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={onHandleLogin}
                >
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.loginButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ margin: 20 }}>
                유저이메일 결과 확인: {user ? user.email : "로그인 아웃 중"}
            </Text>
        </KeyboardAvoidingView>
    );
};

export default LoginPage;
