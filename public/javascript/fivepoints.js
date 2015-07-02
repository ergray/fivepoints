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
		'click #editEmployee' : 'saveChanges',		
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

	saveChanges: function(){
		var model = this.collection.findWhere({_id: $('.employees').val()});
		console.log(model);
		var daysAvaila = [];
		var $firstName = $(this.el).find('#firstName');
		var $lastName = $(this.el).find('#lastName');
		var dayBoxes = document.getElementsByClassName('days');
		for (day = 0; day < dayBoxes.length; day++){
			if (dayBoxes[day].checked == true){
				daysAvaila.push(dayBoxes[day].id);
			}
		};				
		model.save({firstName: $firstName.val(), lastName: $lastName.val(), daysAvail: daysAvaila, Hours: this.hours});
	},

	testRender: function(){
		console.log("hi from test render");
	},


	onSuccess: function(collection, response, options){
			for (i = 0; i < collection.models.length; i++)
			$('.employees').append('<option value='+collection.at(i).attributes._id+'>'
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
			console.log(this.collection.at(i).attributes_id);
			$('.employees').append('<option value='+this.collection.at(i).attributes._id+'>'
				+this.collection.at(i).attributes.lastName+', '+this.collection.at(i).attributes.firstName + '</option>');
	},

	clearScreen: function(event){
		console.log('clearing screen');
		this.clearDays();
		this.hours = 0;
		$('#addEmployee').removeAttr('disabled');
		$('#editEmployee').attr('disabled', true);
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
		$('#addEmployee').attr("disabled", true);
		$('#editEmployee').removeAttr("disabled");
		var $firstName = $(this.el).find('#firstName');
		var $lastName = $(this.el).find('#lastName');
		var selectedEmployee = this.collection.findWhere({_id: $('.employees').val()});
		currentEmployee = selectedEmployee.get("_id");
		this.hours = selectedEmployee.get("Hours");
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
		var selectedEmployee = this.collection.findWhere({_id: $('.employees').val()});
		selectedEmployee.destroy({
			success: function(model, response){
				console.log("model deleted");
			},
			error: function(model, response){
				console.log("failed deletion")
			},
		}).then(console.log(currentEmployee))
											 .then($(".employees option[value=" +currentEmployee+ "]").remove())
											 /*.then(console.log('on to removed'))*/
											 .then(this.clearScreen());
		//$("option").remove();
		console.log(this.collection);
		//this.clearScreen();
		//this.render();
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
		var $empID = ($firstName.val().charAt(0) + $lastName.val().charAt(0) + idDate.getMinutes() + idDate.getSeconds());
		$('.employees').append('<option value='+$empID+'>'
			+ $lastName.val() + ', ' + $firstName.val() + '</option>');
		var dayBoxes = document.getElementsByClassName('days');
		for (day = 0; day < dayBoxes.length; day++){
			if (dayBoxes[day].checked == true){
				daysAvaila.push(dayBoxes[day].id);
			}
		}
		var savedEmployee = {_id: $empID, firstName: $firstName.val(), lastName: $lastName.val(), daysAvail: daysAvaila, Hours: this.hours};
		//var savedEmployee = new FivePointsEmployee({_id: ($firstName.val().charAt(0) + $lastName.val().charAt(0) + idDate.getMinutes() + idDate.getSeconds()), firstName: $firstName.val(), lastName: $lastName.val(), daysAvail: daysAvaila, Hours: $('#hours').text()});
		this.collection.create(savedEmployee);
		console.log("logging new collection");
		console.log(this.collection);
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