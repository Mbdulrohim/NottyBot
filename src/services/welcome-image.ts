import { createCanvas, loadImage, registerFont } from "canvas";
import { ASSETS } from "../assets/assets";

interface WelcomeData {
  username: string;
  tonPrice: string;
  solPrice: string;
}

export const generateStartImage = async (
  data: WelcomeData
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

  // Welcome Text
  ctx.font = "500 44px Space Grotesk";
  ctx.fillStyle = "#FFFFFF"; // Set text color to white
  ctx.textBaseline = "top"; // Start drawing from the top
  ctx.fillText("Welcome", 22, 101); // Draw text at (x = -22, y = -20)

// White rounded rectangle background for username and profile
ctx.beginPath();
ctx.fillStyle = "#FFFFFF";
ctx.roundRect(233, 100, 176, 49, 20); // Adjusted position to properly contain elements
ctx.fill();

// Username text (now properly positioned within white rectangle)
ctx.font = "500 20px Manrope";
ctx.fillStyle = "#000000"; // Changed to black for contrast
ctx.textBaseline = "middle"; // Better vertical alignment
ctx.fillText(data.username, 280, 100 + 49/2); // Centered vertically

// Profile picture container
ctx.beginPath();
ctx.fillStyle = "#000000";
ctx.roundRect(242, 107, 33, 33, 10);
ctx.fill();

// Real Image
// const userImg = await loadImage(ASSETS.TON_LOGO);
// ctx.save();
// ctx.beginPath();
// ctx.roundRect(242, 100, 33, 33, 10);
// ctx.clip();
// ctx.drawImage(userImg, 242, 100, 33, 33);
// ctx.restore();

  // "we made 2 wallets for you"
  ctx.font = "500 24px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText("We made 2 wallets for you", 22, 220);

  // "Ton"
  ctx.font = "100 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText("TON", 22, 262);

  // "Ton price"
  ctx.font = "600 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText(data.tonPrice, 88, 262);

  // "Solana"
  ctx.font = "100 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText("SOLANA", 22, 292);

  // "Solana price"
  ctx.font = "600 16px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText(data.solPrice, 88, 292);


  //...
  return canvas.toBuffer("image/png");
};
