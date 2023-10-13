---
title: 如何优雅地在 Vue 中使用图标
date: 2023-10-10
tags: [Icon, Vue, Unocss]
---

图标是我们在进行前端开发时经常用到的一种资源，如何优雅而便捷地引用图标是一个值得讨论的问题。

---

笔者在个人项目中最常用的方法是使用 [Unocss](https://unocss.dev/)结合 [Iconify](https://iconify.design/) 来引用图标。

Unocss 是一个开源免费高性能且极具灵活性的即时原子化 CSS 引擎，提供了一种 [纯CSS使用图标](https://antfu.me/posts/icons-in-pure-css-zh) 的方法。Iconify 是一个开源的图标库，收集了超过 15 万个矢量图标。当二者相结合时，我们引用图标的方式会变成怎样呢？

## 开始

首先安装 `unocss` 和 `@iconify/json`。`@iconify/json` 这个包的总体积大概有 *70MB*，包含了 Iconify 中的所有图标。如果不想全部安装的话，可以只安装需要的图标库，如 `@iconify-json/carbon`。

```sh
pnpm i unocss @iconify/json -D
```

然后在 `vite.config.ts` 中注册 `unocss` 插件：

```ts
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    // ...
    Unocss()
  ]
})
```

注册 Unocss 插件时，可以直接传入一个配置对象，但还是建议在根目录下单独创建一个 `unocss.config.ts` 文件来管理配置。

一般图标的实际尺寸比相同尺寸的文字要小，所以我们可以通过 `scale` 属性来对图标进行缩放。

```ts
// unocss.config.ts
import {
  defineConfig,
  presetIcons,
} from 'unocss'

export default defineConfig({
  // ...
  presets: [
    // ...
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
  ],
})
```

接着在 `main.ts` 中引入 unocss 的样式文件：

```ts
// main.ts
import 'uno.css'
```

至此，最基本的配置已经完成，我们已经可以在项目中通过简单的类名来引用图标了。

在使用之前，建议先安装 [Unocss](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) 和 [Iconify](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) 两个插件。前者提供了 Unocss 的代码提示，后者除了提供了 Iconify 的代码提示外，还可以直接在代码中直接预览图标。

unocss 默认引用图标的前缀是 `i-`，使用 `i-` 加图标名即可引用相应的图标。图标库及其所有图标的名称可以在 [Icones](https://icones.netlify.app/) 找到。

```vue
<template>
  <div my-24 flex justify-center>
    <!-- <div class="i-carbon:sprout text-24px text-teal-600" /> -->
    <!-- 使用 Attributify 方式需要先引入 Attributify 预设  -->
    <div i-carbon:sprout text-24px text-teal-600 />
  </div>
</template>
```

正如代码中所示，我们可以通过 `font-size` 和 `color` 来控制图标的尺寸和颜色。不出意外的话，应该可以得到一个绿色的萌芽。

![](https://cdn.jsdelivr.net/gh/jic999/images/blog/20231011003051.png)

## 渲染函数

上面的方式的确是简单易用的，但却仅限于在模板中使用，如果我们想通过渲染函数来引用图标，就有些不好使了。

或许我们可以通过下面的代码来定义一个函数，以实现在渲染函数中引用图标：

```vue
<script setup lang="ts">
function renderIcon(
  icon: string,
  options?: { size?: number; color?: string },
) {
  const size = options?.size ?? 14
  return h('div', {
    class: icon,
    style: {
      fontSize: `${size}px`,
      color: options?.color,
    },
  })
}
</script>

<template>
  <div my-24 flex justify-center>
    <div i-carbon:sprout text-24px text-teal-600 />
    <component :is="renderIcon('i-carbon:logo-github')" />
  </div>
</template>
```

可以看到，这是有效的：

![](https://cdn.jsdelivr.net/gh/jic999/images/blog/20231011005050.png)

但实际上，这默认只能在 `.vue` 文件中生效，因为 `unocss` 默认只会提取 `.vue` 文件中的规则。要想在 js 和 ts 文件中使用，我们需要在 `unocss.config.ts` 中添加额外的配置。

> unocss默认提取规则：
> [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/]

```ts
export default defineConfig({
  // ...
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}',
      ],
    },
  },
})
```

现在，我们就可以在 js 和 ts 文件中使用 `renderIcon` 函数了。创建一个 ts 文件试试：

```ts
// @/utils/index.ts
export const AppleIcon = renderIcon('i-carbon:apple')
```

```vue
<script setup lang="ts">
import { AppleIcon, renderIcon } from '@/utils'

defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div my-24 flex justify-center>
    <div i-carbon:sprout text-24px text-teal-600 />
    <component :is="renderIcon('i-carbon:logo-github')" />
    <component :is="AppleIcon" />
  </div>
</template>
```

可以看到，图标如期生效了。

![](https://cdn.jsdelivr.net/gh/jic999/images/blog/20231011113633.png)

这样做的确是有效的，但 Unocss 可能会扫描一些不必要的 js 和 ts 文件。有时候，这并不是我们想要的，那么有没有其他的方法呢?

## 引入 @iconify/vue

事实上我们可以使用 Iconify 提供的 Vue 组件来引用图标。首先安装 `@iconify/vue`：

```sh
pnpm i @iconify/vue -D
```

改写 `renderIcon` 函数：

```ts
import { Icon } from '@iconify/vue'

export function renderIcon(
  icon: string,
  options?: { size?: number; color?: string },
) {
  const size = options?.size ?? 14
  return h(Icon, {
    icon,
    width: size,
    height: size,
    color: options?.color,
  })
}

export const AppleIcon = () => renderIcon('carbon:apple', { size: 20, color: 'red' })
```

需要注意的是，使用 `Icon` 组件时，图标的名称不需要添加加前缀，直接写`carbon:apple`即可。

可以看到，改写之后，图标仍然是正常显示的。

![](https://cdn.jsdelivr.net/gh/jic999/images/blog/20231011121117.png)

由于这里的图标不再是通过 Unocss 引用，所以之前设置的 `scale` 属性不再生效。如果想要保持图标的大小不变，可以将 `size` 属性乘以需要缩放的倍数。

## 封装组件

已经可以直接使用 *标签 + 类名* 的方式来引用图标了，为什么还要封装图标组件呢？我的理由是：在一大堆 HTML 标签中，一个 `TheIcon` 标签比一个 `div` 标签更加符合直觉。

```vue
<script setup lang="ts">
import { renderIcon } from '@/utils'

export interface TheIconProps {
  icon: string
  size?: number
  color?: string
}

const props = withDefaults(defineProps<TheIconProps>(), {
  size: 14,
})
const iconCom = computed(() => renderIcon(props.icon, { size: props.size, color: props.color }))
</script>

<template>
  <component :is="iconCom" />
</template>
```

在页面中使用：

```vue
<template>
  <div my-24 flex justify-center>
    <div i-carbon:sprout text-24px text-teal-600 />
    <component :is="renderIcon('carbon:logo-github')" />
    <component :is="AppleIcon" />
    <TheIcon icon="carbon:sun" :size="36" color="#19f" />
  </div>
</template>
```

可以看到，一切进行地很顺利~

![](https://cdn.jsdelivr.net/gh/jic999/images/blog/20231013012154.png)

## 使用自定义图标

上面我们实现了如何比较优雅而简单地引用图标库中的图标。那么我们能否使用类似的方式引用自定义图标呢？

答案是肯定的，下面分别介绍如何使用 Unocss、自定义组件、渲染函数实现引用自定义图标。

### Unocss

要想通过 Unocss引用自定义图标，需要先安装 `@iconify/utils` 依赖，而后借助其中的一个工具`FileSystemIconLoader`来实现。

```sh
pnpm i @iconify/utils -D
```

在`uno.config.ts` 中添加配置，其中 `cus` 为自定义图标库名称，`./public/svg` 为图标所在的目录。`FileSystemIconLoader` 的第二个参数是一个可选的 *transform* 函数，这里将十六进制颜色转为 `currentColor`，便于通过`color`指定图标颜色。

```ts
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  // ...
  presets: [
    // ...
    presetIcons({
      scale: 1.2,
      collections: {
        cus: FileSystemIconLoader(
          './public/svg',
          // 将十六进制颜色转为 currentColor
          svg => svg.replace(/fill="#([0-9a-f]{6})"/g, 'fill="currentColor"'),
        ),
      },
    }),
  ],
})
```

接下来把自定义图标放到 `./public/svg` 目录下，就可以在项目中使用了。我这里找了一个掘金社区的 logo 来作为示例。

```vue
<template>
  <div my-24 flex justify-center>
    <div i-carbon:sprout text-24px text-teal-600 />
    <component :is="renderIcon('carbon:logo-github')" />
    <component :is="AppleIcon" />
    <TheIcon icon="carbon:sun" :size="36" color="#19f" />
    <div i-cus-juejin text-sky-500 />
  </div>
</template>
```

如上所示，我是通过`i-cus-juejin`来引用图标的，*i* 是默认前缀，*cus* 就是我们设置的自定义图标库的名称，*juejin* 则是图标的文件名。

可以看到，一个天蓝色的掘金logo出现了。

![](https://cdn.jsdelivr.net/gh/jic999/images/blog/20231013020909.png)

### 自定义组件

通过 Unocss 使用自定义图标，封装渲染函数和组件的方式与之前的示例类似，这里不再赘述。下面介绍一下另一种方式。该方式需要借助一个插件 `vite-plugin-svg-icons`。

```sh
pnpm i vite-plugin-svg-icons -D
```

在`vite.config.ts`中注册插件并添加配置，详细可见 [官方文档](https://github.com/vbenjs/vite-plugin-svg-icons)。

```ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  // ...
  plugins: [
    // ...
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'public/svg')],
      symbolId: 'svg-icon-[dir]-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__',
    }),
  ],
})
```

接着在项目入口文件引入注册脚本：
  
```ts
// main.ts
import 'virtual:svg-icons-register'
```

然后我们可以先创建一个`SvgIcon`组件：

```vue
<script setup lang="ts">
// src/components/SvgIcon.vue
const props = defineProps({
  prefix: {
    type: String,
    default: 'svg-icon',
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  size: {
    type: Number,
    default: 14,
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.icon}`)
const style = computed(() => ({
  color: props.color,
  fontSize: `${props.size}px`,
}))
</script>

<template>
  <svg aria-hidden="true" width="1em" height="1em" :style="style">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
```

现在，我们就可以通过该组件中引用自定义图标了。

```vue
<template>
  <div my-24 flex justify-center>
    <div i-carbon:sprout text-24px text-teal-600 />
    <component :is="renderIcon('carbon:logo-github')" />
    <component :is="AppleIcon" />
    <TheIcon icon="carbon:sun" :size="36" color="#19f" />
    <div i-cus-juejin text-sky-500 />
    <SvgIcon icon="juejin" color="#91f" :size="30" />
  </div>
</template>
```

![](https://cdn.jsdelivr.net/gh/jic999/images/blog/20231013125412.png)

### 渲染函数

有了上面的组件，渲染函数就很容易了。

```ts
// src/utils/index.ts
export function renderCustomIcon(
  icon: string,
  options?: { size?: number; color?: string },
) {
  const size = options?.size ?? 14
  return h(
    SvgIcon,
    { icon, size, color: options?.color },
  )
}
```

在页面中使用：

```vue
<script setup lang="ts">
import { AppleIcon, renderCustomIcon, renderIcon } from '@/utils'
</script>

<template>
  <div my-24 flex justify-center>
    <div i-carbon:sprout text-24px text-teal-600 />
    <component :is="renderIcon('carbon:logo-github')" />
    <component :is="AppleIcon" />
    <TheIcon icon="carbon:sun" :size="36" color="#19f" />
    <div i-cus-juejin text-sky-500 />
    <SvgIcon icon="juejin" color="#91f" :size="30" />
    <component :is="renderCustomIcon('juejin', { color: 'red' })" />
  </div>
</template>
```

![](https://cdn.jsdelivr.net/gh/jic999/images/blog/20231013130049.png)

## 总结

通过上面的尝试，我们可以知道，使用 Unocss 可以轻松实现通过类名、渲染函数、自定义组件的方式引用图标库和自定义图标，但后二者需要开启 Unocss 对 js/ts 文件的扫描。

当我们并不想让 Unocss 检查额外的文件时，可以通过`@iconify/vue`提供的 Vue 组件来封装渲染函数和自定义组件，以使用图标库图标。

而对于自定义图标，我们可以使用`vite-plugin-svg-icons`插件，封装一个`SvgIcon`，从而实现通过渲染函数和自定义组件的方式引用。


