# React Native Document

This allows you to render documents like PDF, DOC, XLS and PPT.

[![npm version](https://badge.fury.io/js/react-native-document.svg)](https://badge.fury.io/js/react-native-document)

## Installation

### Expo

```shell
expo install react-native-document react-native-webview
```

### Other

```shell
npm install react-native-document react-native-webview
# OR
yarn add react-native-document react-native-webview
#OR
pnpm add react-native-document react-native-webview

```

## Usage

```jsx
import DocumentView from 'react-native-document';

export default function App() {
    return (
        <DocumentView uri="https://..." />
    )
}
```

## Props

### `uri`

The URI of the file to be rendered.

➤ Type: **`string`** <br/>

---

### `scale`

An optional scale value or object that determines the initial, minimum, and maximum scale of the document. If a number is provided, it sets for all properties. If an object is provided, it can have optional properties `initial`, `min`, and `max` to set the initial, minimum, and maximum scale, respectively.

➤ Type: **`number` | `{ initial?: number; min?: number; max?: number }`** <br/>

---

### `controls`

An optional boolean value or object that determines whether controls are displayed and which controls are displayed. If a boolean value is provided, it determines whether all controls are displayed. If an object is provided, it can have optional properties `page` and `zoom` to determine whether page and zoom controls are displayed, respectively.

➤ Type: **`boolean` | `{ page?: boolean; zoom?: boolean }`** <br/>

---

### `style`

An optional StyleProp object that can be used to apply custom styles to the component.

➤ Type: **`StyleProp<ViewStyle>`** <br/>

---

### `onLoad`

An optional callback function that is called when the document is loaded. It receives an event object of type `DocumentViewEvent`.

➤ Type: **`(event: DocumentViewEvent) => void`** <br/>

---

### `onError`

An optional callback function that is called when the document cannot be loaded. It receives an event object of type `DocumentViewEvent`.

➤ Type: **`(event: DocumentViewEvent) => void`** <br/>
