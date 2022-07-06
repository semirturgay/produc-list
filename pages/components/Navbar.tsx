import {
    Box,
    Flex,
    Avatar,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
} from '@chakra-ui/react';
import {signOut} from "next-auth/react"

const Navbar = () => {
    return (
        <Flex as="header" position="fixed" backgroundColor="white" w="100%" marginBottom={10} zIndex={1}>
            <Box w="100%" bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Product List</Box>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size='sm'
                                    src='https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=32&d=identicon&r=PG'
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => signOut({callbackUrl: `${window.location.origin}`})}>Sign
                                    out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
}

export default Navbar
