import { Text, StyleSheet } from "react-native";
import Colors from "../../utils/colors";

function InstractionText({ children }) {
  return <Text style={styles.instructionText}>{children}</Text>;
}
export default InstractionText;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
});
