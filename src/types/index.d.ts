export {};

declare global {
    interface Window {
        test: (name: string, cb: () => void) => void;
        expect: any;
        group: (name: string, cb: () => void) => void;
        StateManager: any;
    }
}



type Callback = () => void;