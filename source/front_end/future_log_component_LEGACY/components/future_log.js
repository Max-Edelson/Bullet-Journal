// <future-log> custom web component
class FutureLog extends HTMLElement {
    constructor() {
        super();
    
        // templated HTML content
        const template = document.createElement('template');
  
        template.innerHTML = `
        <!-- Bootstrap CSS CDN -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
        <link rel="stylesheet" href="./components/future_log.css">
        <h1>Future Log</h1>
        <br>

        <div class = "future_grid">
            <div class="month_box">
                <h2 class="month_header">This Month</h2>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="add_button">
                    <button type="button">+ New Item</button>
                </div>
            </div>
            <div class="month_box">
                <h2 class="month_header">This Month</h2>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="add_button">
                    <button type="button">+ New Item</button>
                </div>
            </div>
            <div class="month_box">
                <h2 class="month_header">This Month</h2>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="add_button">
                    <button type="button">+ New Item</button>
                </div>
            </div>
            <div class="month_box">
                <h2 class="month_header">This Month</h2>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="add_button">
                    <button type="button">+ New Item</button>
                </div>
            </div>
            <div class="month_box">
                <h2 class="month_header">This Month</h2>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="add_button">
                    <button type="button">+ New Item</button>
                </div>
            </div>
            <div class="month_box">
                <h2 class="month_header">This Month</h2>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="task">
                    <h3>Loren Ipsum</h3>
                    <button>...</button>
                </div>
                <div class="add_button">
                    <button type="button">+ New Item</button>
                </div>
            </div>
            
        </div>
            `;
  
        // create a shadow root for this web component
        this.attachShadow({ mode: 'open' })
        // attach cloned content of template to shadow DOM 
        this.shadowRoot.appendChild(template.content.cloneNode(true))

      /* 
       * TODO: Add event listeners on button for each month, might be helpful to add an id to the button to pass to an update function
       * Update function should be in the main js file/ not here (import the function into this file). It should update the entry of the page, update the local storage
       */


    }
  
    /*
     * `get` binds a property to a function that will be called when that property is looked up
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
     */
    get entry() {
      return this.getAttribute('entry');
    }
  
    /*
     * `set` binds an object property to a function to be called when there is an attempt to set that property
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
     */
    set entry(entry) {
      /* 
       * TODO: entry will contain month_heads and tasks under each, parse through entry to update the html
       */
      

    }
  
  }
  
  /*
   * Define a custom element for the FutureLog web component, 
   * where 'future-log' is the string that represents this element.
   * https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
   */ 
  customElements.define('future-log', FutureLog);
  