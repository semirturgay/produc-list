import '../styles/globals.css'
import {SessionProvider, useSession} from "next-auth/react"
import type {NextComponentType} from 'next'
import {Box, ChakraProvider} from '@chakra-ui/react'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider, useQueryClient} from "react-query";
import {Navbar} from "./components/Navbar";

const queryClient = new QueryClient();

function MyApp({
                   Component,
                   pageProps: {session, ...pageProps}
               }: { Component: NextComponentType & { auth: true }, pageProps: AppProps["pageProps"] }) {

    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <SessionProvider session={session}>
                    {Component.auth ? (
                        <Auth>
                            <>
                                <Navbar/>
                                <Box position={"absolute"} mt={65} w="100%" zIndex={0}>
                                    <Component {...pageProps} />
                                </Box>
                            </>
                        </Auth>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </SessionProvider>
            </ChakraProvider></QueryClientProvider>
    )
}

function Auth({children}: { children: JSX.Element }): JSX.Element {
    const {status} = useSession({required: true})
    if (status === "loading") {
        return <div>Loading...</div>
    }

    return children
}

export default MyApp
