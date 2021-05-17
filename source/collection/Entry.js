class Entry extends HTMLElement {

    /**
     * @constructor creates a Entry custom element that holds items
     */
    constructor(){
        super();

        const template = document.createElement('template');

        template.innerHTML = `
        <style>
            .main-item{
                font-size: 20px;
                margin-top:30px
            }
            .sub-item{
                font-size: 15px;
                margin-top: -20px;
                marign-bottom:-20px;
            }
            .sub-section{
                margin-left:25px;
                margin-right:-25px;
            }
            .entry{
                border-style: solid;
            }
        </style>
        <article class="entry">
            <div class="main-section">
                <p class="main-item"></p>
            </div>
            <div class="sub-section">
                <p class="sub-item"></p>
            </div>
        </article>
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
        let entryArticle = this.shadowRoot.querySelector('.entry');
        let mainSec = this.shadowRoot.querySelector('.main-section');

        let mainText = this.shadowRoot.querySelector('.main-item');
        mainText.textContent = mainItem.text;
        
        /* Check if there is media (How do we know which type of file??)
        if(mainItem.media != ''){

        }*/
    }

    /**
     * setter method that runs when subItem attribute is changed
     * adds all the content of the item to the entry custom element
     * @param subItem item object that will server as the sub item
     */
     set subItem(subItem){
        let entryArticle = this.shadowRoot.querySelector('.entry');
        let subSec = this.shadowRoot.querySelector('.sub-section');

        let subText = this.shadowRoot.querySelector('.sub-item');
        subText.textContent = subItem.text;
        
        /* Check if there is media (How do we know which type of file??)
        if(subItem.media != ''){

        }*/
    }
}

customElements.define('journal-entry', Entry);