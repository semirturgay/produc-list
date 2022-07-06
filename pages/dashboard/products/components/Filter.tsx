import {Box, Checkbox, Flex, HStack, Input, useColorModeValue} from "@chakra-ui/react";
import {ChangeEvent} from "react";

export const Filter = ({
                           onFilterByTittle,
                           onShowOnlyFeatured
                       }: { onFilterByTittle: (event: ChangeEvent<HTMLInputElement>) => void, onShowOnlyFeatured: (event: ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <Box w="100%" bg={useColorModeValue('gray.50', 'gray.500')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'flex-end'}>
                <HStack spacing={8} alignItems={'center'} px={4}>
                    <Input onChange={onFilterByTittle} placeholder='Filter by name' size='md'/>
                </HStack>
                <HStack>
                    <Checkbox onChange={onShowOnlyFeatured} colorScheme='green'>
                        Show featured products only
                    </Checkbox>
                </HStack>
            </Flex>
        </Box>
    )
}
