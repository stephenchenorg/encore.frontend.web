import ycs77, { GLOB_TS, GLOB_VUE } from '@ycs77/eslint-config'

export default ycs77(
  {
    vue: true,
    typescript: true,
  },
  {
    files: [GLOB_TS, GLOB_VUE],
    rules: {
      'no-console': 'warn',

      'ts/ban-ts-comment': 'off',
    },
  },
  {
    files: [GLOB_VUE],
    rules: {
      'vue/no-template-shadow': 'off',
    },
  },
)
