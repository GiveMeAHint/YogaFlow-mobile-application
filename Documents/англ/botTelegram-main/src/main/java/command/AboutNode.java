package command;


import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

/*
 * класс реализуемый команду /about
 */
public class AboutNode implements ICommand {
    private static final String infoAboutCommand = "Эта команда, рассказывает о боте и его создателях.";
    private static final String infoAboutBot = "потом допишем";

    public AboutNode(){}
 
    /*
     * реализация метода для выполнения команды /about
     */
    @Override
    public SendMessage doCommand(String text) {
        SendMessage msg = new SendMessage();
        msg.setText(infoAboutBot);
        return msg;
    }

    /*
     * реализация метода получения информации о команде /about
     */
    @Override
    public String getInfo() {
        return infoAboutCommand;
    }
}