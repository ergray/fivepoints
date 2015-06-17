
var FivePointsEmployee = Backbone.Model.extend({
	url: "/apiPUT"
});

var FivePointsEmployees = Backbone.Collection.extend({
	model: FivePointsEmployee,
	//url: "/employees.json"
	url: "/api"
})

var FivePointsEmployeesView = Backbone.View.extend({
	el: '#newEmployee',

	events: {
		'click #addEmployee': 'addEmployee',
		'click .days' : 'addHours',
		'change .employees' : 'selectEmployee',	
	},
	hours: 0,


	initialize: function(){
		this.collection = new FivePointsEmployees();
		this.collection.fetch({
			success: this.onSuccess,
			error: this.onError,
		});
		this.testRender();
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
		for (i = 0; i < this.collection.models.length; i++)
			$('.employees').append('<option value='+this.collection.at(i).attributes.lastName+'>'
				+this.collection.at(i).attributes.lastName+', '+this.collection.at(i).attributes.firstName + '</option>');
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
		$('#hours').text(selectedEmployee.get("Hours"));
		$firstName.val(selectedEmployee.get("firstName"));
		$lastName.val(selectedEmployee.get("lastName"));
		for (day in selectedEmployee.get("daysAvail")) {
			var checkName = (selectedEmployee.get("daysAvail")[day]);
			document.getElementById(checkName).checked = true;
		};
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
		var savedEmployee = new FivePointsEmployee({firstName: $firstName.val(), lastName: $lastName.val(), daysAvail: daysAvaila, Hours: $('#hours').text()});
		savedEmployee.save(null, {
				success: this.modelSuccess,
				error: this.modelFailure,
			});
		//this.collection.add({firstName: $firstName.val(), lastName: $lastName.val(), daysAvail: daysAvaila, Hours: $('#hours').text()});
		$firstName.val('');
		$lastName.val('');
		this.clearDays();
		$('#hours').text(0);
		this.hours = 0
	},


})





$(function(){
var beginPoints = new FivePointsEmployeesView();
})