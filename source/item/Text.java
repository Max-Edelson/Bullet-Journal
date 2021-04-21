/**
*   Text class that extends the itme class. Holds the text item. 
*   Can edit the text and replace it with new text
*   
*   @author Javier Galvan
*   @since 2021-04-16
*/
public class Text extends Item {
    String filepath;

    /**
     * creates new text item using text string and description
     * @param filePath string that holds the path to text file
     * @param description summary or title of the text
     */
    public Text(String filePath, String description){
        super("Text", description, filePath);
    }
}
