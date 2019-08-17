import babel from "rollup-plugin-babel";
// import replace from 'rollup-plugin-replace';
// import { terser } from 'rollup-plugin-terser';
import pkg from "./package.json";

const external = Object.keys(pkg.dependencies || {}).concat(
  Object.keys(pkg.peerDependencies || {}),
);

const input = "src/index.js";

export default [
  // ESM build
  // Not sure if shipping ESM builds makes sense or should be done
  // Until then this will remain commented
  // {
  //   input,
  //   external,
  //   output: {
  //     file: pkg.module,
  //     format: 'esm',
  //   },
  //   // Default export magic
  //   plugins: [babel()],
  // },
  // CommonJS build
  {
    input,
    external: id => external.includes(id.split("/")[0]),
    output: {
      file: pkg.main,
      format: "cjs",
    },
    plugins: [babel()],
  },
  // UMD builds
  // As far as I understand no-one ever ships UMD matchers
  // {
  //   input,
  //   external,
  //   output: {
  //     file: 'dist/jest-color.dev.umd.js',
  //     format: 'umd',
  //     name: 'jestColor',
  //   },
  //   plugins: [
  //     // Setting development env before running babel etc
  //     replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
  //     babel(),
  //   ],
  // },
  // {
  //   input,
  //   external,
  //   output: {
  //     file: 'dist/jest-color.prod.umd.js',
  //     format: 'umd',
  //     name: 'jestColor',
  //   },
  //   plugins: [
  //     // Setting development env before running babel etc
  //     replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  //     babel(),
  //     terser(),
  //   ],
  // },
];
