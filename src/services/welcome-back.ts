import { createCanvas, loadImage, registerFont } from "canvas";
import { ASSETS } from "../assets/assets";

interface WelcomeBackData {
  username: string;
  tonPrice: string;
  tonBalance: string;
  tonAddress: string;
  solPrice: string;
  solBalance: string;
  solAddress: string;
}
export const generateWelcomeBackImage = async (
  data: WelcomeBackData
): Promise<Buffer> => {
  const bgImage = await loadImage(ASSETS.NOTTTYBG);
  // Create canvas matching background image dimensions
  const canvas = createCanvas(663, 332);
  const ctx = canvas.getContext("2d");
  registerFont(ASSETS.MANROPE_BOLD, {
    family: "Manrope",
    weight: "bold",
    style: "normal",
  });
  registerFont(ASSETS.SPACE_GROTESK, { family: "Space Grotesk" });
  registerFont(ASSETS.MANROPE_MEDIUM, {
    family: "Manrope",
    weight: "500", // Medium weight
    style: "normal",
  });

  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  // "Welcome back"
  // Welcome Text
  ctx.font = "500 44px Space Grotesk";
  ctx.fillStyle = "#FFFFFF"; // Set text color to white
  ctx.textBaseline = "top"; // Start drawing from the top
  ctx.fillText("Welcome Back", 22, 78); // Draw text at (x = -22, y = -20)

  // "TON"
  ctx.font = "100 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText("TON", 22, 173);

  //"ton price"
  ctx.font = "600 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText(data.tonPrice, 60, 173);

  // "bal" ton
  ctx.font = "100 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText("BAL :", 219, 173);

  // Bal (ton)
  ctx.font = "600 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText(data.tonBalance, 262, 173);

  // ton address
  ctx.font = "300 12px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText(data.tonAddress, 22, 200);

  //'sol'
  ctx.font = "100 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText("SOLANA", 22, 256);
  // 'sol price'
  ctx.font = "600 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText(data.solPrice, 262, 256);

  // "bal" sol
  ctx.font = "100 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText("BAL :", 219, 256);

  // Bal (sol)
  ctx.font = "600 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText(data.solBalance, 262, 256)

  // sol address
  ctx.font = "300 12px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText(data.solAddress, 22, 286);

// White rounded rectangle background for username and profile
ctx.beginPath();
ctx.fillStyle = "#FFFFFF";
ctx.roundRect(466, 252, 176, 55, 20); // Adjusted position to properly contain elements
ctx.fill();

// Username text (now properly positioned within white rectangle)
ctx.font = "500 20px Manrope";
ctx.fillStyle = "#000000"; // Changed to black for contrast
ctx.textBaseline = "middle"; // Better vertical alignment
ctx.fillText(data.username, 510, 256 + 49/2); // Centered vertically

// Profile picture container
ctx.beginPath();
ctx.fillStyle = "#000000";
ctx.roundRect(475, 260, 33, 33, 10);
ctx.fill();

  //....
  // Output as PNG
  return canvas.toBuffer("image/png");
};
