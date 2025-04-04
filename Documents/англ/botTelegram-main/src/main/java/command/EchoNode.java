package command;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

/*
 * класс реализуемый команду /echo
 */
public class EchoNode implements ICommand {
    public static final String infoAboutCommand = "Выводит то, что вы введете после echo";

    public EchoNode(){}

    /*
     * реализация метода для выполнения команды /echo
     */
    @Override
    public SendMessage doCommand(String text){
        SendMessage msg = new SendMessage();
        if (text == null){
            msg.setText("Введите что-нибудь, чтобы бот вывел то же самое)");
            return msg;
        }
        msg.setText(text);
        return msg;
    }  
    
    /*
    * реализация метода получения информации о команде /echo
    */
    @Override
    public String getInfo(){
        return infoAboutCommand;
    }
}