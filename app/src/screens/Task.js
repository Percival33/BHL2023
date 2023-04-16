import {StyleSheet, View, Text, Alert} from "react-native";
import {useContext, useEffect, useState} from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';

import Hint from "../components/Hint";
import Button from "../components/Button";
import colors from "../styles/colors";
import NextStep from "../components/NextStep";
import DefectModal from "../components/DefectModal";
import {useDispatch} from "react-redux";
import {finishCurrentTask} from "../store/slices/rootSlice";
import {WebSocketContext} from "../websocket";


export default function Task({route, navigation}) {
    const dispatch = useDispatch();
    const wsHandler = useContext(WebSocketContext);
    const { task } = route.params;

    const [currentProduct, setCurrentProduct] = useState(0);
    const [reachedLocation, setReachedLocation] = useState(false);
    const [isNowScanning, setIsNowScanning] = useState(null);
    const [usedIds, setUsedIds] = useState([]);
    const [defectModalVisible, setDefectModalVisible] = useState(false);

    const itemsLeft =  (currentProduct < task.products.length)?
        task.products[currentProduct].qty - usedIds.length : 0;

    useEffect(() => {
        if(itemsLeft === 0 && usedIds.length !== 0) {
            setReachedLocation(false);
            setIsNowScanning(false);
            setUsedIds([]);
            if(currentProduct === task.products.length - 1) {
                dispatch(finishCurrentTask())
                navigation.navigate('Home');
            } else {
                wsHandler.send(JSON.stringify({'content': 'Product packed'}));
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
        let json;
        try {
            json = JSON.parse(data);
        } catch(err) {
            return;
        }

        if(task.products[currentProduct].product_id !== json.p || usedIds.includes(json.i)) return;

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
                        <Text style={styles.itemsLeftText}>Kod produktu: #{task.products[currentProduct].product_id}</Text>
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
                                        {task.products[currentProduct].name} #{task.products[currentProduct].product_id}
                                    </Text>
                                    <Text>Ilość pozostałych sztuk: {itemsLeft}</Text>
                                </NextStep>
                                :
                                <NextStep title={'Idź do'}>
                                    <Text>Regał nr {task.products[currentProduct].regal}</Text>
                                    <Text>Kolumna nr {task.products[currentProduct].column}</Text>
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