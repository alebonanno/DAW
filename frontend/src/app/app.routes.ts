import { Routes } from '@angular/router';
import { Login } from './auth/login/login';

export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        // Si no coincide ninguna ruta, redirigiar a 'login'.
        path: "**",
        redirectTo: "login"
    }
];