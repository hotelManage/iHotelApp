angular.module('iHotelApp')
    .controller('menusController', ['$scope', '$state', function ($scope, $state) {
        $scope.homePage = function () {
            $state.go('menus.homePage');
        }
        $scope.hotel = function () {
            $state.go('menus.hotel');
        }
        $scope.community = function () {
            $state.go('menus.community');
        }
        $scope.discovery = function () {
            $state.go('menus.discovery');
        }
        $scope.user = function () {
            $state.go('login');
            //$state.go('menus.user');
        }
    }])