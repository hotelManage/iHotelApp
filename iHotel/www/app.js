
angular.module('iHotel', ['ionic', 'ngIOS9UIWebViewPatch'])
    .run(['$ionicPlatform', 'jpushSvr', 'popUpSvr', function ($ionicPlatform, jpushSvr, popUpSvr) {
        $ionicPlatform.ready(function () {

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }])
   .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'APP_CONFIG', function ($stateProvider, $urlRouterProvider, $httpProvider, APP_CONFIG) {

       $stateProvider
        /*登录*/
        .state('menus', {
            url: '/menus',
            templateUrl: 'app/menus/menus.html',
            controller: 'menusController'
        })
       $urlRouterProvider.otherwise('/menus');

       /*修改put 和 post 的数据传递方式*/
       $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
       $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

       /*修改默认的transformRequest 否则后台收不到值 */
       $httpProvider.defaults.transformRequest = [function (data) {

           var param = function (obj) {
               var query = '';
               var name, value, fullSubName, subName, subValue, innerObj, i;

               for (name in obj) {
                   value = obj[name];

                   if (value instanceof Array) {
                       for (i = 0; i < value.length; ++i) {
                           subValue = value[i];
                           fullSubName = name + '[' + i + ']';
                           innerObj = {};
                           innerObj[fullSubName] = subValue;
                           query += param(innerObj) + '&';
                       }
                   } else if (value instanceof Object) {
                       for (subName in value) {
                           subValue = value[subName];
                           fullSubName = name + '[' + subName + ']';
                           innerObj = {};
                           innerObj[fullSubName] = subValue;
                           query += param(innerObj) + '&';
                       }
                   } else if (value !== undefined && value !== null) {
                       query += encodeURIComponent(name) + '='
                                  + encodeURIComponent(value) + '&';
                   }
               }

               return query.length ? query.substr(0, query.length - 1) : query;
           };

           return angular.isObject(data) && String(data) !== '[object File]'
                      ? param(data)
                      : data;
       }];

   }])