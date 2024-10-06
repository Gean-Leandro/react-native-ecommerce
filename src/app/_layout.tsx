import { Stack } from "expo-router";

export default function Layout () {
    return (
        <Stack screenOptions={{
            headerShown: false,
            statusBarColor: '#0F0F0F',
        }}/>
    );
}
