import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { useFonts } from 'expo-font';
import { Link, useLocalSearchParams } from "expo-router";
import roteador from '../assets/fotos/Roteador_branco.jpg';
import car_icon from '../assets/icons/shopping_cart.png';
import person_icon from '../assets/icons/person.png';
import { ProducView } from "../components/product_view";
import { Logo } from "../components/logo";
import { Activity_Indicator } from "../components/active_indicator";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useState } from "react";

interface Produto {
    id: string; 
    name: string; 
    type: string; 
    price: number; 
    img: string;
}

export default function HomeScreen(){
    const [produtos, setProdutos] = useState<Produto[]>([]);

    const { uid } = useLocalSearchParams()

    const fetchProdutos = async () => {
        const produtosRef = collection(db, 'produtos');
        const snapshot = await getDocs(produtosRef);
    
        const produtosList: Produto[] = snapshot.docs.map(doc => ({
          ...doc.data(),
        })) as Produto[];
    
        setProdutos(produtosList);
    };

    fetchProdutos();
        
    let [fontsloaded] = useFonts({'Monocraft': require('../assets/fonts/Monocraft.otf'),});

    if (!fontsloaded) {
        return (
            <Activity_Indicator/>
        )
    }

    if (produtos.length == 0) {
        return(
            <View className="bg-black w-[100%] h-[100%] items-center justify-center">
                <Text className="text-white text-[30px]">Carregando...</Text>
            </View>
        )
    }
    
    let align_justify = "items-center justify-center ";
    let font_display = "font-display ";

    return(
        <ScrollView>
        <View className="absolute z-10 top-[1%] left-[1%]">
            <View className="bg-[#222322] pl-2 pr-2 pt-1 pb-3 rounded-lg">
                <Logo first_line_size={20} second_line_size={15}/>
            </View>
        </View>

        <View className="absolute z-10 top-[1%] left-[75%]">
            <View className="flex flex-row">
                <Link href={{pathname:'/shopping_car', params:{ uid:uid }}}>
                    <View className="bg-[#222322] p-2 w-[55px] h-[55px] rounded-[50px]">
                        <Image source={car_icon} style={{width: 30, height: 30}}/>
                    </View>
                </Link>
                <Link className="ml-1" href={{pathname:'/perfil', params: { uid: uid}}}>
                    <View className="bg-[#222322] w-[55px] h-[55px] items-center justify-center rounded-[50px]">
                        <Image source={person_icon} style={{width: 30, height: 30}}/>
                    </View>
                </Link>
            </View>
        </View>
        <View className={"items-start bg-[#0F0F0F] w-[100%] h-[100%]"}>
            <View className="z-0 top-[-85px] w-[100%]">
                <Image source={roteador} style={{width: "100%", height: 350}}/>
                <View className={align_justify + "top-[-50px]"}>
                    <TouchableOpacity>
                        <Text className={font_display + "bg-[#FF6000] pl-8 pr-8 pt-2 pb-2 rounded-md"}>COMPRAR</Text>
                    </TouchableOpacity>
                </View>
                <View className="bg-[#222322] items-center ml-2 mr-2 p-2 top-[-2%] rounded-lg">
                    <Text className="font-display text-center mb-3 text-[#03DA9A]">EMISSORES</Text>
                    
                    
                    <View className="w-[100%] mb-5 flex gap-9 flex-row itens-center justify-center ">
                        {produtos.map((product:any) => {
                            if (product.type == "emissor"){
                                return (
                                    <View key={product.id}>
                                        <ProducView 
                                            id={product.id}
                                            price={product.price} 
                                            product_name={product.name}
                                            image={product.img}
                                            uid={uid.toString()}/>
                                    </View>
                                )
                            }
                        })}
                    </View>
                    
                    <View className="bg-slate-600 w-[90%] h-[1px] mb-3"></View>

                    <Text className="font-display text-center mb-3 text-[#03DA9A]">RECEPTORES</Text>
                    
                    <View className="w-[100%] mb-5 flex gap-9 flex-row itens-center justify-center ">
                        {produtos.map((product:any) => {
                            if (product.type == "receptor"){
                                return (
                                    <View key={product.id}>
                                        <ProducView
                                            id={product.id}
                                            price={product.price} 
                                            product_name={product.name}
                                            image={product.img}
                                            uid={uid.toString()}/>
                                    </View>
                                )
                            }
                        })}
                    </View>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}