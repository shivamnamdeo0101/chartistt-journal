import React from 'react';
import { View, Text, ActivityIndicator, Modal, StyleSheet } from 'react-native';

const LoadingComp = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#001AFF" />
          <Text style={styles.text}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    backgroundColor: '#fff', // Loader background color
    padding: 40,
    borderRadius: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
});

export default LoadingComp;
