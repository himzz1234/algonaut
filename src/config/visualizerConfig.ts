export type VisualizerConfig = {
  GAP: number;
  BLOCK_WIDTH: number;
  BLOCK_HEIGHT: number;
  BAR_HEIGHT: number;
  BAR_WIDTH: number;
  RADIUS: number;
  FONT_SIZE: {
    block: number;
    pointer: number;
    label: number;
  };
};

export const BASE_CONFIG: VisualizerConfig = {
  GAP: 5,
  BLOCK_WIDTH: 65,
  BLOCK_HEIGHT: 65,
  BAR_HEIGHT: 50,
  BAR_WIDTH: 150,
  RADIUS: 6,
  FONT_SIZE: {
    block: 16,
    pointer: 14,
    label: 14,
  },
};

export const GRID_CONFIG = {
  GAP: 5,
  CELL_SIZE: 50,
  RADIUS: 4,
  FONT_SIZE: {
    cell: 16,
  },
};

export function getBlockDimensions(
  isMobile: boolean,
  config: VisualizerConfig = BASE_CONFIG
) {
  const scale = isMobile ? 0.8 : 1;

  const blockWidth = config.BLOCK_WIDTH * scale;
  const blockHeight = config.BLOCK_HEIGHT * scale;
  const barWidth = config.BAR_WIDTH * scale;
  const barHeight = config.BAR_HEIGHT * scale;
  const spacing = blockWidth + config.GAP;
  const radius = config.RADIUS * (isMobile ? 0.6 : 1);

  const FONT_SIZE = {
    block: config.FONT_SIZE.block * (isMobile ? 0.9 : 1),
    pointer: config.FONT_SIZE.pointer * (isMobile ? 0.9 : 1),
    label: config.FONT_SIZE.label * (isMobile ? 0.9 : 1),
  };

  return {
    blockWidth,
    blockHeight,
    barWidth,
    barHeight,
    spacing,
    radius,
    FONT_SIZE,
  };
}

export function getGridDimensions(isMobile: boolean, config = GRID_CONFIG) {
  const cellSize = isMobile ? 30 : config.CELL_SIZE;
  const spacing = cellSize + config.GAP;
  const radius = isMobile ? 2 : config.RADIUS;

  const FONT_SIZE = {
    cell: isMobile ? config.FONT_SIZE.cell - 4 : config.FONT_SIZE.cell,
  };

  return { cellSize, spacing, radius, FONT_SIZE };
}
