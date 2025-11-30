import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Lista',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="habilidade"
                options={{
                    title: 'Habilidade',
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
