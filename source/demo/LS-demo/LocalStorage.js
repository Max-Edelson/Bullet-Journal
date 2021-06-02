/**
 *   @Description Class that will represent Local Storage and 
 *   define the functions to be able to manipulate data storage.
 *	 @author Carmen Li
 */
export default class LocalStorage {
    /**
	 * @constructs LocalStorage Creates an instance of the Local Storage object
	 */
    constructor() {
        // retrieve entries and custom arrays
        // if item by key of the array is not defined, then empty array
        this.entries = JSON.parse(localStorage.getItem('entries')) || [];
        this.custom = JSON.parse(localStorage.getItem('custom')) || [];
        this.future = JSON.parse(localStorage.getItem('future')) || [];
    } 
  
    /**
	 * @function create pushes new data into correct array (collection)
     * and sets the updated array in Local Storage
     * @param data entry object 
	 */
    create(data) {
        data.token = this.token;

        // add to entries array if addToCustom attribute is set to "false"
        if (data.addToCustom === "false") {
            this.entries.push(data);
            localStorage.setItem('entries', JSON.stringify(this.entries));
        }

        // else add to custom array 
        else {
            this.custom.push(data);
            localStorage.setItem('custom', JSON.stringify(this.custom));
        }
    }
  
    /**
	 * @function update edits entry into correct array (collection)
     * and sets the updated array in Local Storage
     * @param data entry object 
	 */
    update(data) {
        let index; // stores index of data in array

        // edit entries
        if (data.addToCustom === "false") {
            // retrieve index of data 
            index = this.getIndexByToken(data.token); 

            // if index is found, update this.entries and rewrite localStorage item
            if (index !== -1) {
                this.entries[index] = data;
                localStorage.setItem('entries', JSON.stringify(this.entries));
            }
        } 
        // else edit custom
        else {
            // retrieve index of data 
            index = this.getIndexByTokenCustom(data.token);

            // if index is found, update this.custom and rewrite localStorage item
            if (index !== -1) {
                this.custom[index] = data;
                localStorage.setItem('custom', JSON.stringify(this.custom));
            }
        } 
    }
  
    /**
	 * @function delete deletes entry from correct array (collection)
     * and sets the updated array in Local Storage
     * @param data entry object 
	 */
    delete(data) {
        let index; // stores index of data in array

        // remove from entries
        if (data.addToCustom === "false") {
            // retrieve index of data 
            index = this.getIndexByToken(data.token);

            // if index is found, delete it from this.entries and rewrite localStorage item
            if (index !== -1) {
                this.entries.splice(index, 1);
                localStorage.setItem('entries', JSON.stringify(this.entries));
            }
        } 
        // else remove from custom
        else {
            // retrieve index of data 
            index = this.getIndexByTokenCustom(data.token);

            // if index is found, delete it from this.custom and rewrite localStorage item
            if (index !== -1) {
                this.custom.splice(index, 1);
                localStorage.setItem('custom', JSON.stringify(this.custom));
            }
        } 
    }
  
    /**
	 * @function getIndexByToken searches for entry index in this.entries 
     * in order to update or delete it
     * @param token token/id of current data 
     * @returns index of entry if found, -1 if else
	 */
    getIndexByToken(token) {
        // iterate through entries array
        for (let i = 0; i < this.entries.length; i++) {
            // if token of current element equals specified token 
            if (this.entries[i].token === token) {
                return i;
            }
        }
        // if not in array
        return -1;
    }

    /**
	 * @function getIndexByTokenCustom searches for entry index in this.custom 
     * in order to update or delete it
     * @param token token/id of current data 
     * @returns index of entry if found, -1 if else
	 */
    getIndexByTokenCustom(token) {
        // iterate through entries array
        for (let i = 0; i < this.custom.length; i++) {
            // if token of current element equals specified token 
            if (this.custom[i].token === token) {
                return i;
            }
        }
        // if not in array
        return -1;
    }
  
    /**
	 * @function token getter method to generate a random token/id for an entry
	 */
    get token() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
};
  