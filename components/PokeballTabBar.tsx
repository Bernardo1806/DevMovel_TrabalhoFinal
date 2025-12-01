import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PokeballTabBar({ state, descriptors, navigation }) {

    const scale = useRef(new Animated.Value(1)).current;

    const activeRoute = state.routes[state.index];
    const isLoading = descriptors[activeRoute.key].options.tabLoading;

    useEffect(() => {

        scale.stopAnimation();

        if (isLoading) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scale, {
                        toValue: 1.15,
                        duration: 400,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scale, {
                        toValue: 1,
                        duration: 400,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    }),
                ]),
                { iterations: -1 }
            ).start();
        } else {
            Animated.timing(scale, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isLoading]);


    return (
        <View style={styles.container}>
            <View style={styles.topLine} />

            <View style={styles.centerWrapper}>
                <View style={styles.outerCircle}>
                    <Animated.View
                        style={[
                            styles.innerCircle,
                            {
                                transform: [{ scale }],
                                backgroundColor: isLoading ? '#FF4848' : '#4CAF50',
                            }
                        ]}
                    />
                </View>
            </View>

            <View style={styles.whiteSection}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = 
                        options.tabBarLabel ?? options.title ?? route.name;

                    const IconLib = options.tabBarIcon?.lib;
                    const iconName = options.tabBarIcon?.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            onPress={onPress}
                            style={styles.tabButton}
                        >
                            {IconLib && (
                                <IconLib
                                    name={iconName}
                                    size={26}
                                    color={isFocused ? "#D62828" : "#666"}
                                />
                            )}
                            <Text
                                style={[
                                    styles.label,
                                    { color: isFocused ? '#D62828' : '#666' }
                                ]}
                            >
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1A',
    },
    topLine: {
        height: 2,
        backgroundColor: '#1A1A1A',
    },
    whiteSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 10,
        borderTopWidth: 4,
        borderTopColor: '#1A1A1A',
    },

    centerWrapper: {
        position: 'absolute',
        top: -25,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 99,
    },
    outerCircle: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 30,
        borderWidth: 4,
        borderColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 3,
        borderColor: '#1A1A1A',
    },

    tabButton: {
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        marginTop: 2,
        fontFamily: 'PixelifySansMedium',
    },
});
