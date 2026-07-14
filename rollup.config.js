import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/index.esm.js',
            format: 'es',
        },
        {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'MyComponentLibrary',
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.json',
            useTsconfigDeclarationDir: true,
            clean: true,
            tsconfigOverride: {
                compilerOptions: {
                    declaration: true,
                    declarationDir: 'dist',
                    emitDeclarationOnly: false,
                    module: 'esnext',
                    target: 'es5',
                    jsx: 'react-jsx',
                },
                exclude: ['**/*.stories.ts', '**/*.stories.tsx', '**/__tests__/**', '**/__stories__/**', 'node_modules/**'],
            },
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
        }),
        terser(),
    ],
    external: ['react', 'react-dom'],
};