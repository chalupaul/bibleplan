import { Text, VStack, Flex, Heading, Box, Stack, Center, Square, Fade, SlideFade, HStack, Card, CardHeader, CardBody, CardFooter, } from '@chakra-ui/react'
import prayer from './assets/prayer2.png';
import { PlanBoxes } from './components/selectables';
import { getDefaultPlans } from './data/defaultPlans';

function App() {
  const verseText: String = '1 In the beginning, God created the heavens and the earth. 2 The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters. 3 And God said, c“Let there be light,” and there was light. 4 And God saw that the light was good. And God separated the light from the darkness. 5 God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day. 6 And God said, d“Let there be an expanse1 in the midst of the waters, and let it separate the waters from the waters.” 7 And God made2 the expanse and eseparated the waters that were under the expanse from the waters that were fabove the expanse. And it was so. 8 And God called the expanse Heaven.3 And there was evening and there was morning, the second day. 1 In the beginning, God created the heavens and the earth. 2 The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters. 3 And God said, c“Let there be light,” and there was light. 4 And God saw that the light was good. And God separated the light from the darkness. 5 God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day. 6 And God said, d“Let there be an expanse1 in the midst of the waters, and let it separate the waters from the waters.” 7 And God made2 the expanse and eseparated the waters that were under the expanse from the waters that were fabove the expanse. And it was so. 8 And God called the expanse Heaven.3 And there was evening and there was morning, the second day. 1 In the beginning, God created the heavens and the earth. 2 The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters. 3 And God said, c“Let there be light,” and there was light. 4 And God saw that the light was good. And God separated the light from the darkness. 5 God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day. 6 And God said, d“Let there be an expanse1 in the midst of the waters, and let it separate the waters from the waters.” 7 And God made2 the expanse and eseparated the waters that were under the expanse from the waters that were fabove the expanse. And it was so. 8 And God called the expanse Heaven.3 And there was evening and there was morning, the second day.';
  const plans = getDefaultPlans()[0];
  console.log(plans);
  return (
    <Box width='100%'>
      <VStack spacing={10}>
        <Box backgroundImage={prayer} backgroundSize="100%, auto" backgroundPosition={{base: 'top', md: 'center'}} backgroundRepeat="no-repeat" width="100%">
          <Stack align="center" direction={{base: 'column', md: 'row'}}>
            <Square size={{base: '50vw', md: '50vw'}}>
              <VStack>
                <SlideFade transition={{enter: {duration: 1}}} offsetX='-25vw' in={true}>
                  <Heading paddingBottom="3" textColor="white" textAlign={"center"} size={['sm', 'lg', 'xl', '2xl', '4xl']}>Your Own Personal Bible Reading Plan</Heading>
                </SlideFade>
                <HStack>
                  <Fade in={true} transition={{enter: {duration: .75, delay: 1}}}><Heading textAlign="center" textColor="white" padding="2" size={['xs', 'sm', 'md', 'lg', 'xl']}>Any Books</Heading></Fade>
                  <Fade in={true} transition={{enter: {duration: .75, delay: 1.75}}}><Heading textAlign="center" textColor="white" padding="2" size={['xs', 'sm', 'md', 'lg', 'xl']}>Any Order</Heading></Fade>
                  <Fade in={true} transition={{enter: {duration: .75, delay: 2.5}}}><Heading textAlign="center" textColor="white" padding="2" size={['xs', 'sm', 'md', 'lg', 'xl']}>Any Time</Heading></Fade>
                </HStack>
              </VStack>
            </Square>
            <Center width={{base: '80vw', md: '50vw'}}>
                <Card width={{base: '100%', md: '70%'}} height={{base: '100%', md: '45%'}}>
                  <CardHeader padding={[1, 1, 2, 3, 5]}>
                    <Heading size='sm'>Today's Reading</Heading>
                  </CardHeader>
                  <CardBody padding={[1, 1, 2, 3, 5]}>
                  <Text noOfLines={[1,2,4,5,7,10]}  pt='2' fontSize='xs'>{verseText}</Text>
                  </CardBody>
                  <CardFooter padding={[1, 1, 2, 3, 5]}>
                    <Heading size='sm'>Genesis 1</Heading>
                  </CardFooter>
                </Card>
            </Center>
          </Stack>
        </Box>
        <Flex width="100%" padding={10}>
          <Box flex='1'>
            <Heading textAlign={"center"}>Use one of our plans...</Heading>
              <PlanBoxes {...plans} />
          </Box>
          <Box flex='1' ><Heading textAlign={"center"}>Or make your own...</Heading></Box>
        </Flex>   
     </VStack>
    </Box> 
  )
}

export default App
