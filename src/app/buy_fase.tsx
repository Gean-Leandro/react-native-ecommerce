import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Activity_Indicator } from "../components/active_indicator";
import { useFonts } from 'expo-font';
import { Link, router, useLocalSearchParams } from "expo-router";
import arrow_icon from '../assets/icons/arrow_back.png';
import edit_icon from '../assets/icons/edit.png';
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

interface Produto {
    id: string; 
    name: string; 
    type: string; 
    price: number; 
    img: string;
}

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
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [find, setFind] = useState<boolean>(false);
    const [adress, setadress] = useState<[]>([])

    const getCarrinho = async (uid:string) =>{
        const q = query(collection(db, 'carrinho'), where('uid', '==', uid), where('status', '==', 'carrinho'));
        await getDocs(q).then( resultados => {
            const carrinhoList = resultados.docs.map(doc => ({
                ...doc.data(),
            })) as [];

            setCarrinho(carrinhoList)
        });
    }
    
    const getAdress = async (uid:string) =>{
        const q = query(collection(db, 'endereco'), where('uid', '==', uid));
        await getDocs(q).then( resultados => {
            const adressList = resultados.docs.map(doc => ({
                ...doc.data(),
            })) as [];

            setadress(adressList)
        });
    }

    const fetchProdutos = async () => {
        const produtosRef = collection(db, 'produtos');
        const snapshot = await getDocs(produtosRef);
    
        const produtosList: Produto[] = snapshot.docs.map(doc => ({
          ...doc.data(),
        })) as Produto[];
    
        setProdutos(produtosList);
    };

    const get_total = () => {
        let sum_total:number = 0;

        carrinho.map(prod => {
            let product_details:any;
            produtos.map(i => {
                if (prod['product_id'] == i.id) {
                    product_details = i;
                }  
            })
            sum_total += prod['unidades'] * product_details["price"];
        })
        setTotal(sum_total);
    }

    if (carrinho.length == 0 && adress.length == 0 && produtos.length == 0) {
        getCarrinho(uid.toString())
        getAdress(uid.toString());
        fetchProdutos();
    }


    if (carrinho.length > 0 && produtos.length > 0 && !find) {
        get_total();
        setFind(true);
    }


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
        <ScrollView className="h-[100%] bg-black">
            <View className="absolute z-10 top-[1%] left-[4%]">
                <TouchableOpacity className="items-center justify-center pl-2 pt-2 pb-2"
                    onPress={() => {
                        router.back();
                    }}>
                    <Image source={arrow_icon} style={{width:25, height:25}}/>
                </TouchableOpacity>
            </View>
            <View className="bg-[#313131] pb-2 mb-2 w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">Endereço</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-3"></View>
                
                {adress.length > 0 ? 
                adress.map(i => (
                    <>
                        <Text className="pl-5 mb-2 text-[17px] text-white">{i['bairro']}; Rua {i['rua']}; {i['num_casa']}</Text>
                        <Text className="pl-5 text-[17px] text-white">{i['cidade']}, {i['estado']}, {i['pais']}, {i['cep']}</Text>
                    </>
                ))
                 : <>
                    <Text className="pl-5 mb-2 text-[17px] text-white">Procurando endereco...</Text>
                </>}
                <View className="absolute top-[65%] left-[85%]">
                    <TouchableOpacity onPress={() => router.push({pathname:'/adress', params:{uid:uid}})}>
                        <Image source={edit_icon} style={{width:25, height:25}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bg-[#313131] pb-2 mb-2 w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">Opções de entrega</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-3"></View>
                
                <Text className="pl-5 mb-2 text-[17px] text-white">Envio: Frete grátis</Text>
                <Text className="pl-5 text-[17px] text-white">Data de entrega: 17/12 - 20/12</Text>
            </View>

            <View className="bg-[#313131] pb-2 mb-2 w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">Detalhe(s) dos item(ns)</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-3"></View>

                {carrinho.length > 0 && produtos.length > 0 ? 
                    carrinho.map(prod => {
                        let product_details:any;
                        produtos.map(i => {
                        if (prod['product_id'] == i.id) {
                            product_details = i;
                        }})
                        product_details;
                        return (
                            <View key={prod['id']} className="pl-4 mb-6 flex-row items-center">
                                <View className="border-[1px] border-[#FF6000] rounded-sm">
                                    <Image source={getImageSource(product_details['img'])} style={{width: 60, height: 60}}/>
                                </View>
                                <View className="h-[100%] pl-4 pt-2 w-[40%]">
                                    <Text className="text-white text-[20px] mb-2 font-bold">R$ {product_details["price"] * prod['unidades']}</Text>
                                    <Text className="text-white text-[15px]">{product_details['name']}  |  {prod['unidades']}x</Text>
                                </View>
                            </View>
                        )

                    })
                    :
                    <Text className="text-white text-[15px]">Carregando produtos...</Text>
                }  
                
            </View>

            <View className="bg-[#313131] pb-2 mb-2 w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">Método de pagamento</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-3"></View>
                
                <View className="flex-row ml-5">
                        <View>
                            <View className="bg-white items-center justify-center rounded-[50px] w-[20px] h-[20px]">
                                <View className="bg-[#FF6000] rounded-[50px] w-[16px] h-[16px]"/>    
                            </View>
                        </View>
                        <Text className="text-[17px] ml-2 text-white">PIX</Text>
                </View>
            </View>

            <View className="bg-[#313131] pb-2 mb-2 w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">Resumo</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-3"></View>
                
                <Text className="pl-5 mb-2 text-[17px] text-white">Subtotal: ------------------------------------------------------------- R$ {total}</Text>
                <Text className="pl-5 mb-2 text-[17px] text-white">Frete: ------------------------------------------------------------------ R$ 00,00</Text>
                <Text className="pl-5 text-[17px] font-bold text-white">Total: ---------------------------------------------- R$ {total}</Text>
            </View>
        </ScrollView>

        <View className="bg-[#313131] items-center justify-center w-[100%] h-[7%]">
            <TouchableOpacity className="w-[85%] m-2" onPress={() => {
                router.navigate({pathname:'/qr_code', params:{ uid: uid, id_carrinho: carrinho }})
            }}>
                <View className="bg-[#FF6000] pt-2 pb-2 justify-center items-center rounded-md">
                    <Text className="text-white font-display">CONFIRMAR COMPRA</Text>
                </View>
            </TouchableOpacity>
        </View>
        </>
    )
}