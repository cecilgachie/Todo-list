const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private baseUrl = BASE_URL;

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = localStorage.getItem('authToken');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  // Templates endpoints
  async getTemplates() {
    return this.request('/templates');
  }

  async getTemplate(id: string) {
    return this.request(`/templates/${id}`);
  }

  // Designs endpoints
  async getDesigns() {
    return this.request('/designs');
  }

  async getDesign(id: string) {
    return this.request(`/designs/${id}`);
  }

  async saveDesign(design: any) {
    return this.request('/designs', {
      method: 'POST',
      body: JSON.stringify(design),
    });
  }

  async updateDesign(id: string, design: any) {
    return this.request(`/designs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(design),
    });
  }

  async deleteDesign(id: string) {
    return this.request(`/designs/${id}`, {
      method: 'DELETE',
    });
  }

  // AI endpoints
  async generateText(prompt: string, businessType: string, tone: string) {
    return this.request('/ai/generate-text', {
      method: 'POST',
      body: JSON.stringify({ prompt, businessType, tone }),
    });
  }

  async generateColorPalette(prompt: string) {
    return this.request('/ai/generate-colors', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  }

  async generateDesignSuggestions(prompt: string, category: string) {
    return this.request('/ai/generate-design', {
      method: 'POST',
      body: JSON.stringify({ prompt, category }),
    });
  }

  // Export endpoints
  async exportDesign(designId: string, format: 'png' | 'jpg' | 'pdf') {
    return this.request(`/export/${designId}`, {
      method: 'POST',
      body: JSON.stringify({ format }),
    });
  }

  // M-Pesa payment endpoints
  async initiateMpesaPayment(amount: number, phoneNumber: string) {
    return this.request('/payments/mpesa/initiate', {
      method: 'POST',
      body: JSON.stringify({ amount, phoneNumber }),
    });
  }

  async checkPaymentStatus(transactionId: string) {
    return this.request(`/payments/status/${transactionId}`);
  }

  // Subscription endpoints
  async getSubscription() {
    return this.request('/subscription');
  }

  async upgradeSubscription(plan: string) {
    return this.request('/subscription/upgrade', {
      method: 'POST',
      body: JSON.stringify({ plan }),
    });
  }
}

export const apiService = new ApiService();