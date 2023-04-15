import {View, StyleSheet, Text} from "react-native";
import colors from "../styles/colors";

export default function NextStep(props) {
    const bullet = '\u2022';

    return (
        <View style={[styles.container, props.style || {}]}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.descriptionContainer}>
                {
                    props.children.map((obj, idx) =>
                        <Text key={idx} style={styles.descriptionText}>{bullet} {obj}</Text>
                    )
                }
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
        fontSize: 28,
        marginBottom: 8
    },
    descriptionContainer: {
    },
    descriptionText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 22,
    },
});