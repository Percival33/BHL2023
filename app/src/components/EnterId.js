import {View, Text, StyleSheet, TextInput, Modal} from "react-native";
import Button from "./Button";
import colors from "../styles/colors";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setUserId} from "../store/slices/rootSlice";


export default function EnterId() {
    const [user, setUser] = useState('');
    const dispatch = useDispatch();

    return (
        <Modal>
            <View style={styles.container}>
                <Text style={styles.text}>Wprowadź swój identyfikator</Text>
                <TextInput
                    editable
                    numberOfLines={1}
                    maxLength={10}
                    onChangeText={text => setUser(text)}
                    placeholder={'np. 1234'}
                    style={styles.textInput}
                />
                <Button
                    isPrimary={true}
                    text={'Wejdź'}
                    color={colors.primaryBlue}
                    style={styles.button}
                    onPress={() => dispatch(setUserId(user))}/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        paddingVertical: 16,
        gap: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.primaryBlue,
        padding: 8,
        borderRadius: 16,
        width: '100%'
    },
    button: {
        width: '100%'
    }
});