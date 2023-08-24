import AppExpress from '../application/AppExpress.js';

class AppFactory
{
    static create(payload)
    {
        const appType = payload ? payload : 'AppExpress';
        // 'Map' es una estructura de datos que permite almacenar pares clave-valor, podría ser
        // reemplazado por json pero es menos performante
        const apps = new Map();
        // se utiliza el método set() para agregar un par clave-valor al objeto Map
        apps.set('AppExpress', AppExpress);
        // se utiliza el método get() para recuperar el valor asociado a una clave
        const app = apps.get(appType);
        return new app();
    }
}

export default AppFactory;
