import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateSelect = ({ label, control, name }) => {
  const [selectDate, setSelectDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setSelectDate(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.textInputLabel}>{label}</Text>
      <View style={styles.textView}>
        <Fontisto name="date" size={20} color="#888" />

        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{
            required: `${label} is required`,
          }}
          render={({ field: { onChange, value } }) => (
            <View>
              {selectDate && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="calendar"
                  onChange={onDateChange}
                />
              )}

              <TouchableOpacity
                onPress={() => setSelectDate(!selectDate)}
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <Text
                  style={{
                    color: '#ccc',
                    fontFamily: 'Intro-Bold',
                    padding: 16,
                    borderRadius: 10,
                  }}
                >
                  {date?.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default DateSelect;

const styles = StyleSheet.create({
  textInputContainer: {
    marginVertical: 10,
  },
  textInputLabel: {
    fontFamily: 'Intro-Bold',
    fontSize: 16,
    marginBottom: 6,
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errors: {
    color: 'red',
  },
});


