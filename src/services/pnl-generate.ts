import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
import { ASSETS } from '../assets/assets';

interface PnLData {
    pair: string;
    entry: string;
    exit: string;
    duration: string;
    refNo: string;
    username: string;
    percentChange: string;
  }

export const generatePnLImage = async (
    data:PnLData
  ): Promise<Buffer> => {
  
  // Load background image (choose appropriate height based on your requirements)
  const background = await loadImage(ASSETS.SPACE_GROTESK); 
  const width = 663;
  const height = 332;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');;

  registerFont(ASSETS.BACKGROUND, { family: 'Inter' });

  // Draw background
  ctx.drawImage(background, 0, 0);

  // Text styling configuration
  const config = {
    buy: { x: 40, y: 60, size: 32, color: '#FFFFFF' },
    pair: { x: 40, y: 110, size: 24, color: '#A0A0A0' },
    labels: { x: 40, yStart: 180, spacing: 80, size: 20, color: '#FFFFFF' },
    values: { x: 200, yStart: 180, spacing: 80, size: 20, color: '#FFFFFF' },
    percentage: { x: 580, y: 70, size: 36, positive: '#00FF00', negative: '#FF0000' },
    username: { x: 40, y: 620, size: 18, color: '#808080' },
    refNo: { x: 400, y: 620, size: 18, color: '#808080' }
  };

  // Draw BUY text
  ctx.font = `bold ${config.buy.size}px Arial`;
  ctx.fillStyle = config.buy.color;
  ctx.fillText('BUY', config.buy.x, config.buy.y);

  // Draw trading pair
  ctx.font = `${config.pair.size}px Arial`;
  ctx.fillStyle = config.pair.color;
  ctx.fillText(data.pair, config.pair.x, config.pair.y);

  // Draw entry/exit labels and values
  const labels = ['Entry', 'Exit', 'Duration'];
  const values = [data.entry, data.exit, data.duration];
  
  labels.forEach((label, index) => {
    ctx.font = `${config.labels.size}px Arial`;
    ctx.fillStyle = config.labels.color;
    ctx.fillText(
      label,
      config.labels.x,
      config.labels.yStart + (index * config.labels.spacing)
    );

    ctx.font = `bold ${config.values.size}px Arial`;
    ctx.fillStyle = config.values.color;
    ctx.fillText(
      values[index],
      config.values.x,
      config.values.yStart + (index * config.values.spacing)
    );
  });

  // Draw percentage change
  ctx.font = `bold ${config.percentage.size}px Arial`;
  ctx.fillStyle = data.percentChange.startsWith('+') 
    ? config.percentage.positive 
    : config.percentage.negative;
  ctx.fillText(data.percentChange, config.percentage.x, config.percentage.y);

  // Draw username and reference number 
  ctx.font = `${config.username.size}px Arial`;
  ctx.fillStyle = config.username.color;
  ctx.fillText(`@${data.username}`, config.username.x, config.username.y);

  ctx.font = `${config.refNo.size}px Arial`;
  ctx.fillStyle = config.refNo.color;
  ctx.fillText(`Ref: ${data.refNo}`, config.refNo.x, config.refNo.y);

  // Save output
  return canvas.toBuffer("image/png")
}

  