const EVENT_SYMBOL = ""; /* NEED SYMBOL FOR EVENT */
const TASK_SYMBOL = ""; /* NEED SYMBOL FOR TASK */
const NOTE_SYMBOL = ""; /* NEED SYMBOL FOR NOTE */

/**
 *   Abstract item class that will represent the item being
 *   held in the journal entry. This can be an Event, Task or Note.
 *	Each of these types will extend this class
 */
class Item {
	/**
	 * @constructor Creates and instance of the Item object with media
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
	 * getter method for symbol of item
	 * @returns returns image that is symbol of item
	 */
	/*get symbol() {
		return this.symbol;
	}*/

	/**
	 * getter method for text of item
	 * @returns returns string that is text of item
	 */
/*	get text() {
		return this.text;
	}*/

	/**
	 * getter method for media of item
	 * @returns returns string that is filepath to media
	 */
/*d	get media() {
		return this.media;
	}*/

	/**
	 * check if the media has additional media
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
 * Event class that extends the item class. Keeps track of upcoming or
 * past events
 */
class Event extends Item {
	/**
	 * Creates an event object that has symbol, text and optional media
	 * title and time
	 * @param text text describing the event
	 * @param media filepath to additonal media
	 * @param title title of the event (optional)
	 * @param date date object that represents date of the event (optional)
	 */
	constructor(text, media, title, date) {
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
			//			this.date = time;
			// TODO: define time
		}
	}

	/**
	 * getter method for date of the event
	 * @returns date object representing date/time of the event
	 */
	get date() {
		return this.date;
	}

	/**
	 * getter method for title of the event
	 * @returns string representing title of the event
	 */
	get title() {
		return this.title;
	}
	/**
	 * adds/replaces the date of the event
	 * @param newDate date object representing new date
	 */
	addDate(newDate) {
		this.date = newDate;
	}

	/**
	 * removes the date from the event
	 */
	removeDate() {
		this.date = null;
	}

	/**
	 * check if event has a date
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
 * Task class that extends the item class. Used to keep track of task
 * needed to be done
 */
class Task extends Item {
	/**
	 * creates a new Task object that is an item
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
	 * getter method for the deadline
	 * @returns returns date object representing the dealine of task
	 */
	get deadline() {
		return this.deadline;
	}

	/**
	 * getter method whether task is completed or not
	 * @returns returns boolean representing if task is completed
	 */
	get completed() {
		return this.completed;
	}

	/**
	 * add/replaces deadline of the task
	 * @param newDeadline date object representing new deadline to be added
	 */
	addDeadline(newDeadline) {
		this.deadline = newDeadline;
	}

	/**
	 * removes the deadline of the task
	 */
	removeDeadline() {
		this.deadline = null;
	}

	/**
	 * checks if task has a deadline
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
	 * marks task as completed
	 */
	markCompleted() {
		this.completed = true;
	}

	/**
	 * marks task as uncomplete
	 */
	markUncompleted() {
		this.completed = false;
	}
}

/**
 * Note class that extends the item class. Used to keep track of information
 */
class Note extends Item {
	/**
	 * creates a new note object
	 * @param text text of the note
	 * @param media additional media for the note
	 */
	constructor(text, media) {
		super(NOTE_SYMBOL, text, media);
	}
}

export {Item, Event, Task, Note};