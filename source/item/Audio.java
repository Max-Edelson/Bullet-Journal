public class Audio extends Item{
    String filePath;

    /**
     * creates new audio item from filepath to audio and description
     * @param filePath path to the audio file
     * @param description description of the audio
     */
    public Audio(String filePath, String description){
        super("Audio", description);
        this.filePath = filePath;
    }

}
