
var todoList = {
	todos: [],

	displayTodo: function()
		{ /* this is only for displayin CONSOLE */
			if (this.todos.length === 0) {
			  console.log('todos are empty')
			}else{
			  console.log("my todos: ");
			  for (i = 0; i < this.todos.length; i++) {
				if (this.todos[i].completed === true) {
				  console.log("(X) " + this.todos[i].todoText);
				}else{
				  console.log("( ) " + this.todos[i].todoText);
				}
			}
		}
		},

	addTodo: function(todoText)
		{
			this.todos.push({
				todoText: todoText,
				completed: false

			});
			this.displayTodo();
		},
	changeTodo: function(index, newValue)
   		{
				if(todoList.todos.length === 0){
						console.log("todos are empty")
				}else {
					this.todos[index].todoText = newValue;
					this.displayTodo();
				}

		},

	deletTodo: function(position)
		{
			this.todos.splice(position, 1);
			this.displayTodo();

		},
	toggelCompleted: function(position)
		{
			if (todoList.todos.length !== 0) {
				var todo = this.todos[position];
				todo.completed = ! todo.completed;
				this.displayTodo();
			}else {
				console.log("todos are empty");
			}

		},
	toggelAll: function()
	  {

	    var totalTodos = this.todos.length;
	    var complitedTodos = 0;

	    for (var i = 0; i < totalTodos; i++) {
	    	if (this.todos[i].completed === true) {
	    		complitedTodos++;
	    	}
	    }

	    // if every thing is TRUE ,  make avery thing false
	    //complitedTodos === totalTodos
			/*
	    if (complitedTodos === totalTodos) {
	    	for (var i = 0;i < totalTodos; i++) {
	    		this.todos[i].completed = false
	    	}
	    }

	    else{
	    	for(var i = 0; i < totalTodos; i++){
	    		this.todos[i].completed = true
	    	}
	    }

	    this.displayTodo();

		*/
		// this is the new code using forEach() function
		this.todos.forEach(function(todo){
			if (complitedTodos === totalTodos) {
				todo.completed = false
			}else {
				todo.completed = true;
			}
		})
		}
};


var handlers = {
	toggelAll: function(){
		todoList.toggelAll();
		view.display();
	},
	addTodo: function(){
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = '';
		view.display();
	},
	changeTodo: function(){
		var changeTodoPosition = document.getElementById('number');
		var changeTodoText = document.getElementById('text');

		todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value);
		document.getElementById('number').value = '';
		document.getElementById('text').value = '';
		view.display();
	},
	deletTodo: function(position){
		todoList.deletTodo(position);
		view.display();

	},
	toggelCompleted: function(){
		todoList.toggelCompleted(document.getElementById("toggelComplitedInput").value);
		document.getElementById("toggelComplitedInput").value = '';
		view.display();
	}
};


var view = {
	display: function(){
		var todoUl = document.getElementById('ul');
		todoUl.innerHTML = '';

	/*	for(var i= 0; i < todoList.todos.length; i++){
			var todoLi = document.createElement('li');
			var todoTextWithComplition = "";
			if (todoList.todos[i].completed === true) {
				  todoTextWithComplition = "(X) " + todoList.todos[i].todoText;
				}else{
				  todoTextWithComplition = "( ) " + todoList.todos[i].todoText;
				}
			todoLi.id = i;
			todoLi.textContent = todoTextWithComplition;
			todoUl.appendChild(todoLi);
			todoLi.appendChild(this.creatDeletButton());

		}
		*/
		var thisViewObject = this; //we made thisViewObject variable so wa can use it in the forEach line 166
		todoList.todos.forEach(function(todo, position){
			var todoLi = document.createElement('li');
			var todoTextWithComplition = "";
			if (todo.completed === true) {
				todoTextWithComplition = "(X) " + todo.todoText;
			}else {
				todoTextWithComplition = "( ) " + todo.todoText;
			}//end of else

			todoLi.id = position;
			todoLi.textContent = todoTextWithComplition;
			todoUl.appendChild(todoLi);
			todoLi.appendChild(thisViewObject.creatDeletButton());
		}, this)
	},// end of view.display

	creatDeletButton: function(){
		var deletButton = document.createElement("button");
		deletButton.textContent = "delet";
		deletButton.className = "deletButton";
		return deletButton;
	},// end of view.creatDeletButton
	eventListeners: function(){
		var todoUl = document.querySelector('ul'); // we use the querySelector() function to select an element from the HTML

		todoUl.addEventListener("click", function(event) {
			var elementClicked = event.target;
					if (elementClicked.className === 'deletButton') {// this if statement checks if the element clicked is the delete button.
						handlers.deletTodo(parseInt(elementClicked.parentNode.id));
						//parseInt() is a function witch turn the string to a number.
						// we need this to turn the id (string) to  position argument.
					}

		});
	}
};

view.eventListeners();
