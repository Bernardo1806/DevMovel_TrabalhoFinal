import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(pokedex)"
        options={{
          drawerLabel: 'Pokédex',
          title: 'Pokédex',
        }}
      />
      <Drawer.Screen
        name="(moves)"
        options={{
          drawerLabel: 'Lista de Técnicas',
          title: 'Lista de Técnicas',
        }}
      />
      <Drawer.Screen
        name="(ability)"
        options={{
          drawerLabel: 'Lista de Habilidades',
          title: 'Lista de Habilidades',
        }}
      />
      <Drawer.Screen
        name="(item)"
        options={{
          drawerLabel: 'Lista de Items',
          title: 'Lista de Items',
        }}
      />
      <Drawer.Screen
        name="sobre"
        options={{
          drawerLabel: 'Sobre',
          title: 'Sobre',
        }}
      />
    </Drawer>
  );
}
