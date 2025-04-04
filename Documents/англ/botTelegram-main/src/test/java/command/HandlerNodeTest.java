package command;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class HandlerNodeTest {
    private final HandlerNode handlerNode = new HandlerNode();

    /**
    *тестируем команду /about, которая выдает информацию о боте и тех кто его написал
    */ 
    @Test
    void checkCommandAbout() {
        String query = "/about";
        String result = handlerNode.checkCommand(query).getText();
        String equalResult = "потом допишем";
        Assertions.assertEquals(equalResult, result);
    }

    /*
     * тестируем команду /echo с пустой строкой
     */
    @Test
    void checkCommandEchoWithEmptyMessage() {
        String query = "/echo";
        String result = handlerNode.checkCommand(query).getText();
        String equalResult = "Введите что-нибудь, чтобы бот вывел то же самое)";
            Assertions.assertEquals(equalResult, result);
    }

    /*
     * тестируем команду /echo с сообщением
     */
    @Test
    void checkCommandEchoWithNotEmptyMessage() {
        String query = "/echo Привет я бот";
        String result = handlerNode.checkCommand(query).getText();
        String equalResult = "Привет я бот";
        Assertions.assertEquals(equalResult, result);
    }

    /*
     * тестируем команду /help вывод информации о командах
     */
    @Test
    void checkCommandHelpWithEmptyMessage() {
        String query = "/help";
        String result = handlerNode.checkCommand(query).getText();
        String equalResult = """
                Бот имеет следующие команды\s
                /about
                /start
                /echo
                Для познания работы команды нажмите на соответствующую кнопку""";
        Assertions.assertEquals(equalResult, result);
    }

    /*
     * тестируем команду /help с выводом иформации о команде /about
     */
    @Test
    void checkCommandHelpAbout() {
        String query = "/help about";
        String result = handlerNode.checkCommand(query).getText();
        String equalResult = "Эта команда, рассказывает о боте и его создателях.";
        Assertions.assertEquals(equalResult, result);
    }

    /*
     * тестируем команду /help с выводом иформации о команде /echo
     */
    @Test
    void checkCommandHelpEcho() {
        String query = "/help echo";
        String result = handlerNode.checkCommand(query).getText();
        String equalResult = "Выводит то, что вы введете после echo";
        Assertions.assertEquals(equalResult, result);
    }

    /*
     * тестируем команду /help с выводом иформации о команде /start
     */
    @Test
    void checkCommandHelpStart() {
        String query = "/help start";
        String result = handlerNode.checkCommand(query).getText();
        String equalResult = "Действительно ли надо писать help для этой команды?)";
        Assertions.assertEquals(equalResult, result);
    }

    /*
     * тестируем команду /help с выводом иформации о команде /help
     */
    @Test
    void checkCommandHelpHelp() {
        String query = "/help help";
        String result = handlerNode.checkCommand(query).getText();
        String equalResult = "Показывает список команд, доступных в боте";
        Assertions.assertEquals(equalResult, result);
    }

    /*
     * тестируем вывод информации о неправильной команду 
     */
    @Test
    void checkCommandHelpForWrong() {
        String query = "/help herp";
        String result = handlerNode.checkCommand(query).getText();
        String equalResult = "Такой команды нет, напишите /help чтобы узнать доступные команды";
        Assertions.assertEquals(equalResult, result);
    }

    /*
     * тест на неправильную команду 
     */
    @Test
    void checkCommandForWrong(){
        String query = "/herp";
        String result = handlerNode.checkCommand(query).getText();
        String equalResult = "Такой команды нет, напишите /help чтобы узнать доступные команды";
        Assertions.assertEquals(equalResult, result);
    }
}