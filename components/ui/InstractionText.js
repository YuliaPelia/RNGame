import { Text, StyleSheet } from "react-native";
import Colors from "../../utils/colors";

function InstractionText({ children, style }) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}



export default InstractionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});
