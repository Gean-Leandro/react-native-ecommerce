import { View, Text, TouchableOpacity, ScrollView, TextInput,Image } from "react-native";
import { Activity_Indicator } from "../components/active_indicator";
import { useFonts } from 'expo-font';
import { Link, router, useLocalSearchParams } from "expo-router";
import arrow_icon from '../assets/icons/arrow_back.png';
import { useState } from "react";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
    const [adress, setAdress] = useState<[]>([]);

    const getAdress = async (uid:string) =>{
        const q = query(collection(db, 'endereco'), where('uid', '==', uid));
        await getDocs(q).then( resultados => {
            const adressList = resultados.docs.map(doc => ({
                ...doc.data(),
            })) as [];

            setAdress(adressList)
        });
    }

    getAdress(uid.toString());

    const save_adress = ({pais, cep, estado, cidade, rua, bairro, complento, numero}:any) => {
        if (adress.length > 0) {
            let id = adress.map(e => (e['id']))

            updateDoc(doc(db,'endereco', id.toString()), {
                pais: pais,
                cep: cep,
                estado: estado,
                cidade: cidade,
                rua: rua,
                bairro: bairro,
                complento: complento,
                num_casa: numero
            })
        } else {
            const documento = collection(db,'endereco')
            addDoc(documento, {
                id: documento.id,
                uid: uid,
                pais: pais,
                cep: cep,
                estado: estado,
                cidade: cidade,
                rua: rua,
                bairro: bairro,
                complento: complento,
                num_casa: numero
            })
        }
        router.push({pathname:'/perfil', params:{uid:uid}})
    }

    let color_text_placeholder = "#FFFFFF";

    return (
        <>
        <ScrollView className="bg-[#313131] h-[100%]">
            <View className="absolute z-10 top-[1%] left-[4%]">
                <TouchableOpacity className="items-center justify-center pl-2 pt-2 pb-2"
                    onPress={() => {
                        router.push({pathname:'/perfil', params:{uid:uid}});
                    }}>
                    <Image source={arrow_icon} style={{width:25, height:25}}/>
                </TouchableOpacity>
            </View>
           
            <Formik initialValues={{pais:'', 
                                    cep:'', 
                                    estado:'', 
                                    cidade:'',
                                    rua:'',
                                    bairro:'',
                                    complento:'',
                                    numero: 0 
                                }}
                    onSubmit={save_adress}>
                        {({
                            handleChange, 
                            handleSubmit}) => (
                                <>
                                {
                                    adress.length > 0 ? 
                                    <>
                                    <View className="pb-2 mb-2 w-[100%]">
                                        <Text className="text-white text-[25px] font-display mt-3 text-center">Endereço</Text>
                                        <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-10"></View>
                                        
                                        <View className="bg-[#4B4B4B] ml-[5%] w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="País"
                                            onChangeText={handleChange('pais')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]">{adress.map(e => (e["pais"]))}</TextInput>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="CEP"
                                            onChangeText={handleChange('cep')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]">{adress.map(e => (e["cep"]))}</TextInput>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Estado"
                                            onChangeText={handleChange('estado')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]">{adress.map(e => (e["estado"]))}</TextInput>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Cidade"
                                            onChangeText={handleChange('cidade')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]">{adress.map(e => (e["cidade"]))}</TextInput>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Rua"
                                            onChangeText={handleChange('rua')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]">{adress.map(e => (e["rua"]))}</TextInput>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Bairro"
                                            onChangeText={handleChange('bairro')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]">{adress.map(e => (e["bairro"]))}</TextInput>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Complemento"
                                            onChangeText={handleChange('complemento')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]">{adress.map(e => (e["complemento"]))}</TextInput>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Número"
                                            onChangeText={handleChange('numero')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]">{adress.map(e => (e["num_casa"]))}</TextInput>
                                        </View>
                                    </View>
                                    </> :
                                    <>
                                    <View className="pb-2 mb-2 w-[100%]">
                                        <Text className="text-white text-[25px] font-display mt-3 text-center">Endereço</Text>
                                        <View className="bg-slate-600 ml-[5%] w-[90%] h-[1px] mt-3 mb-10"></View>
                                        
                                        <View className="bg-[#4B4B4B] ml-[5%] w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="País"
                                            onChangeText={handleChange('pais')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]"/>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="CEP"
                                            onChangeText={handleChange('cep')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]"/>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Estado"
                                            onChangeText={handleChange('estado')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]"/>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Cidade"
                                            onChangeText={handleChange('cidade')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]"/>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Rua"
                                            onChangeText={handleChange('rua')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]"/>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Bairro"
                                            onChangeText={handleChange('bairro')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]"/>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Complemento"
                                            onChangeText={handleChange('complemento')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]"/>
                                        </View>
                                        <View className="bg-[#4B4B4B] ml-[5%] mt-3 w-[90%] rounded-[10px] h-[50px] justify-center pl-4">
                                            <TextInput placeholder="Número"
                                            onChangeText={handleChange('numero')}
                                            placeholderTextColor={color_text_placeholder}
                                            className="text-white text-[17px]"/>
                                        </View>
                                    </View>
                                    </>
                                }
                                

                                <View className="h-[39%] items-center justify-end w-[100%]">
                                    <TouchableOpacity className="bg-[#199651] w-[90%] rounded-[10px] h-[50px] justify-center"
                                        onPress={() => {handleSubmit()}}>
                                        <Text className="text-[17px] text-white font-bold text-center">
                                            SALVAR
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                </>
                        )}
                    </Formik>
                    
        </ScrollView>
        </>
    )
}