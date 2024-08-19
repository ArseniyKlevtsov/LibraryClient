import { Injectable } from '@angular/core';
import { TokenResponse } from '../interfaces/auth/responses/token-response.interface';

@Injectable({
	providedIn: 'root'
})
export class TokenStorageService {

	private ACCESS_TOKEN_KEY = 'auth-token';
	private REFRESH_TOKEN_KEY = 'refresh-token';
	private ADMIN_STATUS_KEY = 'is-admin';
	constructor() { }

	public saveTokens(tokenResponse: TokenResponse): void {
		this.saveAccessToken(tokenResponse.accessToken);
		this.saveRefreshToken(tokenResponse.refreshToken);
		this.saveAdminStatus(tokenResponse.hasAdminRole);
	}

	public saveAccessToken(accessToken: string): void {
		window.localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
	}

	public saveRefreshToken(refreshToken: string): void {
		window.localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
	}

	public saveAdminStatus(isAdmin: boolean): void {
		window.localStorage.setItem(this.ADMIN_STATUS_KEY, '' + isAdmin);
	}

	public getTokens(): TokenResponse | null {
		return { accessToken: this.getAccessToken(), refreshToken: this.getRefreshToken(), hasAdminRole: this.getAdminStatus()  }
	}

	public getAccessToken(): string | null {
		return window.localStorage.getItem(this.ACCESS_TOKEN_KEY);
	}

	public getRefreshToken(): string | null {
		return window.localStorage.getItem(this.REFRESH_TOKEN_KEY);
	}

	public getAdminStatus(): boolean {
		const isAdminString = window.localStorage.getItem(this.ADMIN_STATUS_KEY);
		return isAdminString === 'true'; 
	}
	public signOut(): void {
		window.localStorage.clear();
	}
}
