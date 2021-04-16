/**
*   Text class that extends the itme class. Holds the text item. 
*   Can edit the text and replace it with new text
*   
*   @author Javier Galvan
*   @since 2021-04-16
*/
public class Text extends Item {
    String text;

    /**
     * replaces text item with new string
     * @param newText newText to replace the text item
     */
    public void edit(String newText){
        text = newText;
    }

}
