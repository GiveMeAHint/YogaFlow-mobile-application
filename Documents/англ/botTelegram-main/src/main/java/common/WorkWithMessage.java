package common;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

import command.HandlerNode;

/*
 * класс раболты с сообщениями
 */
public class WorkWithMessage{
    private final HandlerNode handler = new HandlerNode();
    
     public WorkWithMessage() { }
    
    /*
     * метод обработки команд
     */
    public SendMessage handleMessage(String text) {
        SendMessage sendMessage = new SendMessage();
        if (text.startsWith("/")) {
            SendMessage answerAboutCommand = handler.checkCommand(text);
            if (answerAboutCommand == null) {
               sendMessage.setText("Такой команды нет, напишите /help чтобы узнать доступные команды");
               return sendMessage;
            }
            return answerAboutCommand;
        }
        return sendMessage;
    }   

}