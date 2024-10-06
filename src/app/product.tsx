import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ToastAndroid } from "react-native";
import { useFonts } from 'expo-font';
import { useLocalSearchParams, Link } from 'expo-router';
import star_orange from '../assets/icons/star_orange.png';
import star_white from '../assets/icons/star_white.png';
import shield from '../assets/icons/shield.png';
import lock from '../assets/icons/lock.png';
import { Modalize } from 'react-native-modalize';
import { useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Activity_Indicator } from "../components/active_indicator";

export interface LoginScreenProps{
}

export default function LoginScreen(props: LoginScreenProps){
    const [fontsLoaded] = useFonts({
        'Monocraft': require('../assets/fonts/Monocraft.otf'),
    });
    if (!fontsLoaded) {
        return (
            <Activity_Indicator/>
        )
    }

    const modal = useRef<Modalize>();

    const open_modal = () => {
        try {
            modal.current?.open();
        } catch (erro) {
            console.log(erro)
        }
    }

    const {name, price, imagem} = useLocalSearchParams();

    const getImageSource = (imageName:any) => {
        switch (imageName) {
          case 'Emissor':
            return require('../assets/fotos/Emissor.jpg');
          case 'Receptor':
            return require('../assets/fotos/Receptor.jpg');
        }
    };

    const img = getImageSource(imagem);

    return (
        <>
        <ScrollView>
            <View className="bg-[#0F0F0F] w-[100%] h-[1000px]">
                <View className="justify-center items-center mt-3">
                    <View className="border-[1px] border-[#FF6000] rounded-sm">
                        <Image source={img} style={{ width: 280, height: 280 }} />
                    </View>
                </View>
                <View className="bg-[#222322] rounded-lg mt-2 pt-3 pl-4">
                    <Text className="text-white font-bold text-[25px] mb-2">R$ {price}</Text>
                    <Text className="text-white text-[20px] mb-2">{name}</Text>

                    <View className="mb-2 flex-row items-center">
                        <Image source={star_orange} style={{width: 25, height: 25}}/>
                        <Image source={star_orange} style={{width: 25, height: 25}}/>
                        <Image source={star_orange} style={{width: 25, height: 25}}/>
                        <Image source={star_orange} style={{width: 25, height: 25}}/>
                        <Image source={star_white} style={{width: 25, height: 25}}/>
                        <Text className="text-white font-bold ml-2">4.8 | <Text className="font-normal">100 avaliações</Text></Text>
                    </View>

                    <Text className="text-white">Frete: <Text className="font-bold">Grátis</Text></Text>
                    <Text className="text-white">Entrega: <Text className="font-bold">17/09</Text></Text>

                    <View className="bg-slate-600 w-[90%] h-[1px] mt-3 mb-3"></View>

                    <View className="flex-row mb-3 mt-2 items-center">
                        <Image source={shield} style={{width: 30, height: 30}}/>
                        <Text className="text-white ml-2 font-bold">Pagamento seguro</Text>
                    </View>
                    <View className="flex-row mb-2 items-center">
                        <Image source={lock} style={{width: 30, height: 30}}/>
                        <Text className="text-white ml-2 font-bold">Segurança e privacidade</Text>
                    </View>

                    <View className="bg-slate-600 w-[90%] h-[1px] mt-3 mb-3"></View>

                    <View className="mb-10">
                        <Text className="text-white font-bold text-[20px] mb-2">Descrição</Text>
                        <Text className="text-white pr-8">
                            Dispositivo para transmitir 
                            dados via luz, compacto e com 
                            possibilidade de colocar em 
                            qualquer lugar.</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
        <GestureHandlerRootView className="bg-[#393939] h-[60px] items-center justify-center">
            {/* <Link> */}
            <TouchableOpacity className="w-[85%]" onPress={open_modal}>
                <View className="bg-[#FF6000] pt-2 pb-2 justify-center items-center rounded-md">
                    <Text className="text-white font-display">ADICIONAR AO CARRINHO</Text>
                </View>
            </TouchableOpacity>
            {/* </Link> */}
            <Modalize
                adjustToContentHeight
                childrenStyle={{ height: 400 }}
                ref={modal}>
                    <View className="bg-[#313131] h-[340px] w-[100%]">
                        <Text className="text-white text-[25px] mt-3 text-center">Carrinho</Text>
                        <View className="bg-slate-600 w-[90%] h-[1px] mt-3 mb-3"></View>
                        
                        <View className="pl-4 flex-row items-center">
                            <View className="border-[1px] border-[#FF6000] rounded-sm">
                                <Image source={img} style={{width: 100, height: 100}}/>
                            </View>
                            <View className="h-[100%] pl-4 pt-2 w-[100%]">
                                <Text className="text-white text-[20px] mb-2 font-bold">R$ {price}</Text>
                                <Text className="text-white text-[15px]">R$ {name}  |  1x</Text>
                            </View>
                        </View>
                    </View>
                <View className="bg-[#313131] items-center justify-center w-[100%] h-[60px]">
                    <TouchableOpacity className="w-[85%]" onPress={open_modal}>
                        <View className="bg-[#FF6000] pt-2 pb-2 justify-center items-center rounded-md">
                            <Text className="text-white font-display">Confirmar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modalize>
        </GestureHandlerRootView>
        </>
    )
}