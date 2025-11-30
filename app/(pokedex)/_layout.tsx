import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Pokédex',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="pokemon"
                options={{
                    title: 'Pokémon',
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
