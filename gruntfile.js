module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
                },
                files: {
                    'public/statics/css/style.css': 'public/sass/style.sass'
                }
            }
        },

        cssmin: {
          target: {
            files: [{
                expand: true,
                cwd: 'public/statics/css',
                src: ['*.css', '!*.min.css'],
                dest: 'public/statics/css',
                ext: '.min.css'
            }]
          }
        },

        uglify:{
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/statics/plugins',
                    src: ['*.js', '!*.min.js'],
                    dest: 'public/statics/plugins',
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
                files: ['public/scripts/*.js', 'public/scripts/*/*/*.js', 'public/statics/plugins/*.js'],
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
                    {expand: true, cwd: 'public/views', src: ['*/*.html'], dest: 'app/views'},
                    {expand: true, cwd: 'public/statics/css', src: ['*.min.css'], dest: 'app/statics/css'},
                    {expand: true, cwd: 'public/statics/plugins', src: ['*.min.js'], dest: 'app/statics/plugins'},
                    {expand: true, cwd: 'public/scripts', src: ['*.js', '*/*/*.js'], dest: 'app/scripts'},
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