import {StyleSheet, View, Text} from "react-native";
import Hint from "../components/Hint";
import NewTask from "../components/NewTask";
import Button from "../components/Button";
import colors from "../styles/colors";

export default function Task({route, navigation}) {
    return (
        <View style={[
            styles.container,
        ]}>
            <View style={styles.hintContainer}>
                <Hint text={'Następny krok'} style={styles.hint}/>
            </View>
            <View style={styles.taskContainer}>
                <Text>dsadass</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button color={colors.primaryBlue} isPrimary={true} text={'Jestem na miejscu'}/>
                <Button color={colors.primaryRed} isPrimary={false} text={'Zgłoś usterkę'}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        paddingVertical: 16
    },
    hintContainer: {
        flex: 1,
    },
    hint: {
        maxWidth: 300,
    },
    taskContainer: {
        flex: 6,
    },
    buttonsContainer: {
        flex: 2,
        gap: 8,
        justifyContent: 'center',
    }
});