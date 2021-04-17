/**
*   Image class that extends item class. Holds the image item and
*   allows for editing of the dimensions. Has given size constraints.
*
*   @author Javier Galvan
*   @since  2021-04-16
 */
public class Image extends Item{
    String filePath;
    final int MAX_WIDTH = 100;  //width of journal?
    final int MAX_HEIGHT = 100; //height of journal?

    /**
     * creates image item from filePath and description
     * @param filePath path to the image file
     * @param description description of the image
     */
    public Image(String filePath, String description){
        super("Image", description);
        this.filePath = filePath;

        //check if Image is too big TODO
    }
}
