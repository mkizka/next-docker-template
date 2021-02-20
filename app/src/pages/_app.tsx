import { Provider as NextAuthProvider } from "next-auth/client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ChakraProvider resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </NextAuthProvider>
  );
}
