import { uglify } from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/app.ts',
  output: {
    file: './dist/app.js',
    format: 'cjs'
  },
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: "ESNext",
        }
      },
      useTsconfigDeclarationDir: true
    }),
    uglify({
      mangle: false
    })
  ]
}
