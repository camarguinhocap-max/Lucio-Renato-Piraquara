export {};

declare global {
  interface Env {
    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_WEBHOOK_SECRET: string;
    TELEGRAM_AUTHORIZED_IDS: string;
  }
}
