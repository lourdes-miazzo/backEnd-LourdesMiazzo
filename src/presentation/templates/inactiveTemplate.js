const inactiveTemplate = (email, id) =>
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
                                        <h2>Tu cuenta de id: ${id} que corresponde al mail: ${email} ha sido eliminada por inactividad</h2>
                                        <img src="cid:1" style="height:200px; width:200 px"/>
                                    </div>
                                </pre>
                            </body>
                        </html>`;

    return mailTemplate;
};

export default inactiveTemplate;
