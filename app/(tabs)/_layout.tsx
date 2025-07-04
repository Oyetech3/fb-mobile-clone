import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Bell, Store, TvMinimalPlay, Users } from 'lucide-react-native';
import { Platform } from "react-native";

export default function AppLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#0765ff',
            tabBarInactiveTintColor: 'black',
            tabBarPosition: Platform.OS === 'android' ? 'top' : 'bottom'
        }}
        >
            <Tabs.Screen name="home" options={{
                headerShown: false,
                tabBarLabel: "Home",
                tabBarIcon: ({color}) => <FontAwesome name="home" color={color} size={24} />
            }}>
            </Tabs.Screen>
            <Tabs.Screen name="video" options={{
                tabBarLabel: "Video",
                tabBarIcon: ({color}) => <TvMinimalPlay color={color} size={24} />
            }} >
            </Tabs.Screen>
            <Tabs.Screen name="friends" options={{
                tabBarLabel: "Friends",
                tabBarIcon: ({color}) => <Users color={color} size={24} />
            }} >
            </Tabs.Screen>
            <Tabs.Screen name="marketplace" options={{
                tabBarLabel: "Marketplace",
                tabBarIcon: ({color}) => <Store color={color} size={24} />
            }} >
            </Tabs.Screen>
            <Tabs.Screen name="notifications" options={{
                tabBarLabel: "Notifications",
                tabBarIcon: ({color}) => <Bell color={color} size={24} />
            }} >
            </Tabs.Screen>
            <Tabs.Screen name="menu" options={{
                tabBarLabel: "Menu",
            }} >
            </Tabs.Screen>
        </Tabs>
    )
}