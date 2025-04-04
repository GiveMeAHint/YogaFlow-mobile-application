import bot.TelegramBot;

public class Main {
    public static void main(String[] args) {
        TelegramBot bot = new TelegramBot(System.getenv("BOT_USERNAME"),
                System.getenv("BOT_TOKEN"));
        bot.botConnect();

    }
}