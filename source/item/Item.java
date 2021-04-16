import java.util.Calendar;

/**
*   Abstract item class that will represent the item being
*   held in the journal entry. This can be a text, video, audio
*   or image. Each of these types will extend this class
*
*   @author Javier Galvan
*   @since  2021-04-16
 */
public abstract class Item{
    String type;
    //data type of input?? might not need 
    Calendar date;
    String description;

    /**
    *   Returns the type of the item in the journal
    *   @return String type of the item (text, video, audio or image)
    */
    public String getType(){
        return type;
    }

    /**
    *   Returns the input given from the user
    *   @return ??? input given by user to be put in journal
    */
    // public getInput(){
    //     //TODO
    // }

    /**
    *   Returns the date of the journal entry
    *   @return Calendar calendar object that represents date 
    */
    public Calendar getDate(){
        return date;
    }

    /**
    *   Returns the description of the journal item
    *   @return String description of item
    */
    public String getDescription(){
        return description;
    }

    /**
    *   changes the date of the journal entry
    *   @param month month of the new date represented by int
    *   @param day day of the month represented by int 
    *   @param year year of the new date represented by int
    */
    public void setDate(int month, int day, int year){
        date.set(year, month, day);
    }

    /**
    *   changes the description of the journal item
    *   @param newDescription string representing new description
    */
    public void setDescription(String newDescription){
        description = newDescription;
    }
}