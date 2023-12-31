import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Checkbox, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ReadingPlan, Reading, PlanBriefs } from "../types";

export const PlanOverviews = (props: PlanBriefs) => {
    const briefs = new Map<string, boolean>();
    props.briefs.forEach((b) => {
        briefs.set(b.key, false);
    });
    const [checked, setChecked] = useState(briefs);

    const checkBox = (key: string) => {
        const newChecked = structuredClone(checked);
        newChecked.set(key, !newChecked.get(key));
        setChecked(newChecked);
    }
    return (
        props.briefs.map((b) => {
            <Accordion allowToggle>
            <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                    <Checkbox
                        isChecked={checked.get(b.key)}
                        onChange={() => checkBox(b.key)}
                    >
                        {b.name}
                    </Checkbox>
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                <HStack padding={10}>
                    <Text fontWeight='bold'>
                        {b.tags.join(', ')}
                    </Text>
                    <Text fontSize={'md'}>{b.desc}</Text>
                </HStack>
            </AccordionPanel>
        </Accordion>
        })
    )
}

export const PlanBoxes = (props: ReadingPlan): JSX.Element => {
    const initialPlan = new Map<string, Reading>();
    props.readings.forEach((r: Reading) => {
        initialPlan.set(r.key, r);
    });
    const [items, setItems] = useState(initialPlan)

    const allChecked = Array.from(items).every(Boolean)
    const isIndeterminate = Array.from(items).some(Boolean) && !allChecked
    const checkAllBoxes = () => {
        const newItems = structuredClone(items);
        newItems.forEach((i) => {
            i.checked = true;
        })
        setItems(newItems);
    }
    const checkABox = (item: Reading) => {
        const newItems = structuredClone(items);
        newItems.set(item.key, item);
        setItems(newItems);
    }
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                    <Checkbox
                        isChecked={allChecked}
                        isIndeterminate={isIndeterminate}
                        onChange={checkAllBoxes}
                    >
                        {props.name}
                    </Checkbox>
                    </Box>
                    <AccordionIcon />
                    </AccordionButton>
                <AccordionPanel pb={4}>
                    <SimpleGrid columns={[1,1, 2, 3, 4]} pl={6} mt={1} spacing={1}>
                        {Array.from(items).map(([key, item]) => {
                            return (
                                <Checkbox
                                    id={key}
                                    isChecked={item.checked}
                                    onChange={() => checkABox(item)}
                                >
                                    <Text fontSize={'xs'}>{item.text}</Text>
                                </Checkbox>
                            )
                        })}
                    </SimpleGrid>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}
