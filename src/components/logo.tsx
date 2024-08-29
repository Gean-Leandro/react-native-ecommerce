import { Text } from 'react-native';

export interface LogoProps {
    first_line_size: string,
    second_line_size: string
}

export function Logo(props: LogoProps) {
    return(
        <Text className={"font-display text-white text-[" + props.first_line_size + "]"}>
            MEGA{"\n"}
            <Text className={"text-[#00D3CC] text-[" + props.second_line_size + "]"}>
                LI
            </Text>
            -
            <Text className={"text-[#0DC07F] text-[" + props.second_line_size + "]"}>
                FI
            </Text>
        </Text>
    )
}