import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Activity_Indicator } from "../components/active_indicator";
import { useFonts } from 'expo-font';
import { router } from "expo-router";
import carrinho from "../store/carrinho-store";
import arrow_icon from '../assets/icons/arrow_back.png';

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
            <View className="absolute z-10 top-[9%] left-[4%]">
                <TouchableOpacity className="items-center justify-center pl-2 pt-2 pb-2"
                    onPress={() => {
                        router.back();
                    }}>
                    <Image source={arrow_icon} style={{width:25, height:25}}/>
                </TouchableOpacity>
            </View>
            <View className="h-[100%] w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">Devolução</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-3"></View>

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
        <View className="bg-[#313131] items-center justify-center w-[100%] h-[12%]">
            <TouchableOpacity className="w-[85%]" onPress={clear}>
                <View className="border-[#FF6000] border-[1px] pt-2 pb-2 justify-center items-center rounded-md">
                    <Text className="text-white font-display">Limpar Carrinho</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity className="w-[85%] m-2" onPress={() => {
                router.navigate('/buy_fase');
            }}>
                <View className="bg-[#FF6000] pt-2 pb-2 justify-center items-center rounded-md">
                    <Text className="text-white font-display">Comprar</Text>
                </View>
            </TouchableOpacity>
        </View>
        </>
    )
}