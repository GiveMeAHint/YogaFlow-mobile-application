package command;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class EchoNodeTest {
    private final EchoNode echoNode = new EchoNode();

    /*
     * тест на повтор сообщения от бота 
     */
    @Test
    void testNotEmptyString() {
        String text = "Привет, я пытаюсь протестировать это и не понимаю, нужно ли оно здесь...";
        String result = echoNode.doCommand(text).getText();
        Assertions.assertEquals(result, text);
    }
}