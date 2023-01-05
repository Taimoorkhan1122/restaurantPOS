import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "reset-css";

import '.././styles/globals.css'


const baseTheme = {
    styles: {
        global: {
            main : {
                bg: "#FBFCFC", 
                height: "100%",
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
        innerShadow: `0px -3px 7px 0px rgba(0, 0, 0, 0.1) inset;`,
        boxShadow: `0px -5px 6px -1px rgba(0, 0, 0, 0.1);`,
        cardShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.1);`,
        cardInnerShadow: `0px -2px 4px -1px rgb(0 0 0 / 6%) inset, 0px 6px 6px -1px rgb(0 0 0 / 10%) inset`
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
