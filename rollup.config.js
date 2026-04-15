import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

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
            tsconfig: false,
            compilerOptions: {
                target: 'es5',
                lib: ['dom', 'dom.iterable', 'esnext'],
                jsx: 'react-jsx',
                declaration: false,
                module: 'esnext',
                moduleResolution: 'nodenext',
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
                strict: true,
                skipLibCheck: true,
                resolveJsonModule: true,
            },
            exclude: ['**/*.stories.ts', '**/*.stories.tsx', '**/__tests__/**', '**/__stories__/**', 'node_modules/**']
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
        }),
        terser(),
    ],
    external: ['react', 'react-dom'],
};