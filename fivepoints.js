var FivePointsEmployee = Backbone.Model.extend({});

var FivePointsEmployees = Backbone.Collection.extend({
	model: FivePointsEmployee,

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
		this.render();
	},

	render: function(){
		for (i = 0; i < this.collection.models.length; i++)
			$('.employees').append('<option value='+this.collection.at(i).attributes.Name+'>'
				+this.collection.at(i).attributes.Name+'</option>');
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
		console.log('Select registered');
		console.log($('.employees').val());
	},

	addEmployee: function(event){
		event.preventDefault();
		console.log('Adding Employee');
		var daysAvail = [];
		var employeeName = '';
		var $firstName = $(this.el).find('#firstName');
		var $lastName = $(this.el).find('#lastName');
		employeeName = $firstName.val() + ' ' + $lastName.val();	
	//	this.collection.add({Name: ($firstName.val() + ' ' + $lastName.val())});
		console.log('adding employee to select');
		console.log($('.employees'));
		$('.employees').append('<option value=' + $firstName.val() + ' ' + $lastName.val() + '>'
			+ $firstName.val() + ' ' + $lastName.val() + '</option>');
		var dayBoxes = document.getElementsByClassName('days');
		for (day = 0; day < dayBoxes.length; day++){
			if (dayBoxes[day].checked == true){
				daysAvail.push(dayBoxes[day].id);
			}
		}
		this.collection.add({Name: employeeName, Days: daysAvail});
		$firstName.val('');
		$lastName.val('');
		for (day = 0; day < dayBoxes.length; day++){
			dayBoxes[day].checked = false
		}
		$('#hours').text(0);
	},


})




$(function(){
fivePointsEmployees = new FivePointsEmployees([{Name: 'Chris Larson'}]);
fivePointsView = new FivePointsEmployeesView({collection: fivePointsEmployees});
})