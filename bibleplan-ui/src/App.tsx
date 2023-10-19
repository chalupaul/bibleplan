import { useState } from 'react'

import { Container, VStack, Flex, Text, Heading, Center, Box, Spacer, SimpleGrid } from '@chakra-ui/react'
import { Title } from './components/layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box width='100%'>
    <Container maxW="max">
      <VStack spacing={10}>
        <Heading textAlign={"center"} size="3xl">Your own Personal Bible Reading Plan</Heading>
        <Flex width="100%" padding={10}>
          <Box flex='1'><Heading textAlign={"center"}>Use one of our plans...</Heading></Box>
          <Box flex='1' ><Heading textAlign={"center"}>Or make your own...</Heading></Box>
        </Flex>   
     </VStack>
    </Container>
    </Box>
    
  )
}

export default App
