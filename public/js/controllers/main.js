// js/controllers/main.js
angular.module('todoController', ['todoService', 'extFilters'])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope', '$http', 'Todos', 'isEmptyObjectFilter', 
		function($scope, $http, Todos, isEmptyObjectFilter) {
			$scope.formData = {};
	
			// GET =====================================================================
			// when landing on the page, get all todos and show them
			// use the service to get all the todos
			Todos.get()
				.success(function(data) {
					$scope.todos = data;
				})
        .error(function(data) {
          console.log('Error: ' + data);
        });
	
			// CREATE ==================================================================
			// when submitting the add form, send the text to the node API
			$scope.createTodo = function() {
	
				// validate the formData to make sure that something is there
				// if form is empty, nothing will happen
				// people can't just hold enter to keep adding the same to-do anymore
				if (!isEmptyObjectFilter($scope.formData)) {
	
					// call the create function from our service (returns a promise object)
					Todos.create($scope.formData)
	
						// if successful creation, call our get function to get all the new todos
						.success(function(data) {
							$scope.formData = {}; // clear the form so our user is ready to enter another
							$scope.todos = data; // assign our new list of todos
						})
            .error(function(data) {
              console.log('Error: ' + data);
            });
				}
			};
	
			// DELETE ==================================================================
			// delete a todo after checking it
			$scope.deleteTodo = function(id) {
				Todos.delete(id)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.todos = data; // assign our new list of todos
					})
          .error(function(data) {
            console.log('Error: ' + data);
          });
			};
	}]);

