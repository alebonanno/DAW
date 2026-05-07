import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { AuthStore } from "./auth-store";


// nterceptor funcional de autenticación.
// Se ejecuta en cada petición HTTP y agrega un token JWT,
// en el header 'Authorization' si el usuario está autenticado.
export function authInterceptor(
  // param req => Petición HTTP original.
 // param next => Siguiente handler en la cadena de interceptores.
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

  // Obtiene el token desde el AuthStore.
  // inject() permite usar dependencias sin constructor.
  const authToken = inject(AuthStore).obtenerToken();

  //  Si no hay token, la petición sigue normal sin modificar.
  if (!authToken) {
    return next(req);
  }

  // Si hay token, se clona la request y se agrega el header Authorization.
  // Se usa Bearer Token (estándar JWT).
  const reqWithToken = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  });

  // Se envía la request modificada al siguiente handler.
  return next(reqWithToken);
}