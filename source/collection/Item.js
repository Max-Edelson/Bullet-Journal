const EVENT_SYMBOL = ""; /* NEED SYMBOL FOR EVENT */
const TASK_SYMBOL = ""; /* NEED SYMBOL FOR TASK */
const NOTE_SYMBOL = ""; /* NEED SYMBOL FOR NOTE */

/**
 *   @Description Abstract item class that will represent the item being
 *   held in the journal entry. This can be an Event, Task or Note.
 *	 Each of these types will extend this class
 *	 @author Javier Galvan
 *	 
 */
class Item {
	/**
	 * @constructs Item Creates and instance of the Item object with media
	 * @param symbol image that represents the type of item
	 * @param text text of the item
	 * @param media file path to additional media(video, image, audio)(optional)
	 */
	constructor(symbol, text, media) {
		// prevent the abstract class from being created alone
		if (this.constructor === Item) {
			throw new Error("Instance of Abstrct class cannot be instatiated");
		}

		this.symbol = symbol;
		this.text = text;

		// check if media was included
		if (media === undefined) {
			this.media = "";
		} else {
			this.media = media;
		}
	}

	/**
	 * @function hasMedia check if the media has additional media
	 * @returns returns true is item has media false otherwise
	 */
	hasMedia() {
		if (this.media === "") {
			return false;
		} else {
			return true;
		}
	}
}

/**
 * @Description Event class that extends the item class. Keeps track of upcoming or
 * past events
 * @author Javier Galvan
 */
class Event extends Item {
	/**
	 * @constructs Event Creates an event object that has symbol, text and optional media
	 * title and time
	 * @param text text describing the event
	 * @param media filepath to additonal media
	 * @param title title of the event (optional)
	 * @param date date object that represents date of the event (optional)
	 */
	constructor(text, media, title, date, time=null) {
		super(EVENT_SYMBOL, text, media);

		// check if title was included
		if (title === undefined) {
			this.title = "";
		} else {
			this.title = title;
		}

		// check if time was included
		if (date === undefined) {
			this.date = null;
		} else {
			this.date = date;
		}
	}

	/**
	 * @function addDate adds date property to the event
	 * @param newDate the new date (string) of the event
	 */
	addDate(newDate) {
		this.date = newDate;
	}

	/**
	 * @function removeDate removes the date from the event
	 */
	removeDate() {
		this.date = null;
	}

	/**
	 * @function addTime adds time property to the event
	 * @param newTime new time to add to the event
	 */
	addTime(newTime){
		this.time = newTime;
	}

	/**
	 * @function removeTime removes the time property from event
	 */
	removeTime(){
		this.time = null;
	}

	/**
	 * @function hasDate check if event has a date
	 * @returns returns true if there exists a date for this event, false
	 * otherwise
	 */
	hasDate() {
		if (this.date === null) {
			return false;
		} else {
			return true;
		}
	}
}

/**
 * @Description Task class that extends the item class. Used to keep track of task
 * needed to be done
 * @author Javier Galvan
 */
class Task extends Item {
	/**
	 * @constructs Item creates a new Task object that is an item
	 * @param text text of the task
	 * @param media additional media for the task
	 * @param deadline date object that represents the deadline of the task
	 */
	constructor(text, media, deadline) {
		super(TASK_SYMBOL, text, media);

		this.completed = false;

		// check if dealine was included
		if (deadline === undefined) {
			this.deadline = null;
		} else {
			this.deadline = deadline;
		}
	}

	/**
	 * @function addDeadline add/replaces deadline of the task
	 * @param newDeadline date object representing new deadline to be added
	 */
	addDeadline(newDeadline) {
		this.deadline = newDeadline;
	}

	/**
	 * @function removeDeadline removes the deadline of the task
	 */
	removeDeadline() {
		this.deadline = null;
	}

	/**
	 * @function hasDeadline checks if task has a deadline
	 * @returns returns true if there exists a deadline, false otherwise
	 */
	hasDeadline() {
		if (this.deadline === null) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * @function markCompleted marks task as completed
	 */
	markCompleted() {
		this.completed = true;
	}

	/**
	 * @function markUncompleted marks task as uncomplete
	 */
	markUncompleted() {
		this.completed = false;
	}
}

/**
 * @Description Note class that extends the item class. Used to keep track of information
 * @author Javier Galvan
 */
class Note extends Item {
	/**
	 * @constructs Note creates a new note object
	 * @param text text of the note
	 * @param media additional media for the note
	 */
	constructor(text, media) {
		super(NOTE_SYMBOL, text, media);
	}
}

export {Item, Event, Task, Note};
