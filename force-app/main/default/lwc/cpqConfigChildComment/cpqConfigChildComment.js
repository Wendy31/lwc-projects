import { LightningElement, api } from 'lwc';

export default class CpqConfigChildComment extends LightningElement {
   commentValue;

    handleChange(event) {
        this.commentValue = event.target.value;
        console.log("Internal Comment: " + this.commentValue);
    }
}