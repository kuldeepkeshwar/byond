'use strict';

angular.module('myApp')
  .directive('autoSuggest', function (nbObjectUtil,$http,$templateCache,$compile,$timeout) {
    var count = 0;
    function defaultOptions(){
      return {
        trigger: 3,
        delay: 500
      };
    }
    return {
      restrict: 'A',
      require: ['^ngModel','autoSuggest'],
      controller:'AutoSuggestCtrl',
      link: function (scope, element, attrs, controllers) {
        var options = angular.extend(defaultOptions(),nbObjectUtil.readPropertyFromObject(scope, attrs.options));
        count++;
        var ngModelCtrl = controllers[0];
        var ctrl = controllers[1];
        var triggerTimeout;
        ctrl.setId(count);
        ctrl.setAutoSuggestOptions(options);
        var resultElement;
        var items;//=resultElement.find('repeater');
        element.bind("keyup", function (e) {
          if (e.which === 38 || e.which === 40) {
            items = resultElement.find('.repeater');
            //var _index=index;
            if (e.which === 38 && ctrl.$index > 0) {
              ctrl.$index--;         // up
            }
            if (e.which === 40 && ctrl.$index < items.length - 1) {
              ctrl.$index++;         // down
            }
            if (ctrl.$index !== -1) {
              items.removeClass('active');
              angular.element(items[ctrl.$index]).addClass('active');
            }
          }

          if (e.which === 8 || e.which === 46) {
            trigger(e);
          }

        });
        element.bind("keypress", function (e) {
          if (e.which === 13) {
            resultElement.find('.repeater.active').trigger('click');
            return;
          }
          trigger(e);
        });
        function trigger(e) {
          var val ="";
          if(angular.isFunction(options.triggerFn)){
            options.triggerFn();
          }
          if(e.which === 8 || e.which === 46) {
             val = ngModelCtrl.$viewValue ;
          }
          else {
            val = ngModelCtrl.$viewValue + String.fromCharCode(e.keyCode);
          }
          scope['$autoSuggestSrc' + ctrl.getId()] = [];
          if (val && val.length >= options.trigger) {
            $timeout.cancel(triggerTimeout);
            triggerTimeout=$timeout(function(){
              ctrl.trigger(val).then(function () {
                angular.element(resultElement).show();
              });
            },options.delay);

          } else {
            angular.element(resultElement).hide();
          }
        }

        ctrl.setUpdateViewValueCallBack(function (val) {
          ngModelCtrl.$setViewValue(val);
          ngModelCtrl.$render();
          angular.element(resultElement).hide();
        });
        angular.element(document.body).click(function (e) {
          var target = e.target;
          if (target === element[0]) {
            return;
          } else {
            angular.element(resultElement).hide();
          }
        });

        $http.get(options.templateUrl).then(function (result) {
          resultElement = angular.element(result.data);
          var repeaterElement = angular.element(resultElement).find("[auto-suggest-repeater]");
          var _var = repeaterElement.attr('var');
          repeaterElement.removeAttr('auto-suggest-repeater');
          repeaterElement.removeAttr('var');
          repeaterElement.attr('ng-repeat', _var + ' in $autoSuggestSrc' + ctrl.getId());
          repeaterElement.attr('ng-click', '$onSelect'+ ctrl.getId()+'(' + _var + ')');
          repeaterElement.attr('ng-mouseover', '$onHover'+ ctrl.getId()+'($event,$index)');
          repeaterElement.addClass('repeater');
          resultElement.insertAfter(element);
          $compile(resultElement)(scope);
          angular.element(resultElement).hide();
        });
      }
    };
  });
