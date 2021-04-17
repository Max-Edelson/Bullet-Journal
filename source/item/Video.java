public class Video extends Item{
    String filePath;

    /**
     * creates new video item from filepath to video and description
     * @param filePath path to the video file
     * @param description description of the video
     */
    public Video(String filePath, String description){
        super("Video", description);
        this.filePath = filePath;
    }

}
