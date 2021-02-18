const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'My Doc',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root:
          'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'My Doc',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: 'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch',
          templates:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\node_modules\\docz-core\\dist\\templates',
          docz:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\.docz',
          cache:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\.docz\\.cache',
          app:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\.docz\\app',
          appPackageJson:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\package.json',
          appTsConfig:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\tsconfig.json',
          gatsbyConfig:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\gatsby-config.js',
          gatsbyBrowser:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\gatsby-browser.js',
          gatsbyNode:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\gatsby-node.js',
          gatsbySSR:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\gatsby-ssr.js',
          importsJs:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\.docz\\app\\imports.js',
          rootJs:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\.docz\\app\\root.jsx',
          indexJs:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\.docz\\app\\index.jsx',
          indexHtml:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\.docz\\app\\index.html',
          db:
            'C:\\Users\\valle\\BingeWatch\\bingewatch-frontend\\BingeWatch\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
