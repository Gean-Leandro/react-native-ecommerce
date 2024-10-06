import { TouchableOpacity, Text, Image,View } from "react-native";
import shopping_cart_icon from '../assets/icons/shopping_cart.png';
import { Link } from "expo-router";
import { object } from "yup";

export interface ProductViewProps {
    price: number,
    image: string,
    product_name: string
}
export function ProducView(props: ProductViewProps) {
    const getImageSource = (imageName:string) => {
        switch (imageName) {
          case 'Emissor':
            return require('../assets/fotos/Emissor.jpg');
          case 'Receptor':
            return require('../assets/fotos/Receptor.jpg');
        }
    };

    const img = getImageSource(props.image);

    return(
        <>
            <View className="border-[1px] border-[#FF6000] rounded-sm">
                <Image source={img} style={{width: 150, height: 150}}/>
            </View>
            <Text className="text-white text-center font-bold mt-1">{props.product_name}</Text>
            <View className="bg-[#FF6000] flex flex-row items-center justify-center rounded-sm mt-1 pt-2 pb-2">
                <Link href={{pathname:'/product', 
                    params: {
                        price: props.price,
                        name: props.product_name,
                        imagem: props.image,
                    }}}>

                    <Text className="font-display mr-2 text-white">R$ {props.price}</Text>
                    <Image source={shopping_cart_icon} style={{width: 18, height: 18}}/>
                </Link>
            </View>
        </>
    )
}