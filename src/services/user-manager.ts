// src/services/user-manager.ts
import { User, Wallet} from "../types/User";

class UserManager {
  private users = new Map<string, User>();
  
  async getOrCreateUser(ctx: any): Promise<User> {
    const userId = ctx.from.id.toString();
    
    if (!this.users.has(userId)) {
      this.users.set(userId, {
        id: userId,
        username: ctx.from.username,
        wallets: [],
        session: {
          lastAction: new Date(),
          conversationState: 'idle'
        },
        settings: {
          riskLevel: 'medium',
          alertsEnabled: true,
          defaultSlippage: 1.0
        },
        createdAt: new Date(),
        lastActive: new Date()
      });
    }
    
    return this.users.get(userId)!;
  }

  async updateUser(user: User): Promise<void> {
    this.users.set(user.id, user);
    // In production: Save to database
  }

  async connectWallet(userId: string, wallet: Wallet): Promise<User> {
    const user = this.users.get(userId)!;
    
    // Set first wallet as default
    if (user.wallets.length === 0) {
      wallet.isDefault = true;
      user.session.activeWallet = wallet.address;
    }
    
    user.wallets.push(wallet);
    await this.updateUser(user);
    return user;
  }
}

export const userManager = new UserManager();