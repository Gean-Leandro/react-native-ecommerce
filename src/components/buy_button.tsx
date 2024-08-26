import { TouchableOpacity, Text, Image } from "react-native";
import shopping_cart_icon from '../assets/icons/shopping_cart.png';

export interface BuyButtonProps {
    price: number
}
export function BuyButton(props: BuyButtonProps) {
    return(
        <TouchableOpacity className="bg-[#FF6000] flex flex-row items-center justify-center rounded-sm mt-1 pt-2 pb-2">
            <Text className="font-display mr-2 text-white">R$ {props.price}</Text>
            <Image source={shopping_cart_icon} style={{width: 18, height: 18}}/>
        </TouchableOpacity>
    )
}