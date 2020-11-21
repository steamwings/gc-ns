/**
 * Basic definition of a key-value style storage service
 */
export abstract class KeyValueStorage {
    public abstract hasKey(key: string): boolean;
    public abstract get<T>(key: string): T;
    public abstract set(key: string, value: any): void;
    public abstract remove(key: string): void;
    public abstract clearAll(): void;
}