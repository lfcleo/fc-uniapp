import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { presetIcons } from 'unocss'

import transformerDirectives from '@unocss/transformer-directives'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default {
    presets: [
        // https://github.com/MellowCo/unocss-preset-weapp
        presetWeapp(),
        // attributify autocomplete
        presetWeappAttributify(),
        presetIcons(),
    ],
    shortcuts: [
        {
            // 组合布局
            'flexc': 'flex flex-col',
            'flexr': 'flex flex-row',
            'flexw': 'flex flex-wrap',
            'flexcr': 'flex flex-col-reverse',
            'flexrr': 'flex flex-row-reverse',
            'flexwr': 'flex flex-wrap-reverse',
            'flex-c': 'justify-center items-center'
        },
        // {
        //     // 背景色类
        //     'fc-bg': 'bg-[var(--bg)]',
        //     'fc-bg1': 'bg-[var(--bg1)]',
        //     'fc-bg2': 'bg-[var(--bg2)]',
        //     'fc-bg3': 'bg-[var(--bg3)]',
        //     // 文本颜色类
        //     'fc-text': 'text-[var(--color)]',
        //     'fc-text1': 'text-[var(--color1)]',
        //     'fc-text2': 'text-[var(--color2)]',
        //     'fc-text3': 'text-[var(--color3)]',
        //     // 边框颜色类
        //     'fc-border': 'border-color-[var(--border)]',
        //     'fc-border1': 'border-color-[var(--border1)]',
        //     'fc-border2': 'border-color-[var(--border2)]',
        //     'fc-border3': 'border-color-[var(--border3)]',
        // }
    ],
    transformers: [
        transformerDirectives({
            enforce: 'pre',
        }),
        // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
        transformerAttributify(),
        // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
        transformerClass(),
    ],
    theme: {},
}
