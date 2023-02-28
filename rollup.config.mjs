import terser from '@rollup/plugin-terser'

const isDev = process.env.NODE_ENV === 'development'

const outputFormats = ['amd', 'es', 'cjs', 'umd']

function getConfig (format) {
    const configs = [
        {
            input: 'src/index.js',

            output: {
                format,
                file: `build/rafster.${format}.js`
            }
        }
    ]

    if (!isDev) {
        configs.push({
            input: 'src/index.js',

            output: {
                format,
                file: `build/rafster.min.${format}.js`
            },

            plugins: [
                terser()
            ]
        })
    }

    return configs
}

if (isDev) {
    // config.output.format = 'es'
}

export default outputFormats.reduce((configs, format) => {
    return configs.concat(getConfig(format))
}, [])
