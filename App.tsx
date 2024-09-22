import {DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Welcome from "@/screens/Welcome";
import Auth from "@/screens/Auth";
import Home from "@/screens/Home";
import Categories from "@/screens/Categories";
import Doctors from "@/screens/Doctors";
import DoctorItem from "@/screens/DoctorItem";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack.Navigator
                    initialRouteName="Welcome"
                    screenOptions={{
                        contentStyle: {}
                    }}
                >
                    <Stack.Screen
                        name="Welcome"
                        component={Welcome}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Auth"
                        component={Auth}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                    />
                    <Stack.Screen
                        name="Categories"
                        component={Categories}
                    />
                    <Stack.Screen
                        name="Doctors"
                        component={Doctors}
                        options={{}}
                    />
                    <Stack.Screen
                        name="DoctorItem"
                        component={DoctorItem}
                        options={{}}
                    />

                </Stack.Navigator>
            </ThemeProvider>
        </NavigationContainer>
    );
}
