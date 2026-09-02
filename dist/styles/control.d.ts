export type ControlSize = 'default' | 'sm' | 'md' | 'lg';
export type ControlWidth = 'default' | 'auto' | 'sm' | 'md' | 'lg' | 'full';
export declare const controlSizeStyles: {
    readonly default: {
        readonly padding: "md";
    };
    readonly sm: {
        readonly fontSize: "sm";
        readonly padding: "sm";
        readonly minHeight: "sz_200";
    };
    readonly md: {
        readonly fontSize: "md";
        readonly padding: "md";
        readonly minHeight: "sz_250";
    };
    readonly lg: {
        readonly fontSize: "lg";
        readonly padding: "lg";
        readonly minHeight: "sz_300";
    };
};
export declare const controlWidthTokens: {
    readonly default: "auto";
    readonly auto: "auto";
    readonly sm: "sz_800";
    readonly md: "sz_1200";
    readonly lg: "sz_1600";
};
