
angular.module('iHotelApp', ['ionic', 'ngIOS9UIWebViewPatch'])
    .run(['$ionicPlatform', function ($ionicPlatform) {
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
        .state('menus', { url: '/menus', templateUrl: 'app/menus/menus.html', controller: 'menusController' })

        .state('menus.homePage', { url: '/homePage', views: { 'tab-homePage': { templateUrl: 'app/menus/homePage/homePage.html', controller: 'homePageController' } } })
        .state('menus.hotel', { url: '/hotel', views: { 'tab-hotel': { templateUrl: 'app/menus/hotel/hotel.html', controller: 'hotelController' } } })
        .state('menus.community', { url: '/community', views: { 'tab-community': { templateUrl: 'app/menus/community/community.html', controller: 'communityController' } } })
        .state('menus.discovery', { url: '/discovery', views: { 'tab-discovery': { templateUrl: 'app/menus/discovery/discovery.html', controller: 'discoveryController' } } })
        .state('menus.user', { url: '/user', views: { 'tab-user': { templateUrl: 'app/menus/user/user.html', controller: 'userController' } } })

        .state('login', { url: '/login', templateUrl: 'app/login/login.html', controller: 'loginController' })
       $urlRouterProvider.otherwise('/menus/homePage');

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