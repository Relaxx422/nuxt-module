I'll complete this Vuetify Nuxt Module documentation guide for you, continuing from where you left off with the StackBlitz link. Here's the comprehensive guide:

---

Installation (continued)

Existing Project

If you already have a Nuxt project, you can add Vuetify by installing the module:

::: code-group

```bash [npm]
npm i -D vuetify-nuxt-module
```

```bash [yarn]
yarn add -D vuetify-nuxt-module
```

```bash [pnpm]
pnpm add -D vuetify-nuxt-module
```

```bash [bun]
bun add -D vuetify-nuxt-module
```

:::

Then add the module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['vuetify-nuxt-module']
})
```

Configuration

Basic Setup

The module works with zero configuration, but you can customize Vuetify through the `vuetify` property in your Nuxt config:

```typescript
export default defineNuxtConfig({
  modules: ['vuetify-nuxt-module'],
  vuetify: {
    vuetifyOptions: {
      // Vuetify options
      theme: {
        defaultTheme: 'dark'
      }
    },
    moduleOptions: {
      /* module specific options */
    }
  }
})
```

Configuration Options

`vuetifyOptions`

Standard Vuetify configuration object passed directly to `createVuetify()`:

Option	Type	Description	
`theme`	`ThemeOptions`	Theme configuration (light/dark modes, colors)	
`icons`	`IconOptions`	Icon library configuration	
`locale`	`LocaleOptions`	Internationalization settings	
`components`	`unknown`	Component customization	
`directives`	`unknown`	Directive configuration	
`defaults`	`DefaultsInstance`	Default props for components	

`moduleOptions`

Module-specific configuration:

```typescript
interface ModuleOptions {
  /** 
   * Styles configuration 
   * @default 'sass'
   */
  styles?: true | 'none' | 'sass' | 'css' | {
    configFile: string
  }
  
  /** 
   * Auto-import components 
   * @default true
   */
  autoImport?: boolean
  
  /**
   * Include Vuetify styles
   * @default true
   */
  includeStyles?: boolean
  
  /**
   * Tree-shaking configuration
   */
  treeShake?: boolean
}
```

Styles Configuration

Using Sass Variables (Recommended)

Create `assets/settings.scss`:

```scss
@use 'vuetify/settings' with (
  $color-pack: false,
  $utilities: false,
  $button-height: 40px
);
```

Then configure the module:

```typescript
export default defineNuxtConfig({
  modules: ['vuetify-nuxt-module'],
  vuetify: {
    moduleOptions: {
      styles: {
        configFile: 'assets/settings.scss'
      }
    }
  }
})
```

CSS-Only Mode

For projects not using Sass:

```typescript
export default defineNuxtConfig({
  vuetify: {
    moduleOptions: {
      styles: 'css'
    }
  }
})
```

Disable Styles

If you want to handle styles manually:

```typescript
export default defineNuxtConfig({
  vuetify: {
    moduleOptions: {
      styles: false
    }
  }
})
```

Features

🚀 Auto-imports

All Vuetify components and composables are auto-imported:

```vue
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-btn color="primary" @click="toggleTheme">
          Toggle Theme
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// useTheme is auto-imported
const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
```

🎨 Theme System

Full SSR-compatible theme support:

```typescript
export default defineNuxtConfig({
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#1867C0',
              secondary: '#5CBBF6',
              surface: '#FFFFFF',
              background: '#F5F5F5'
            }
          },
          dark: {
            colors: {
              primary: '#2196F3',
              secondary: '#424242',
              surface: '#121212',
              background: '#0D0D0D'
            }
          }
        }
      }
    }
  }
})
```

📱 Responsive Design

Vuetify's display composables work seamlessly with Nuxt:

```vue
<script setup>
const { mobile, platform } = useDisplay()
</script>

<template>
  <v-card :width="mobile ? '100%' : 400">
    <v-card-text>
      Platform: {{ platform.name }}
    </v-card-text>
  </v-card>
</template>
```

🌍 SSR & SSG

The module handles server-side rendering automatically:

- SSR: Full server-side rendering with hydration
- SSG: Compatible with `nuxt generate`
- Island Components: Support for Nuxt's server components

Icons

Material Design Icons (MDI)

Install the icon library:

::: code-group

```bash [npm]
npm i -D @mdi/font
```

```bash [yarn]
yarn add -D @mdi/font
```

```bash [pnpm]
pnpm add -D @mdi/font
```

:::

Configure in CSS:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@mdi/font/css/materialdesignicons.min.css'],
  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi'
      }
    }
  }
})
```

Other Icon Sets

```typescript
// FontAwesome
icons: {
  defaultSet: 'fa',
  sets: ['fa']
}

// SVG Icons
icons: {
  defaultSet: 'mdi-svg'
}
```

TypeScript

Full TypeScript support is included. For custom component types:

```typescript
// types/vuetify.d.ts
import 'vuetify/components'
import type { VBtn, VCard } from 'vuetify/components'

declare module 'vue' {
  export interface GlobalComponents {
    VBtn: typeof VBtn
    VCard: typeof VCard
  }
}
```

Advanced Usage

Custom Composables

Create composables that leverage Vuetify:

```typescript
// composables/useCustomTheme.ts
export function useCustomTheme() {
  const theme = useTheme()
  
  const isDark = computed(() => theme.global.current.value.dark)
  
  function setBrandColor(color: string) {
    theme.themes.value.light.colors.primary = color
    theme.themes.value.dark.colors.primary = color
  }
  
  return {
    isDark,
    setBrandColor
  }
}
```

Plugin Integration

Access Vuetify instance in plugins:

```typescript
// plugins/vuetify.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vuetify:ready', (vuetify) => {
    // Vuetify is ready
    console.log('Vuetify version:', vuetify.version)
  })
})
```

Troubleshooting

Common Issues

Styles not loading

Ensure you have the correct styles configuration:

```typescript
export default defineNuxtConfig({
  vuetify: {
    moduleOptions: {
      styles: true // or 'sass' or 'css'
    }
  }
})
```

Hydration mismatches

Use `ClientOnly` for components that access browser APIs:

```vue
<template>
  <ClientOnly>
    <v-chart :data="chartData" />
  </ClientOnly>
</template>
```

Tree-shaking not working

Enable explicit imports if needed:

```typescript
export default defineNuxtConfig({
  vuetify: {
    moduleOptions: {
      autoImport: false // Use explicit imports
    }
  }
})
```

Migration

From `@nuxtjs/vuetify`

1. Remove old module: `npm uninstall @nuxtjs/vuetify`
2. Install new module: `npm i -D vuetify-nuxt-module`
3. Update `nuxt.config.ts`:
   - Replace `@nuxtjs/vuetify` with `vuetify-nuxt-module`
   - Move config from `vuetify` root to `vuetify.vuetifyOptions`

From manual Vuetify setup

1. Remove manual Vuetify plugin
2. Install this module
3. Move your `createVuetify` configuration to `vuetify.vuetifyOptions`

Resources

- [GitHub Repository](https://github.com/userquin/vuetify-nuxt-module)
- [Vuetify Documentation](https://vuetifyjs.com/)
- [Nuxt Documentation](https://nuxt.com/)
- [StackBlitz Demo](https://stackblitz.com/github/userquin/vuetify-nuxt-module)

---

This guide provides a complete reference for using the Vuetify Nuxt Module. The module simplifies integration by handling SSR compatibility, auto-imports, and optimal build configuration automatically.
