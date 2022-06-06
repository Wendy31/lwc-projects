import { LightningElement} from "lwc";
import addTodo from '@salesforce/apex/ToDoController.addTodo'; // import a method from APEX class
import getCurrentTodos from '@salesforce/apex/ToDoController.getCurrentTodos'; // import todo items from backend and display to frontend 

export default class ToDoManager extends LightningElement {
    time = "8:00 PM";
    greeting = "Good Evening";
    todoList = [];

    // lifecycle method and is auto-invoked on component initialisation 
    // use it to call getTime()
    // then setInterval so time is updated every minute 
    connectedCallback() {
        this.getTime();
       // this.populateTodoList();
       this.fetchTodoList();

        setInterval(()=>{
            this.getTime();
            console.log("Set interval is called");
        }, 1000 * 60);
    }

    getTime() {
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(min)} ${this.getMidDay(hour)}`;
        this.setGreeting(hour);
    }

    getHour(hour) {
        // convert 24 hr to 12 hr format
        return hour === 0 ? 12 : hour > 12 ? (hour - 12) : hour;
    }

    getMidDay(hour) {
        return hour >= 12 ? "PM" : "AM";
    }

    getDoubleDigit(digit) {
        return digit < 10 ? "0" + digit : digit;
    }

    setGreeting(hour) {
        if (hour < 12) {
            this.greeting = "Good Morning Wendy";
        } else if (hour >= 12 && hour < 17) {
            this.greeting = "Good Afternoon Wendy";
        } else {
            this.greeting = "Good Evening Wendy";
        }
    }

    addTodoHandler(){
        // onclick, get value from input box
        // then clear input
        const inputBox = this.template.querySelector("lightning-input");
        const todoObj = {
            todoName: inputBox.value,
            done: false
        }

        // call addTodo method from APEX class and pass a payload thru
        // pass the todoObj and serialise it (put into strings)
        // when method is called, it returns a promise
        // need to hand promise with then and catch methods
        // then() handles successful response
        // catch() handles error 
        addTodo({payload : JSON.stringify(todoObj)}).then((response) =>{
            // log the successful response
            console.log("Todo item is insterted successfully");
            this.fetchTodoList(); // call method everytime an item is added successfully so it can be displayed in todo list
        }).catch((error) => {
            // log the error
            console.error("Error in inserting Todo Item: "+error);

        })
        this.todoList.push(todoObj);
        inputBox.value = "";
    }

    // method that calls APEX getCurrentTodos() to get list of todo items
    fetchTodoList(){
        getCurrentTodos().then((result)=>{
            if (result) {
                console.log("Retrieved todo items from server: "+ result.length);
                this.todoList = result; // updates global todo list with the fetched results
            }
        }).catch((error) => {
            console.error("Error in fetching Todo Items: "+error);
        });
    }

    handleUpdate(){
        // after update, fetch new list from server again
        this.fetchTodoList();
    }

    handleDelete(){
        // after delete, fetch new list from server again
        this.fetchTodoList();
    }
    
    // get methods must return a value
    get upcomingTasks(){
        // filter out items where done = false i.e. incompleted tasks
        // if todoList is not blank && length is not null
        // filter function returns and array of not dont todoItems, else returning nothing
        return this.todoList && this.todoList.length ? this.todoList.filter((todoItem) => !todoItem.done) : [];
    }

    get completedTasks(){
        return this.todoList && this.todoList.length ? this.todoList.filter((todoItem) => todoItem.done) : [];
    }

    populateTodoList(){
        const todoList = [
            {todoId: 0,
                todoName: "Eat Vegan",
                done: false,
                todoDate: new Date()
            },
            {todoId: 1,
                todoName: "Watch Korean Drama",
                done: false,
                todoDate: new Date()
            },
            {todoId: 2,
                todoName: "Sleep",
                done: true,
                todoDate: new Date()
            }
        ];
        this.todoList = todoList;
    }
}