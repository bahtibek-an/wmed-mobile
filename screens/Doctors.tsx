import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, TouchableOpacity, View, Text} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Doctor} from "@/types/interfaces";
import {$host} from "@/http";
import Spacer from "@/components/Spacer";
import CustomTextInput from "@/components/CustomTextInput";

type Props = NativeStackScreenProps<any>;

const Doctors = ({navigation}: Props) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDoctors = async () => {
        try {
            const {data} = await $host.get("/doctors");
            setDoctors(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDoctors();
    }, []);


    return (
        <SafeAreaView
            style={{
                flexGrow: 1,
                backgroundColor: "#ffffff",
                paddingHorizontal: 16
            }}
        >
            <Spacer space={10}/>
            <CustomTextInput
                placeholder="Search Doctor"
            />
            <View
                style={{
                    marginTop: 16,
                }}
            >
                {doctors.map(doctor => (
                    <TouchableOpacity
                        key={doctor.id}
                        onPress={() => navigation.push("DoctorItem", { doctorId: doctor.id })}
                        style={{
                            flexDirection: "row",
                            marginTop: 20,
                        }}
                    >
                        <View
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 20,
                                overflow: "hidden",
                                borderWidth: 1,
                                borderColor: "C6D4F1",
                                borderStyle: "solid"
                            }}
                        >
                            <Image
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                                src={doctor.avatar}
                            />
                        </View>
                        <View
                            style={{
                                marginLeft: 10
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 16,
                                }}
                            >
                                {doctor.fullName}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: "#71717A"
                                }}
                            >
                                {doctor.specialization}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default Doctors;