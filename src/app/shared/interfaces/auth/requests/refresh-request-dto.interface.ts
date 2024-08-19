export interface RefreshRequestDto {
    expiredAccessToken?: string;
    refreshToken?: string;
}