package command;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

import java.util.HashMap;

/*
 * класс для работы с командами 
 */
public class HandlerNode {
    private final HashMap<String, ICommand> commands;

    public HandlerNode(){
        commands = new HashMap<>();
        commands.put("about", new AboutNode());
        commands.put("echo", new EchoNode());
        commands.put("start", new StartNode());
        commands.put("help", new HelpNode(commands));
        commands.put("play", new PlayNode());
    }

    /*
     * метод реализуемый проверку на команду
     */
    public SendMessage checkCommand(String query){
        SendMessage sendMessage = new SendMessage();
        String[] line = query.substring(1).split(" ", 2);
        String command = line[0];
        String parameter = null;

        if (line.length > 1) {
            parameter = line[1];
        }
        if (!commands.containsKey(command)){
            sendMessage.setText("Такой команды нет, напишите /help чтобы узнать доступные команды");
            return sendMessage;
        }
        return commands.get(command).doCommand(parameter);
    }
}