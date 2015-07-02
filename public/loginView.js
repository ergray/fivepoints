var LoginView = Backbone.View.extend({
	events: {
		'click .submit' : 'this.validate()'
	},

	initialize: function(){
		this.render()
	},

	render: function(){
		console.log('rendering from login');
		//load login form
		$('.scheduler').append(
			//"<textarea name=\"example\"> rows=\"5\">"
			"<div></div>"+
			"<form>"+
			"User Name"+
			"<input type=\"text\" id=\"username\" name=\"Username\"><br>"+
			"Password"+
			"<input type=\"text\" id=\"password\" name=\"Password\"><br>"+
			"<button type=\"submit\">Log In!"+
			"</form>"
			)

	},

	validate: function(){
		//check username vs password
		//then load fivepoints js if okay
		//otherwise throw error
	}
});

$(function(){
	console.log('duh guys');
	var newLogin = new LoginView();
});