
var FivePointsEmployee = Backbone.Model.extend({});

var FivePointsEmployees = Backbone.Collection.extend({
	model: FivePointsEmployee,
	url: "https://dashboard.orchestrate.io/collections/37015"
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
		this.collection.fetch();
		this.render();
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
		console.log('adjusting hours');
		console.log($('#hours'));
		console.log(this.hours);
		$('#hours').text(this.hours);
	},

	selectEmployee: function(){
		var $firstName = $(this.el).find('#firstName');
		var $lastName = $(this.el).find('#lastName');
		console.log('Select registered');
		console.log($('.employees').val());
		var selectedEmployee = this.collection.findWhere({lastName: $('.employees').val()});
		console.log(selectedEmployee);
		$('#hours').text(selectedEmployee.get("Hours"));
		console.log(selectedEmployee.get("daysAvail"));
		$firstName.val(selectedEmployee.get("firstName"));
		$lastName.val(selectedEmployee.get("lastName"));
		for (day in selectedEmployee.get("daysAvail")) {
			var checkName = (selectedEmployee.get("daysAvail")[day]);
			console.log(checkName);
			document.getElementById(checkName).checked = true;
			console.log("okay i see it " +
						selectedEmployee.get("daysAvail"));
		};
	},


	addEmployee: function(event){
		event.preventDefault();
		console.log('Adding Employee');
		var daysAvaila = [];
		var employeeName = '';
		var $firstName = $(this.el).find('#firstName');
		var $lastName = $(this.el).find('#lastName');
		employeeName = $firstName.val() + ' ' + $lastName.val();	
	//	this.collection.add({Name: ($firstName.val() + ' ' + $lastName.val())});
		console.log('adding employee to select');
		console.log($('.employees'));
		$('.employees').append('<option value='+$lastName.val()+'>'
			+ $lastName.val() + ', ' + $firstName.val() + '</option>');
		var dayBoxes = document.getElementsByClassName('days');
		for (day = 0; day < dayBoxes.length; day++){
			if (dayBoxes[day].checked == true){
				daysAvaila.push(dayBoxes[day].id);
			}
		}
		this.collection.add({firstName: $firstName.val(), lastName: $lastName.val(), daysAvail: daysAvaila, Hours: $('#hours').text()});
		$firstName.val('');
		$lastName.val('');
		for (day = 0; day < dayBoxes.length; day++){
			dayBoxes[day].checked = false
		}
		$('#hours').text(0);
	},


})





$(function(){
var beginPoints = new FivePointsEmployeesView();
})