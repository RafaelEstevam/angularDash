module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
                },
                files: {
                    'public/css/style.css': 'public/sass/style.sass'
                }
            }
        },

        cssmin: {
          target: {
            files: [{
                expand: true,
                cwd: 'public/css',
                src: ['*.css', '!*.min.css'],
                dest: 'public/css',
                ext: '.min.css'
            }]
          }
        },

        uglify:{
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'public/js',
                    ext: '.min.js'
                }]
            }
        },

        watch: {
            options:{
                liveload: true,
            },
            sass: {
                files: ['public/sass/*.scss', 'public/sass/*.sass' ],
                tasks: ['sass:dev', 'cssmin']
            },
            html: {
                files: ['public/*.html'],
                tasks: ['build']
            },
            js: {
                files: ['public/js/*.js'],
                tasks: ['uglify']
            }
        },

        clean:{
            folder: ['app/'],
        },

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'public/', src: ['*.html'], dest: 'app/'},
                    {expand: true, cwd: 'public/css', src: ['*.min.css'], dest: 'app/css'},
                    {expand: true, cwd: 'public/js', src: ['*.min.js'], dest: 'app/js'},
                    {expand: true, cwd: 'public/fonts', src: ['*', '!*.html'], dest: 'app/fonts'},
                    {expand: true, cwd: 'public/images', src: ['*'], dest: 'app/images'},
                ],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // "grunt build" é o mesmo que rodar "grunt sass:dist".
    grunt.registerTask('build', ['uglify', 'clean', 'copy:main']);
};