export interface IStorageService{
    hasKey(key:string):boolean;
    get<T>(key:string): T;
    set(key:string,val):void;
    remove(key:string);
    clear();
}