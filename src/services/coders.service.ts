import { ICoder } from "@/models/coders/coder.model";
import { HttpClient } from "@/utils/client-http"

export class CoderService { // el servicio debe utilizar el client http

    private httpCliente: HttpClient;

    constructor() {
            this.httpCliente = new HttpClient(); //ijección de dependencias, el constructor le da valor al atributo que tenemos dentro de la clase
        }
    
        async findAll(){
            try {
                const coders = this.httpCliente.get<ICoder[]>("coders")
                return coders;
            } catch (error) {
                console.error("Error al buscar coders", error);
                throw error;
                
            }
        }

        async destroy(id:string) {
            try {
                const coders = this.httpCliente.delete<ICoder[]>(`coders/${id}`)
                return coders;
            } catch (error) {
                console.error("Error al buscar coders", error);
                throw error;
                
            }
        }
        async create(coder: ICoder) {
            try {
                const newCoder = this.httpCliente.post<string, ICoder>(`coders`, coder)
                return newCoder;
            } catch (error) {
                console.error("Error al buscar coders", error);
                throw error;
                
            }
        }

        async update(id: string, coder: ICoder) {
            try {
                const updateCoder = this.httpCliente.put<string, ICoder>(`coders/${id}`,coder)
                return updateCoder;
            } catch (error) {
                console.error("Error al buscar coders", error);
                throw error;
                
            }
        }

    }
