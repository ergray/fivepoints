var FivePointsEmployee = Backbone.Model.extend({});

var FivePointsEmployees = Backbone.Collection.extend({
	model: FivePointsEmployee,

})

var FivePointsEmployeesView = Backbone.View.extend({
	el: '#newEmployee',
	events: {
		'click #addEmployee': 'addEmployee',
		'click .days' : 'addHours',
	},

	addHours: function(event){
		console.log('Checking Box')
	},

	addEmployee: function(event){
		event.preventDefault();
		console.log('Adding Employee');
		var $firstName = $(this.el).find('#firstName');
		var $lastName = $(this.el).find('#lastName');	
		this.collection.add({Name: ($firstName.val() + ' ' + $lastName.val())});
		$firstName.val('');
		$lastName.val('');
		
	},


})


$(function(){
fivePointsEmployees = new FivePointsEmployees([{Name: 'Chris Larson'}]);
fivePointsView = new FivePointsEmployeesView({collection: fivePointsEmployees});
})