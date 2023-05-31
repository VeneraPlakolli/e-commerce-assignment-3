const path = require('path');

exports.onCreatePage = async ({ page, actions }) => { 
    const { createPage } = actions;

    if(page.path.match(/^\/products/)) { 
        createPage({
            path: '/products',
            matchPath: '/products/*',
            component: path.resolve('src/pages/products.js')
        })
    }
}