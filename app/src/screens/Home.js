import {View, StyleSheet} from "react-native";
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
                <View style={styles.hintContainer}>
                    <Hint text={'Aktualnie nie masz żadnych zadań'} style={styles.hint}/>
                </View>
            </View>
        );

    const dateStarted = new Date(currentTask.date_started);

    return (
        <View style={styles.container}>
            <View style={styles.hintContainer}>
                <Hint text={'Twoje następne zadanie'} style={styles.hint}/>
            </View>
            <View style={styles.taskContainer}>
                <NewTask
                    taskId={currentTask.id}
                    title={'Skompletuj zlecenie'}
                    receivedAt={[dateStarted.getHours(), dateStarted.getMinutes()]}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    color={colors.primaryBlue}
                    isPrimary={true}
                    text={'Rozpocznij'}
                    onPress={() => {
                        navigation.push('Task', {
                            'task': currentTask,
                        })
                    }
                }/>
                <Button color={colors.primaryBlue} isPrimary={false} text={'Zobacz szczegóły'}/>
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