import PokeballTabBar from "@/components/PokeballTabBar";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <Tabs tabBar={(props) => <PokeballTabBar {...props} />}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Lista",
                    headerShown: false,
                    tabBarIcon: {
                        lib: Ionicons,
                        name: 'list'
                    },
                    tabLoading: false,
                }}
            />
            <Tabs.Screen
                name="move"
                options={{
                    title: "Técnica",
                    headerShown: false,
                    tabBarIcon: {
                        lib: Ionicons,
                        name: 'flash'
                    },
                    tabLoading: true,
                }}
            />
        </Tabs>
    );
}
