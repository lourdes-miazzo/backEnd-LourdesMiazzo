import AppExpress from "../application/appExpress.js"

class AppFactory{
    static create(appType = 'AppExpress'){
        //'Map' es una estructura de datos que permite almacenar pares clave-valor, podría ser 
        //reemplazado por json pero es menos performante
        const apps = new Map()
        apps.set('AppExpress', AppExpress)
        const app = apps.get(appType)
        return new app()
    }
}

export default AppFactory