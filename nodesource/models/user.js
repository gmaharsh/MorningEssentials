var mongoose = require('mongoose');
var plm      = require('passport-local-mongoose');
var UserSchema = new mongoose.Schema({
	fname:String,
	lname:String,
	city:String,
	gender:String,
	username:String,
	password:String,
	todoList:[{
		data:String,
		isDone:Boolean
	}]
});

UserSchema.plugin(plm);

module.exports = mongoose.model("User",UserSchema);
