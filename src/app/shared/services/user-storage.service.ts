
import { Injectable } from '@angular/core';
import { KeyValueStorage } from './key-value-storage';
import { UserFull, UserDetail, UserProfile } from '../models/user/user.model';

const USER_TOKEN_KEY = 'token';
const USER_PROFILE_KEY = 'user-profile';
const USER_DETAIL_KEY = 'user-detail';

/**
 * Platform-independent storage service
 */
@Injectable()
export class UserStorageService {

    constructor(private storage: KeyValueStorage) {}

    public getUserDetail(): UserDetail { 
        return this.storage.get<UserDetail>(USER_DETAIL_KEY);
    }

    public getUserToken(): string {
        return this.storage.get<string>(USER_TOKEN_KEY);
    }

    public getUserProfile(): UserProfile {
        return this.storage.get<UserProfile>(USER_PROFILE_KEY);
    }

    /**
     * Save (overwrite) user details.
     * @param user 
     */
    public setUserDetail(user: UserDetail) {
        this.storage.set(USER_DETAIL_KEY, user);
    }

    /**
     * Save (overwrite) the user profile.
     * @param profile 
     */
    public setUserProfile(profile: UserProfile) {
        this.storage.set(USER_PROFILE_KEY, profile);
    }

    /**
     * Save (overwrite) the authentication token.
     * @param token 
     */
    public setUserToken(token: string) {
        this.storage.set(USER_TOKEN_KEY, token);
    }

    /**
     * Clear all user data.
     */
    public clearUser() {
        this.storage.remove('user');
        this.storage.remove(USER_TOKEN_KEY);
        this.storage.remove(USER_DETAIL_KEY);
        this.storage.remove(USER_PROFILE_KEY);
    }
} 