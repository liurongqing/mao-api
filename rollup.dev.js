import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/index.ts',
  output: {
    file: './dist/app.js',
    name: 'mm',
    format: 'cjs'
  },
  plugins: [
    resolve({
      extensions: ['.ts']
    }),
    typescript()
  ]
}
