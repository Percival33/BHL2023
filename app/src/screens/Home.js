import {View, StyleSheet, Text} from "react-native";
import {useSelector} from "react-redux";

import Hint from "../components/Hint";
import Button from "../components/Button";
import colors from "../styles/colors";
import NewTask from "../components/NewTask";


export default function Home({route, navigation}) {
    const currentTask = useSelector(state => state.root.currentTask);

    if(!currentTask)
        return (
            <View style={styles.container}>
                <View style={{}}>
                    <Hint text={'Czekaj na nowe zadania 👋'} style={styles.hint}/>
                </View>
                <View style={{alignItems: 'center', marginTop: '50%'}}>
                    <Text style={styles.textStyle}>Brak nowych zleceń ✅</Text>
                </View>
            </View>
        );

    const dateStarted = new Date(currentTask.record.date_started);
    const hours = dateStarted.getHours().toString();
    const minutes = dateStarted.getMinutes().toString();

    return (
        <View style={styles.container}>
            <View style={styles.hintContainer}>
                <Hint text={'Twoje następne zadanie'} style={styles.hint}/>
            </View>
            <View style={styles.taskContainer}>
                <NewTask
                    taskId={currentTask.record_id}
                    title={'Skompletuj zlecenie'}
                    receivedAt={[
                        (hours.length===1)? `0${hours}` : hours,
                        (minutes.length===1)? `0${minutes}` : minutes,
                    ]}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    color={colors.primaryBlue}
                    isPrimary={true}
                    text={'Rozpocznij'}
                    onPress={() => navigation.push('Task', {'task': currentTask})
                }/>
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
    },
    textStyle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 26,
    }
});