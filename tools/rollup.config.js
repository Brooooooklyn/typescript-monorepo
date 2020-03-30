import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import sourcemaps from 'rollup-plugin-sourcemaps'
import resolve from '@rollup/plugin-node-resolve'

const pkgs = readdirSync(join(__dirname, '..', 'packages')).filter((dir) =>
  statSync(join(__dirname, '..', 'packages', dir)).isDirectory(),
)

const external = ['tslib', '@demo/core']

export default pkgs
  .map((dir) => ({
    input: `./packages/${dir}/esm/index.js`,
    external,
    plugins: [
      sourcemaps(),
      resolve({
        preferBuiltins: true,
      }),
    ],
    output: [
      {
        file: `./packages/${dir}/dist/index.cjs.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `./packages/${dir}/dist/index.esm.js`,
        format: 'esm',
        sourcemap: true,
      },
    ],
  }))
  .concat(
    pkgs.map((dir) => ({
      input: `./packages/${dir}/next/index.js`,
      external,
      plugins: [
        sourcemaps(),
        resolve({
          preferBuiltins: true,
        }),
      ],
      output: [
        {
          file: `./packages/${dir}/dist/index.next.js`,
          format: 'esm',
          sourcemap: true,
        },
      ],
    })),
  )
