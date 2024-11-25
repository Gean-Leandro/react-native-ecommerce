import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, ToastAndroid } from "react-native";
import { useFonts } from 'expo-font';
import arrow_icon from '../assets/icons/arrow_back.png';
import { Formik } from "formik";
import { router } from 'expo-router';
import { useState } from "react";
import { Activity_Indicator } from "../components/active_indicator";
import { Logo } from "../components/logo";
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../FirebaseConfig";
import { db } from "../../FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";


export interface LoginScreenProps{
}

export default function LoginScreen(props: LoginScreenProps){
    
    const [resultado, setResultado] = useState<null | 'logado' | 'falhou'>(null);
    const handleLogin = async ({nome, cpf, email, senha}: any) => {
        await createUserWithEmailAndPassword(auth, email, senha).then(
            async (usuario) => { 
                await setDoc(doc(db, 'usuarios', usuario.user.uid), {
                    id: usuario.user.uid,
                    email: email,
                    nome: nome,
                    cpf: cpf,
                    ddd: '',
                    num_celular: ''
                }); 
                router.back();
                ToastAndroid.show('Conta criada', 3000);
            }
        ).catch(
            error => ToastAndroid.show('E-mail já cadastrado', 4000)
        )
    }
    
    const [fontsLoaded] = useFonts({
        'Monocraft': require('../assets/fonts/Monocraft.otf'),
    });
    if (!fontsLoaded) {
        return (
            <Activity_Indicator/>
        )
    }

    let align_justify = "items-center justify-center ";
    let color_text_placeholder = "#8D8D8D"


    return(
        <View className="bg-[#0F0F0F]  w-[100%] h-[100%]">
            <View className={align_justify + "h-[100%]"}>
                <View className="absolute z-10 top-[2%] left-[4%]">
                    <TouchableOpacity className="items-center justify-center pl-2 pt-2 pb-2"
                        onPress={() => {
                            router.back();
                        }}>
                        <Image source={arrow_icon} style={{width:25, height:25}}/>
                    </TouchableOpacity>
                </View>
                <View className={align_justify + "w-[70%]"}>
                    <View className={align_justify + "absolute top-[-78%] w-[100%]"}>
                        <Logo first_line_size={52} second_line_size={40}/>
                    </View>
    
                    <Formik
                        initialValues={{nome:'', cpf: '', email: '', senha:''}}
                        onSubmit={handleLogin}
                        validationSchema={Yup.object({
                            email: Yup.string().email("Digite um E-mail válido").required("E-mail obrigatório"),
                            senha: Yup.string().required("Senha obrigatória")
                        })}>
                        {({
                            handleChange, 
                            handleSubmit, 
                            errors, 
                            touched, 
                            handleBlur,
                            isSubmitting}) => (
                            <View className="bg-[#222322] p-4 w-[100%] rounded-lg">
                                <Text className="font-display text-white text-center text-[20px] mb-6">LOGIN</Text>   

                                <TextInput
                                    onChangeText={handleChange('nome')}
                                    className="text-white"
                                    onBlur={handleBlur("nome")}
                                    placeholder="Nome" 
                                    placeholderTextColor={color_text_placeholder}/>
                                <View className="mb-1 w-[100%] bg-[#8D8D8D] h-[1px] rounded"/>
                                {errors.email && touched.email && (
                                    <Text className="mb-2 text-red-600 pl-1">
                                        {errors.email}
                                    </Text>
                                )}

                                <TextInput
                                    onChangeText={handleChange('cpf')}
                                    className="text-white"
                                    onBlur={handleBlur("cpf")}
                                    placeholder="CPF" 
                                    placeholderTextColor={color_text_placeholder}/>
                                <View className="mb-1 w-[100%] bg-[#8D8D8D] h-[1px] rounded"/>
                                {errors.email && touched.email && (
                                    <Text className="mb-2 text-red-600 pl-1">
                                        {errors.email}
                                    </Text>
                                )}

                                <TextInput
                                    onChangeText={handleChange('email')}
                                    className="text-white"
                                    onBlur={handleBlur("email")}
                                    placeholder="E-mail" 
                                    placeholderTextColor={color_text_placeholder}/>
                                <View className="mb-1 w-[100%] bg-[#8D8D8D] h-[1px] rounded"/>
                                {errors.email && touched.email && (
                                    <Text className="mb-2 text-red-600 pl-1">
                                        {errors.email}
                                    </Text>
                                )}
                                
                                <TextInput 
                                    onChangeText={handleChange('senha')} 
                                    onBlur={handleBlur("senha")}
                                    className="text-white" 
                                    placeholder="Senha"
                                    placeholderTextColor={color_text_placeholder} secureTextEntry/>
                                <View className="mb-1 w-[100%] bg-[#8D8D8D] h-[1px] rounded"/>
                                {errors.senha && touched.senha && (
                                    <Text className="text-red-600 pl-1">
                                        {errors.senha}
                                    </Text>
                                )}

                                <TouchableOpacity
                                    onPress={() => handleSubmit()}
                                    disabled={isSubmitting}
                                    >
                                    <Text className="mt-4 font-display text-center text-white bg-[#16AA67] rounded-sm pt-2 pb-2">
                                        CRIAR
                                    </Text>
                                </TouchableOpacity>

                                { resultado == 'logado' && (
                                    <Text className="text-[#16AA67] text-center mt-3">Logado com sucesso</Text>
                                )}
                                { resultado == 'falhou' && (
                                    <Text className="text-red-600 text-center mt-3">E-MAIL ou senha incorreto</Text>
                                )}
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </View>
    )
}