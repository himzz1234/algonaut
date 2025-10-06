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
  const blockWidth = isMobile ? 50 : config.BLOCK_WIDTH;
  const blockHeight = isMobile ? 50 : config.BLOCK_HEIGHT;
  const barWidth = isMobile ? 100 : config.BAR_WIDTH;
  const barHeight = isMobile ? 25 : config.BAR_HEIGHT;
  const spacing = blockWidth + config.GAP;
  const radius = isMobile ? 3 : config.RADIUS;

  const FONT_SIZE = {
    block: isMobile ? config.FONT_SIZE.block - 2 : config.FONT_SIZE.block,
    pointer: isMobile ? config.FONT_SIZE.pointer - 2 : config.FONT_SIZE.pointer,
    label: isMobile ? config.FONT_SIZE.label - 2 : config.FONT_SIZE.label,
  };

  return {
    blockWidth,
    blockHeight,
    barHeight,
    barWidth,
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
