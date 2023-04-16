import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./screens/Home";
import Task from "./screens/Task";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {View, StyleSheet} from "react-native";
import colors from "./styles/colors";
import WebSocketProvider from "./websocket";
import {useSelector} from "react-redux";
import EnterId from "./components/EnterId";


const Stack = createNativeStackNavigator();

export default function Main() {
    const insets = useSafeAreaInsets();
    const userId = useSelector(state => state.root.userId);

    if(!userId) {
        return (
            <EnterId />
        );
    }

    return (
        <View
            style={[
                styles.container,
                {marginTop: insets.top, marginBottom: insets.bottom, marginLeft: insets.left, marginRight: insets.right}]
        }>
            <WebSocketProvider userId={userId}>
                <Stack.Navigator initialRouteName={'Home'} screenOptions={{headerShown: false}}>
                    <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='Task' component={Task} />
                </Stack.Navigator>
            </WebSocketProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
});