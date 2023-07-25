import {resolve} from "path"
const resolverPath = resolve('IMG')
import { transport } from "../../shared/index.js"
import mailTicketTemplate from "../../presentation/templates/mailTicketTemplate.js"
import mailPasswordTemplate from "../../presentation/templates/mailPasswordTemplate.js"

class EmailManager{
    async emailTicket(ticketString, userEmail){
        const mailContent= mailTicketTemplate(ticketString)
        const mail= {
            from : "lourdesmiazzo@gmail.com",
            to: userEmail,
            subject: "Ticket de compra",
            html: mailContent,
            attachments: [{
                filename: 'iconoLourdes.png',
                path: resolverPath + "/iconoLourdes.png",
                cid: '1'
            }]        
        }
        await transport.sendMail(mail)
    }
    async emailPassword(tokenPassword, email){
        const mailContent= mailPasswordTemplate(tokenPassword, email)
        const mail= {
            from : "lourdesmiazzo@gmail.com",
            to: email,
            subject: "Cambio de contraseña",
            html: mailContent,
            attachments: [{
                filename: 'iconoLourdes.png',
                path: resolverPath + "/iconoLourdes.png",
                cid: '1'
            }] 
        }
        await transport.sendMail(mail)
    }
}

export default EmailManager