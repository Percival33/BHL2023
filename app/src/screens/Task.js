import {StyleSheet, View, Text, Alert} from "react-native";
import {useContext, useEffect, useState} from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';

import Hint from "../components/Hint";
import Button from "../components/Button";
import colors from "../styles/colors";
import NextStep from "../components/NextStep";
import DefectModal from "../components/DefectModal";
import {useDispatch, useSelector} from "react-redux";
import {finishCurrentTask} from "../store/slices/rootSlice";
import {WebSocketContext} from "../websocket";


export default function Task({route, navigation}) {
    const dispatch = useDispatch();
    const wsHandler = useContext(WebSocketContext);

    const {task} = route.params;

    const record = task.record;
    const recordId = task.record_id;

    const [currentProduct, setCurrentProduct] = useState(0);
    const [reachedLocation, setReachedLocation] = useState(false);
    const [isNowScanning, setIsNowScanning] = useState(null);
    const [usedIds, setUsedIds] = useState([]);
    const [defectModalVisible, setDefectModalVisible] = useState(false);

    const itemsLeft =  (currentProduct < record.products.length)?
        record .products[currentProduct].qty - usedIds.length : 0;

    useEffect(() => {
        if(itemsLeft === 0 && usedIds.length !== 0) {
            setReachedLocation(false);
            setIsNowScanning(false);
            setUsedIds([]);
            if(currentProduct === record.products.length - 1) {
                wsHandler.send(JSON.stringify({
                    "type": "finished_task",
                    "record_id": recordId
                }));
                dispatch(finishCurrentTask())
                navigation.navigate('Home');
            } else {
                setCurrentProduct(currentProduct + 1);
            }
        }
    }, [usedIds])

    const handleReachedLocation = () => {
        setReachedLocation(true);
    }

    const handleScanProducts = () => {
        setIsNowScanning(true);
    }

    const handleBarCodeScanned = ({ data }) => {
        console.log(data);
        let json = {
            p: null,
            i: null
        }
        try {
            const dataSplit = data.split(' ');
            json.p = dataSplit[0];
            json.i = dataSplit[1];
        } catch(err) {
            return;
        }

        if(!json.p || !json.i) return;
        if(record.products[currentProduct].product_id !== json.p || usedIds.includes(json.i)) return;

        setUsedIds((prevIds) => [...prevIds, json.i]);

        wsHandler.send(JSON.stringify({
            type: "scanned_item",
            item_id: json.i,
            product_id: json.p,
        }));
        Alert.alert('Potwierdzenie', 'Produkt zeskanowano poprawnie')
    }

    const buttonText = reachedLocation? 'Skanuj produkty' : 'Jestem na miejscu';
    const buttonHandler = reachedLocation?
        handleScanProducts : handleReachedLocation;

    return (
        <View style={[
            styles.container,
        ]}>
            <DefectModal visible={defectModalVisible} onClose={() => setDefectModalVisible(false)}/>
            <View style={styles.hintContainer}>
                <Hint text={isNowScanning? 'Skanuj produkty' : 'Wykonaj następny krok'} style={styles.hint}/>
            </View>
            {
                isNowScanning?
                    <View style={{marginBottom: 8, marginHorizontal: 16}}>
                        <Text style={styles.itemsLeftText}>Kod produktu: #{record.products[currentProduct].product_id}</Text>
                        <Text style={styles.itemsLeftText}>Pozostałych sztuk: {itemsLeft}</Text>
                    </View> : null
            }
            <View style={styles.taskContainer}>
                {
                    isNowScanning?
                        <View style={styles.scannerContainer}>
                            <BarCodeScanner
                                onBarCodeScanned={handleBarCodeScanned}
                                style={StyleSheet.absoluteFillObject}
                            />
                        </View> :
                            reachedLocation?
                                <NextStep title={'Wybierz produkty'}>
                                    <Text>
                                        {record.products[currentProduct].name} #{record.products[currentProduct].product_id}
                                    </Text>
                                    <Text>Nr półki: {record.products[currentProduct].shelf}</Text>
                                    <Text>Ilość pozostałych sztuk: {itemsLeft}</Text>
                                </NextStep>
                                :
                                <NextStep title={'Idź do'}>
                                    <Text>Regał nr {record.products[currentProduct].regal}</Text>
                                    <Text>Kolumna nr {record.products[currentProduct].column}</Text>
                                </NextStep>
                }
            </View>
            <View style={styles.buttonsContainer}>
            {
                isNowScanning?
                        <Button
                            color={colors.primaryBlue}
                            isPrimary={false}
                            text={'Cofnij'}
                            onPress={() => setIsNowScanning(false)}
                        />
                   :
                        <Button
                            color={colors.primaryBlue}
                            isPrimary={true}
                            text={buttonText}
                            onPress={buttonHandler}
                        />
            }
                {
                    (reachedLocation && !isNowScanning)?
                        <Button
                            color={colors.primaryRed}
                            isPrimary={false}
                            text={'Zgłoś usterkę'}
                            onPress={() => setDefectModalVisible(true)}
                        /> : null
                }
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
    scannerContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        overflow: 'hidden',
    },
    itemsLeftText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 20,
    }
});