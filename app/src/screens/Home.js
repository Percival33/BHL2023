import {View, StyleSheet, Text} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import Hint from "../components/Hint";
import Button from "../components/Button";
import colors from "../styles/colors";
import NewTask from "../components/NewTask";
import task from "../data"
import {useState, useEffect, useRef, useContext} from "react";
import {WebSocketContext} from "../websocket";


export default function Home({route, navigation}) {
    const [currentTask, setCurrentTask] = useState(task);
    const wsHandler = useContext(WebSocketContext);


    if(!currentTask)
        return (
            <View style={styles.container}>
                <View style={styles.hintContainer}>
                    <Hint text={'Aktualnie nie masz żadnych zadań'} style={styles.hint}/>
                </View>
            </View>
        );

    return (
        <View style={styles.container}>
            <View style={styles.hintContainer}>
                <Hint text={'Twoje następne zadanie'} style={styles.hint}/>
            </View>
            <View style={styles.taskContainer}>
                <NewTask
                    taskId={currentTask.id}
                    title={'Skompletuj zlecenie'}
                    receivedAt={[12, 46]}
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