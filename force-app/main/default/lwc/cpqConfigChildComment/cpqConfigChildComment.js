import { LightningElement, track } from 'lwc';

export default class CpqConfigChildComment extends LightningElement {

    connectedCallback(){
        this.format(value);
    }

    format(value) {
        this.template.execCommand(command, showUI, value);
    }
}