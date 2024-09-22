import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import CustomTextInput from "@/components/CustomTextInput";
import Spacer from "@/components/Spacer";
import {$host} from "@/http";
import {AxiosError} from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

const Auth = ({navigation}: Props) => {
    const [active, setActive] = useState<"login" | "register">("login");

    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (value: string, key: string) => {
        setFormData(prev => ({...prev, [key]: value}));
    }

    const initialize = async () => {
        try {
            const data = await AsyncStorage.getItem("user");
            if (!data) {
                await AsyncStorage.removeItem("user");
                return;
            }
            navigation.push("Home");
        } catch (e) {
            await AsyncStorage.removeItem("user");
        }
    }

    useEffect(() => {
        initialize();
    }, []);

    const handleSubmit = async (type: "login" | "register") => {
        try {
            if (type === "register") {
                const {data} = await $host.post<{ accessToken: string }>("/auth/register", formData);
                await AsyncStorage.setItem('user', JSON.stringify(data));
                navigation.push("Home");
                return;
            }
            const {data} = await $host.post("/auth/login", {
                username: formData.username,
                password: formData.password
            });
            navigation.push("Home");
            await AsyncStorage.setItem('user', JSON.stringify(data));
        } catch (e) {
            console.log(e);
            if (e instanceof AxiosError) {
                if (e.response?.data?.message) {
                    if (typeof e.response.data.message === "string") {
                        Alert.alert(e.response.data.message);
                    } else {
                        Alert.alert(e.response.data.message.join(", "));
                    }
                }
            }
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 24
            }}
        >
            <View
                style={{
                    width: "100%",
                    marginTop: 60,
                    flexDirection: "row",
                    backgroundColor: "#D5E9F8",
                    borderRadius: 100,
                    padding: 4
                }}
            >
                <TouchableOpacity
                    onPress={() => setActive("login")}
                    style={{
                        width: "50%",
                        alignItems: "center",
                        paddingHorizontal: 56,
                        paddingVertical: 8,
                        backgroundColor: active === "login" ? "#287AD9" : "#D5E9F8",
                        borderRadius: 100,
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: active === "login" ? "#ffffff" : "#6A6A6A",
                            fontWeight: 600
                        }}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: "50%",
                        alignItems: "center",
                        paddingHorizontal: 56,
                        paddingVertical: 8,
                        borderRadius: 100,
                        justifyContent: "center",
                        backgroundColor: active === "register" ? "#287AD9" : "#D5E9F8",
                    }}
                    onPress={() => setActive("register")}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            color: active === "register" ? "#ffffff" : "#6A6A6A",
                            fontWeight: 600
                        }}
                    >
                        Registration
                    </Text>
                </TouchableOpacity>
            </View>


            {active === "login" ? (
                <View
                    style={{
                        marginTop: 32,
                    }}
                >
                    <Text
                        style={{
                            color: "#000000",
                            fontSize: 18,
                            fontWeight: 600,
                            textAlign: "center"
                        }}
                    >
                        Login to your account
                    </Text>
                    <Spacer space={30}/>
                    <CustomTextInput
                        value={formData.username}
                        placeholder={"Username"}
                        onChange={(value) => handleChange(value, "username")}
                    />
                    <Spacer space={15}/>
                    <CustomTextInput
                        value={formData.password}
                        placeholder={"Password"}
                        secureTextEntry={true}
                        onChange={(value) => handleChange(value, "password")}
                    />
                    <Spacer space={20}/>
                    <TouchableOpacity
                        onPress={() => handleSubmit("login")}
                        style={{
                            backgroundColor: "#287AD9",
                            borderRadius: 15,
                            alignItems: "center",
                            paddingVertical: 15,

                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: "#ffffff"
                            }}
                        >
                            Log in
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View
                    style={{
                        marginTop: 32,
                    }}
                >
                    <Text
                        style={{
                            color: "#000000",
                            fontSize: 18,
                            fontWeight: 600,
                            textAlign: "center"
                        }}
                    >
                        Create your new account
                    </Text>
                    <Spacer space={30}/>
                    <CustomTextInput
                        value={formData.username}
                        placeholder={"Username"}
                        onChange={(value) => handleChange(value, "username")}
                    />
                    <Spacer space={15}/>
                    <CustomTextInput
                        value={formData.fullName}
                        placeholder={"Full name"}
                        onChange={(value) => handleChange(value, "fullName")}
                    />
                    <Spacer space={15}/>
                    <CustomTextInput
                        value={formData.password}
                        placeholder={"Password"}
                        secureTextEntry={true}
                        onChange={(value) => handleChange(value, "password")}
                    />
                    <Spacer space={15}/>
                    <CustomTextInput
                        value={formData.confirmPassword}
                        placeholder={"Confirm password"}
                        secureTextEntry={true}
                        onChange={(value) => handleChange(value, "confirmPassword")}
                    />
                    <Spacer space={20}/>
                    <TouchableOpacity
                        onPress={() => handleSubmit("register")}
                        style={{
                            backgroundColor: "#287AD9",
                            borderRadius: 15,
                            alignItems: "center",
                            paddingVertical: 15,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: "#ffffff"
                            }}
                        >
                            Registration
                        </Text>
                    </TouchableOpacity>
                </View>
            )}


        </SafeAreaView>
    );
};

export default Auth;