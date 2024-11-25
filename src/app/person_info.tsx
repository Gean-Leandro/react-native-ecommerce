import { View, Text, TouchableOpacity, ScrollView, TextInput,Image } from "react-native";
import { Activity_Indicator } from "../components/active_indicator";
import { useFonts } from 'expo-font';
import { Link, router, useLocalSearchParams } from "expo-router";
import arrow_icon from '../assets/icons/arrow_back.png';
import { useState } from "react";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { Formik } from "formik";

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
    const [user, setuser] = useState<any>(null);

    const getUser = async (uid:string) =>{
        await getDoc(doc(db, 'usuarios', uid.toString())).then( resultado => {
            setuser(resultado.data());
        });
    }

    getUser(uid.toString());

    const save_user = ({nome, cpf, ddd, num_celular}:any) => {
        if (user) {
            updateDoc(doc(db,'usuarios', uid.toString()), {
                nome: nome == '' ? user.nome: nome,
                cpf: cpf == '' ? user.cpf: cpf,
                ddd: ddd == '' ? user.ddd: ddd,
                num_celular: num_celular == '' ? user.num_celular: num_celular
            })
        } 
        router.push({pathname:'/perfil', params:{uid:uid}})
    }

    let color_text_placeholder = "#FFFFFF";

    return (
        <>
        <ScrollView className="bg-[#313131] h-[100%]">
            <View className="absolute z-10 top-[2%] left-[4%]">
                <TouchableOpacity className="items-center justify-center pl-2 pt-2 pb-2"
                    onPress={() => {
                        router.back();
                    }}>
                    <Image source={arrow_icon} style={{width:25, height:25}}/>
                </TouchableOpacity>
            </View>
            <View className="pb-2 mb-2 w-[100%]">
                <Text className="text-white text-[25px] font-display mt-3 text-center">Informações pessoais</Text>
                <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-10"></View>

            <Formik initialValues={{nome:'', cpf:'', ddd:'', num_celular:''}}
                    onSubmit={save_user}>
                        {({ handleChange, handleSubmit}) => (
                                <>
                                {
                                    user ? 
                                    <>
                                        
                                        <View className="bg-[#4B4B4B] ml-[5%] w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Nome"
                                            onChangeText={handleChange('nome')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]">{user.nome}</TextInput>
                                        </View>
                                        <View className="w-[100%] flex-row">
                                            <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[17%] rounded-[10px] h-[50px] justify-center pl-4">
                                                <TextInput placeholder="DDD"
                                                onChangeText={handleChange('ddd')}
                                                placeholderTextColor={color_text_placeholder}
                                                className="text-white text-[17px]">{user.ddd}</TextInput>
                                            </View>
                                            <View className="bg-[#4B4B4B] ml-[2%] mt-3 w-[71%] rounded-[10px] h-[50px] justify-center pl-4">
                                                <TextInput placeholder="Número"
                                                onChangeText={handleChange('num_celular')}
                                                placeholderTextColor={color_text_placeholder}
                                                className="text-white text-[17px]">{user.num_celular}</TextInput>
                                            </View>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="CPF"
                                            onChangeText={handleChange('cpf')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]">{user.cpf}</TextInput>
                                        </View>
                                    </>:
                                    <>
                                        <View className="bg-[#4B4B4B] ml-[5%] w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Nome"
                                            onChangeText={handleChange('nome')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]"/>
                                        </View>
                                        <View className="w-[100%] flex-row">
                                            <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[17%] rounded-[10px] h-[50px] justify-center pl-4">
                                                <TextInput placeholder="DDD"
                                                onChangeText={handleChange('ddd')}
                                                placeholderTextColor={color_text_placeholder}
                                                className="text-white text-[17px]"/>
                                            </View>
                                            <View className="bg-[#4B4B4B] ml-[2%] mt-3 w-[71%] rounded-[10px] h-[50px] justify-center pl-4">
                                                <TextInput placeholder="Número"
                                                onChangeText={handleChange('num_celular')}
                                                placeholderTextColor={color_text_placeholder}
                                                className="text-white text-[17px]"/>
                                            </View>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="CPF"
                                            onChangeText={handleChange('cpf')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]"/>
                                        </View>
                                    </>
                                }
                                
                                <View className="h-[99%] items-center justify-end w-[100%]">
                                    <TouchableOpacity className="bg-[#199651] w-[90%] rounded-[10px] h-[50px] justify-center"
                                        onPress={() => handleSubmit()}>
                                        <Text className="text-[17px] text-white font-bold text-center">
                                            SALVAR
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                </>
                        )}
                    </Formik>
                </View>
        </ScrollView>
        </>
    )
}