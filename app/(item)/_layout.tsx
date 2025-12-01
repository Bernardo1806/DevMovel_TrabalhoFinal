import PokeballTabBar from "@/components/PokeballTabBar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <Tabs tabBar={(props) => <PokeballTabBar {...props} />}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Lista',
                    headerShown: false,
                    tabBarIcon: {
                        lib: Ionicons,
                        name: 'list'
                    },
                    tabLoading: true,
                }}
            />
            <Tabs.Screen
                name="items"
                options={{
                    title: 'Item',
                    headerShown: false,
                    tabBarIcon: {
                        lib: MaterialCommunityIcons,
                        name: 'bag-personal'
                    },
                    tabLoading: true,
                }}
            />
        </Tabs>
    );
}
