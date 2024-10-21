const defaultBaseUrl = "https://671638ef33bc2bfe40bcf686.mockapi.io/api/v1";

export class HttpClient { // es una clase, tiene metodos y atributos
    private baseUrl: string; // base del backend (reactividad)

    constructor(baseUrl?: string) { //no es obligatoria 
        this.baseUrl = baseUrl || defaultBaseUrl;
    }

    async get<T>(url: string): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "GET",
            cache: "no-store"
        })
        return await this.handleResponse(response);

    }

    async post<T, R>(url: string, body: R): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(body)
        })
        return this.handleResponse(response);
    }

    async put<T, R>(url: string, body: R): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify(body)
        })
        return this.handleResponse(response);
    }

    async delete<T>(url: string): Promise<T> {
        const headers = await this.getHeader();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers: headers,
            method: "DELETE"
        })
        return this.handleResponse(response);
    }

    private async getHeader() {
        return {
            "Content-Type": "application/json",
        }
    }

    private async handleResponse(response: Response) {
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "error")
        }
        return await response.json();
    }
}