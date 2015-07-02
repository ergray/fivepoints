var LoginView = Backbone.View.extend(){
	events: {
		'click .submit' : 'this.validate()'
	}

	initialize: function(){
		this.render()
	}

	render: function(){
		load login form
	}

	validate: function(){
		check username vs password
		then load fivepoints js if okay
		otherwise throw error
	}
}

$(console.log('hello'))