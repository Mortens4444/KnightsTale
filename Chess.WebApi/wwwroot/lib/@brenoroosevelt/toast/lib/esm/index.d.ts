declare const _default: {
    types: {
        default: import("./toast").ToastOptions;
        getType(name: string): import("./toast").ToastOptions;
        setType(name: string, type: Partial<import("./toast").ToastOptions>): void;
    };
    create: (message: string | null | undefined, options?: Partial<import("./toast").ToastOptions>) => Promise<{
        text: string;
        value: any;
        color?: string | undefined;
        bgColor?: string | undefined;
    }>;
    info: (message: string | null | undefined, options?: Partial<import("./toast").ToastOptions>) => Promise<{
        text: string;
        value: any;
        color?: string | undefined;
        bgColor?: string | undefined;
    }>;
    warning: (message: string | null | undefined, options?: Partial<import("./toast").ToastOptions>) => Promise<{
        text: string;
        value: any;
        color?: string | undefined;
        bgColor?: string | undefined;
    }>;
    success: (message: string | null | undefined, options?: Partial<import("./toast").ToastOptions>) => Promise<{
        text: string;
        value: any;
        color?: string | undefined;
        bgColor?: string | undefined;
    }>;
    error: (message: string | null | undefined, options?: Partial<import("./toast").ToastOptions>) => Promise<{
        text: string;
        value: any;
        color?: string | undefined;
        bgColor?: string | undefined;
    }>;
    system: (message: string | null | undefined, options?: Partial<import("./toast").ToastOptions>) => Promise<{
        text: string;
        value: any;
        color?: string | undefined;
        bgColor?: string | undefined;
    }>;
};
export default _default;
