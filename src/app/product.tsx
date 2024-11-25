import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ToastAndroid } from "react-native";
import { useFonts } from 'expo-font';
import { router } from "expo-router";
import { useLocalSearchParams, Link } from 'expo-router';
import star_orange from '../assets/icons/star_orange.png';
import star_white from '../assets/icons/star_white.png';
import shield from '../assets/icons/shield.png';
import arrow_icon from '../assets/icons/arrow_back.png';
import lock from '../assets/icons/lock.png';
import { Modalize } from 'react-native-modalize';
import { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Activity_Indicator } from "../components/active_indicator";
import carrinho from "../store/carrinho-store";
import { doc, setDoc, getDoc, collection} from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export default function LoginScreen(){
    const document = doc(collection(db,'carrinho'));

    const [fontsLoaded] = useFonts({
        'Monocraft': require('../assets/fonts/Monocraft.otf'),
    });
    if (!fontsLoaded) {
        return (
            <Activity_Indicator/>
        )
    }
    
    const [product, setProduct] = useState<any>(null);
    const [unid_product, setUnid_product] = useState<number>(1);
    const [addCarrinho, setAddCarrinho] = useState<boolean>(false);

    const { id, uid } = useLocalSearchParams();

    const getProduto = async () => {
        await getDoc(doc(db,'produtos', id.toString())).then(
            resultado => {
                setProduct(resultado.data())
            }
        )
    }

    const modal = useRef<Modalize>();

    const open_modal = () => {
        try {
            setAddCarrinho(true);
            modal.current?.open();
        } catch (erro) {
            console.log(erro)
        }
    }

    const { addProduct } = carrinho();
    const close_modal = () => {
        try {
            setDoc(document, {
                id: document.id,
                uid: uid,
                product_id: product.id,
                unidades: unid_product,
                status: 'carrinho'
            })
            modal.current?.close();
            ToastAndroid.show('Adicionado', 3000);
        } catch (erro) {
            console.log(erro)
        }
    }


    const getImageSource = (imageName:any) => {
        switch (imageName) {
          case 'Emissor':
            return require('../assets/fotos/Emissor.jpg');
          case 'Receptor':
            return require('../assets/fotos/Receptor.jpg');
        }
    };

    getProduto();

    if (!product) {
        return(
            <View className="bg-black w-[100%] h-[100%] items-center justify-center">
                <Text className="text-white text-[30px]">Carregando...</Text>
            </View>
        )
    }

    const img = getImageSource(product.img);

    return (
        <>
        <GestureHandlerRootView className="bg-[#393939] h-[100%] items-center justify-center">
        <ScrollView className="w-[100%]">
            <View className="absolute z-10 top-[2%] left-[4%]">
                <TouchableOpacity className="items-center justify-center pl-2 pt-2 pb-2"
                    onPress={() => {
                        router.back();
                    }}>
                    <Image source={arrow_icon} style={{width:25, height:25}}/>
                </TouchableOpacity>
            </View>
            <View className="bg-[#0F0F0F] w-[100%] h-[1000px]">
                
                <View className="justify-center items-center mt-3">
                    <View className="border-[1px] border-[#FF6000] rounded-sm">
                        <Image source={img} style={{ width: 280, height: 280 }} />
                    </View>
                </View>
                <View className="bg-[#222322] rounded-lg mt-2 pt-3 pl-4">
                    <Text className="text-white font-bold text-[25px] mb-2">R$ {product.price}</Text>
                    <Text className="text-white text-[20px] mb-2">{product.name}</Text>

                    <View className="mb-2 flex-row items-center">
                        <Image source={star_orange} style={{width: 25, height: 25}}/>
                        <Image source={star_orange} style={{width: 25, height: 25}}/>
                        <Image source={star_orange} style={{width: 25, height: 25}}/>
                        <Image source={star_orange} style={{width: 25, height: 25}}/>
                        <Image source={star_white} style={{width: 25, height: 25}}/>
                        <Text className="text-white font-bold ml-2">{product.nota} | <Text className="font-normal">{product.qtd_avaliacoes} avaliações</Text></Text>
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
                        <Text className="text-white pr-8">{product.descricao}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
        
            { !addCarrinho && (
                <TouchableOpacity className="w-[85%] mt-3 mb-3" onPress={open_modal}>
                    <View className="bg-[#FF6000] pt-2 pb-2 justify-center items-center rounded-md">
                        <Text className="text-white font-display">ADICIONAR AO CARRINHO</Text>
                    </View>
                </TouchableOpacity>    
                ) 
            }

            { addCarrinho && (
                <TouchableOpacity className="w-[85%] mt-3 mb-3">
                    <View className="bg-black pt-2 pb-2 justify-center items-center rounded-md">
                        <Text className="text-white font-display">ADICIONAR AO CARRINHO</Text>
                    </View>
                </TouchableOpacity>    
                ) 
            }
            <Modalize
                adjustToContentHeight        
                childrenStyle={{ height: 260 }}     
                ref={modal}>
                    <View className="bg-[#313131] h-[200px] w-[100%]">
                        <Text className="text-white text-[25px] mt-3 text-center">Adicionando ao carrinho</Text>
                        <View className="bg-slate-600 w-[90%] h-[1px] mt-3 ml-[5%] mb-3"></View>
                        
                        <View className="pl-4 flex-row items-center">
                            <View className="border-[1px] border-[#FF6000] rounded-sm">
                                <Image source={img} style={{width: 100, height: 100}}/>
                            </View>
                            <View className="h-[100%] pl-4 pt-2 w-[50%]">
                                <Text className="text-white text-[20px] mb-2 font-bold">R$ {product.price}</Text>
                                <Text className="text-white text-[15px]">R$ {product.name}  |  1x</Text>
                            </View>
                            <View className="items-center justify-start mt-3 w-[20%] h-[100%]">
                                <Text className="text-white font-bold text-[17px]">Unidade(s)</Text>
                                <TextInput placeholder="QTD"
                                        className="text-white"
                                        placeholderTextColor={'#8D8D8D'}>
                                            {unid_product}
                                </TextInput>
                                <View className="flex-row">
                                    <TouchableOpacity onPress={() => {
                                        if(unid_product >= 2){
                                            setUnid_product(unid_product - 1);
                                        }
                                    }}>
                                        <Text className="text-white text-[17px] font-bold bg-[#FF6000] pl-2 pr-2 pb-[3px]">-</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="ml-1" onPress={() => {
                                        setUnid_product(unid_product + 1);
                                    }}>
                                        <Text className="text-white text-[17px] font-bold bg-[#FF6000] pl-2 pr-2 pb-[3px]">+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                <View className="bg-[#313131] items-center justify-center w-[100%] h-[60px]">
                    <TouchableOpacity className="w-[85%]" onPress={close_modal}>
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