import { Context } from "telegraf";

export const helpCommand = (ctx: Context) => {
  ctx.replyWithMarkdownV2(`  
        📋 *Commands:*  
    /start \\- Start the bot  
     /help \\- Show this message  
    /balance \\- Check your balance  
    /price \\[token\\] \\- Get token price  
    /trade \\[token\\] \\[amount\\] \\- Simulate a trade  
 `);
};
