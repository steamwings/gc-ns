import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'org.nativescript.greencurtain',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  appPath: 'src',
  nsext: '.tns',
  webext: '.web',
  shared: true,
  useLegacyWorkflow: false,
} as NativeScriptConfig
