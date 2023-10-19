import { Center, Heading } from "@chakra-ui/react"

interface TitleProps {
    text: string;
}
export const Title = (props:TitleProps): JSX.Element => {
    return (
        <Center  alignSelf="center" maxW="max">
        <Heading size="3xl">{props.text}</Heading>
      </Center>
    )
}