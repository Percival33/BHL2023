import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "../styles/colors";

export default function Button(props) {
    const buttonStyle = props.isPrimary? {
        backgroundColor: props.color,
    } : {
        backgroundColor: '#FFFFFF',
        borderColor: props.color,
        borderWidth: 2,
    };

    const textStyle = props.isPrimary? {
        color: colors.white,
    } : {
        color: props.color,
    }

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} style={[styles.button, buttonStyle]}>
            <Text style={[styles.text, textStyle]}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Nunito-Regular',
        fontSize: 18
    },
    button: {
        borderRadius: 10,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    }
});