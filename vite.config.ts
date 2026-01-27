import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => {
    const UnoCSS = await import('unocss/vite').then(i => i.default)
    return {
        plugins: [
            uni(),
            UnoCSS({
                configFile: './src/modules/style/unocss.config.ts',
            }),
            AutoImport({
                imports: ['vue', 'uni-app', {
                    '~/fcuni/index': [['default', 'FC']]
                }]
            })
        ],
        resolve: {
            alias: {
                '~': path.resolve(__dirname)
            }
        },
        // 解决控制台提示 The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['legacy-js-api']
                }
            }
        },
    }
});
