import { LightningElement, track } from 'lwc';

export default class CpqConfigChildComment extends LightningElement {
    myVal = '<b>Hello!</b>';

    connectedCallback(){
        //this.format(value);
       // this.handleChange(e);
    }

   /* format(value) {
        this.template.execCommand(command, showUI, value);
    } 
    */

    handleChange(event) {
        this.myVal = event.target.value;
    }
}