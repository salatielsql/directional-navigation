# Directional Navigation ⬆️➡️⬇️⬅️

HTML-first spatial navigation library focused on directional sections. Built with TypeScript, perfect for TV interfaces, game consoles, and keyboard-driven applications.

## Features

- 🎯 **HTML-first approach** - Configure navigation using data attributes
- 📐 **Multiple section types** - Horizontal, vertical, and grid layouts
- 🔄 **Section transitions** - Seamlessly navigate between sections
- ⌨️ **Keyboard navigation** - Arrow keys (↑↓←→) for intuitive control
- 🎨 **Framework agnostic** - Works with any framework or vanilla HTML
- 📦 **Lightweight** - Zero dependencies, TypeScript built
- 🎭 **Custom events** - Listen to navigation events

## Demo

Check out the live demo: https://directional-navigation-demo.netlify.app

## Installation

```bash
npm install directional-navigation
```

## Quick Start

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import DirectionalNavigation from 'directional-navigation'

      window.addEventListener('DOMContentLoaded', DirectionalNavigation.init)
    </script>
  </head>
  <body>
    <section
      data-section-id="horizontal-01"
      data-section-direction="horizontal"
      data-focused-children-index="0"
      tabindex="0"
    >
      <button data-parent-section="horizontal-01">Card 01</button>
      <button data-parent-section="horizontal-01">Card 02</button>
      <button data-parent-section="horizontal-01">Card 03</button>
    </section>
  </body>
</html>
```

## API

### Initialization

```typescript
import DirectionalNavigation from 'directional-navigation'

// Initialize the library
DirectionalNavigation.init()

// Clean up (remove event listeners)
DirectionalNavigation.destroy()

// Programmatically focus an element
DirectionalNavigation.focus(element)
```

## Data Attributes

### Section Attributes

| Attribute                     | Required       | Description                                               |
| ----------------------------- | -------------- | --------------------------------------------------------- |
| `data-section-id`             | ✅             | Unique identifier for the section                         |
| `data-section-direction`      | ✅             | Navigation direction: `horizontal`, `vertical`, or `grid` |
| `data-focused-children-index` | ❌             | Index of currently focused child (default: `0`)           |
| `data-leave-left`             | ❌             | CSS selector for element to focus when leaving left       |
| `data-leave-right`            | ❌             | CSS selector for element to focus when leaving right      |
| `data-leave-up`               | ❌             | CSS selector for element to focus when leaving up         |
| `data-leave-down`             | ❌             | CSS selector for element to focus when leaving down       |
| `data-grid-columns`           | ✅ (grid only) | Number of columns in grid layout                          |
| `data-grid-rows`              | ✅ (grid only) | Number of rows in grid layout                             |

### Child Element Attributes

| Attribute             | Required | Description                          |
| --------------------- | -------- | ------------------------------------ |
| `data-parent-section` | ✅       | Section ID this element belongs to   |
| `data-initial-focus`  | ❌       | Focus this element on initialization |

## Section Types

### Horizontal Section

Navigate left/right within the section. Up/down arrows leave the section.

```html
<section
  data-section-id="horizontal-01"
  data-section-direction="horizontal"
  data-leave-left="[data-section-id='navbar']"
  data-leave-right="[data-section-id='horizontal-02']"
  tabindex="0"
>
  <button data-parent-section="horizontal-01">Card 01</button>
  <button data-parent-section="horizontal-01">Card 02</button>
  <button data-parent-section="horizontal-01">Card 03</button>
</section>
```

### Vertical Section

Navigate up/down within the section. Left/right arrows leave the section.

```html
<aside
  data-section-id="navbar"
  data-section-direction="vertical"
  data-leave-right="#main"
  tabindex="0"
>
  <div data-parent-section="navbar" data-initial-focus>Home</div>
  <div data-parent-section="navbar">Search</div>
  <div data-parent-section="navbar">Profile</div>
</aside>
```

### Grid Section

Navigate in all four directions within a grid layout.

```html
<section
  data-section-id="grid"
  data-section-direction="grid"
  data-grid-columns="3"
  data-grid-rows="3"
  data-leave-left="[data-section-id='navbar']"
  tabindex="0"
>
  <button data-parent-section="grid">Item 1</button>
  <button data-parent-section="grid">Item 2</button>
  <button data-parent-section="grid">Item 3</button>
  <!-- ... 6 more items for 3x3 grid -->
</section>
```

## Events

The library dispatches custom events you can listen to:

### `dn:did-focus`

Dispatched when an element receives focus.

```typescript
window.addEventListener('dn:did-focus', e => {
  const element = e.target as HTMLElement
  console.log('Focused:', element)

  // Scroll element into view
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  })
})
```

### `dn:initialized`

Dispatched when the library finishes initialization.

```typescript
window.addEventListener('dn:initialized', () => {
  console.log('Directional Navigation initialized')
})
```

### `dn:destroyed`

Dispatched when the library is destroyed.

```typescript
window.addEventListener('dn:destroyed', () => {
  console.log('Directional Navigation destroyed')
})
```

## Complete Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Directional Navigation Demo</title>
    <style>
      /* Minimal CSS for focus highlighting */
      [data-parent-section]:focus {
        outline: 3px solid #3b82f6;
        outline-offset: 4px;
        background-color: #dbeafe;
      }

      [data-section-id]:focus {
        outline: 2px dashed #94a3b8;
      }
    </style>
    <script type="module">
      import DirectionalNavigation from 'directional-navigation'

      window.addEventListener('DOMContentLoaded', DirectionalNavigation.init)

      window.addEventListener('dn:did-focus', e => {
        const $el = e.target
        $el.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      })
    </script>
  </head>
  <body>
    <aside
      data-section-id="navbar"
      data-section-direction="vertical"
      data-leave-right="#main"
      tabindex="0"
    >
      <div data-parent-section="navbar" data-initial-focus>Home</div>
      <div data-parent-section="navbar">Search</div>
    </aside>

    <main id="main">
      <section
        data-section-id="horizontal-01"
        data-section-direction="horizontal"
        data-leave-left="[data-section-id='navbar']"
        tabindex="0"
      >
        <a href="#" data-parent-section="horizontal-01">Card 01</a>
        <a href="#" data-parent-section="horizontal-01">Card 02</a>
        <a href="#" data-parent-section="horizontal-01">Card 03</a>
      </section>
    </main>
  </body>
</html>
```

## Development

### Running the Demo Locally

1. Clone the repository
2. Install [pnpm](https://pnpm.io/installation)
3. Run `npm install`
4. Run `npm run dev`
5. Open `http://localhost:1234` in your browser

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## License

ISC
