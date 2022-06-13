import { LightningElement } from 'lwc';
import { bikes } from 'c/data';

export default class List extends LightningElement {
    bikes = bikes;

    handleTileClick(evt) {
        // This component wants to emit a productselected event to its parent
        // use custom event to fire event to parent 
        const event = new CustomEvent('productselected', {
            detail: evt.detail
        });
        // Fire the event from c-list
        this.dispatchEvent(event);
    }
}
