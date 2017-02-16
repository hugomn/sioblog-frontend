// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {}
  )
  .constant('MODULE_CONFIG', [
      {
          name: 'ui.select',
          files: [
              'libs/angular/angular-ui-select/dist/select.min.js',
              'libs/angular/angular-ui-select/dist/select.min.css'
          ]
      },
      {
          name: 'textAngular',
          files: [
              'libs/angular/textAngular/dist/textAngular-rangy.min.js',
              'libs/angular/textAngular/dist/textAngular.min.js',
              'libs/angular/textAngular/dist/textAngular.css'
          ]
      },

      {
          name: 'slugifier',
          files: [
              'libs/angular/angular-slugify/angular-slugify.js'
          ]
      },
      {
          name: 'matchMedia',
          files: [
              'libs/angular/angular-media-queries/match-media.js'
          ]
      },
      {
          name: 'textAngular',
          files: [
              'libs/angular/textAngular/dist/textAngular-sanitize.min.js',
              'libs/angular/rangy/rangy-core.min.js',
              'libs/angular/rangy/rangy-selectionsaverestore.min.js',
              'libs/angular/textAngular/dist/textAngular.js',
              'libs/angular/textAngular/dist/textAngularSetup.js',
              'libs/angular/textAngular/dist/textAngular.css'
          ],
          serie: true
      }
    ]
  )

  // oclazyload config
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: MODULE_CONFIG
      });
  }])
;
