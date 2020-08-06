import { Injectable } from '@angular/core';
import { UserFull, UserDetail, UserProfile } from '../models/user/user.model';

const USER_TOKEN_KEY = 'token';
const USER_PROFILE_KEY = 'user-profile';
const USER_DETAIL_KEY = 'user-detail';

/**
 * Generic storage service
 */
@Injectable()
export abstract class StorageService {
    protected abstract hasKey(key: string): boolean;
    protected abstract get<T>(key: string): T;
    protected abstract set(key: string, value: any): void;
    protected abstract remove(key: string): void;
    public abstract clearAll(): void;

    public getUserDetail(): UserDetail { 
        return this.get<UserDetail>(USER_DETAIL_KEY);
    }

    public getUserToken(): string {
        return this.get<string>(USER_TOKEN_KEY);
    }

    public getUserProfile(): UserProfile {
        return this.get<UserProfile>(USER_PROFILE_KEY);
    }

    /**
     * Save (overwrite) user details.
     * @param user 
     */
    public setUserDetail(user: UserDetail) {
        this.set(USER_DETAIL_KEY, user);
    }

    /**
     * Save (overwrite) the user profile.
     * @param profile 
     */
    public setUserProfile(profile: UserProfile) {
        this.set(USER_PROFILE_KEY, profile);
    }

    /**
     * Save (overwrite) the authentication token.
     * @param token 
     */
    public setUserToken(token: string) {
        this.set(USER_TOKEN_KEY, token);
    }

    /**
     * Clear all user data.
     */
    public clearUser() {
        this.remove('user');
        this.remove(USER_TOKEN_KEY);
        this.remove(USER_DETAIL_KEY);
        this.remove(USER_PROFILE_KEY);
    }
}