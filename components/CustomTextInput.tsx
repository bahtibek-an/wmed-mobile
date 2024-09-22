import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

interface ICustomTextInputProps {
    placeholder?: string;
    value?: string;
    onChange?: ((text: string) => void) | undefined;
    secureTextEntry?: boolean;
}

const CustomTextInput: FC<ICustomTextInputProps> = ({placeholder, onChange, value, secureTextEntry}) => {
    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 45,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: "#8B8B8B"
    },
});

export default CustomTextInput;