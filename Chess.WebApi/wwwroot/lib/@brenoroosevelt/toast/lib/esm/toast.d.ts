declare type ToastOptions = {
    type: string;
    title?: string;
    position: 'top' | 'bottom';
    align: 'start' | 'center' | 'end';
    bgColor: string;
    color: string;
    duration: number;
    closeBtn: boolean;
    zIndex: number;
    dismissible: boolean;
    shadow: boolean;
    animateIn: number;
    animateOut: number;
    append: boolean;
    maxWidth: number;
    actions: ToastAction[];
};
declare type ToastAction = {
    text: string;
    value: any;
    color?: string;
    bgColor?: string;
};
declare const ToastTypes: {
    default: ToastOptions;
    getType(name: string): ToastOptions;
    setType(name: string, type: Partial<ToastOptions>): void;
};
declare const create: (message: string | undefined | null, options?: Partial<ToastOptions>) => Promise<ToastAction>;
declare const info: (message: string | undefined | null, options?: Partial<ToastOptions>) => Promise<ToastAction>;
declare const warning: (message: string | undefined | null, options?: Partial<ToastOptions>) => Promise<ToastAction>;
declare const error: (message: string | undefined | null, options?: Partial<ToastOptions>) => Promise<ToastAction>;
declare const success: (message: string | undefined | null, options?: Partial<ToastOptions>) => Promise<ToastAction>;
declare const system: (message: string | undefined | null, options?: Partial<ToastOptions>) => Promise<ToastAction>;
export { ToastOptions, ToastTypes, create, info, warning, error, success, system };
