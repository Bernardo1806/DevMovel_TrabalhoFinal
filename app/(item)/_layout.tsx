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
                name="items"
                options={{
                    title: 'Item',
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
