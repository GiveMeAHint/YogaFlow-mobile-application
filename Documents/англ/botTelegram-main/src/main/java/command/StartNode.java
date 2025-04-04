package command;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

/*
 * класс реализуемый команду /start
 */
public class StartNode implements ICommand {
    private static final String infoAboutBot = "??? " +
            "Напиши /help, чтобы узнать о командах";
    private static final String infoAboutCommand = "Действительно ли надо писать help для этой команды?)";
    
    /*
     * реализация метода выполнения команды /start
     */
    @Override
    public SendMessage doCommand(String string) {
        SendMessage msg = new SendMessage();
        msg.setText(infoAboutBot);
        return msg;
    }

    /*
     * реализация метода для получения информации о команде /start
     */
    @Override
    public String getInfo() {
        return infoAboutCommand;
    }
}