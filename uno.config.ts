import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: 'var(--primary-c)',
    },
  },
  shortcuts: [
    {
      'icon-btn': 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-primary',
      'text-btn': 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100',
      'border-base': 'border-[#8884]',
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
  ],
  transformers: [
    transformerDirectives(),
  ],
})
