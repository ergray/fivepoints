
var FivePointsEmployee = Backbone.Model.extend({
	urlRoot: "/apiPUT",
	idAttribute: "_id"
});

var FivePointsEmployees = Backbone.Collection.extend({
	model: FivePointsEmployee,
	url: "/api",

})

var FivePointsEmployeesView = Backbone.View.extend({
	el: '#newEmployee',

	events: {
		'click #deleteEmployee' : 'deleteEmployee',
		'click #clearScreen' : 'clearScreen',
		'click #addEmployee': 'addEmployee',
		'click .days' : 'addHours',
		'change .employees' : 'selectEmployee',			
	},

	hours: 0,
	currentEmployee: '',


	initialize: function(){
		this.collection = new FivePointsEmployees();
		this.collection.fetch({
			success: this.onSuccess,
			error: this.onError,
		});
	},

	testRender: function(){
		console.log("hi from test render");
	},


	onSuccess: function(collection, response, options){
			for (i = 0; i < collection.models.length; i++)
			$('.employees').append('<option value='+collection.at(i).attributes.lastName+'>'
				+collection.at(i).attributes.lastName+', '+collection.at(i).attributes.firstName + '</option>');
			},

	onError: function(collection, response, options){
				console.log("I failed.");
				console.log(response);
			},

	modelSuccess: function(){
		console.log("Model succeeded");
	},

	modelFailure: function(one, two, three){
		console.log("Model failed");
	},


	render: function(){
		this.clearScreen();
		for (i = 0; i < this.collection.models.length; i++)
			$('.employees').append('<option value='+this.collection.at(i).attributes.lastName+'>'
				+this.collection.at(i).attributes.lastName+', '+this.collection.at(i).attributes.firstName + '</option>');
	},

	clearScreen: function(event){
		console.log('clearing screen');
		this.clearDays();
		this.hours = 0;
		$('#hours').text(0);
		$('#firstName').val('');
		$('#lastName').val('');
		$('.employees').val('New Employee').selected = true;

	},

	addHours: function(event){
		var nowBox = event.currentTarget
		if (nowBox.id[1] == 'O' || nowBox.id[1] == 'M'){
			nowBox.checked == true ? this.hours += 6 : this.hours -= 6
		} else if (nowBox.id[1] == 'C'){
			nowBox.checked == true ? this.hours += 7.5 : this.hours -= 7.5
		};
		$('#hours').text(this.hours);
	},

	selectEmployee: function(){
		this.clearDays();
		var $firstName = $(this.el).find('#firstName');
		var $lastName = $(this.el).find('#lastName');
		var selectedEmployee = this.collection.findWhere({lastName: $('.employees').val()});
		currentEmployee = selectedEmployee.get("_id");
		$('#hours').text(selectedEmployee.get("Hours"));
		$firstName.val(selectedEmployee.get("firstName"));
		$lastName.val(selectedEmployee.get("lastName"));
		for (day in selectedEmployee.get("daysAvail")) {
			var checkName = (selectedEmployee.get("daysAvail")[day]);
			document.getElementById(checkName).checked = true;
		};
	},

	deleteEmployee: function(){
		//var $lastName = $(this.el).find('#lastName');
		var selectedEmployee = this.collection.findWhere({lastName: $('.employees').val()});
		selectedEmployee.destroy({
			success: function(model, response){
				console.log("model deleted");
			},
			error: function(model, response){
				console.log("failed deletion")
			},
		});
		$("option").remove();
		this.clearScreen();
		this.render();
		$('.employees').val('New Employee').selected = true;
	},

	clearDays: function(){
		var dayBoxes = document.getElementsByClassName('days');
		for (day = 0; day < dayBoxes.length; day++){
			dayBoxes[day].checked = false
		}		
	},

	addEmployee: function(event){
		event.preventDefault();
		var daysAvaila = [];
		var employeeName = '';
		var idDate = new Date();
		var $firstName = $(this.el).find('#firstName');
		var $lastName = $(this.el).find('#lastName');
		employeeName = $firstName.val() + ' ' + $lastName.val();
		$('.employees').append('<option value='+$lastName.val()+'>'
			+ $lastName.val() + ', ' + $firstName.val() + '</option>');
		var dayBoxes = document.getElementsByClassName('days');
		for (day = 0; day < dayBoxes.length; day++){
			if (dayBoxes[day].checked == true){
				daysAvaila.push(dayBoxes[day].id);
			}
		}
		var savedEmployee = {_id: ($firstName.val().charAt(0) + $lastName.val().charAt(0) + idDate.getMinutes() + idDate.getSeconds()), firstName: $firstName.val(), lastName: $lastName.val(), daysAvail: daysAvaila, Hours: $('#hours').text()};
		//var savedEmployee = new FivePointsEmployee({_id: ($firstName.val().charAt(0) + $lastName.val().charAt(0) + idDate.getMinutes() + idDate.getSeconds()), firstName: $firstName.val(), lastName: $lastName.val(), daysAvail: daysAvaila, Hours: $('#hours').text()});
		this.collection.create(savedEmployee);
		this.clearScreen();
	},
		/*
		savedEmployee.save(null, {
				success: console.log(this.collection),
				error: this.modelFailure,
			}).done(this.collection.reset(), 
					this.collection.fetch({
						success: this.onSuccess,
						error: this.onError,
					}),
					this.render())	
			},
		*/	
		//this.clearScreen();
		//console.log(this.collection);
		//this.collection.reset();
		//this.render();
	//},


})





$(function(){
var beginPoints = new FivePointsEmployeesView();
})