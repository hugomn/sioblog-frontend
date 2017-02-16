module.exports = {
    options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
        dest: 'dist/js/config.env.js',
    },
    dev: {
        constants: {
            ENV: '<%= configDev  %>'
        }
    },
    prod: {
        constants: {
            ENV: '<%= configProd  %>'
        }
    }
};
