import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/app.ts',
  output: {
    file: './dist/app.dev.js',
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
    })
  ]
}
