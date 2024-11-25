import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Activity_Indicator } from "../components/active_indicator";
import { useFonts } from 'expo-font';
import { router } from "expo-router";
import arrow_icon from '../assets/icons/arrow_back.png';
import delet_icon from '../assets/icons/delet.png';
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { db } from "../../FirebaseConfig";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

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

    const getCarrinho = async (uid:string) =>{
        const q = query(collection(db, 'carrinho'), where('uid', '==', uid), where('status', '==', 'aguardando pagamento'));
        await getDocs(q).then( resultados => {
            const carrinhoList = resultados.docs.map(doc => ({
                ...doc.data(),
            })) as [];

            setCarrinho(carrinhoList)
        });
    }

    const delet_one_product = (produt_id:string, carrinho_id:string) => {
        let novo_carrinho = carrinho.filter(product => product['product_id'] == produt_id) as [];
        setCarrinho(novo_carrinho);
        deleteDoc(doc(db, 'carrinho', carrinho_id));
    }
    
    const delet_all_product = () => {
        carrinho.forEach(product => {
            deleteDoc(doc(db, 'carrinho', product['id']));
        })
        setCarrinho([]);
    }

    const fetchProdutos = async () => {
        const produtosRef = collection(db, 'produtos');
        const snapshot = await getDocs(produtosRef);
    
        const produtosList: Produto[] = snapshot.docs.map(doc => ({
          ...doc.data(),
        })) as Produto[];
    
        setProdutos(produtosList);
    };

    getCarrinho(uid.toString());
    fetchProdutos();

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
            <View className="absolute z-10 top-[2%] left-[4%]">
                <TouchableOpacity className="items-center justify-center pl-2 pt-2 pb-2"
                    onPress={() => {
                        router.back();
                    }}>
                    <Image source={arrow_icon} style={{width:25, height:25}}/>
                </TouchableOpacity>
            </View>
            <View className="h-[100%] w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">Aguardando pagamento</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-3"></View>

                {carrinho.length == 0 ? 
                    <View className="justify-center items-center w-[100%] h-[100%]">
                        <Text className="text-white text-[17px]">Nenhum produto</Text>
                    </View> 
                    
                    : carrinho.map(prod => {
                    let product_details:any;
                    produtos.map(i => {
                        if (prod['product_id'] == i.id) {
                            product_details = i;
                        }
                    })
                    return (
                        <View key={prod['id']} className="pl-4 mb-6 flex-row items-center">
                            <View className="border-[1px] border-[#FF6000] rounded-sm">
                                <Image source={getImageSource(product_details['img'])} style={{width: 100, height: 100}}/>
                            </View>
                            <View className="h-[100%] pl-4 pt-2 w-[40%]">
                                <Text className="text-white text-[20px] mb-2 font-bold">R$ {product_details['price'] * prod['unidades']}</Text>
                                <Text className="text-white text-[15px]">{product_details['name']}  |  {prod['unidades']}x</Text>
                            </View>
                            <View className="w-[50px] ml-9 h-[50px] items-center justify-center">
                                <TouchableOpacity className="bg-red-600 w-[100%] h-[100%] items-center justify-center rounded-[10px]"
                                    onPress={() => delet_one_product(prod['product_id'], prod['id'])}>
                                    <Image source={delet_icon} style={{height:25, width:25}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}      
                
            </View>
        </ScrollView>
        </>
    )
}