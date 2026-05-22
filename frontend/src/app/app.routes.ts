import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { TareasListado } from './proyectos/tareas/listado/tareas-listado';
import { ProyectosListado } from './proyectos/listado/proyectos-listado';
import { ClientesListado } from './proyectos/clientes/listado/clientes-listado';

export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        path: 'proyectos/:id/tareas',
        component: TareasListado
    },
    {
        path: 'proyectos',
        component: ProyectosListado
    },
    {
        path: 'clientes',
        component: ClientesListado
    },
    {
        // Si no coincide ninguna ruta, redirigiar a 'login'.
        path: "**",
        redirectTo: "login"
    }
];