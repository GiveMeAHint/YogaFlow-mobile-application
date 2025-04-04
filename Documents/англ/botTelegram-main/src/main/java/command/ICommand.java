package command;

import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

/*
 * интерфейс определяемы функционал команд
 */
public interface ICommand {
    SendMessage doCommand(String string);
    String getInfo();
}