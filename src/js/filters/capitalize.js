angular.module('app').filter('capitalize', function() {
    return function(input) {
        // if (input != null) {
        //     return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
        // }
        if (input !== null) {
            return input.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    }
});
