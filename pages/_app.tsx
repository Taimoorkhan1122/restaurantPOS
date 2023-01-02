import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "reset-css";

import '.././styles/globals.css'


const baseTheme = {
    styles: {
        global: {
            main : {
                bg: "#FBFCFC" 
            }
        }
    },
    colors: {
        brand: {
            main: "#EC7905",
            light: "#FEF0E1",
            dark: "#333333",
            gray: "#808080",
            white: "#FBFCFC",
        },
    },
    fonts: {
        body: `'lato', times new roman`,
        heading: `'lato', times new roman`
    },
    fontSizes: {
        base: "16px",
        md: "18px",
        lg: "22px",
        xl: "24px",
        "444xl": "30px",
    },
    shadows : {
        innerShadow: `box-shadow: 0px -3px 7px 0px hsba(0, 0%, 0%, 0.1) inset`,
    }
};

const theme = extendTheme(baseTheme);

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme} cssVarsRoot="body">
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
