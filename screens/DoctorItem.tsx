import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text, Image, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {io, Socket} from "socket.io-client";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Doctor, Queue} from "@/types/interfaces";
import {$host} from "@/http";
import Spacer from "@/components/Spacer";
import doctors from "@/screens/Doctors";
import {useIsFocused} from "@react-navigation/core";


type Props = NativeStackScreenProps<any>;

const DoctorItem = ({route, navigation}: Props) => {
    const doctorId = route.params?.doctorId;
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);
    const [queue, setQueue] = useState<Queue[]>([]);
    const socket = useRef<Socket | null>(null);
    const isFocused = useIsFocused();

    const fetchDoctor = async () => {
        try {
            const {data} = await $host.get(`/doctors/${doctorId}`);
            setDoctor(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDoctor();
    }, []);


    useEffect(() => {
        if (doctor && isFocused) {
            if (!socket.current) {
                socket.current = io("wss://med-production.up.railway.app/");

                socket.current.emit('getAllPatients', (data: Queue[]) => {
                    setQueue(data.filter((item) => item.doctorId === doctor.id));
                });

                socket.current.on('queueUpdated', (data: Queue[]) => {
                    setQueue(data.filter((item) => item.doctorId === doctor.id));
                });
            }
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
                socket.current = null;
            }
        };
    }, [doctor, isFocused]);


    const handleClick = async () => {
        const user = await AsyncStorage.getItem("user");
        if (!user) {
            return null;
        }
        const userData = JSON.parse(user);
        const userId = userData.user.id;
        socket.current?.emit('joinQueue', {patientId: userId, doctorId: doctor?.id});
    }

    if (!doctor) {
        return null;
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#ffffff"
            }}
        >
            <View
                style={{
                    padding: 16,
                    flexDirection: "row"
                }}
            >
                <View
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 20,
                        overflow: "hidden",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#C6D4F1",
                    }}
                >
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        src={doctor.avatar}
                    />
                </View>
                <View
                    style={{
                        marginLeft: 12
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#000000"
                        }}
                    >
                        {doctor.fullName}
                    </Text>
                    <Text
                        style={{
                            color: "#71717A",
                            fontSize: 14,
                        }}
                    >
                        {doctor.specialization}
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#000000"
                        }}
                    >
                        UZS {doctor.cost}
                    </Text>
                </View>
            </View>
            <Spacer space={10}/>
            <View
                style={{
                    padding: 16
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",

                    }}
                >
                    Biography
                </Text>
                <Spacer space={5}/>
                <Text
                    style={{
                        fontSize: 14,
                        color: "#71717A"
                    }}
                >
                    {doctor.description}
                </Text>
            </View>
            <Spacer space={16}/>
            <View
                style={{
                    padding: 16
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",

                    }}
                >
                    Work Location
                </Text>
                <Spacer space={5}/>
                <Text
                    style={{
                        fontSize: 14,
                        color: "#71717A"
                    }}
                >
                    Tashkent...(address)..............
                </Text>
            </View>

            <View
                style={{
                    padding: 16
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",

                    }}
                >
                    Queue
                </Text>
                <Spacer space={5}/>
                <View>
                    {queue.map((item, idx) => (
                        <View
                            key={idx}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row"
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        marginRight: 4,
                                        fontSize: 16,
                                    }}
                                ># {item.position}</Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "medium",
                                    }}
                                >{item.fullName}</Text>
                            </View>
                            <View>
                                <Text>
                                    {new Date(item.createdAt).toLocaleString()}
                                </Text>
                            </View>

                        </View>
                    ))}
                </View>

            </View>

            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    padding: 16,
                    flexDirection: "row",
                    gap: 5
                }}
            >
                <TouchableOpacity
                    onPress={handleClick}
                    style={{
                        paddingVertical: 12,
                        backgroundColor: "#287AD9",
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50%"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: "#ffffff",
                            fontWeight: "bold"

                        }}
                    >
                        Real-time queue
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Alert.alert("In progress")}
                    style={{
                        paddingVertical: 12,
                        backgroundColor: "#287AD9",
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50%"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: "#ffffff",
                            fontWeight: "bold"

                        }}
                    >
                        Make Appointment
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default DoctorItem;