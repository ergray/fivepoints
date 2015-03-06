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

	hours: 0,

	addHours: function(event){
		var nowBox = event.currentTarget
		if (nowBox.id[1] == 'O' || nowBox.id[1] == 'M'){
			this.hours += 6
		} else if (nowBox.id[1] == 'C'){
			this.hours += 7.5
		};
		console.log('adjusting hours');
		console.log($('#hours'));
		console.log(this.hours);
		$('#hours').text(this.hours);

	},

	addEmployee: function(event){
		event.preventDefault();
		console.log('Adding Employee');
		var $firstName = $(this.el).find('#firstName');
		var $lastName = $(this.el).find('#lastName');	
		this.collection.add({Name: ($firstName.val() + ' ' + $lastName.val()), TotalHours: this.hours});
		$firstName.val('');
		$lastName.val('');
		this.hours = 0;
		
	},


})


$(function(){
fivePointsEmployees = new FivePointsEmployees([{Name: 'Chris Larson'}]);
fivePointsView = new FivePointsEmployeesView({collection: fivePointsEmployees});
})