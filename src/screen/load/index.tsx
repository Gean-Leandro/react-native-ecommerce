import { View, Text, ActivityIndicator } from "react-native";
import { useFonts } from 'expo-font';
import { Logo } from "../../components/logo";
import { Activity_Indicator } from "../../components/active_indicator";

export interface LoadScreenProps {
}

export default function LoadScreen(props: LoadScreenProps) {
    const [fontsLoaded] = useFonts({
        'Monocraft': require('../../assets/fonts/Monocraft.otf'),
    });
    if (!fontsLoaded) {
        return (
            <Activity_Indicator/>
        )
    }
    return (
        <View className="bg-[#0F0F0F] items-center justify-center  w-[100%] h-[100%]">
            <View className="bg-[#222322] items-center justify-center rounded-lg pl-5 pr-3 pt-1 pb-2">
                <Logo first_line_size="52px" second_line_size="40px" />
            </View>
        </View>
    )
}