import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Activity_Indicator } from "../components/active_indicator";
import { useFonts } from 'expo-font';
import carrinho from "../store/carrinho-store";

export default function LoginScreen(){
    const [fontsLoaded] = useFonts({
        'Monocraft': require('../assets/fonts/Monocraft.otf'),
    });
    if (!fontsLoaded) {
        return (
            <Activity_Indicator/>
        )
    }

    const { products, clear } = carrinho();

    const getImageSource = (imageName:any) => {
        switch (imageName) {
          case 'Emissor':
            return require('../assets/fotos/Emissor.jpg');
          case 'Receptor':
            return require('../assets/fotos/Receptor.jpg');
        }
    };

    return (
        <>
        <ScrollView className="h-[100%] bg-[#313131]">
            <View className="h-[100%] w-[100%]">
                <Text className="text-white text-[25px] mt-3 text-center">Carrinho</Text>
                <View className="bg-slate-600 w-[90%] h-[1px] mt-3 mb-3"></View>

                {products.map((product) => {
                                return (
                                <View key={product.id} className="pl-4 mb-6 flex-row items-center">
                                    <View className="border-[1px] border-[#FF6000] rounded-sm">
                                        <Image source={getImageSource(product.img)} style={{width: 100, height: 100}}/>
                                    </View>
                                    <View className="h-[100%] pl-4 pt-2 w-[100%]">
                                        <Text className="text-white text-[20px] mb-2 font-bold">R$ {product.price}</Text>
                                        <Text className="text-white text-[15px]">R$ {product.name}  |  1x</Text>
                                    </View>
                                 </View>
                            )
                        })}      
                
            </View>
        </ScrollView>
        <View className="bg-[#313131] items-center justify-center w-[100%] h-[60px]">
            <TouchableOpacity className="w-[85%]" onPress={clear}>
                <View className="bg-[#FF6000] pt-2 pb-2 justify-center items-center rounded-md">
                    <Text className="text-white font-display">Limpar Carrinho</Text>
                </View>
            </TouchableOpacity>
        </View>
        </>
    )
}