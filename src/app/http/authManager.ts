class AuthManager {
  private refreshPromise: Promise<string> | null = null;

  async refreshAccessToken(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performRefresh();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<string> {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await fetch('/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Refresh token expired');
    }

    const data = await response.json();

    localStorage.setItem('auth_token', data.accessToken);

    if (data.refreshToken) {
      localStorage.setItem('refresh_token', data.refreshToken);
    }

    return data.accessToken;
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');

    window.location.href = '/login';
  }
}

export const authManager = new AuthManager();
