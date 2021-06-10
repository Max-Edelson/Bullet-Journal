import {Item, Event, Task, Note} from './Item.js';
class Entry extends HTMLElement {
  
    /**
     * @constructor creates a Entry custom element that holds items
     */
    constructor(){
        super();

        this.date = null;
        this.main = null;
        this.sub = null;
        const template = document.createElement('template');

        template.innerHTML = `
        <style>
            .main-item .sub-item {
                vertical-align: none;
                font-size: 20px;
                padding: 0px;
                
            }
            .sub-item {
                font-size: 15px;
            }
        
            .sub-section {
                margin-left:25px;
                margin-right:-25px;
            }

            .entry {
            background: #6a6dcd;
            box-shadow: 0px 2.92414px 5.84828px rgba(0, 0, 0, 0.12),
                0px 11.6966px 23.3931px rgba(0, 0, 0, 0.08);
            border-radius: 5.84828px;
            height: 20%;
            padding: 5%;
            margin: 5%;
            display: flex;
            align-items: center;
            }
            
            .entry .main-item {
            vertical-align: baseline;
            float: left;
            font-size: min(1.75rem, 1.5vw);
            margin: 0;
            color: #fff;
            }
            
            .entry button {
            border: 1px solid rgba(255, 255, 255, 0.75);
            box-sizing: border-box;
            border-radius: 2px;
            vertical-align: auto;
            float: right;
            outline: none;
            margin-left: auto;
            }
        </style>
        <div class="entry">

            <div class="main-section">
                <p class="main-item"></p>
            </div>
            <button>...</button>
        </div>
        `;

        // create a shadow root for this web component
        this.attachShadow({ mode: 'open' })
        // attach cloned content of template to shadow DOM 
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    /**
     * getter method for the main item of the entry
     * @returns item object that is the main item
     */
    get mainItem(){
        return this.getAttribute('main-item');
    }

    /**
     * getter method for the sub item of the entry
     * @returns item object that is the sub item
     */
     get subItem(){
        return this.getAttribute('sub-item');
    }

    /**
     * setter method that runs when mainItem attribute is changed
     * adds all the content of the item to the entry custom element
     * @param mainItem item object that will server as the main item
     */
    set mainItem(mainItem){
      //  let entryArticle = this.shadowRoot.querySelector('.entry');
      //  let mainSec = this.shadowRoot.querySelector('.main-section');

      this.main = mainItem;
      


        let mainText = this.shadowRoot.querySelector('.main-item');
        
        if (mainItem instanceof Event || mainItem.type == "event"){
            mainText.textContent = mainItem.title
            if (mainItem.date != '') {
                mainText.textContent += ' • ' + mainItem.date;
            }
            if (mainItem.startTime != '') {
                mainText.textContent += ' • ' + mainItem.startTime;
            }
            if (mainItem.endTime != '') {
                mainText.textContent += '-' + mainItem.endTime;
            }

        }

        else if (mainItem instanceof Task || mainItem.type == "task"){
            mainText.textContent = mainItem.text
            if (mainItem.deadline != '') {
                mainText.textContent += ' • Deadline: ' + mainItem.deadline;
            }
            if ((mainItem.taskTime != '')) {
                mainText.textContent += ' • ' + mainItem.taskTime;
            }
        }
        
        else{
            mainText.textContent = mainItem.text;
        }
    }

    /**
     * setter method that runs when subItem attribute is changed
     * adds all the content of the item to the entry custom element
     * @param subItem item object that will server as the sub item
     */
     set subItem(subItem){
        this.sub = subItem;
        let subText = this.shadowRoot.querySelector('.sub-item');
        
        /*
        if (subItem instanceof Event || subItem.type == "event"){
            subText.textContent = subItem.title + '/// ' + subItem.date + ': ' + subItem.text;
        }

        else if (subItem instanceof Task || subItem.type == "task"){
            subText.textContent = subItem.text + '/// Deadline: ' + subItem.deadline;
        }
        else{
            subText.textContent = subItem.text;
        }
        */
    }
}

customElements.define('journal-entry', Entry);