const productDeletedTemplate = (productString) =>
{
const mailTemplate =  `<html>
                            <head>
                                <style>
                                    pre {
                                    padding: 5px;
                                    color: rgb(195, 195,195)
                                    font-family 'Roboto', sans-serif;
                                    background-image: url('');
                                    }
                                </style>
                            </head>
                            <body>
                                <pre>
                                    <div>
                                        <h1>Producto eliminado</h1>
                                        <h2>Titulo: ${productString}</h2>
                                        <img src="cid:1" style="height:200px; width:200 px"/>
                                    </div>
                                </pre>
                            </body>
                        </html>`;

    return mailTemplate;
};

export default productDeletedTemplate;
