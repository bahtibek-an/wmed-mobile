import React from 'react';
import {SafeAreaView, View, Image, Text, TouchableOpacity} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Spacer from "@/components/Spacer";
import CustomTextInput from "@/components/CustomTextInput";

type Props = NativeStackScreenProps<any>;

const Categories = ({navigation}: Props) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 16,
                backgroundColor: "#ffffff"
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
                        Medical Specialties
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: "#3F3F46",
                            fontWeight: 500,
                        }}
                    >
                        Wide selection of doctor's specialties
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
            <Spacer space={16}/>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.push("Doctors")}
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            borderRadius: 1000,
                            width: 50,
                            height: 50,
                            backgroundColor: "#F9F5FF",
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: "#C6D4F1",
                            borderWidth: 1,
                        }}
                    >
                        <Image
                            source={require(`../assets/images/ear.png`)}
                            style={{
                                borderRadius: 99,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft: 12
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                marginBottom: 4
                            }}
                        >
                            Ear, Nose & Throat
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: "#71717A",

                            }}
                        >
                            Wide selection of doctor's specialties
                        </Text>
                    </View>
                </TouchableOpacity>
                <Spacer space={20}/>
                <TouchableOpacity
                    onPress={() => navigation.push("Doctors")}
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            borderRadius: 1000,
                            width: 50,
                            height: 50,
                            backgroundColor: "#F9F5FF",
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: "#C6D4F1",
                            borderWidth: 1,
                        }}
                    >
                        <Image
                            source={require(`../assets/images/psychiatrist.png`)}
                            style={{
                                borderRadius: 99,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft: 12
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                marginBottom: 4
                            }}
                        >
                            Psychiatrist
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: "#71717A",

                            }}
                        >
                            Wide selection of doctor's specialties
                        </Text>
                    </View>
                </TouchableOpacity>
                <Spacer space={20}/>
                <TouchableOpacity
                    onPress={() => navigation.push("Doctors")}
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            borderRadius: 1000,
                            width: 50,
                            height: 50,
                            backgroundColor: "#F9F5FF",
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: "#C6D4F1",
                            borderWidth: 1,
                        }}
                    >
                        <Image
                            source={require(`../assets/images/dentist.png`)}
                            style={{
                                borderRadius: 99,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft: 12
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                marginBottom: 4
                            }}
                        >
                            Dentist
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: "#71717A",

                            }}
                        >
                            Wide selection of doctor's specialties
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Categories;