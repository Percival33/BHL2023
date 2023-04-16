import {View, StyleSheet, Text} from "react-native";
import colors from "../styles/colors";

export default function NewTask(props) {
    const receivedHours = props.receivedAt[0] || 'XX';
    const receivedMinutes = props.receivedAt[1] || 'XX';
    const receivedStr = receivedHours + ':' + receivedMinutes;

    return (
        <View style={[styles.container, props.style || {}]}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                    Numer zlecenia: #{props.taskId}
                </Text>
                <Text style={styles.descriptionText}>
                    To zadanie otrzymałeś o <Text style={styles.receivedText}>{receivedStr}</Text>.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(113, 157, 250, 0.1)',
        borderWidth: 2,
        borderColor: colors.primaryBlue,
        borderRadius: 20,
        width: '100%',
        height: '100%',
        padding: 16,
    },
    title: {
        fontFamily: 'Nunito-Bold',
        fontSize: 24,
        marginBottom: 8
    },
    descriptionContainer: {
    },
    descriptionText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 18,
    },
    receivedText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
    }
});