import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ListClienteDTO } from "./list-cliente-dto";
import { EstadosClientesEnum } from "../estados-clientes-enum";

@Injectable({
    providedIn: 'root'
})
export class ClientesListadoApiClient {

    private readonly httpClient = inject(HttpClient);

    buscarClientes(estado?: 
        EstadosClientesEnum,
        desde?: string,
        hasta?: string
    ): Observable<ListClienteDTO[]> {

        let path: string = '/api/v1/clientes';
        const params: string[] = [];

        if (estado) {
            path += "?estado=" + estado;
        }
        // Extra4.
        if (desde) {
            path += (path.includes('?') ? '&' : '?') + `desde=${desde}`;
        }
        if (hasta) {
            path += (path.includes('?') ? '&' : '?') + `hasta=${hasta}`;
        }

        if (params.length > 0) {
            path += '?' + params.join('&');
        }

        return this.httpClient.get<ListClienteDTO[]>(path);
    }

    // Extra2
    getEstadisticas() {
        return this.httpClient.get<any>('/api/v1/clientes/stats');
    }
}