import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 150
    },
    logo: {
      width: 200,
      height: 150,
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 38,
      fontWeight: 'bold',
      marginBottom: 10,
      
    },
    subText: {
      fontSize: 28,
      marginBottom: 70,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 50,
    },
    label: {
      fontSize: 20,
      marginRight: 10,
    },
    input: {
      width: '70%',
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    genderButtonsContainer: {
      width:'80%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 50,
    },
    genderButton: {
      
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginRight: 0,
    },
    maleButton: {
      backgroundColor: 'lightblue', // 남자 선택 시 배경색
    },
    femaleButton: {
      backgroundColor: 'pink', // 여자 선택 시 배경색
    },
  
    selectedGenderButton: {
      backgroundColor: '#007AFF',
    },
    genderButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    preferenceContainer: {
      width:'80%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 80,
    },
    preferenceBox: {
      width: 120,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    preferenceSelected: {
      
    },
    preferenceText: {
      fontSize: 14,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    preferenceButton: {
      backgroundColor: '#DDDDDD',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
    },
    preferenceButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      marginTop: 20,
    },
    signupButton: {
      backgroundColor: '#DDDDDD',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'black',
    },
    signupButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    loginButton: {
      backgroundColor: '#DDDDDD',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'black',
    },
    loginButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
});

export default styles;
