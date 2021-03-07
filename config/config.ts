/* eslint-disable */
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
import path from 'path';

const { REACT_APP_ENV, GA_KEY } = process.env;
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  hash: true,
  analytics: GA_KEY ? { ga: GA_KEY } : false,
  dva: {
    hmr: true,
    immer: true,
  },
  locale: {
    // default en-US
    default: 'th-TH',
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
  },
  dynamicImport: {},
  targets: {
    ie: 11,
  },
  theme: {
    'top-color': '#51592e',
    ...defaultSettings,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
  },
  ignoreMomentLocale: true,
  cssLoader: {
    localsConvention: 'camelCase',
    modules: {
      // @ts-ignore
      getLocalIdent: (context: { resourcePath: string }, _: string, localName: string) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        // return localName;
      },
    },
  },
  lessLoader: {
    javascriptEnabled: true,
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
  alias: {
    cmp: path.resolve(__dirname, '../src/components'),
  },
});
