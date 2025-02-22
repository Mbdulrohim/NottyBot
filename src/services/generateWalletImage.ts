import { createCanvas, loadImage } from "canvas";
import { registerFont } from "canvas";
import { ASSETS } from "../assets/assets";

registerFont(ASSETS.PLAYFAIR_DISPLAY_BOLD, {
  family: "Playfair Display",
  weight: "bold",
});
registerFont(ASSETS.ROBOTO_LIGHT, { family: "Roboto", weight: "300" });
registerFont(ASSETS.MONTSERRAT_MEDIUM, { family: "Montserrat", weight: "500" });

export const generateWalletImage = async (data: {
  username: string;
  walletAddress: string;
  walletBalance: string;
  walletCount: number;
  isDefault: boolean;
}): Promise<Buffer> => {
  const width = 1150;
  const height = 700;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // 🌟 Consistent Background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0A0A0A");
  gradient.addColorStop(0.5, "#1A1A1A");
  gradient.addColorStop(1, "#0A0A0A");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 🆕 Wallet Overview Specific Layout
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.font = 'bold 58px "Playfair Display"';
  ctx.fillText("Wallet Overview", 80, 100);

  // 👤 User Info
  ctx.font = '500 36px "Montserrat"';
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.fillText(`${data.username}'s Wallets`, 80, 160);

  // 💳 Active Wallet Card
  const walletCard = {
    x: 80,
    y: 200,
    width: 800,
    height: 120,
    radius: 20
  };

  // Glass Effect
  ctx.save();
  ctx.globalAlpha = 0.15;

//@ts-ignore
  ctx.filter = "blur(8px)";
  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.roundRect(walletCard.x, walletCard.y, walletCard.width, walletCard.height, walletCard.radius);
  ctx.fill();
  ctx.restore();

  // Wallet Address
  ctx.font = '500 28px "Montserrat"';
  ctx.fillStyle = "#00FFCC";
  ctx.fillText("Active Wallet:", walletCard.x + 30, walletCard.y + 45);
  
  ctx.font = '300 24px "Roboto"';
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fillText(data.walletAddress, walletCard.x + 200, walletCard.y + 45);

  // Default Wallet Badge
  if (data.isDefault) {
    ctx.font = '500 18px "Montserrat"';
    ctx.fillStyle = "#FFD700";
    ctx.fillText("• Default", walletCard.x + 30, walletCard.y + 80);
  }

  // 💰 Balance Display
  ctx.font = '500 36px "Montserrat"';
  const balanceGradient = ctx.createLinearGradient(0, 0, 400, 0);
  balanceGradient.addColorStop(0, "#00FFCC");
  balanceGradient.addColorStop(1, "#00B4FF");
  ctx.fillStyle = balanceGradient;
  ctx.fillText(`Balance: ${data.walletBalance} TON`, walletCard.x + 30, walletCard.y + 95);

  // 📊 Wallet Stats Container
  const statsY = walletCard.y + walletCard.height + 50;
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.roundRect(80, statsY, 500, 120, 20);
  ctx.fill();

  // Total Wallets
  ctx.font = '500 28px "Montserrat"';
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fillText("Total Wallets:", 100, statsY + 45);
  
  ctx.font = 'bold 42px "Playfair Display"';
  ctx.fillStyle = balanceGradient;
  ctx.fillText(data.walletCount.toString(), 300, statsY + 45);

  // 🏦 TON Network Status
  ctx.font = '300 22px "Roboto"';
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("TON Network • Online", 80, statsY + 85);

  // 🔗 Action Buttons
  const buttons = [
    { text: "Switch Wallet", x: 650, y: statsY },
    { text: "New Wallet", x: 850, y: statsY }
  ];

  buttons.forEach(btn => {
    ctx.fillStyle = "rgba(0, 174, 239, 0.2)";
    ctx.roundRect(btn.x, btn.y, 200, 50, 12);
    ctx.fill();
    
    ctx.font = '500 22px "Montserrat"';
    ctx.fillStyle = "#00AEEF";
    ctx.fillText(btn.text, btn.x + 30, btn.y + 35);
  });

  // 🏢 Logo & Branding
  try {
    // Your Logo
    const yourLogo = await loadImage(ASSETS.TON_LOGO);
    ctx.drawImage(yourLogo, width - 200, height - 200, 150, 150);
    
    // TON Logo
    const tonLogo = await loadImage(ASSETS.TON_LOGO);
    ctx.drawImage(tonLogo, width - 200, 50, 150, 150);
  } catch (error) {
    console.error("Error loading logos:", error);
  }

  return canvas.toBuffer("image/png");
};