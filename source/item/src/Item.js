/**
*   Abstract item class that will represent the item being
*   held in the journal entry. This can be a text, video, audio
*   or image. Each of these types will extend this class
 */

class AbstractItem {

	/**
	* creates a new item with a type and description
	* @param type type of the item
	* @param description description that describes the item
	*/
	constructor(_type, _description) {
		this.type = _type;
		this.description = _description;
		this.date = new Date();
	}

	/**
	*   Returns the type of the item in the journal
	*   @return String type of the item (text, video, audio or image)
	*/
	function get type() { 
		return this.type;
	}

	/**
	*   Returns the description of the journal item
	*   @return String description of item
	*/
	get description() {
		return this.description;
	}

	/**
	*   Returns the date of the journal entry
	*   @return Calendar calendar object that represents date
	*/
	get date() {
		return this.date;
	}

	/**
	*   changes the description of the journal item
	*   @param newDescription string representing new description
	*/
	function setDescription(_description) {
		description = _description;
	}

	/**
	*   changes the date of the journal entry
	*   @param month month of the new date represented by int
	*   @param day day of the month represented by int
	*   @param year year of the new date represented by int
	*   @param hours hour for the new date (0 - 23)
	*   @param minutes time in minutes (0 - 60) of the new date
	*		 setDate(YYYY, MM, DD, HR, MI, SS, MS)
	*/
	function setDate(YYYY, MM, DD, HR, MI) {
		date = new Date(YYYY, MM, DD, HR, MI, 0, 0);
	}
}
