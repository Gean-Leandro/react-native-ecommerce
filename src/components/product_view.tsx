import { TouchableOpacity, Text, Image, View } from "react-native";
import shopping_cart_icon from '../assets/icons/shopping_cart.png';

export interface ProductViewProps {
    price: number,
    image: object,
    product_name: string
}
export function ProducView(props: ProductViewProps) {
    return(
        <>
            <View className="border-[1px] border-[#FF6000] rounded-sm">
                <Image source={props.image} style={{width: 150, height: 150}}/>
            </View>
            <Text className="text-white text-center font-bold mt-1">{props.product_name}</Text>
            <TouchableOpacity className="bg-[#FF6000] flex flex-row items-center justify-center rounded-sm mt-1 pt-2 pb-2">
                <Text className="font-display mr-2 text-white">R$ {props.price}</Text>
                <Image source={shopping_cart_icon} style={{width: 18, height: 18}}/>
            </TouchableOpacity>
        </>
    )
}