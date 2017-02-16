module.exports = {
    options: {
      livereload: true,
    },
    css: {
        files: ['src/css/**'],
        tasks: ['recess:less', 'recess:controllers', 'recess:dev'],
    },
    src: {
        files: [
            'src/fonts/**',
            'src/i10n/**',
            'src/img/**',
            'src/tpl/**'
        ],
        tasks: ['copy:src'],
    },
    config: {
        files: ['src/config/dev'],
        tasks: ['ngconstant:dev']
    },
    dev: {
        files: ['src/index.html', 'src/js/**'],
        tasks: ['copy:dev'],
    },
};
