/**
*   Image class that extends item class. Holds the image item and
*   allows for editing of the dimensions. Has given size constraints.
*
*   @author Javier Galvan
*   @since  2021-04-16
 */
//import java.awt.image.BufferedImage;
//import java.io.File;
//import java.io.IOException;
//import javax.imageio.ImageIO;

public class Image extends Item{
    final int MAX_WIDTH = 100;  //width of journal?
    final int MAX_HEIGHT = 100; //height of journal?

    /**
     * creates image item from filePath and description
     * @param filePath path to the image file
     * @param description description of the image
     */
    public Image(String filePath, String description){
        super("Image", description, filePath);

        //check if Image is too big TODO
        /* 
        BufferedImage bimg = ImageIO.read(new File(filePath));
        int width = bimg.getWidth();
        int height = bimg.getHeight();
        if (width > 100 && height > 100){
            BufferedImage resizeImageJpg = resizeImage(bimg, type, 100, 100);
        }
        */
    }
}
