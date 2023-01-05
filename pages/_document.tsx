import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="ios/180.png" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="theme-color" content="#EC7905" />
                <meta name="mobile-web-app-capable" content="yes" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
