import {View, StyleSheet, Text, Modal, TouchableOpacity, TextInput, Alert} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {useContext, useState} from "react";

import colors from "../styles/colors";
import {BarCodeScanner} from "expo-barcode-scanner";
import Hint from "./Hint";
import Button from "./Button";
import {WebSocketContext} from "../websocket";


export default function DefectModal(props) {
    const [stage, setStage] = useState(0);
    const [defectedItemId, setDefectedItemId] = useState(null);
    const [defectDescription, setDefectDescription] = useState('');
    const wsHandler = useContext(WebSocketContext);

    const handleClose = () => {
        setStage(0);
        setDefectedItemId(null);
        setDefectDescription('Opis usterki');
        props.onClose();
    }

    const handleBarCodeScanned = ({ data }) => {
        let json;
        try {
            json = JSON.parse(data);
        } catch(err) {
            console.log(err);
            return;
        }

        if(json && json.i !== undefined) {
            setDefectedItemId(json.i);
            setStage( 1);
        }
    }

    const handleSubmit = () => {
        wsHandler.send(JSON.stringify({
            type: "defect",
            item_id: defectedItemId,
            content: defectDescription,
        }));
        handleClose();
        Alert.alert('Potwierdzenie', 'Prawidłowo zgłoszono usterkę')
    }

    return (
        <Modal
            animationType="slide"
            visible={props.visible}
            onClose={props.onClose}
        >
            <View style={[styles.container, {padding: 8}]}>
                <View style={styles.onCloseContainer}>
                    <TouchableOpacity onPress={handleClose} activeOpacity={0.6}>
                        <AntDesign name="close" size={36} color={colors.secondaryGrey} />
                    </TouchableOpacity>
                </View>
                <View style={styles.hintContainer}>
                    <Hint text={'Zeskanuj uszkodzony produkt'} style={{maxWidth: '95%'}}/>
                </View>
                <View style={styles.contentContainer}>
                    {
                        (stage === 0)?
                            <BarCodeScanner
                                style={styles.barCode}
                                onBarCodeScanned={handleBarCodeScanned}
                            /> : null
                    }
                    {
                        (stage === 1)?
                            <View style={{width: '100%', gap: 16}}>
                                <Text style={styles.formProductId}>Kod produktu: #{defectedItemId.toString()}</Text>
                                <TextInput
                                    editable
                                    multiline
                                    numberOfLines={4}
                                    maxLength={160}
                                    value={defectDescription}
                                    onChangeText={text => setDefectDescription(text)}
                                    placeholder={'Opis usterki'}
                                    style={styles.defectDescription}
                                />
                                <Button
                                    color={colors.primaryBlue}
                                    isPrimary={true}
                                    text={'Zatwierdź'}
                                    onPress={handleSubmit}
                                />
                            </View> : null
                    }
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    onCloseContainer: {
        alignItems: 'flex-end',
    },
    hintContainer: {
        marginTop: 8
    },
    contentContainer: {
        marginTop: 16,
        borderRadius: 20,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    barCode: {
        width: '100%',
        height: '80%',
        borderWidth: 2,
        padding: 10
    },
    defectDescription: {
        borderWidth: 1,
        borderColor: colors.primaryBlue,
        fontSize: 16,
        width: '100%',
        borderRadius: 10,
        padding: 4,
        fontFamily: 'Nunito-Regular',
    },
    formProductId: {
        fontSize: 20,
        fontFamily: 'Nunito-Regular',
    }
});