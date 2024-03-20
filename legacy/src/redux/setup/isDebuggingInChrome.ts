export const isDebuggingInChrome =
  process.env.NODE_ENV === 'development' && !!window.navigator.userAgent;
