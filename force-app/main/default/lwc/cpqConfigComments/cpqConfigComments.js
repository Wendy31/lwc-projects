import { LightningElement } from 'lwc';

export default class CpqConfigComments extends LightningElement {
     activeSectionMessage = '';

    handleToggleSection(event) {
        this.activeSectionMessage =
            'Open section name:  ' + event.detail.openSections;
    }
}