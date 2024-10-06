import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { useFonts } from 'expo-font';
import roteador from '../assets/fotos/Roteador_branco.jpg';
import emissor from '../assets/fotos/Emissor.jpg';
import receptor from '../assets/fotos/Receptor.jpg';
import menu_icon from '../assets/icons/menu.png';
import search_icon from '../assets/icons/search.png';
import { ProducView } from "../components/product_view";
import { Logo } from "../components/logo";
import { Activity_Indicator } from "../components/active_indicator";

export interface HomeScreenProps{
}

export default function HomeScreen(props: HomeScreenProps){

    const products = [
        {
            id:1, 
            name:"EP - A01", 
            type:"emissor", 
            price:350.5, 
            img: 'Emissor'
        },
        {
            id:2, 
            name:"EP - A01", 
            type:"emissor", 
            price:350.5, img: 
            'Emissor'
        },
        {
            id:3,
             name:"RP - A01", 
             type:"receptor", 
             price:350.5, img: 
             'Receptor'
            },
        {
            id:4, 
            name:"RP - A01", 
            type:"receptor", 
            price:350.5, 
            img: 'Receptor'
        },
    ];
        
    let [fontsloaded] = useFonts({'Monocraft': require('../assets/fonts/Monocraft.otf'),});

    if (!fontsloaded) {
        return (
            <Activity_Indicator/>
        )
    }
    
    let align_justify = "items-center justify-center ";
    let font_display = "font-display ";

    return(
        <ScrollView>
        <View className={"items-start bg-[#0F0F0F] w-[100%] h-[100%]"}>
            <View className="flex flex-row z-10 w-[100%] pl-2 pr-2 items-baseline">
                <View className="bg-[#222322] w-[20%] pl-3 pr-2 pt-1 pb-[6px] mt-2 rounded-lg">
                    <Logo first_line_size={20} second_line_size={15}/>
                </View>

                <View className="flex flex-row items-start justify-end w-[80%]">
                    <View className="bg-[#222322] p-2 rounded-[50px]">
                        <Image source={search_icon} style={{width: 30, height: 30}}/>
                    </View>
                    <View className="bg-[#222322] p-2 ml-2 rounded-[50px]">
                        <Image source={menu_icon} style={{width: 30, height: 30}}/>
                    </View>
                </View>
            </View>
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
                        {products.map((product) => {
                            if (product.type == "emissor"){
                                return (
                                    <View key={product.id}>
                                        <ProducView 
                                            price={product.price} 
                                            product_name={product.name}
                                            image={product.img}/>
                                    </View>
                                )
                            }
                        })}
                    </View>
                    
                    <View className="bg-slate-600 w-[90%] h-[1px] mb-3"></View>

                    <Text className="font-display text-center mb-3 text-[#03DA9A]">RECEPTORES</Text>
                    
                    <View className="w-[100%] mb-5 flex gap-9 flex-row itens-center justify-center ">
                        {products.map((product) => {
                            if (product.type == "receptor"){
                                return (
                                    <View key={product.id}>
                                        <ProducView  
                                            price={product.price} 
                                            product_name={product.name}
                                            image={product.img}/>
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