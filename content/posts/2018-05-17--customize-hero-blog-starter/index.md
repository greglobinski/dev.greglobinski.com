---
title: How to customize the HeroBlog starter's appearance
relatesTo: ['gatsby-starter-hero-blog']
category: instruction
cover: customize-hero-blog-starter.png
---

The [starter](https://github.com/greglobinski/gatsby-starter-hero-blog) uses a `yaml` file to store the starter's theme.

If you are not familiar with a `yaml` type files yet, read the [What is YAML and how to use it](/what-is-yaml/) post first.

Find the `theme.yaml` file.

```
root
  ├── src
  │   ├── theme
  │   │   └── theme.yaml
```

## Theme

There are three main sections in the file:

```yaml
# OPTIONS ------------------------
# ...

# GENERAL TOKENS -----------------
# ...

# COMPONENT TOKENS ---------------
# ...
```

### Options

In the `OPTIONS` section we declare all possible values for every value type: `space`, `size`, `color`, `font`, `time`, we will use in the starter's CSS. But we do not think about particular CSS properties yet. The options are abstract values for general value types.

```yaml
# OPTIONS ------------------------

# SPACE
space :
  # space options
  default : 20px
  xxs: 2px
  xs: 5px
  s: 10px
  m: 20px
  l: 40px
  xl: 80px
  inset:
    default : 20px
    xs: 5px
    s: 10px
    m: 20px
    l: 40px
  stack:
    default : 0 0 20px 0
    xxs: 0 0 2px 0
    xs: 0 0 5px 0
    s: 0 0 10px 0
    m: 0 0 20px 0
    l: 0 0 40px 0
  inline:
    default : 0 20px 0 0
    xxs: 0 2px 0 0
    xs: 0 5px 0 0
    s: 0 10px 0 0
    m: 0 20px 0 0
    l: 0 40px 0 0
# SIZE
size:
  radius:
    default: 10px
    small: 5px
# COLOR
color:
  # color options
  neutral:
    white: &color-white '#ffffff'
    gray:
      a: &color-gray-1 '#fafaf9'
      b: &color-gray-2 '#f3f2f2'
      c: &color-gray-3 '#ecebea'
      d: '#dddbda'
      e: '#c9c7c5'
      f: '#b0adab'
      g: '#969492'
      h: '#706e6b'
      i: '#514f4d'
      j: &color-gray-10 '#3e3e3c'
      k: '#2b2826'
    black: '#000000'
  brand:
    primary: &color-brand-primary '#709425'
    primaryActive: '#709425'
    light: '#709425'
    lightActive: '#709425'
    dark: '#709425'
    darkActive: '#709425'
  special:
    attention: &color-special-attention orange
# FONT
font:
  # font options
  family:
    initial: 'Arial, sans-serif'
    target: &font-family-target 'Open Sans'
  weight:
    standard: &font-weight-standard 400
    bold: &font-weight-bold 600
  size:
    xxs: &font-size-xs .8em
    xs: &font-size-xs .95em
    s: &font-size-s 1.1em
    m: &font-size-m 1.35em
    l: &font-size-l 1.7em
    xl: &font-size-xl 2em
    xxl: &font-size-xl 2.2em
    xxxl: &font-size-xxl 2.8em
  lineHeight:
    xs: &font-line-height-xs 1.1
    s: &font-line-height-s 1.2
    m: &font-line-height-m 1.3
    l: &font-line-height-l 1.4
    xl: &font-line-height-l 1.5
    xxl: &font-line-height-l 1.6
    reset: &font-line-height-reset 1
#TIME
time:
  duration:
    default: 0.5s
    long: 1s
```

### General tokens

In this section we use values declared in the `OPTIONS` section to define tokens which will be used as values of particular CSS properties. These are something like 'global' styles.

Notice that the same `*color-white` value is assign as a value to the `background.color.primary` token and the `text.color.primaryInverse` token. It could be assign to many different tokens as long as it make sense.

The general tokens should be universal, not tied to any particular design element. For example, the metioned earlier `background.color.primary` token could be assign as value of a `background` CSS property of any element.

```css
.button {
  // Attention! That's a pseudo code, not a real app's code
  background: background.color.primary;
}
```

or

```css
h1 {
  // Attention! That's a pseudo code, not a real app's code
  background: background.color.primary;
}
```

The general tokens maintains consistency through the whole app.

```yaml
# GENERAL TOKENS ------------------------
background:
  color:
    primary: *color-white
    alt: *color-gray-1
    brand: *color-brand-primary
text:
  family: *font-family-target
  color:
    primary: *color-gray-10
    primaryInverse: *color-white
    brand: *color-brand-primary
    attention: *color-special-attention
  lineHeight:
    default: *font-line-height-l
  maxWidth:
    tablet: 650px
    desktop: 700px
heading:
  family: *font-family-target
  size:
    h1: *font-size-xl
    h2: *font-size-l
    h3: *font-size-m
  lineHeight:
    h1: *font-line-height-xs
    h2: *font-line-height-xs
    h3: *font-line-height-xs
  weight: *font-weight-bold
line:
  color: *color-gray-3
icon:
  color: *color-brand-primary
```

### Component tokens

The last section `Component tokens` gives us a chance to define base style values for internal elements of particular components. It is not an obligatory section but it improves readability of CSS code.

```yaml
# COMPONENT TOKENS ------------------------
hero:
  h1:
    size: *font-size-xxl
    color: *color-white
    lineHeight: *font-line-height-xs
  background: 'linear-gradient(0deg, #E0306E, #6438B5)'
blog:
  h1:
    size: *font-size-l
    lineHeight: *font-line-height-xs
    hoverColor: *color-brand-primary
header:
  height:
    default: 80px
    fixed: 50px;
    homepage: 100px;
```

That's the starter's theme. It could look well-thought-out but in reality it's only a first try, designed to demonstrate the way of thinking.

## Update theme

There are two ways to change the theme.

You can edit the original `theme.yaml` file or create a new one.

```text
root
  ├── src
  │   ├── theme
  |   |   ├── theme.yaml
  │   │   └── new-theme.yaml
```

Then you have to update the `import` statement in the `/src/layouts/index.js` file.

```javascript
import themeObjectFromYaml from "../theme/new-theme.yaml"; // import themeObjectFromYaml from "../theme/theme.yaml";
```

That's all.

## Hero background image

To change the backgound image of the homepage's Hero section open the `/src/images/png/` folder and replace the `hero-background.png` file with your own, preserve the name of the file.
