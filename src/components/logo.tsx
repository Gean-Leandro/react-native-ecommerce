import { Text } from 'react-native';

export interface LogoProps {
    first_line_size: number,
    second_line_size: number
}

export function Logo(props: LogoProps) {
    return(
        <Text style={{ fontSize: props.first_line_size }} className={"font-display text-white"}>
            MEGA{"\n"}
            <Text style={{ fontSize: props.second_line_size }} className={"text-[#00D3CC]"}>LI</Text>
            -
            <Text style={{ fontSize: props.second_line_size }} className={"text-[#0DC07F]"}>FI</Text>
        </Text>
    )
}