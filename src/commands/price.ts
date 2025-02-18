import { Context } from 'telegraf';
import axios from 'axios';
import { Message } from 'telegraf/typings/core/types/typegram';

export const priceCommand = async (ctx: Context) => {
  const args = (ctx.message as Message.TextMessage).text.split(' ') || [];
  const token = args[1]?.toUpperCase();
  
  if (!token) {
    return ctx.replyWithMarkdownV2(
      '❌ *Please specify a token* \\(e\\.g\\.\\, `/price TON`\\)'
    );
  }

  try {
    const response = await axios.get(`https://tonapi.io/v1/rates?tokens=${token}`);
    const price = response.data.rates[token]?.price;
    
    if (price) {
      ctx.replyWithMarkdownV2(`💎 *${token} Price:* $${price}`);
    } else {
      ctx.replyWithMarkdownV2('❌ *Token not found*\.');
    }
  } catch (error) {
    ctx.replyWithMarkdownV2('❌ *Failed to fetch price\. Try again later*\.');
  }
};
