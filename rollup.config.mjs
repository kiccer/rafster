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
            },

            watch: isDev ? {
                buildDelay: 1000,

                include: [
                    'src/**'
                ]
            } : false
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

const configs = outputFormats.reduce((configs, format) => {
    return configs.concat(getConfig(format))
}, [])

// console.log(JSON.stringify(configs, null, 4))

export default configs
