/**
*   Abstract item struct that will represent the item being
*   held in the journal entry. This can be an Event, Task or Note. 
*	Each of these types will extend this struct
 */

/**
 * Creates and instance of the Item object
 * @param symbol image that represents the type of item
 * @param text text of the item
 * @param media file path to additional media (video, image, audio)
 */
function Item(symbol, text, media){
	this.symbol = symbol;
	this.text = text;
	this.media = media;

	//prevent the abstract class from being created alone
	if(this.constructor === Item){
		throw new Error("Instance of Abstrct class cannot be instatiated");
	}
};

function Events()