import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Activity_Indicator } from "../components/active_indicator";
import { useFonts } from 'expo-font';
import { router } from "expo-router";
import arrow_icon from '../assets/icons/arrow_back.png';
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
        const q = query(collection(db, 'carrinho'), where('uid', '==', uid), where('status', '==', 'carrinho'));
        await getDocs(q).then( resultados => {
            const carrinhoList = resultados.docs.map(doc => ({
                ...doc.data(),
            })) as [];

            setCarrinho(carrinhoList)
        });
    }
    getCarrinho(uid.toString());
    const update_carrinho = () => {
        carrinho.map(async produto => {
            await updateDoc(doc(db, 'carrinho', produto["id"]), {
                status: 'aguardando pagamento'
            })
        })
    }

    return (
        <>
        <ScrollView className="h-[100%] bg-black">
            <View className="absolute z-10 top-[1%] left-[4%]">
                <TouchableOpacity className="items-center justify-center pl-2 pt-2 pb-2"
                    onPress={() => {
                        update_carrinho();
                        router.back();
                    }}>
                    <Image source={arrow_icon} style={{width:25, height:25}}/>
                </TouchableOpacity>
            </View>
            <View className="bg-[#313131] pb-2 mb-2 w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">QR Code</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-3"></View>
                
                <Text className="pl-5 pr-5 mb-5 text-[17px] text-white">Page escaneando o código ou use o pix copia e cola abaixo:</Text>
                <View className="w-[100%] mb-5 justify-center items-center">
                    <View className="bg-white rounded-lg w-[60%] h-[220px] items-center justify-center">
                        <Text className="text-center font-bold text-[17px]">QR CODE</Text>
                    </View>
                </View>
                <Text className="pl-5 pr-5 mb-5text-[17px] text-white">PIX copia e cola: ASokoflkasf516as5c1as46as2fa6sfatTsa63s1s5f65afsa6fsa51f6asfsafrfhsvcn6fgdj15as4f6sa</Text>
                
                <View className="justify-center items-center">
                    <TouchableOpacity className="w-[25%] m-2">
                        <View className="bg-[#FF6000] pt-2 pb-2 justify-center items-center rounded-md">
                            <Text className="text-white font-display">COPIAR</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bg-[#313131] pb-2 mb-2 w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">Instruções</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-3"></View>
                
                <Text className="pl-5 pr-5 mb-2 text-[17px] text-white">Ao pagar pode sair dessa tela e aguardar a confirmação do pagamento.</Text>
                <Text className="pl-5 pr-5 mb-2 text-[17px] text-white">Quando o pagamento é confirmado, começará o processo de entrega.</Text>
            </View>
        </ScrollView>

        
        <View className="bg-[#313131] items-center justify-center w-[100%] h-[7%]">
            
            {carrinho.length == 0 ? <TouchableOpacity className="w-[85%] m-2"
                onPress={() => {
                        router.navigate({pathname:'/home', params:{ uid: uid }});
                        update_carrinho();
                    }}
                disabled={true}>
                <View className="bg-black pt-2 pb-2 justify-center items-center rounded-md">
                    <Text className="text-white font-display">VOLTAR</Text>
                </View>
            </TouchableOpacity> : 
            
            <TouchableOpacity className="w-[85%] m-2"
                onPress={() => {
                        router.push({pathname:'/home', params:{ uid: uid }});
                        update_carrinho();
                    }}>
                <View className="bg-[#FF6000] pt-2 pb-2 justify-center items-center rounded-md">
                    <Text className="text-white font-display">VOLTAR</Text>
                </View>
            </TouchableOpacity>
            }
        </View>
        </>
    )
}