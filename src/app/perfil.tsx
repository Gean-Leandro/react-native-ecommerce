import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Activity_Indicator } from "../components/active_indicator";
import { useFonts } from 'expo-font';
import { Link, router, useLocalSearchParams } from "expo-router";
import person_icon from '../assets/icons/person.png';
import credit_card_icon from '../assets/icons/credit_card.png';
import local_shipping_icon from '../assets/icons/local_shipping.png';
import orders_icon from '../assets/icons/orders.png';
import quick_reorder_icon from '../assets/icons/quick_reorder.png';
import arrow_icon from '../assets/icons/arrow_back.png';
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export default function LoginScreen(){
    const [fontsLoaded] = useFonts({
        'Monocraft': require('../assets/fonts/Monocraft.otf'),
    });
    if (!fontsLoaded) {
        return (
            <Activity_Indicator/>
        )
    }

    const { uid } = useLocalSearchParams();
    const [carrinho, setCarrinho] = useState<[]>([]);

    const getCarrinho = async (uid:string) =>{
        const q = query(collection(db, 'carrinho'), where('uid', '==', uid), where('status', '==', 'aguardando pagamento'));
        await getDocs(q).then( resultados => {
            const carrinhoList = resultados.docs.map(doc => ({
                ...doc.data(),
            })) as [];

            setCarrinho(carrinhoList)
        });
    }

    getCarrinho(uid.toString());

    return (
        <>
        <ScrollView className="h-[100%] bg-black">
            <View className="absolute z-10 top-[2%] left-[4%]">
                <TouchableOpacity className="items-center justify-center pl-2 pt-2 pb-2"
                    onPress={() => {
                        router.back();
                    }}>
                    <Image source={arrow_icon} style={{width:25, height:25}}/>
                </TouchableOpacity>
            </View>
            <View className="bg-[#313131] pb-2 mb-2 w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">Perfil</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-3"></View>
                
                <View className="w-[100%] mb-5 justify-center items-center">
                    <View className="bg-[#4B4B4B] rounded-[50px] h-[80px] w-[80px] justify-center items-center">
                        <Image source={person_icon} style={{width:70, height:70}}/>
                    </View>
                </View>
                
                <Link className="ml-[5%] w-[100%] mb-2" href={{pathname:'/person_info', params:{uid:uid}}}>
                    <View className="bg-[#4B4B4B] w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                        <Text className="text-[17px] text-white">Informações pessoais</Text>
                    </View>
                </Link>

                <Link className="ml-[5%] w-[100%] mb-2" href={{pathname:'/adress', params:{uid:uid}}}>
                    <View className="bg-[#4B4B4B] w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                        <Text className="text-[17px] text-white">Endereço de entrega</Text>
                    </View>
                </Link>
                
                <View className="ml-[5%] w-[100%]">
                    <TouchableOpacity className="bg-[#A20101] w-[90%] rounded-[10px] h-[50px] justify-center">
                        <Text className="text-[17px] text-white font-bold text-center">
                            SAIR
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bg-[#313131] pb-2 mb-2 w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">Meus pedidos</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-3"></View>

                <View className="flex-row w-[100%] pl-[5%] mb-4 mt-4">
                    <View className="w-[20%] mr-5">
                        <Link href={{pathname:'/aguardando_pagamento', params: {uid: uid}}}>
                            <View className="w-[100%] items-center justify-center">
                                {carrinho.length > 0 ? 
                                <View className="bg-red-600 z-10 left-[62%] top-[-18%] absolute rounded-[10px] w-[18px] h-[18px] items-center justify-center">
                                    <Text className="text-white text-center">{carrinho.length}</Text>
                                </View> : null}
                                <Image source={credit_card_icon} style={{width:40, height:40}}/>
                                <Text className="text-white text-center text-[17px]">Aguardando pagamento</Text>
                            </View>
                        </Link>
                    </View>
                    <View className="w-[20%] mr-5">
                        <Link href={'/aguardando_envio'}>
                            <View className="w-[100%] items-center justify-center">
                                <Image source={orders_icon} style={{width:40, height:40}}/>
                                <Text className="text-white text-center text-[17px]">Aguardando envio</Text>
                            </View>
                        </Link>
                    </View>
                    <View className="w-[20%] mr-5">
                        <Link href={'/enviado'}>
                            <View className="w-[100%] items-center justify-center">
                                <Image source={local_shipping_icon} style={{width:40, height:40}}/>
                                <Text className="text-white text-center text-[17px]">Enviado</Text>
                            </View>
                        </Link>
                    </View>
                    <View className="w-[20%]">
                        <Link href={'/devolucao'}>
                            <View className="w-[100%] items-center justify-center">
                                <Image source={quick_reorder_icon} style={{width:40, height:40}}/>
                                <Text className="text-white text-center text-[17px]">Devolução</Text>
                            </View>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
        </>
    )
}