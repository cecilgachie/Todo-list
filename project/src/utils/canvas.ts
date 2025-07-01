import { DesignElement } from '../types';

export function snapToGrid(value: number, gridSize: number = 10): number {
  return Math.round(value / gridSize) * gridSize;
}

export function getElementBounds(element: DesignElement) {
  return {
    left: element.position.x,
    top: element.position.y,
    right: element.position.x + element.size.width,
    bottom: element.position.y + element.size.height,
  };
}

export function isPointInElement(point: { x: number; y: number }, element: DesignElement): boolean {
  const bounds = getElementBounds(element);
  return (
    point.x >= bounds.left &&
    point.x <= bounds.right &&
    point.y >= bounds.top &&
    point.y <= bounds.bottom
  );
}

export function getElementsInSelection(
  selectionStart: { x: number; y: number },
  selectionEnd: { x: number; y: number },
  elements: DesignElement[]
): DesignElement[] {
  const selectionBounds = {
    left: Math.min(selectionStart.x, selectionEnd.x),
    top: Math.min(selectionStart.y, selectionEnd.y),
    right: Math.max(selectionStart.x, selectionEnd.x),
    bottom: Math.max(selectionStart.y, selectionEnd.y),
  };

  return elements.filter(element => {
    const elementBounds = getElementBounds(element);
    return (
      elementBounds.left >= selectionBounds.left &&
      elementBounds.right <= selectionBounds.right &&
      elementBounds.top >= selectionBounds.top &&
      elementBounds.bottom <= selectionBounds.bottom
    );
  });
}

export function calculateCanvasSize(elements: DesignElement[]): { width: number; height: number } {
  if (elements.length === 0) {
    return { width: 800, height: 600 };
  }

  let maxX = 0;
  let maxY = 0;

  elements.forEach(element => {
    const bounds = getElementBounds(element);
    maxX = Math.max(maxX, bounds.right);
    maxY = Math.max(maxY, bounds.bottom);
  });

  return {
    width: Math.max(800, maxX + 50),
    height: Math.max(600, maxY + 50),
  };
}

export function exportCanvasAsImage(canvas: HTMLCanvasElement, format: 'png' | 'jpg' = 'png', quality: number = 0.9): string {
  return canvas.toDataURL(`image/${format}`, quality);
}

export function downloadCanvasAsImage(canvas: HTMLCanvasElement, filename: string, format: 'png' | 'jpg' = 'png'): void {
  const dataURL = exportCanvasAsImage(canvas, format);
  const link = document.createElement('a');
  link.download = `${filename}.${format}`;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}