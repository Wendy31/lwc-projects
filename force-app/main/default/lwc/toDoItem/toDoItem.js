import { LightningElement, api } from 'lwc';
import updateTodo from '@salesforce/apex/ToDoController.updateTodo';
import deleteTodo from '@salesforce/apex/ToDoController.deleteTodo';

export default class ToDoItem extends LightningElement {
    // make props public, to accept values from parent 
    @api todoId;
    @api todoName;
    @api done = false;

    updateHandler(){
        // create object to pass thru as payload argument 
        const todoObj = {
            todoId: this.todoId,
            todoName: this.todoName,
            done: !this.done // get the inverse of done i.e. true
        }
        updateTodo({payload : JSON.stringify(todoObj)}).then((result)=>{
            // when update is successful, fire event to parent to get new todo list from server
            // create event and give it a name 'updateEvent'
            console.log("Item is updated successfully");
            const updateEvent = new CustomEvent('updateevent');
            // fire event
            this.dispatchEvent(updateEvent);
        }).catch((error)=>{
            console.error('Error in update: '+error);
        });

    }

    deleteHandler(){
        deleteTodo({todoId: this.todoId}).then((result)=>{
            console.log("Item is deleted successfully");
            const deleteEvent = new CustomEvent('deleteevent');
            // fire event
            this.dispatchEvent(deleteEvent);
        }).catch((error)=>{
            console.error('Error in deletion: '+error);
        });
    }

    get containerClass(){
        return this.done ? "todo completed" : "todo upcoming";
    }

    get iconName(){
        return this.done ? "utility:check" : "utility:add";
    }
}