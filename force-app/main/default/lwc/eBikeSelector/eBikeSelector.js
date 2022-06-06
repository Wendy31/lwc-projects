import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
const fields = [NAME_FIELD];

export default class Selector extends LightningElement {
    selectedProductId;

    handleProductSelected(evt) {
        this.selectedProductId = evt.detail;
    }

    userId = id;
    @wire(getRecord, {recordId: '$userId', fields})
    user;
    get name(){
        return getFieldValue(this.user.data, NAME_FIELD);
    }
}
