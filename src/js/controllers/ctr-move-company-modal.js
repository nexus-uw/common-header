angular.module("risevision.common.header")

.controller("MoveCompanyModalCtrl", ["$scope", "$modalInstance",
  "moveCompany", "lookupCompany", "userState",
  function($scope, $modalInstance, moveCompany, lookupCompany, userState) {

    $scope.company = {};
    $scope.errors = [];
    $scope.messages = [];
    $scope.$watch(
      function () {return userState.getUsername(); },
      function (newUsername) {
        if(angular.isDefined(newUsername) && newUsername !== null) {
          $scope.userCompany = userState.getCopyOfUserCompany();
        }
      }
    );

    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };

    $scope.moveCompany = function () {
      $scope.messages = [];
      moveCompany($scope.company.authKey).then(function () {
        $scope.messages.push("Success. The company has been moved under your company.");
      }, function (err) {$scope.errors.push("Error: "  + JSON.stringify(err)); });
    };

    $scope.getCompany = function () {
      $scope.errors = []; $scope.messages = [];
      lookupCompany($scope.company.authKey).then(function (resp) {
        angular.extend($scope.company, resp);
      }, function (resp) {
        $scope.errors.push("Failed to retrieve company. " + resp.message);
      });
    };
  }
]);
