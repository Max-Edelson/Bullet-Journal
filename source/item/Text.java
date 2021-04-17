/**
*   Text class that extends the itme class. Holds the text item. 
*   Can edit the text and replace it with new text
*   
*   @author Javier Galvan
*   @since 2021-04-16
*/
public class Text extends Item {
    String text; //should this be text file?

    /**
     * creates new text item using text string and description
     * @param text string that holds text of item
     * @param description summary or title of the text
     */
    public Text(String text, String description){
        super("Text", description);
        this.text = text;
    }

    /**
     * replaces text item with new string
     * @param newText newText to replace the text item
     */
    public void edit(String newText){
        text = newText;
    }

}
