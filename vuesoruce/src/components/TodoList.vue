<template>
	<div class="ui container segment">
		<div class="ui header">Your Today's Todo-List</div>
		<div class="ui content" v-if="todos.length == 0">You have no todos today. Enjoy your day</div>
		<br>
		<transition name="to-right" mode="out-in" appear>
			<div class="ui button orange" v-if="!isEditing" @click="isEditing=!isEditing" key="newTodoButon">Add New Todo</div>

			<form class="ui form" v-else @submit.prevent.stop="addNewTodo" key="todoform">
				<div class="field">
					<label>New Todo</label>
					<input type="text" id="newTxt" required placeholder="Your new Todo here" v-model="data">
				</div>
				<div class="field">
					<button class="ui button">Submit</button>
				</div>
			</form>
		</transition>
		<br>
		<br>
		<transition-group class="ui segments" name="to-right" tag="div" appear>
		<!-- Mohit, check carefully you've passed key=the todo object, nothing else worked on 11/06/17 -->
			<todo v-for="todo,index in todos" :key="todo" :todo="todo" @deleteTodo="deleteTodo(index)" @updateTodos="updateTodos()"></todo>
		</transition-group>
	</div>
</template>

<script>

import Todo from './Todo.vue';

export default{
	data(){
		return{
			isEditing:false,
			data:"",
			todos:[]
		}
	},
	components:{Todo},
	methods:{
		addNewTodo(){
			//creating a newTodo object
			var newTodo = {
				data:this.data,
				isDone:false
			}
			this.data="";
			//inserting into array of todos
			this.todos.push(newTodo);
			this.isEditing = false;
			this.updateTodos();
		},
		deleteTodo(index){
			this.todos.splice(index,1);
			this.updateTodos();
		},
		fetchTodos(){
			this.$http.get('/todos').then(response => {
			    this.todos = response.body;
			  }, response => {});
		},
		updateTodos(){
			this.$http.post('/todos',{todoList:this.todos}).then(response => {}, response => {});}
	},
	watch:{
		isEditing:function(val){
			if(val==true){
				setTimeout(function(){
						document.getElementById("newTxt").focus();			
				},200)
			}
		}
	},
	created(){
		this.$http.get('/todos').then(response => {
		    this.todos = response.body.todoList;
		    if(this.todos==null){
		    	this.todos=[];
		    }
		  }, response => {});
	}
}

</script>
<style>
	.to-right-enter,.to-right-leave-to{
		transform: translateX(500px) scale(0) rotateZ(90deg);
		opacity: 0;
	}

	.to-right-enter-active,.to-right-leave-active{
		transition: all 0.3s;
	}

	.to-right-leave-active{
		position: relative;
	}
	
	.to-right-move{
		transition: all 0.3s;
	}

</style>