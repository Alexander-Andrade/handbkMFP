
/* JavaScript content from js/controllers.js in folder common */
angular.module('app.controllers', [])
  
.controller('mainCtrl', function($scope, $state){
$scope.students = [];
$scope.marks = [];

$scope.getStudents = function (){
	var studentRequest = new WLResourceRequest(
		    "/adapters/SQL/getStudentsSQL",
		    WLResourceRequest.GET
		);
	
	studentRequest.send().then(
		    getStudentSuccess,
		    getStudentFailure
		);
	
	function getStudentSuccess(result){
		console.log('We got students',result.responseJSON.resultSet);
		$scope.students = result.responseJSON.resultSet;
		$scope.$apply();
	};
	
	function getStudentFailure(result){
		console.log('Failed to get students',result);
		
	}

	};
	
$scope.getMarks = function (student){
		var marksRequest = new WLResourceRequest(
			    "/adapters/SQL/getStudentMarkById",
			    WLResourceRequest.GET
			);
		console.log('Students ID = ',student.STUDENT_ID);
		
		marksRequest.setQueryParameter("params","[" + student.STUDENT_ID + "]");
		
		marksRequest.send().then(
				getMarksSuccess,
				getMarksFailure
			);
		
		function getMarksSuccess(result){
			console.log('We got student marks',result.responseJSON.resultSet);
			$scope.marks = result.responseJSON.resultSet;
			$scope.$apply();
		};
		
		function getMarksFailure(result){
			console.log('Failed to get student marks',result);
			
	}

};	
	
 $scope.goTo = function (student) {
		 console.log('Current student:',student);
		 $scope.currentStudent = student;
		 $state.go('marks');
		 $scope.getMarks(student);
			
 }	
 
 $scope.doLogout = function (username,password){
	 WL.Client.logout('AuthRealm');
	 $scope.username = '';
	 $scope.password = '';
	 $scope.students = [];
	 $scope.marks = [];
	 $state.go('login');
 }
	
 $scope.doLogin = function (username,password) {
	 var passwordVerified = '';
	 console.log('Trying to run SQL udapter for user', username);
	 WL.Client.invokeProcedure({
		 adapter : 'SQL',
		 procedure : 'getUserPasswordSQL',
		 parameters : [username]
	 },{
		 onSuccess : getPasswordSuccess,
		 onFailure : getPasswordFailure
	 });
	 
	 function getPasswordSuccess(result){
		 console.log('We got user password set', result.responseJSON.resultSet);
		 if(result.responseJSON.resultSet[0] != null){
			 passwordVerified = result.responseJSON.resultSet[0].PASS.trim();
			 userRole = result.responseJSON.resultSet[0].ROLE.trim();
		 }
		 console.log('We got users password =', passwordVerified);
		 $scope.doAuth(username, passwordVerified, password);
	 };
	 
	 function getPasswordFailure(result){
		 console.log('Failed to get user password', result);
		 $scope.doAuth(username, passwordVerified, password);
	 }
 }
	 
 $scope.goToDetails = function (mark) {
	 console.log('Current mark:',mark);
	 $scope.currentMark = mark;
	 $state.go('details');
		
 }	
 $scope.doAuth = function(username, passwordVerified, password){
	var AuthRealmChallengeHandler = WL.Client.createChallengeHandler("AuthRealm");

	 AuthRealmChallengeHandler.isCustomResponse = function(response) {
	 	if (!response || !response.responseJSON	|| response.responseText === null) {
	 		return false;
	 	}
	 	if (typeof(response.responseJSON.authStatus) !== 'undefined'){
	 		return true;
	 	} else {
	 		return false;
	 	}
	 };
	 
	  AuthRealmChallengeHandler.handleChallenge = function(response){
	 	var authStatus = response.responseJSON.authStatus;

	 	if (authStatus == "credentialsRequired"){
	 		console.log('authStatus',authStatus);

	 		if (response.responseJSON.errorMessage)
	 			console.log('Auth error message',response.responseJSON.errorMessage);
	 	    	$scope.displayError = true;
	 	    	$scope.displayMessage = response.responseJSON.errorMessage;
	 	    	$scope.$apply();
	 		
	 	} else if (authStatus == "complete"){
	 		console.log('authStatus',authStatus);
	 		AuthRealmChallengeHandler.submitSuccess();
	 		console.log('Login on students page');
	 		$scope.displayError = false;
	 		$scope.getStudents();
	 		$state.go('students');
	 	}
	 };

	 var invocationData = {
	     adapter : "AuthAdapter",
		 procedure : "submitAuthentication",
		 parameters : [ password, passwordVerified, username]
	 };

	 AuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});
 };
})