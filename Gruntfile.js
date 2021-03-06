// Generated on 2014-02-10 using generator-angular 0.4.0
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      js: {
        files: ['app.js', '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js'],
        options:  {
          livereload: true
        }
      },
      styles: {
        files: ['<%= yeoman.app %>/stylus/{,*/}*.styl'],
        tasks: ['copy:styles', 'autoprefixer', 'stylus'],
        options:  {
          livereload: true
        }
      },
      html: {
        files: ['<%= yeoman.app %>/{,*/}*.html',
          '<%= yeoman.app %>/views/**/*.html'],
          options: {
            livereload: true
          },
      }
      // livereload: {
      //   options: {
      //     livereload: LIVERELOAD_PORT
      //   },
      //   files: [
          
      //     '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
      //   ]
      // }
    },
    nodemon: {
        dev: {
            script: 'app.js',
            options: {
                args: [],
                ignore: ['app/**'],
                ext: 'js',
                nodeArgs: ['--debug'],
                delayTime: 1,
                env: {
                    PORT: 3000
                },
                cwd: __dirname
            }
        }
    },
    concurrent: {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        },
        server: [
        'copy:styles'
        ],
        dist: [
          'copy:styles',
          'imagemin',
          'svgmin',
          'htmlmin'
        ]
    },
    ngconstant: {
      options: {
        space: '  '
      },
      // targets
      development: [{
        dest: '<%= yeoman.app %>/scripts/config.js',
        wrap: '"use strict";\n\n <%= __ngModule %>',
        name: 'config',
        constants: {
          ENV: 'development'
        }
      }],
      production: [{
        dest: '<%= yeoman.dist %>/scripts/config.js',
        wrap: '"use strict";\n\n <%= __ngModule %>',
        name: 'config',
        constants: {
          ENV: 'production'
        }
      }]
    },
    stylus: {
      compile: {
        options: {
          use: [
            require('autoprefixer-stylus')
          ]
        },
        files: {
          '<%= yeoman.app %>/css/main.css': '<%= yeoman.app %>/stylus/main.styl'
        }
      }
    },
    autoprefixer: {
      options: ['last 3 versions'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      }
    },
    // connect: {
    //   options: {
    //     port: 9000,
    //     // Change this to '0.0.0.0' to access the server from outside.
    //     hostname: 'localhost'
    //   },
    //   livereload: {
    //     options: {
    //       middleware: function (connect) {
    //         return [
    //           lrSnippet,
    //           mountFolder(connect, '.tmp'),
    //           mountFolder(connect, yeomanConfig.app)
    //         ];
    //       }
    //     }
    //   },
    //   dist: {
    //     options: {
    //       middleware: function (connect) {
    //         return [
    //           mountFolder(connect, yeomanConfig.dist)
    //         ];
    //       }
    //     }
    //   }
    // },
    open: {
      server: {
        url: 'http://localhost:3000'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/css/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/css/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%= yeoman.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/**/*',
            'images/{,*/}*.{gif,webp}',
            'css/fonts/*',
            'lib/*',
            'img/*',
            'views/templates/*',
            'scripts/app.js',
            'scripts/directives/*',
            'scripts/services/*',
            'scripts/controllers/*',
            'scripts/templates/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/css',
        dest: '.tmp/css/',
        src: '{,*/}*.css'
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'ngconstant:production',
      'stylus',
      'autoprefixer',
      // 'connect:livereload',
      'open',
      'concurrent'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant:production',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);
};
