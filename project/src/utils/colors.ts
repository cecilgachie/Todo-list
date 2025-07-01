import tinycolor from 'tinycolor2';

export function generateColorPalette(baseColor: string): string[] {
  const base = tinycolor(baseColor);
  
  return [
    base.toString(),
    base.complement().toString(),
    base.triad()[1].toString(),
    base.triad()[2].toString(),
    base.analogous()[1].toString(),
    base.analogous()[4].toString(),
  ];
}

export function getContrastColor(color: string): string {
  const c = tinycolor(color);
  return c.isLight() ? '#000000' : '#FFFFFF';
}

export function adjustBrightness(color: string, amount: number): string {
  const c = tinycolor(color);
  return amount > 0 ? c.lighten(amount).toString() : c.darken(Math.abs(amount)).toString();
}

export function isValidColor(color: string): boolean {
  return tinycolor(color).isValid();
}

export function colorToHex(color: string): string {
  return tinycolor(color).toHexString();
}

export function colorToRgb(color: string): { r: number; g: number; b: number } {
  const rgb = tinycolor(color).toRgb();
  return { r: rgb.r, g: rgb.g, b: rgb.b };
}

export function harmonizeColors(baseColor: string, type: 'analogous' | 'triadic' | 'complementary' | 'monochromatic'): string[] {
  const base = tinycolor(baseColor);
  
  switch (type) {
    case 'analogous':
      return base.analogous(5).map(c => c.toString());
    case 'triadic':
      return base.triad().map(c => c.toString());
    case 'complementary':
      return [base.toString(), base.complement().toString()];
    case 'monochromatic':
      return base.monochromatic(5).map(c => c.toString());
    default:
      return [baseColor];
  }
}