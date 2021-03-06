'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        // imagemin: {
        //     dynamic: {                         // Another target
        //         files: [{
        //             expand: true,                  // Enable dynamic expansion
        //             cwd: 'assets/images/',         // Src matches are relative to this path
        //             src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        //             dest: 'assets/images/dist/'    // Destination path prefix
        //         }]
        //     }
        // },

        pkg: grunt.file.readJSON('package.json'),

        express: {
            dev: {
                options: {
                    script: 'app.js'
                }
            },
        },
        uglify: {
            options: {
                //beautify: true
            },
            plugin_files: {
                files: {
                    'assets/js/plugins.js':  [
                    'assets/js/*.js'
                    ]
                }
            },
            init_files: {
                files: {
                    'assets/js/init.min.js':  [
                    'assets/js/init.js'
                    ]
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'assets/css/styles.css': 'assets/scss/styles.scss'
                },
                options: {
                    style: 'compressed'
                }
            },
            dev: {
                files: {
                    'assets/css/styles.css': 'assets/scss/styles.scss'
                }
            }
        },
        scsslint: {
            allFiles: [
                'assets/scss/*.scss',
            ],
            options: {
                bundleExec: true,
                config: '.scss-lint.yml',
                reporterOutput: 'scss-lint-report.xml',
                colorizeOutput: true
            },
        },
        watch: {
            uglify:  {
                files: ['assets/js/init.js'],
                task: ['uglify']
            },
            sass: {
                files: ['assets/scss/*.scss'],
                tasks: ['scsslint', 'sass:dev'],
                options: {
                    spawn: false
                }
            },
            express: {
                files: ['app/**/*.js', 'app.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        },
    });

    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.registerTask('images', ['imagemin']);
    grunt.registerTask('compile', ['sass:dist', 'uglify']);
    // grunt.registerTask('default', ['scsslint']);
    grunt.registerTask('serve', ['express:dev', 'uglify', 'sass:dev',                                                                  'watch']);
};
