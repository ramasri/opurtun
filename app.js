//Define an angular module for our app
var myApp = angular.module('myApp', []);
//Define Routing for app
//Uri /AddNewOrder -> template AddOrder.html and Controller AddOrderController
//Uri /ShowOrders -> template ShowOrders.html and Controller AddOrderController
myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/contact', {
	templateUrl: 'contact.html',
	controller: 'contactController'
      }).
      when('/list', {
	templateUrl: 'views.html',
	controller: 'viewListCtrl'
      }).
      otherwise({
	redirectTo: '/'
      });
}]);


var formCtrl=angular.module('formCtrl',[]);
myApp.controller('contactController', function($scope, $location) {
	 $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
	 // $scope.text = 'enter email';
        $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

	// function to submit the form after all validation has occurred            
  $scope.submitForm = function(isValid) {

  	$scope.submitted = true;
    // check to make sure the form is completely valid
    if (isValid) {
    	$scope.Save=function(){
         $scope.people.push({ fname: $scope.newPerson.fname, lname: $scope.newPerson.lname,phone: $scope.newPerson.phone, email: $scope.newPerson.email });
 } 
      $location.path("/list");
    }
};

});
myApp.controller("viewListCtrl", function($scope) {
	 $scope.history = [];

 $scope.people = [ 
                   { fname:"John", lname: " Doe", phone: "1212121212", email:"xyz@zyx.com" },
                   { fname:"Sarah", lname: " Parker", phone: "2323232323", email:"xyz@zyx.com" },
                   { fname:"Little", lname: " John", phone: "4523564454", email:"xyz@zyx.com" },
                   { fname:"Adam", lname: " Doe", phone: "8866442313", email:"xyz@zyx.com" } 
 ]; 
 $scope.orderByMe = function(people) {
        $scope.myOrderBy = people;
    };
    

      // Delete data
        $scope.Delete = function (people) {
            // Remove first / oldest element from history if it reaches maximum capacity of 10 records
            if ($scope.history.length === 10)
                $scope.history.shift();
            // Add deleted record to historical records
            $scope.history.push($scope.people[people]);

            // Remove from main records (using index)
            $scope.people.splice(people, 1);
        };
          // Undo action (delete)
        $scope.Undo = function () {
            // Add last / most recent historical record to the main records
            $scope.people.push($scope.history[ $scope.history.length - 1 ]);

            // Remove last / most recent historical record
            $scope.history.pop();
        }

        // Add data
 $scope.Save=function(){
         $scope.people.push({ fname: $scope.newPerson.fname, lname: $scope.newPerson.lname,phone: $scope.newPerson.phone, email: $scope.newPerson.email });
         $scope.formVisibility = false;

 } 
 $scope.ShowForm=function(){
        $scope.formVisibility=true;
 } 
});
