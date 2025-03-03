/* 
    MARK:
    Width 662 px
    Height 332 px
    MARK:
    we have the  + as arrow up green 
    and also - as arrow down 
    (two images based on that)
    FIXME:
    we will use a made template where all fixed elements would be there that being background.png(changeable)
    TODO:
    list of all componenets 
    1. token pair
    2. entry prices 
    3. exit prices
    4. duration of trade
    5. % PnL
    6. ref qr
    7. ref no
    8. username
    9. user image

    MARK: to draw rectangle
    order of (marginX, marginY, width, height, cornerRadius)
     */

interface PnLData {
  pair: string; // eth/ sol
  entry: string; //       value: "56K @0.0032"
  exit: string; //
  duration: string; // d , h, m
  percentChange: string; //+65%
  refQr: string; // random text till we fix image
  refNo: string; // 6365646358
  username: string; // @doveyylt
  userImage: string; // same as refQr
  profit: boolean; // true
}

import { createCanvas, loadImage, registerFont } from "canvas";
import { ASSETS, ELEMENT_CONFIG } from "../assets/assets";

export const generatePnLImage = async (data: PnLData): Promise<Buffer> => {
  // Load assets
  const bgImage = await loadImage(ASSETS.NOTTYBG);

  // Create canvas matching background image dimensions
  const canvas = createCanvas(663, 332);
  const ctx = canvas.getContext("2d");

  // Font registration (should be done once during app startup ideally)
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
  // Draw background
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  // Configure text rendering
  const { left, top, font, color } = ELEMENT_CONFIG.tokenPair;
  const {
    left: entryLeft,
    top: entryTop,
    font: entryFont,
    color: entryColor,
    value: entryValue,
  } = ELEMENT_CONFIG.entryPrices;
  const {
    left: exitLeft,
    top: exitTop,
    font: exitFont,
    color: exitColor,
  } = ELEMENT_CONFIG.exitPrices;
  const {
    left: durationLeft,
    top: durationTop,
    font: durationFont,
    color: durationColor,
  } = ELEMENT_CONFIG.durationOfTrade;
  const {
    left: PnLLeft,
    top: PnLTop,
    font: PnLFont,
    color: PnLColor,
  } = ELEMENT_CONFIG.PnLPercentage;
  const {
    left: usernameLeft,
    top: usernameTop,
    font: usernameFont,
    color: usernameColor,
  } = ELEMENT_CONFIG.username;
  const {
    left: refNoLeft,
    top: refNoTop,
    font: refNoFont,
    color: refNoColor,
  } = ELEMENT_CONFIG.refNo;
  {
    /*
  const { left: refQRLeft, top: refQRTop} = ELEMENT_CONFIG.refQR;
  const { left: userImageLeft, top: userImageTop} = ELEMENT_CONFIG.userImage;
  */
  }
  //BUY TEXT
  ctx.font = "500 28px Manrope"; // Set font size and family
  ctx.fillStyle = "#FFFFFF"; // Set text color to white
  ctx.textBaseline = "top"; // Start drawing from the top
  ctx.fillText("BUY", 35, 20); // Draw text at (x = -22, y = -20)

  //LINE AFTER "bUY"
  ctx.fillStyle = "#FFFFFF"; // Set color to white
  ctx.fillRect(97, 24, 1, 32);

  ctx.fill();

  // TRADED PAIR
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "top";
  ctx.fillText(data.pair, left, top);

  //"entry"
  ctx.font = "500 10px Manrope"; // Set font size and family
  ctx.fillStyle = "#FFFFFF"; // Set text color to white
  ctx.textBaseline = "top"; // Start drawing from the top
  ctx.fillText("Entry", 35, 101); // Draw text at (x = -22, y = -20)

  // ENTRY PRICE
  ctx.font = entryFont;
  ctx.textBaseline = "top";
  ctx.fillText(data.entry, entryLeft, entryTop);

  // "exit"
  ctx.font = "500 10px Manrope"; // Set font size and family
  ctx.fillStyle = "#FFFFFF"; // Set text color to white
  ctx.textBaseline = "top"; // Start drawing from the top
  ctx.fillText("Exit", 35, 131); // Draw text at (x = -22, y = -20)

  //EXIT PRICE
  ctx.font = exitFont;
  ctx.fillStyle = exitColor;
  ctx.textBaseline = "top";
  ctx.fillText(data.exit, exitLeft, exitTop);

  //"duration"
  ctx.font = "500 10px Manrope"; // Set font size and family
  ctx.fillStyle = "#FFFFFF"; // Set text color to white
  ctx.textBaseline = "top"; // Start drawing from the top
  ctx.fillText("Duration", 35, 158); // Draw text at (x = -22, y = -20)

  //DURATION
  ctx.font = durationFont;
  ctx.fillStyle = durationColor;
  ctx.textBaseline = "top";
  ctx.fillText(data.duration, durationLeft, durationTop);

  // % INCREASE / DECREASE
  ctx.font = PnLFont;
  ctx.fillStyle = PnLColor;
  ctx.textBaseline = "top";
  ctx.fillText(data.percentChange, PnLLeft, PnLTop);

  //  arrow pointed
  ctx.beginPath();
  ctx.fillStyle = "#3EE710";

  const centerX = 303;
  const baseY = 260 + 40.5; // Increased by 40.5
  const triangleHeight = 40.5;
  const baseWidth = 48.5;

  ctx.moveTo(centerX, baseY - triangleHeight);
  ctx.lineTo(centerX - baseWidth / 2, baseY);
  ctx.lineTo(centerX + baseWidth / 2, baseY);
  ctx.closePath();
  // ctx.fill("#3EE710");

  //REFQR
  //TODO:  pass in image

  //ref qr place holder
  ctx.fillStyle = "#FFFFFF";
  ctx.roundRect(575, 121, 60, 60, 5);
  ctx.fill();

  // "ref-no"
  ctx.font = "300 18px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText("Ref No", 500, 143);

  //REF-NO
  ctx.font = refNoFont;
  ctx.fillStyle = refNoColor;
  ctx.textBaseline = "top";
  ctx.fillText(data.refNo, refNoLeft, refNoTop);

  //ref qr place holder
  ctx.fillStyle = "#FFFFFF";
  ctx.roundRect(575, 121, 60, 60, 5);
  ctx.fill();

  //"USERNAME"
  ctx.font = "300 10px Manrope";
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.fillText("USER", 565, 275);

  //USERNAME
  ctx.font = usernameFont;
  ctx.fillStyle = usernameColor;
  ctx.textBaseline = "top";
  ctx.fillText(data.username, usernameLeft, usernameTop);
  //USERIMAGE (place holder)
  //TODO:  pass in user image
//ref qr place holder
  ctx.fillStyle = "#FFFFFF";
  ctx.roundRect(600, 275, 35, 35, 10);
  ctx.fill();
  //PROFIT LOSS , BOOLEAN

  // Output as PNG
  return canvas.toBuffer("image/png");
};
