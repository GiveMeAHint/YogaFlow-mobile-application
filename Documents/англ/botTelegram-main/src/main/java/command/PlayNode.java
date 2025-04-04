package command;


import java.util.HashMap;
import java.util.Random;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

public class PlayNode implements ICommand{
    
    private static final String infoAboutCommand = "команда /play для запуска игры";
    private final HashMap<Integer, String> operators;

     public PlayNode(){
        operators = new HashMap<>();
        operators.put(1, "+");
        operators.put(2, "-");
        operators.put(3, "*");
        operators.put(4, "/");
    }

    
    @Override
    public SendMessage doCommand(String text){
        SendMessage msg = new SendMessage();        
        
        for (int i = 0; i < 10; i++){
            Random random = new Random();
            int rnd1 =  random.nextInt(1,4); 
            String first_num = String.format("%d", random.nextInt(10));
            String second_num = String.format("%d", random.nextInt(10));
            msg.setText(first_num + operators.get(rnd1) + second_num + "= ");
           
            //System.out.println(update.getMessage().getText());
        }   
        return msg;
    }
    
    
    // public String solvedTask(SendMessage msg){
    //     String[]text = msg.toString().split(" ");
    //     int num1 = Integer.parseInt(text[0]);
    //     int num2 = Integer.parseInt(text[3]);
    //     int result = 0;
        
    //     if (text[2] == "+"){
    //         result = num1 + num2;
    //     }else if (text[2] == "-"){
    //         result = num1 - num2;
    //     }else if (text[2] == "*"){
    //         result = num1 * num2;
    //     }
    //     return Integer.toString(result);    
    // }
    

    @Override
    public String getInfo(){
        return infoAboutCommand;
    }
}
