import { Context, Middleware } from 'telegraf';
import Redis from 'ioredis';
import { User } from '../types/User';

const redis = new Redis(process.env.REDIS_URL!);


// Define the BotContext interface, extending Telegraf's Context
interface BotContext extends Context {
  session?: {
    user: User;
  };
}

export const sessionMiddleware: Middleware<BotContext> = async (ctx, next) => {
  if (!ctx.from) return next();
  
  const key = `user:${ctx.from.id}`;
  let user = await redis.get(key).then(data => data ? JSON.parse(data) : null);

  if (!user) {
    user = {
      id: ctx.from.id.toString(),
      username: ctx.from.username,
      wallets: [],
      session: {
        lastAction: new Date(),
        conversationState: 'idle'
      },
      createdAt: new Date(),
      lastActive: new Date()
    };
  }

  // Update session structure
  ctx.session = { user };
  await next();
  
  // Save session after processing
  await redis.set(key, JSON.stringify(ctx.session.user, (_, value) => 
    value instanceof Date ? value.toISOString() : value
  ));
};