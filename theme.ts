import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            main: {
                bg: "#FBFCFC",
                height: "100%",
            },
            span: {
                marginTop: "0 !important",
            },
        },
    },
    colors: {
        brand: {
            main: "#EC7905",
            light: "#FEF0E1",
            dark: "#333333",
            gray: "#808080",
            white: "#FBFCFC",
            grayLight: "#F5F5F5",
        },
    },
    fonts: {
        body: `'lato', times new roman`,
        heading: `'lato', times new roman`,
    },
    fontSizes: {
        base: "16px",
        md: "18px",
        lg: "22px",
        xl: "24px",
        "444xl": "30px",
    },
    shadows: {
        innerShadow: `0px -3px 7px 0px rgba(0, 0, 0, 0.1) inset;`,
        boxShadow: `0px -5px 6px -1px rgba(0, 0, 0, 0.1);`,
        cardShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.1);`,
        cardInnerShadow: `0px -2px 4px -1px rgb(0 0 0 / 6%) inset, 0px 6px 6px -1px rgb(0 0 0 / 10%) inset`,
    },

    components: {
        Button: {
            variants: {
                link: {
                    ":focus": {
                        outline: "none",
                        boxShadow: "none",
                    },
                },
                ghost: {
                    ":hover": {
                        background: "none",
                    },
                },
            },
        },
    },
});
