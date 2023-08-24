const mailTicketTemplate = (ticketString) =>
{
const mailTemplate =  `<html>
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
                                        <h1>Ticket de compra</h1>
                                        <h2>${ticketString}</h2>
                                        <h3>Gracias por tu compra!<h3>
                                        <img src="cid:1" style="height:200px; width:200 px"/>
                                    </div>
                                </pre>
                            </body>
                        </html>`;

    return mailTemplate;
};

export default mailTicketTemplate;
