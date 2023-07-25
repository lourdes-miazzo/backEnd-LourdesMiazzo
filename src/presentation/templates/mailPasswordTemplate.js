import dotenv from "dotenv"
dotenv.config()

const mailPasswordTemplate = (tokenPassword, email)=>{
    const mail = `<html>
                        <head>
                            <style>
                                pre {
                                padding: 5px;
                                color: rgb(195, 195,195)
                                font-family 'Roboto', sans-serif;
                                }
                            </style>
                        </head>
                        <body>
                            <pre>
                                <div>
                                    <h1>Ingresa a este link para cambiar tu contraseña</h1>
                                    <a><h3> http://localhost:${process.env.NODE_PORT}/api/sessions/newPassword/${tokenPassword}/${email} </h3></a>
                                    <img src="cid:1" style="height:200px; width:200 px"/>
                                </div>
                            </pre>
                        </body>
                </html>`
    return mail
} 
export default mailPasswordTemplate

