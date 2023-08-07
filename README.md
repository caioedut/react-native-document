# React Native HTML Component

[![npm version](https://badge.fury.io/js/react-native-html-component.svg)](https://badge.fury.io/js/react-native-html-component)

This allows you to render HTML content within your application. It accepts a string of HTML content as a prop and renders it within a WebView component. This makes it easy to integrate rich HTML content into your React Native application.

## Installation

### Expo

```shell
expo install react-native-html-component react-native-webview
```

### Other

```shell
yarn install react-native-html-component react-native-webview
```

## Usage

```jsx
import Html from 'react-native-html-component';

export default function App() {
    return (
        <Html html="<p>Hello World!</p>" />
    )
}
```

## Props

### `html`

A string that represents the HTML content to be rendered.

➤ Type: **`string`** <br/>

---

### `allowTextSelection`

An optional boolean that determines whether text selection is allowed.

➤ Type: **`boolean`** <br/>
➤ Default: **`false`** <br/>

---

### `backgroundColor`

An optional string that sets the background color of the root html.

➤ Type: **`string`** <br/>
➤ Default: **`'transparent'`** <br/>

---

### `color`

An optional string that sets the text color of the root html.

➤ Type: **`string`** <br/>
➤ Default: **`'#000000'`** <br/>

---

### `fontSize`

An optional number that sets the font size of the root html.

➤ Type: **`number`** <br/>
➤ Default: **`16`** <br/>

---

### `style`

An optional StyleProp object that can be used to apply custom styles to the component.

➤ Type: **`StyleProp<ViewStyle>`** <br/>
