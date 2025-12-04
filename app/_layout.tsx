import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";

export default function RootLayout() {

  const [loaded] = useFonts({
    VT323: require("../assets/fonts/VT323-Regular.ttf"),
    PixelifySansBold: require("../assets/fonts/PixelifySans-Bold.ttf"),
    PixelifySansMedium: require("../assets/fonts/PixelifySans-Medium.ttf"),
    PixelifySans: require("../assets/fonts/PixelifySans-Regular.ttf"),
    PixelifySansSemiBold: require("../assets/fonts/PixelifySans-SemiBold.ttf"),
    PixelifySansVariableFont: require("../assets/fonts/PixelifySans-VariableFont_wght.ttf"),
    PressStart2P: require("../assets/fonts/PressStart2P-Regular.ttf"),
    SilkscreenBold: require("../assets/fonts/Silkscreen-Bold.ttf"),
    Silkscreen: require("../assets/fonts/Silkscreen-Regular.ttf"),
  });

  if (!loaded) {
    return null
  }

  return (
    <Drawer
      screenOptions={{
        // Header
        headerTitleStyle: {
          color: '#FFCB05',
          fontSize: 28,
          fontFamily: 'PixelifySansMedium',
        },
        headerStyle: {
          backgroundColor: '#B13535',
          borderBottomWidth: 4,
          borderBottomColor: '#1A1A1A',
        },

        // Drawer
        drawerStyle: {
          backgroundColor: '#B13535',
          borderRightWidth: 4,
          borderRightColor: '#1A1A1A',
        },
        drawerLabelStyle: {
          fontFamily: 'PixelifySansSemiBold',
          fontSize: 20,
        },
        drawerInactiveTintColor: '#F2C94C',
        drawerActiveTintColor: '#000',
        drawerActiveBackgroundColor: '#F2C94C',
        drawerItemStyle: {
          borderRadius: 0,
          borderBottomWidth: 2,
          borderBottomColor: '#1A1A1A',
        },
      }}
    >
      <Drawer.Screen
        name="(pokedex)"
        options={{
          drawerLabel: 'Pokédex',
          title: 'Pokédex',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pokeball" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(moves)"
        options={{
          drawerLabel: 'Movedex',
          title: 'Movedex',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(ability)"
        options={{
          drawerLabel: 'Abilitydex',
          title: 'Abilitydex',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star-three-points-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(item)"
        options={{
          drawerLabel: 'Itemdex',
          title: 'Itemdex',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bag-personal-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="sobre"
        options={{
          drawerLabel: 'Sobre',
          title: 'Sobre',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
