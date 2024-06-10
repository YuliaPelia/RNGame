import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

//! TextInput - Цей компонент дозволяє користувачеві вводити текстові дані на екрані пристрою. Він може бути використаний для введення тексту, паролів, адрес електронної пошти та інших даних.

//! View - Цей компонент використовується для групування і розміщення інших компонентів. Він відповідає за створення контейнера, який може містити інші компоненти.

//! Alert - Цей API дозволяє відображати модальні діалогові вікна на екрані пристрою. Вони можуть бути використані для попередження користувача про помилку або попередження про важливі події.

//! useWindowDimensions - Цей хук повертає об'єкт, який містить ширину та висоту вікна пристрою в логічних пікселях. Це корисно для створення адаптивного дизайну, який залежить від розміру екрану пристрою.

//! KeyboardAvoidingView - Цей компонент автоматично змінюватиме свою висоту, положення або нижній відступ залежно від висоти клавіатури, щоб залишатися видимим під час відображення віртуальної клавіатури. Це особливо корисно для уникнення перекриття вмісту клавіатурою, наприклад, коли ви використовуєте TextInput.

//! ScrollView - Цей компонент дозволяє створювати прокручувані контейнери для відображення великої кількості даних на екрані пристрою. Він автоматично додає полоси прокрутки, якщо вміст не вміщується на екрані.

import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

//? StartGameScreen - Цей компонент відповідає за відображення екрану вибору числа. Він містить текстове поле для введення числа, а також кнопки для скидання та підтвердження введеного числа.

// onPickNumber - Ця функція викликається при підтвердженні введеного числа. Вона приймає вибране число як аргумент.
function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  //? numberInputHandler - Ця функція викликається при зміні вмісту текстового поля для введення числа. Вона оновлює стан введеного числа з новим значенням.
  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  // використовується для отримання ширини та висоти вікна пристрою
  const { width, height } = useWindowDimensions();

  // resetInputHandler - Ця функція викликається при натисканні кнопки "Скинути". Вона скидає введене число.
  function resetInputHandler() {
    setEnteredNumber("");
  }

  // confirmInputHandler - Ця функція викликається при натисканні кнопки "Підтвердити". Вона перевіряє, чи введене число є дійсним числом в діапазоні від 1 до 99, а потім викликає функцію onPickNumber з вибраним числом як аргумент.

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    // перевірка, чи введене число є дійсним числом в діапазоні від 1 до 99
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    // виклик функції onPickNumber з вибраним числом як аргумент
    onPickNumber(chosenNumber);
  }

  // визначення відступу від верхнього краю екрану в залежності від висоти пристрою

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,

    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
