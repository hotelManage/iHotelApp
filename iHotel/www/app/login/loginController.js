angular.module('iHotelApp')
    .controller('loginController', ['$scope', '$state',function ($scope, $state) {
        $scope.goBack = function () {
            $state.go('menus.user');
        }
    }])