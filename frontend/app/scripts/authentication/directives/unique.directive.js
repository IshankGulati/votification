(function() {
  'use strict';

  angular
    .module('votificationApp.authentication.directives')
    .directive('ngUnique', ngUnique);

		ngUnique.$inject = ['Authentication'];

		function ngUnique(Authentication) {
			var directive = {
				restrict: 'A',
				require: 'ngModel',
				link: function(scope, element, attrs, ngModel) {
					element.bind('blur', function(e) {
						if (!ngModel || !element.val()) {
							return;
						}
						var keyProperty = scope.$eval(attrs.ngUnique);
						var currentValue = element.val();
						Authentication.checkUniqueValue(keyProperty.key,
							keyProperty.property, currentValue)
							.then(function(unique){
								// ensure data being checked hasn't changed
								if (currentValue === element.val()) {
									ngModel.$setValidity('unique', unique);
									scope.$broadcast('show-errors-check-validity');
								}
							});
					});
				}
			};

			return directive;
		}
})();