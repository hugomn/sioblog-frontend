angular
.module('app')
.directive('defaultAvatar', ['$window', function($window) {

  var colors = ["#1abc9c", "#16a085", "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#e67e22", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#9b59b6", "#8e44ad", "#bdc3c7", "#34495e", "#2c3e50", "#95a5a6", "#7f8c8d", "#ec87bf", "#d870ad", "#f69785", "#9ba37e", "#b49255", "#b49255", "#a94136"];

  var defaults = {
      // Default settings
      name: 'Default Name',
      seed: 0,
      textColor: '#ffffff',
      height: 100,
      width: 100,
      fontSize: 40,
      fontWeight: 400,
      fontFamily: 'Brandon Grotesque,HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif',
      radius: 0
  };

  return {
    restrict: 'AC',
    scope: {},
    compile: function() {
      return {
        pre: function(scope, el, attrs) {
          scope.name = attrs.name || defaults.name;
          scope.seed = attrs.seed || defaults.seed;
          scope.textColor = attrs.textColor || defaults.textColor;
          scope.height = attrs.height || defaults.height;
          scope.width = attrs.width || defaults.width;
          scope.fontSize = attrs.fontSize || defaults.fontSize;
          scope.fontWeight = attrs.fontWeight || defaults.fontWeight;
          scope.fontFamily = attrs.fontFamily || defaults.fontFamily;
          scope.radius = attrs.radius || defaults.radius;
        },

        post: function(scope, el) {
            var parts = scope.name.split(" ");
            var c = scope.name.substr(0,2).toUpperCase();
            if(parts.length > 1){
              c = parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
            }

            var cobj = angular.element('<text text-anchor="middle"></text>').attr({
                'y': '50%',
                'x': '50%',
                'dy' : '0.35em',
                'pointer-events':'auto',
                'fill': scope.textColor,
                'font-family': scope.fontFamily
            }).html(c).css({
                'font-weight': scope.fontWeight,
                'font-size': scope.fontSize+'px',
            });

            var colorIndex = Math.floor((c.charCodeAt(0) + scope.seed) % colors.length);

            var svg = angular.element('<svg></svg>').attr({
                'xmlns': 'http://www.w3.org/2000/svg',
                'pointer-events':'none',
                'width': scope.width,
                'height': scope.height
            }).css({
                'background-color': colors[colorIndex],
                'width': scope.width+'px',
                'height': scope.height+'px',
                'border-radius': scope.radius+'px',
                '-moz-border-radius': scope.radius+'px'
            });

            svg.append(cobj);
            var svgHtml = $window.btoa(unescape(encodeURIComponent(angular.element('<div>').append(svg.clone()).html())));

            el.attr("src", 'data:image/svg+xml;base64,' + svgHtml);

        }
      };
    }
  };
}]);
