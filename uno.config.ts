import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss'
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  theme: {
    colors: {
      primary: 'var(--primary-c)',
    },
  },
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'border-base': 'border-[#8884]',
      'padding-base': 'px-4 py-4 md:px-12',
      'text-contrast': 'text-black dark:text-white',
      'text-btn': 'text-btn-primary',
      'text-secondary': 'text-$text-c-1',
    },
    [/^btn-(\w+)$/, ([_, color]) => `cursor-pointer op50 px2.5 py1 transition-all duration-200 ease-out no-underline! hover:(op100 text-${color} bg-${color}/10) border border-base! rounded`],
    [/^text-btn-(\w+)$/, ([_, color]) => `cursor-pointer op65 transition-all duration-200 ease-out no-underline! hover:(op100 text-${color})`],
  ],
  rules: [
    [/bg-main/, () => ({ 'background-color': 'var(--main-bg-c)' })],
    [
      /^ellipsis-(\d+)$/,
      ([, n]) => ({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': ' -webkit-box',
        '-webkit-line-clamp': `${n}`,
        '-webkit-box-orient': 'vertical',
      }),
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetExtra(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
