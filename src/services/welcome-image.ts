import { createCanvas, loadImage } from "canvas";
import { registerFont } from "canvas";
import { ASSETS } from "../assets/assets";

// Register elegant fonts (make sure you have these font files in your assets)
registerFont(ASSETS.PLAYFAIR_DISPLAY_BOLD, {
  family: "Playfair Display",
  weight: "bold",
});
registerFont(ASSETS.ROBOTO_LIGHT, { family: "Roboto", weight: "300" });
registerFont(ASSETS.MONTSERRAT_MEDIUM, { family: "Montserrat", weight: "500" });

export const generateStartImage = async (data:{
  username: string,
  walletBalance: string,
  // walletCount: string,
  // rank: string,
  // referralCount: string
}): Promise<Buffer> => {
  const width = 1150; // Wider canvas for better layout
  const height = 700;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // 🌟 Luxury Gradient Background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0A0A0A");
  gradient.addColorStop(0.5, "#1A1A1A");
  gradient.addColorStop(1, "#0A0A0A");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 🎩 Elegant Header Section
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.font = 'bold 68px "Playfair Display"';
  ctx.fillText("NottyBot", 80, 120);

  // 👑 Welcome Message with Subtle Shadow
  ctx.font = '500 42px "Montserrat"';
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.shadowColor = "rgba(0, 174, 239, 0.4)";
  ctx.shadowBlur = 20;
  ctx.fillText(`Welcome, ${data.username}`, 80, 200);
  ctx.shadowBlur = 0; // Reset shadow

  // 💎 Wallet Balance Card with Glass Effect
  const walletCard = {
    x: 80,
    y: 250,
    width: 500,
    height: 120,
    radius: 25,
  };
  // 🆕 Your Logo Placeholder (Top-Right Circle)
  const yourLogoX = width - 180; // Right side
  const yourLogoY = 180; // Top section
  const yourLogoSize = 180;
  ctx.beginPath();
  ctx.arc(yourLogoX, yourLogoY, yourLogoSize / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF20"; // Semi-transparent white
  ctx.fill();
  // Glassmorphism Effect
  ctx.save();
  ctx.globalAlpha = 0.2;
  // @ts-ignore
  ctx.filter = "blur(10px)";
  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.beginPath();
  ctx.roundRect(
    walletCard.x,
    walletCard.y,
    walletCard.width,
    walletCard.height,
    walletCard.radius
  );
  ctx.fill();
  ctx.restore();

  // Card Content
  ctx.font = '300 28px "Roboto"';
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fillText("Current Balance", walletCard.x + 30, walletCard.y + 45);

  ctx.font = '500 42px "Montserrat"';
  const gradientBalance = ctx.createLinearGradient(0, 0, 400, 0);
  gradientBalance.addColorStop(0, "#00FFCC");
  gradientBalance.addColorStop(1, "#00B4FF");
  ctx.fillStyle = gradientBalance;
  ctx.fillText(`${data.walletBalance} TON`, walletCard.x + 30, walletCard.y + 90);

  // 📜 Command List with Modern Icons
  const commands = [
    { icon: "💎", command: "/balance", description: "Check Wallet Balance" },
    { icon: "📊", command: "/contract", description: "Start Trading" },
    { icon: "🛡️", command: "/help", description: "Support Center" },
  ];

  let commandY = 420;
  commands.forEach((cmd) => {
    // Command Container
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.beginPath();
    ctx.roundRect(80, commandY, 500, 70, 15);
    ctx.fill();

    // Icon
    ctx.font = '32px "Noto Emoji"';
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText(cmd.icon, 100, commandY + 48);

    // Command Text
    ctx.font = '500 24px "Montserrat"';
    ctx.fillStyle = gradientBalance;
    ctx.fillText(cmd.command, 150, commandY + 48);

    // Description
    ctx.font = '300 22px "Roboto"';
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.fillText(cmd.description, 300, commandY + 48);

    commandY += 90;
  });

  // 🏛️ Right Side Decorative Elements
  // Golden Accent Line
  ctx.strokeStyle = "rgba(255, 215, 0, 0.3)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(800, 0);
  ctx.lineTo(800, height);
  ctx.stroke();

  // TON Logo Container
  ctx.save();
  ctx.beginPath();
  ctx.arc(1000, height - 150, 100, 0, Math.PI * 2);
  ctx.clip();
  try {
    const tonLogo = await loadImage(ASSETS.TON_LOGO);
    ctx.drawImage(tonLogo, 900, height - 250, 200, 200);
  } catch (error) {
    console.error("Error loading TON logo:", error);
  }
  ctx.restore();

  const patternImage = await loadImage(ASSETS.TON_LOGO);
  const pattern = ctx.createPattern(patternImage, "repeat");

  if (pattern) {
    const scale = 0.7; // Decrease this value to zoom out more (e.g., 0.2 makes it even smaller)
    ctx.save();
    ctx.globalAlpha = 0.025;
    ctx.translate(0, 0); // Reset position
    ctx.scale(scale, scale); // Scale down the pattern
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, width / scale, height / scale); // Adjust fill size
    ctx.restore();
  }

  return canvas.toBuffer("image/png");
};

// import { createCanvas, loadImage } from 'canvas';
// import { ASSETS } from '../assets/assets';

// export const generateStartImage = async (username: string, walletBalance: string): Promise<Buffer> => {
//   const width = 1200; // Wider canvas for a more immersive experience
//   const height = 700; // Taller canvas for better spacing
//   const canvas = createCanvas(width, height);
//   const ctx = canvas.getContext('2d');

//   // 🌌 **Galaxy Gradient Background** (Deep Space Theme)
//   const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
//   gradient.addColorStop(0, '#0A0A23'); // Deep space blue
//   gradient.addColorStop(0.5, '#1A1A40'); // Mid-tone purple
//   gradient.addColorStop(1, '#2E2E5A'); // Light space purple
//   ctx.fillStyle = gradient;
//   ctx.fillRect(0, 0, width, height);

//   // 🌟 **Star Particles** (Gamified Touch)
//   for (let i = 0; i < 200; i++) {
//     ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8})`;
//     ctx.beginPath();
//     ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, Math.PI * 2);
//     ctx.fill();
//   }

//   // 🏷️ **Bot Name** (Futuristic Font)
//   ctx.fillStyle = '#00FFCC';
//   ctx.font = 'bold 72px "Orbitron", sans-serif'; // Futuristic font
//   ctx.fillText('NottyBot', 60, 120);

//   // ✨ **Welcome Message** (Glowing Text)
//   ctx.fillStyle = '#FFFFFF';
//   ctx.font = 'bold 48px "Orbitron", sans-serif';
//   ctx.shadowColor = '#00FFCC';
//   ctx.shadowBlur = 10;
//   ctx.fillText(`Welcome, ${username}!`, 60, 200);
//   ctx.shadowBlur = 0; // Reset shadow

//   // 💳 **Wallet Info Box** (Holographic Card Design)
//   const walletBoxX = 50;
//   const walletBoxY = 250;
//   const walletBoxWidth = 600;
//   const walletBoxHeight = 120;
//   const walletBoxRadius = 25;

//   // Card Background (Holographic Effect)
//   const cardGradient = ctx.createLinearGradient(walletBoxX, walletBoxY, walletBoxX + walletBoxWidth, walletBoxY + walletBoxHeight);
//   cardGradient.addColorStop(0, 'rgba(0, 255, 204, 0.2)');
//   cardGradient.addColorStop(0.5, 'rgba(0, 255, 204, 0.4)');
//   cardGradient.addColorStop(1, 'rgba(0, 255, 204, 0.2)');
//   ctx.fillStyle = cardGradient;
//   ctx.beginPath();
//   ctx.roundRect(walletBoxX, walletBoxY, walletBoxWidth, walletBoxHeight, walletBoxRadius);
//   ctx.fill();

//   // Card Border (Neon Glow)
//   ctx.strokeStyle = '#00FFCC';
//   ctx.lineWidth = 4;
//   ctx.beginPath();
//   ctx.roundRect(walletBoxX, walletBoxY, walletBoxWidth, walletBoxHeight, walletBoxRadius);
//   ctx.stroke();

//   // Wallet Text (Futuristic Style)
//   ctx.fillStyle = '#00FFCC';
//   ctx.font = 'italic 40px "Orbitron", sans-serif';
//   ctx.fillText(`💳 Balance: ${walletBalance} TON`, walletBoxX + 30, walletBoxY + 75);

//   // 📜 **Command List** (Interactive Game Buttons)
//   ctx.font = '32px "Orbitron", sans-serif';
//   const commands = [
//     { text: '💰 Check Balance', y: 450, icon: '💰' },
//     { text: '📈 Start Trading', y: 530, icon: '📈' },
//     { text: '🛠️ View Help', y: 610, icon: '🛠️' },
//     { text: '📊 View Prices', y: 690, icon: '📊' },
//   ];

//   commands.forEach((cmd, index) => {
//     const btnX = 60;
//     const btnY = cmd.y - 40;
//     const btnWidth = 350;
//     const btnHeight = 70;
//     const btnRadius = 20;

//     // Button Background (Gradient)
//     const btnGradient = ctx.createLinearGradient(btnX, btnY, btnX + btnWidth, btnY + btnHeight);
//     btnGradient.addColorStop(0, index % 2 === 0 ? '#3A3A3A' : '#444444');
//     btnGradient.addColorStop(1, index % 2 === 0 ? '#555555' : '#666666');
//     ctx.fillStyle = btnGradient;
//     ctx.beginPath();
//     ctx.roundRect(btnX, btnY, btnWidth, btnHeight, btnRadius);
//     ctx.fill();

//     // Button Border (Neon Glow)
//     ctx.strokeStyle = '#00FFCC';
//     ctx.lineWidth = 3;
//     ctx.beginPath();
//     ctx.roundRect(btnX, btnY, btnWidth, btnHeight, btnRadius);
//     ctx.stroke();

//     // Command Text
//     ctx.fillStyle = '#FFFFFF';
//     ctx.fillText(`${cmd.icon} ${cmd.text}`, btnX + 20, cmd.y);
//   });

//   // 🪙 **TON Logo** (Floating Hologram Effect)
//   try {
//     const tonLogo = await loadImage(ASSETS.TON_LOGO);
//     const logoSize = 160; // Larger for prominence
//     const logoX = width - logoSize - 60;
//     const logoY = height - logoSize - 60;

//     // Hologram Effect
//     ctx.globalAlpha = 0.8;
//     ctx.drawImage(tonLogo, logoX, logoY, logoSize, logoSize);
//     ctx.globalAlpha = 1.0;
//   } catch (error) {
//     console.error('Error loading TON logo:', error);
//   }

//   // 🎨 **Custom Logo Container** (Futuristic Circle)
//   const logoContainerSize = 100;
//   ctx.fillStyle = 'rgba(0, 255, 204, 0.2)';
//   ctx.beginPath();
//   ctx.arc(width - 80, 80, logoContainerSize / 2, 0, Math.PI * 2);
//   ctx.fill();

//   return canvas.toBuffer('image/png');
// };
