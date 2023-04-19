import { View, Text,Modal,StyleSheet ,Alert} from 'react-native'
import React from 'react'
import AddEmailFormComp from '../../components/AddEmailFormComp'

const EditProfileScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
       
     
    </View>
  )
}

export default EditProfileScreen


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      
    },
    modalView: {
      flex:1
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  