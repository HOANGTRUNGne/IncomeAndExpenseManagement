/*
This custom document is needed to workaround this bug in antd + nextjs:

    https://github.com/ant-design/ant-design/issues/38767

The actual fix -- i.e., this entire file -- comes from

    https://github.com/ant-design/ant-design/issues/38767#issuecomment-1350362026

which is for a different bug in antd + nextjs, but it happens to fix
the same problem, and fortunately also works with the older nextjs 12.x, which
we are currently stuck with.

See also the discussion at https://github.com/ant-design/ant-design/issues/39891
*/

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { theme } from '~/utils';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const cache = createCache();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    (
                        <ConfigProvider theme={theme}>
                            <StyleProvider cache={cache}>
                                <App {...props} />
                            </StyleProvider>
                        </ConfigProvider>
                    ),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {/* This is hack, `extractStyle` does not currently support returning JSX or related data. */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `</script>${extractStyle(cache)}<script>`,
                        }}
                    />
                </>
            ),
        };
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
