export interface ColorOption {
    id: number;
    name: string;
    variable: string;
    hex: string;
}

export interface Cell {
    targetColorId: number;
    currentColorId: number | null;
}