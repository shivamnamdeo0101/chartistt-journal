import { View, Text, StyleSheet, PermissionsAndroid, ToastAndroid, Alert, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Actionsheet, useDisclose, Box, Center } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Share from 'react-native-share';

import DateTimePicker from '@react-native-community/datetimepicker';


import { useForm, Controller } from 'react-hook-form';

import Modal from "react-native-modal";
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FAB } from 'react-native-paper';
import CustomButton from './CustomButton';
import { useSelector } from 'react-redux';
import { TRADE_API } from '../service/TradeService';
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';
import moment from 'moment';
import DateSelect from './DateSelect';


function DownloadComp() {

    const [startDate, setstartDate] = useState(new Date());
    const [showStart, setshowStart] = useState(false)
    const [startTimestamp, setstartTimestamp] = useState(Date.now())


    const [endDate, setendDate] = useState(new Date());
    const [showEnd, setshowEnd] = useState(false)
    const [endTimestamp, setendTimestamp] = useState(Date.now())


    const onStartDateChange = (event, selectedDate) => {
        setshowStart(!showStart)
        const currentDate = selectedDate || startDate;
        setstartDate(currentDate);
        setstartTimestamp(Date.parse(currentDate));
    };

    const onEndDateChange = (event, selectedDate) => {
        setshowEnd(!showEnd)
        const currentDate = selectedDate || endDate;
        setendDate(currentDate);
        setendTimestamp(Date.parse(currentDate));
    };



    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const user = useSelector((state) => state?.userAuth?.user)



    const { control, handleSubmit, setError, formState: { errors } } = useForm();

    const onSubmit = () => {

        if (endTimestamp < startTimestamp) {
            setError('startDate', {
                type: 'manual',
                message: "Start date should be less than end date", // Set the error message from the API response
            });
            setError('endDate', {
                type: 'manual',
                message: "End date should be greater then start date", // Set the error message from the API response
            });

            return
        }
        createAndShareCSVWithNotification()
        // convertAndSaveDataToCSV()
        toggleModal()
    };


    //////////Downloadcsv ///////////
    useEffect(() => {
        requestStoragePermission()
    }, [])

    async function requestStoragePermission() {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]);

            if (
                granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
            ) {
                // You have the necessary permissions, and you can now access the file.
            } else {
                console.log('Storage permissions denied.');
            }
        } catch (err) {
            console.warn(err);
        }
    }






    // async function convertAndSaveDataToCSV() {

    //     const payload = {
    //         "userId": user?._id,
    //         "start": startTimestamp,
    //         "end": endTimestamp
    //     }

    //     const list = await TRADE_API.getAllCalenderTrades(payload, user?.token)

    //     if (list?.length === 0) {
    //         Alert.alert("Not Trade Found")
    //         return
    //     }

    //     const fileName = "Trades";

    //     console.log(fileName)

    //     let csvData = '';
    //     const separator = ',';

    //     // Add header row
    //     const header = Object.keys(list[0]?.trade).join(separator);
    //     csvData += `${header}\n`;
    //     // Add rows
    //     list.forEach((item) => {
    //         const row = Object.values(item?.trade).join(separator);
    //         csvData += `${row}\n`;
    //     });

    // const { config, fs } = RNFetchBlob;

    // // Save file to device
    // const path = `${fs.dirs.DownloadDir}/${fileName}.csv`;

    // RNFS.writeFile(path, csvData, 'utf8')
    //     .then(() => {
    //         console.log('File written at:', path);
    //         Alert.alert("File saved in download folder")
    //     })
    //     .catch((err) => {
    //         console.log(err.message);
    //     });



    // }

    // const downloadFile = () => {
    //     const url = 'https://example.com/path/to/Trades.csv'; // Replace with your CSV file URL

    //     const { DownloadDir, DocumentDir } = RNFetchBlob.fs;

    //     RNFetchBlob.config({
    //         fileCache: true,
    //         addAndroidDownloads: {
    //             useDownloadManager: true,
    //             notification: true,
    //             title: 'File Download',
    //             description: 'Downloading file...',
    //             mime: 'application/csv', // Specify the correct MIME type for your file
    //             path: `${DownloadDir}/Trades.csv`,
    //         },
    //     })
    //         .fetch('GET', url)
    //         .then(res => {
    //             // Handle the download success
    //             console.log('File downloaded successfully');
    //         })
    //         .catch(error => {
    //             // Handle download errors
    //             console.error('File download error:', error);
    //         });
    // };


    const convertToCSV = (list) => {
        let csvData = '';
        const separator = ',';

        // Add header row
        const header = Object.keys(list[0]?.trade).join(separator);
        csvData += `${header}\n`;
        // Add rows
        list.forEach((item) => {
            const row = Object.values(item?.trade).join(separator);
            csvData += `${row}\n`;
        });

        return csvData;
    };

    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
      
        return `${day}_${month}_${year}_${hours}_${minutes}_${seconds}`;
      }

    const createAndShareCSVWithNotification = async () => {
        try {   


            const payload = {
                "userId": user?._id,
                "start": startTimestamp,
                "end": endTimestamp
            }

            const list = await TRADE_API.getAllCalenderTrades(payload, user?.token)

            if (list?.length === 0) {
                Alert.alert("Not Trade Found")
                return
            }
            // Convert JSON data to CSV
            const csvData = convertToCSV(list);

            const { config, fs } = RNFetchBlob;
            // Define the file path where the CSV file will be stored
            //const path = `/storage/emulated/0/Download/Trades.csv`;
            //const filePath = `${RNFS.CachesDirectoryPath}/Trades.csv`;
            const currentDateTime = getCurrentDateTime();

            const fileName = `Trades_${currentDateTime}.csv`; // New file name with timestamp          
            const directory = RNFS.ExternalDirectoryPath; // You can specify the directory where you want to save the file
            const filePath = `${directory}/${fileName}`;

            try {
                await RNFS.writeFile(filePath, csvData, 'utf8')
                    .then(() => {
                        console.log('File written at:', filePath);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

            } catch (error) {
                console.error('Error saving file:', error);
            }

            ToastAndroid.showWithGravity(
                'CSV file downloaded and saved in download folder.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );



            // Share the CSV file
            await Share.open({
                url: `file://${filePath}`,
                type: 'text/csv',
                filename: 'Trades.csv',
            });

        } catch (error) {
            console.log(error?.message)
        }
    };





    return (
        <View>
            <TouchableOpacity onPress={toggleModal} style={{ marginRight: 10, backgroundColor: "#f8f8f8", padding: 5, borderRadius: 99 }}>
                <Feather
                    name={'download'}
                    size={26}
                    color="#888"

                />
            </TouchableOpacity>
            <View style={styles.container}>

                <Modal
                    isVisible={isModalVisible}
                    onSwipeComplete={toggleModal}
                    onBackButtonPress={toggleModal}
                    swipeDirection="down"
                    propagateSwipe
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <View>
                            <View style={styles.swipeIndicator} />
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "space-around", flex: 1 }}>
                            <ScrollView>
                                <View>
                                    <Text style={{ fontSize: 20, color: "#000", marginBottom: 10, fontFamily: "Intro-Bold", }}>DOWNLOAD EXCEL</Text>
                                    <View style={styles.textInputContainer}>


                                        <Text style={styles.textInputLabel}>FROM DATE</Text>
                                        <View style={styles.textView}>
                                            <SimpleLineIcons
                                                name={"calendar"}
                                                size={20}
                                                color="#888"

                                            />
                                            <Controller
                                                control={control}
                                                name='startDate'
                                                rules={{
                                                    required: 'Start Date is required',

                                                }}
                                                defaultValue={startDate}
                                                render={({ field: { onChange, value } }) => (
                                                    <View style={{ flex: 1, }}>
                                                        {showStart &&
                                                            <DateTimePicker
                                                                value={startDate}
                                                                mode='date'
                                                                display='calendar'
                                                                onChange={onStartDateChange}
                                                                maximumDate={new Date()}
                                                            />}

                                                        <TouchableOpacity onPress={() => setshowStart(!showStart)} style={{ borderRadius: 10, overflow: 'hidden', padding: 14 }}>
                                                            <Text style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#fff", }} >
                                                                {startDate.toLocaleDateString()}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                        {errors.startDate && <Text style={styles.errors}>{errors.startDate.message}</Text>}
                                    </View>

                                    <View style={styles.textInputContainer}>
                                        <Text style={styles.textInputLabel}>END DATE</Text>
                                        <View style={styles.textView}>
                                            <SimpleLineIcons
                                                name={"calendar"}
                                                size={20}
                                                color="#888"

                                            />
                                            <Controller
                                                name="endDate"
                                                control={control}
                                                rules={{
                                                    required: 'End Date is required',
                                                }}
                                                defaultValue={endDate}
                                                render={({ field }) => (
                                                    <View style={{ flex: 1 }}>
                                                        {showEnd &&
                                                            <DateTimePicker
                                                                value={endDate}
                                                                mode='date'
                                                                display='calendar'
                                                                onChange={onEndDateChange}
                                                                maximumDate={new Date()}
                                                            />}

                                                        <TouchableOpacity onPress={() => setshowEnd(!showEnd)} style={{ borderRadius: 10, padding: 14, overflow: 'hidden', marginBottom: 0 }}>
                                                            <Text style={{ color: "#ccc", borderRadius: 10, backgroundColor: "#fff", }} >
                                                                {endDate.toLocaleDateString()}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                        {errors.endDate && <Text style={styles.errors}>{errors.endDate.message}</Text>}
                                    </View>


                                </View>
                            </ScrollView>
                            <View>
                                <CustomButton
                                    text={"DOWNLOAD"}
                                    filled={true}
                                    onPress={handleSubmit(onSubmit)}
                                />

                                <View style={{ flexDirection: "row", alignItems: "flex-start", alignSelf: "center", margin: 10, }}>
                                    <Text style={{ color: "#001AFF", marginRight: 10, fontFamily: "Intro-Bold", }}>Note :- </Text>
                                    <Text style={{ color: "#000", textAlign: "justify", fontSize: 12, fontFamily: "Intro-Bold", width: "90%" }}>
                                        YOU'RE ADDING THIS ACCOUNT ONLY FOR
                                        CALCULATION PURPOSE</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    );
}

export default DownloadComp


const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        flex: 1 / 3,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 300,
    },
    swipeIndicator: {
        width: 60,
        height: 3,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        marginBottom: 10,
    },
    half: {

    },
    errors: { color: 'red', fontFamily: "Intro-Semi-Bold", fontSize: 14 },

    textInputContainer: { marginBottom: 10, },
    textInputLabel: { color: "#000", fontFamily: "Intro-Bold" },
    textInput: { color: "#000", flex: 1, fontFamily: "Intro-Bold" },
    textView: { borderColor: "#f0f3f5", paddingLeft: 10, paddingRight: 10, borderWidth: 2, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }
});
