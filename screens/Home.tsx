import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import Spacer from "@/components/Spacer";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {User} from "@/types/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "@/components/CustomTextInput";

type Props = NativeStackScreenProps<any>;

const Home = ({navigation}: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getUserData = async () => {
        try {
            const data = await AsyncStorage.getItem("user");
            if(!data) {
                return;
            }
            const parsedData = JSON.parse(data);
            setUser(parsedData.user)
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 16,
                backgroundColor: "#ffffff",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#000000"
                        }}
                    >
                        Hi {user?.fullName}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: "#3F3F46",
                            fontWeight: 500,
                        }}
                    >
                        I wish you a good day!
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 6
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#F9FAFB",
                            padding: 14,
                            borderColor: "#586A8E",
                            borderRadius: 8,
                            borderWidth: 2,

                        }}
                    >
                        <Image
                            source={require("../assets/images/bell-icon.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#F9FAFB",
                            padding: 14,
                            borderColor: "#586A8E",
                            borderRadius: 8,
                            borderWidth: 2,

                        }}
                    >
                        <Image
                            source={require("../assets/images/user-icon.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Spacer space={10}/>
            <CustomTextInput
                placeholder={"doctors, hospitals..."}

            />
            <Spacer
                space={20}
            />
            <View
                style={{
                    flexDirection: "row",
                    gap: 14,
                    justifyContent: "space-between",
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: "#E1EAFD",
                        padding: 12,
                        flexDirection: "column",
                        width: "50%",
                        borderRadius: 10,
                    }}
                >
                    <Image
                        source={require('../assets/images/map.png')}
                    />
                    <Text
                        style={{
                            marginTop: 10,
                            fontWeight: "bold",
                            fontSize: 15,
                        }}
                    >
                        Map
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#000000",

                        }}
                    >
                        Just choose the hospital
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#FEF6EE",
                        padding: 12,
                        flexDirection: "column",
                        width: "50%",
                        borderRadius: 10,
                    }}
                    onPress={() => navigation.push("Categories")}
                >
                    <Image
                        source={require('../assets/images/appointment.png')}
                    />
                    <Text
                        style={{
                            marginTop: 10,
                            fontWeight: "bold",
                            fontSize: 15,
                        }}
                    >
                        Book an appointment
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#000000",

                        }}
                    >
                        Find doctor
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Home;