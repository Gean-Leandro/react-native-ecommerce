import { View, Text, ActivityIndicator } from "react-native";
import { useFonts } from 'expo-font';

export interface LoadScreenProps {
}

export default function LoadScreen(props: LoadScreenProps) {
    const [fontsLoaded] = useFonts({
        'Monocraft': require('../../assets/fonts/Monocraft.otf'),
    });
    if (!fontsLoaded) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    return (
        <View className="bg-[#0F0F0F] items-center justify-center  w-[100%] h-[100%]">
            <View className="bg-[#222322] items-center justify-center rounded-lg pl-5 pr-3 pt-1 pb-2">
                <Text className="font-display text-white text-[52px]">MEGA{"\n"}
                    <Text className="text-[#00D3CC] text-[40px]">
                        LI
                    </Text>
                    -
                    <Text className="text-[#0DC07F] text-[40px]">
                        FI
                    </Text>
                </Text>
            </View>
        </View>
    )
}