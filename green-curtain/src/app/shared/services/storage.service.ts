import { Injectable } from '@angular/core';

/**
 * Generic storage service
 */
@Injectable()
export abstract class StorageService {
    abstract hasKey(key:string):boolean;
    abstract get<T>(key:string): T;
    abstract set(key:string,val):void;
    abstract remove(key:string);
    abstract clear();
}