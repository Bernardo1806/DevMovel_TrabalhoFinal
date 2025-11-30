import PokeballTabBar from "@/components/PokeballTabBar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <Tabs tabBar={(props) => <PokeballTabBar {...props} />}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Pokédex',
                    headerShown: false,
                    tabBarIcon: {
                        lib: Ionicons,
                        name: 'list'
                    },
                    tabLoading: true,
                }}
            />
            <Tabs.Screen
                name="pokemon"
                options={{
                    title: 'Pokémon',
                    headerShown: false,
                    tabBarIcon: {
                        lib: MaterialCommunityIcons,
                        name: 'pokeball'
                    },
                    tabLoading: true,
                }}
            />
        </Tabs>
    );
}
