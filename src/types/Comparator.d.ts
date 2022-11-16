interface IComparator {
    not: {
        toBe: (arg: any) => void;
        toEqual: (arg: any) => void;
        toBeNull: () => void;
        toBeFalsy: () => void;
        toBeTruthy: () => void;
        toBeUndefined: () => void;
    }

    toBe: (arg: any) => void;
    toEqual: (arg: any) => void;
    toBeNull: () => void;
    toBeFalsy: () => void;
    toBeTruthy: () => void;
    toBeUndefined: () => void;
}