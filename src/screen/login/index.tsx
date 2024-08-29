import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useFonts } from 'expo-font';
import { Formik } from "formik";
import { useState } from "react";
import { Activity_Indicator } from "../../components/active_indicator";
import { Logo } from "../../components/logo";
import * as Yup from 'yup';


export interface LoginScreenProps{
}

export default function LoginScreen(props: LoginScreenProps){
    
    const [resultado, setResultado] = useState<null | 'logado' | 'falhou'>(null);
    const handleLogin = ({email, senha}: any) => {
        if (email.trim() == "admin@admin.com" && senha.trim() == "admin123"){
            setResultado('logado');
        } else {
            setResultado('falhou');
        }
    }
    
    const [fontsLoaded] = useFonts({
        'Monocraft': require('../../assets/fonts/Monocraft.otf'),
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
                <View className={align_justify + "w-[70%]"}>
                    
                    <View className={align_justify + "mb-10 absolute top-[-95%] w-[100%]"}>
                        <Logo first_line_size="52px" second_line_size="40px"/>
                    </View>
    
                    <Formik
                        initialValues={{email: '', senha:''}}
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
                                    // disabled={isSubmitting}
                                    >
                                    <Text className="mt-4 font-display text-center text-white bg-[#16AA67] rounded-sm pt-2 pb-2">
                                        ENTRAR
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