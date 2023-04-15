import {View, StyleSheet, Text} from "react-native";
import colors from "../styles/colors";

export default function Hint(props) {
    return (
      <View style={[styles.container, props.style || {}]}>
          <Text style={styles.text}>{props.text}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(66, 107, 251, 0.3)',
        padding: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.primaryBlue,
        fontFamily: 'Nunito-Bold',
        fontSize: 20
    }
});