import React, {useEffect} from 'react';
import {Image, SafeAreaView, Text, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

const Welcome = ({navigation}: Props) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.push("Auth");
        }, 2000);
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <View
                style={{
                    alignItems: "center",
                    marginVertical: "auto"
                }}
            >
                <Image
                    source={require('../assets/images/logo.png')}
                />
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 600,
                        marginTop: 40
                    }}
                >
                    Welcome!
                </Text>
            </View>

            <View
                style={{
                    marginTop: "auto",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: "#5A5A5A",
                        fontSize: 14,
                        marginBottom: 40
                    }}
                >
                    Astradevs
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Welcome;