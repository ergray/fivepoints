$(function(){

var data = [

	{firstName :"Jay", lastName : "Garrick"},
	{firstName :"Wally", lastName : "West"},
	{firstName :"Barry", lastName : "Allen"}

];

var ScheduleForm = React.createClass({
	render: function(){
		return (<form>heres the form
				<EmployeeName />
				<ScheduleTable />
				<SaveButton />
				<EditButton />
				<ClearButton />
				<DeleteButton /><br />
				<SelectEmployee data={this.props.data}/>
				</form>)
	}

})	

var EmployeeName = React.createClass({
	render: function(){
		return(<div>
			<span>First Name: </span><input type='text' placeholder='First Name'></input><br />
			<span>Last Name: </span><input type='text' placeholder='Last Name'></input>
				</div>
			)

	}
})

var ScheduleTable = React.createClass({
	render: function(){
		return(<table border='1'>
				<tr>
					<td></td>
					<td>OPEN</td>
					<td>MID</td>
					<td>CLOSE</td>
			</tr>		
			<tr>
				<th>Monday</th>
				<td><input type='checkbox' className='days' id='MO'></input></td>
				<td><input type='checkbox' className='days' id='MM'></input></td>
				<td><input type='checkbox' className='days' id='MC'></input></td>
			</tr>
			<tr>
				<th>Tuesday</th>
				<td><input type='checkbox' className='days' id='tO'></input></td>
				<td><input type='checkbox' className='days' id='tM'></input></td>
				<td><input type='checkbox' className='days' id='tC'></input></td>
			</tr>
			<tr>
				<th>Wednesday</th>
				<td><input type='checkbox' className='days' id='WO'></input></td>
				<td><input type='checkbox' className='days' id='WM'></input></td>
				<td><input type='checkbox' className='days' id='WC'></input></td>
			</tr>
			<tr>
				<th>Thursday</th>
				<td><input type='checkbox' className='days' id='TO'></input></td>
				<td><input type='checkbox' className='days' id='TM'></input></td>
				<td><input type='checkbox' className='days' id='TC'></input></td>
			</tr>
			<tr>
				<th>Friday</th>
				<td><input type='checkbox' className='days' id='FO'></input></td>
				<td><input type='checkbox' className='days' id='FM'></input></td>
				<td><input type='checkbox' className='days' id='FC'></input></td>
			</tr>
			<tr>
				<th>Saturday</th>
				<td><input type='checkbox' className='days' id='sO'></input></td>
				<td><input type='checkbox' className='days' id='sM'></input></td>
				<td><input type='checkbox' className='days' id='sC'></input></td>
			</tr>
			<tr>
				<th>Sunday</th>
				<td><input type='checkbox' className='days' id='SO'></input></td>
				<td><input type='checkbox' className='days' id='SM'></input></td>
				<td><input type='checkbox' className='days' id='SC'></input></td>
			</tr>
			<tr>
				<td>Total Hours:</td><td id='hours'>0</td>
			</tr>	
			</table>)
	}

})

var SaveButton = React.createClass({
	render: function(){
		return (<button>
					Save
				</button>)
	}
})

var EditButton = React.createClass({
	render: function(){
		return (<button>
					Edit
				</button>)
	}
})

var ClearButton = React.createClass({
	render: function(){
		return (<button>
					Clear
				</button>)
	}
})

var DeleteButton = React.createClass({
	render: function(){
		return (<button>
					Delete
				</button>)
	}
})

var SelectEmployee = React.createClass({
	render: function(){
		var selectOption = this.props.data.map(function (name){
			return (<SelectOption>
						{name.firstName} {name.lastName}
					</SelectOption>);
		});
		return (<select>
				<option>Select Employee</option>
				{selectOption}
			</select>)
	}
})

var SelectOption = React.createClass({
	render: function(){
			return (<option>{this.props.children}</option>)
		}
	}
)


React.render(
	<ScheduleForm data={data} />,
	document.getElementById('mount')
)	

})
