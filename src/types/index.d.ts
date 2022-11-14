export {};

declare global {
    interface Window {
        test: (name: string, cb: () => void) => void;
        expect: any;
        group: any;
        StateManager: any;
    }
}
