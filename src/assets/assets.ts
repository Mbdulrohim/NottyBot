import path from "path";

export const ELEMENT_CONFIG = {
  tokenPair: {
    left: 106,
    top: 21,
    font: "bold 30px Manrope",
    color: "#FFFFFF",
  },
  entryPrices: {
    left: 95,
    top: 102,
    font: "bold 13px Manrope",
    color: "#FFFFFF",
    value: "56K @0.0032",
  },
  exitPrices: {
    left: 95,
    top: 127,
    font: "bold 13px Manrope",
    color: "#FFFFFF",
    value: "58K @0.0042",
  },
  durationOfTrade: {
    left: 95,
    top: 156,
    font: "bold 13px Manrope",
    color: "#FFFFFF",
    value: "56K @0.0032",
  },
  PnLPercentage: {
    left: 27,
    top: 236,
    font: "bold 66px Space Grotesk",
    color: "#FFffFF",
    value: "+65%",
  },
  refQR: {
    left: 115,
    top: 582,
    size: "60px", // Size for image (QR code)
    border: "2px solid #0000FF", // Optional border for QR
    isImage: true, // Image flag
    radius: "5px",
  },
  refNo: {
    left: 500,
    top: 167,
    font: "600 13px Manrope",
    color: "#FFFFFF",
    value: "56K @0.0032",
  },
  username: {
    left: 480,
    top: 289,
    font: "18px Manrope",
    color: "#FFFFFF",
    value: "@DOVEYYLT",
  },
  userImage: {
    left: 487,
    top: 289,
    size: "35px", // Size for the image (user profile)
    border: "1px solid #FFFFFF", // Optional border for user image
    isImage: true, // Image flag
  },
};

export const ASSETS = {
  //logoS
  TON_LOGO: path.resolve(__dirname, "./ton-logo.png"),
  //bg
  NOTTYBG: path.resolve(__dirname, "./NottyBG.png"),
  NOTTYBGLOSS: path.resolve(__dirname, "./NottyPnLossBG.png"),
  NOTTYBGPROFIT: path.resolve(__dirname, "./NottyProfitnLBG.png"),
  NOTTYBGPROFIT2:path.resolve(__dirname,"./NottyPnLBG3.png"),
  //fonts,
  PLAYFAIR_DISPLAY_BOLD: path.resolve(
    __dirname,
    "./fonts/PlayfairDisplay-Bold.ttf"
  ),
  ROBOTO_LIGHT: path.resolve(__dirname, "./fonts/Roboto-Light.ttf"),
  MONTSERRAT_MEDIUM: path.resolve(__dirname, "./fonts/Montserrat-Medium.ttf"),
  SPACE_GROTESK: path.resolve(__dirname, "./fonts/SpaceGrotesk-Medium.ttf"),
  MANROPE_EXTRA_LIGHT: path.resolve(
    __dirname,
    "./fonts/Manrope-ExtraLight.ttf"
  ),
  MANROPE_LIGHT: path.resolve(__dirname, "./fonts/Manrope-Light.ttf"),
  MANROPE_REGULAR: path.resolve(__dirname, "./fonts/Manrope-Regular.ttf"),
  MANROPE_MEDIUM: path.resolve(__dirname, "./fonts/Manrope-Medium.ttf"),
  MANROPE_SEMI_BOLD: path.resolve(__dirname, "./fonts/Manrope-SemiBold.ttf"),
  MANROPE_BOLD: path.resolve(__dirname, "./fonts/Manrope-Bold.ttf"),
  MANROPE_EXTRA_BOLD: path.resolve(__dirname, "./fonts/Manrope-ExtraBold.ttf"),
};
