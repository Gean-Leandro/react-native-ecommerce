import { ActivityIndicator, View } from "react-native";

export function Activity_Indicator() {
    return(
        <View className="w-[100%] h-[100%] bg-[#0F0F0F] items-center justify-center">
            <ActivityIndicator size="large" color="#16AA67"/>
        </View>
    )
}