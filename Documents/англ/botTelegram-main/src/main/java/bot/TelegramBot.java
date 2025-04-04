package bot;

import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

import common.WorkWithMessage;


public class TelegramBot extends TelegramLongPollingBot {
    private final String userName;
    private final String token;
    private final WorkWithMessage workWithMessage;

    public TelegramBot(String userName, String token) {
        this.userName = userName;
        this.token = token;
        workWithMessage = new WorkWithMessage();
    }

    @Override
    public void onUpdateReceived(Update update) {
        Message msgTelegram;
        String inputText;
        Long chatID;

//        System.out.println(update.getMessage().getText());
//        System.out.println(update.getMessage().getFrom().getFirstName());

        if (update.hasCallbackQuery()) {
            msgTelegram = update.getCallbackQuery().getMessage();
            inputText = update.getCallbackQuery().getData();
        } else {
            msgTelegram = update.getMessage();
            inputText = update.getMessage().getText();
        }

        chatID = msgTelegram.getChatId();
        SendMessage answer = workWithMessage.handleMessage(inputText);
        sendMsg(chatID, answer);
    }

    public synchronized void sendMsg(Long chatId, SendMessage sendMessage) {
        sendMessage.setChatId(String.valueOf(chatId));
        try {
            execute(sendMessage);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    public void botConnect() {
        try {
            TelegramBotsApi telegramBotsApi = new TelegramBotsApi(DefaultBotSession.class);
            telegramBotsApi.registerBot(this);
        } catch (TelegramApiException e) {
            try {
                Thread.sleep(10000);
                botConnect();
            } catch (InterruptedException interruptedException) {
                interruptedException.printStackTrace();
            }
        }
    }

    @Override
    public String getBotUsername() {
        return userName;
    }

    @Override
    public String getBotToken() {
        return token;
    }
}