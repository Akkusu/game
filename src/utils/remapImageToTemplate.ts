export interface ColorMap {
    id: number;
    hex: string;
}

export async function imageToTemplate(
    src: string,
    size: number,
    palette: ColorMap[]
): Promise<number[]> {
    const img = new Image();
    img.src = src;
    await img.decode();

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, size, size);

    const { data } = ctx.getImageData(0, 0, size, size);

    const hexToRgb = (hex: string) => {
        const n = parseInt(hex.replace('#', ''), 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };

    const colors = palette.map(p => ({
        id: p.id,
        rgb: hexToRgb(p.hex) as [number, number, number],
    }));

    if (colors.length === 0) return [];

    const dist = (a: [number, number, number], b: [number, number, number]) =>
        Math.sqrt(
            (a[0] - b[0]) ** 2 +
            (a[1] - b[1]) ** 2 +
            (a[2] - b[2]) ** 2
        );

    const template: number[] = [];

    for (let i = 0; i < data.length; i += 4) {
        const pixel: [number, number, number] = [
            data[i] ?? 0,
            data[i + 1] ?? 0,
            data[i + 2] ?? 0,
        ];

        let closest = colors[0]!;
        let min = Infinity;

        for (const c of colors) {
            const d = dist(pixel, c.rgb);
            if (d < min) {
                min = d;
                closest = c;
            }
        }

        template.push(closest.id);
    }

    return template;
}