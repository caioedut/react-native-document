import { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';

export interface DocumentViewEvent extends WebViewNavigation {}

export interface DocumentViewProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  onLoad?: (event: DocumentViewEvent) => void;
  onError?: (event: DocumentViewEvent) => void;
  scale?:
    | number
    | {
        initial?: number;
        min?: number;
        max?: number;
      };
  controls?:
    | boolean
    | {
        page?: boolean;
        zoom?: boolean;
      };
}

export default function DocumentView({ uri, scale = 1, controls = true, style, onLoad, onError }: DocumentViewProps) {
  const [status, setStatus] = useState('loading');
  const [renderKey, setRenderKey] = useState(Date.now());
  const [adjustScaleHack, setAdjustScaleHack] = useState(0);

  const controlsObj = {
    page: typeof controls === 'boolean' ? controls : true,
    zoom: typeof controls === 'boolean' ? controls : true,
    ...(typeof controls === 'boolean' ? {} : controls),
  };

  const scaleObj = {
    initial: typeof scale === 'number' ? scale : 1,
    min: typeof scale === 'number' ? scale : 1,
    max: typeof scale === 'number' ? scale : 1,
    ...(typeof scale === 'number' ? {} : scale),
  };

  const styles = `
    /* Hide button "open on new window" */
    .ndfHFb-c4YZDc-Wrql6b {
      display: none !important;
    }

    /* Fix smooth scroll on iOS */
    .ndfHFb-c4YZDc-cYSp0e-s2gQvd {
      -webkit-overflow-scrolling: touch;
    }

    /* Controls: PAGE */
    .ndfHFb-c4YZDc-DARUcf-NnAfwf-i5oIFb {
      ${controlsObj.page ? '' : 'display: none !important;'}
    }

    /* Controls: ZOOM */
    .ndfHFb-c4YZDc-nJjxad-nK2kYb-i5oIFb {
      ${controlsObj.zoom ? '' : 'display: none !important;'}
    }
  `;

  const scripts = `
    const $info = document.querySelector('#drive-active-item-info') || '{}';

    if (!$info) {
      window.ReactNativeWebView.postMessage('reload');
    } else {
      const mimeType = JSON.parse($info.innerText).mimeType;
      window.ReactNativeWebView.postMessage(mimeType ? 'ready' : 'error');
    }

    const meta = document.createElement('meta');
    meta.setAttribute('content', 'width=device-width, initial-scale=${scaleObj.initial}, minimum-scale=${scaleObj.min}, maximum-scale=${scaleObj.max}');
    meta.setAttribute('name', 'viewport');
    document.head.appendChild(meta);

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = '${styles}';
    document.head.appendChild(styleSheet);
  `;

  function handleLoad(e: WebViewNavigation) {
    if (status === 'ready') {
      onLoad?.(e);
    }

    if (status === 'error') {
      onError?.(e);
    }
  }

  function handleMessage({ nativeEvent }: WebViewMessageEvent) {
    const status = nativeEvent?.data;

    if (status === 'reload') {
      setRenderKey(Date.now());
    }

    if (status === 'ready') {
      // Hack for iOS: PAGE SCALE
      setTimeout(() => setAdjustScaleHack((current) => Number(!current)), 500);
    }

    setStatus(status);
  }

  return (
    <WebView
      key={renderKey}
      scrollEnabled
      javaScriptEnabled
      domStorageEnabled
      startInLoadingState
      mixedContentMode="always"
      contentMode="mobile"
      originWhitelist={['*']}
      injectedJavaScript={scripts.replace(/[\r\n]/g, '')}
      source={{ uri: `https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(uri)}` }}
      style={style}
      containerStyle={{ borderWidth: adjustScaleHack, borderColor: 'transparent' }}
      // @ts-expect-error
      onLoad={handleLoad}
      onMessage={handleMessage}
    />
  );
}
