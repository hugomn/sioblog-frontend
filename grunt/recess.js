module.exports = {
    less: {
        files: {
            'src/css/app.css': ['src/css/less/app.less'],
            'src/css/md.css': ['src/css/less/md.less']
        },
        options: {
            compile: true
        }
    },
    controllers: {
        files: [{
            expand: true,
            cwd: 'src/css/less/controllers',
            src: ['*.less'],
            dest: 'dist/css/controllers',
            ext: '.css'
        }],
        options: {
            compile: true
        }
    },
    dev: {
        files: {
            'dist/css/app.css': [
                'dist/libs/assets/animate.css/animate.css',
                'dist/libs/assets/font-awesome/css/font-awesome.min.css',
                'dist/libs/assets/simple-line-icons/css/simple-line-icons.css',
                'dist/libs/jquery/bootstrap/dist/css/bootstrap.css',
                'src/css/app.css',
                'src/css/font.css',
                'src/css/material-design-icons.css',
                'src/css/md.css',
            ]
        },
        options: {
            compile: true,
            compress: false
        }
    },
    prod: {
        files: {
            'dist/css/app.min.css': [
                'dist/libs/assets/animate.css/animate.css',
                'dist/libs/assets/font-awesome/css/font-awesome.min.css',
                'dist/libs/assets/simple-line-icons/css/simple-line-icons.css',
                'dist/libs/jquery/bootstrap/dist/css/bootstrap.css',
				'src/css/app.css',
                'src/css/font.css',
                'src/css/material-design-icons.css',
                'src/css/md.css',
            ]
        },
        options: {
            compress: true
        }
    }
}
