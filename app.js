const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const { delay } = require('@whiskeysockets/baileys');

// Función para determinar si es de día o de tarde
function getSaludo() {
    const horaActual = new Date().getHours();
    if (horaActual >= 6 && horaActual < 12) {
        return 'Buenos días';
    } else if (horaActual >= 12 && horaActual < 18) {
        return 'Buenas tardes';
    } else {
        return 'Buenas noches';
    }
}

// Flujos para cada carrera
const respuestasCarreras = {
    // Mensaje de informática
    '13': {
        mensaje: 'Para conocer más detalles acerca de la carrera de Ing. Informática te comparto la siguiente imagen 😎',
        media: 'https://i.ibb.co/BGxBRRw/info.jpg'
    },

    // Mensaje de agronomía
    '8': {
        mensaje: 'Para conocer más detalles acerca de la carrera de Ing. En Agronomía te comparto la siguiente imagen 😎',
        media: 'https://i.ibb.co/3prSNNM/Agro.jpg'
    },
    

    // Mensaje de industrial
    '12': {
        mensaje: 'Para conocer más detalles acerca de la carrera de Ing. Industrial te comparto la siguiente imagen 😎',
        media: 'https://i.ibb.co/CPdWcH0/Industrial.jpg'
    },

    // Mensaje de energías renovables
    '11': {
        mensaje: 'Para conocer más detalles acerca de la carrera de Ing. En Energías Renovables te comparto la siguiente imagen 😎',
        media: 'https://i.ibb.co/mSB6Ntk/Erenovables.jpg'
    },
    

    // Mensaje de bioquímica
    '9': {
        mensaje: 'Para conocer más detalles acerca de la carrera en Ing. Bioquímica te comparto la siguiente imagen 😎',
        media: 'https://i.ibb.co/ZXjN1b0/Bioq.jpg'
    },
   

    // Mensaje de electromecánica
    '10': {
        mensaje: 'Para conocer más detalles acerca de la carrera de Ing. Electromecánica te comparto la siguiente imagen 😎',
        media: 'https://i.ibb.co/GMp0WgY/Electro.jpg'
    },
    
    // Mensaje de administración
    '7': {
        mensaje: 'Para conocer más detalles acerca de la carrera de Ing. En Administración te comparto la siguiente imagen 😎',
        media: 'https://i.ibb.co/S0jRht0/Admin.jpg'
    },
    
};

// Flujo para preguntar sobre la carrera deseada
const flowInformacionCarreras = addKeyword('1')
    .addAnswer('Contamos con 7 carreras:\n*7- Administración* \n*8- Agronomía* \n*9- Bioquímica*\n*10- Electromecánica*\n*11- Energías renovables*\n*12- Industrial* \n*13- Informática* \n¿De qué carrera te gustaría información?', {
        delay: 3000 // Añadido retraso en la respuesta
    })
    .addAnswer('Por favor, escribe el *numero* de la carrera.', {
        capture: true,
        delay: 3000 // Añadido retraso en la respuesta
    }, async (ctx, { provider }) => {
        const respuesta = ctx.body.toLowerCase().trim();
        const respuestaCarrera = respuestasCarreras[respuesta];

        if (respuestaCarrera) {
            await provider.sendText(ctx.from + '@s.whatsapp.net', respuestaCarrera.mensaje);
            if (respuestaCarrera.media) {
                await provider.sendMedia(ctx.from + '@s.whatsapp.net', respuestaCarrera.media);
            }
        } else {
            await provider.sendText(ctx.from + '@s.whatsapp.net', 'Lo siento, no entendí tu respuesta. Por favor, elige una de las opciones proporcionadas.');
        }
    });

// Flujo para informacion de la institucion
const flowInstitucion = addKeyword('2')
    .addAnswer('INFORMACION DEL ITSS', {
        delay: 5000
    });

// Flujo de ubicación
const flowUbicacion = addKeyword('4')
    .addAnswer('https://maps.app.goo.gl/uz1Rfp3XVdDrJriB9 \n Nos encontramos ubicados en📍: \nCarret. Teapa-Tacotalpa Km 4.5 Ej. Fco Javier Mina 86801 Teapa, Tabasco, Mexico ', {
        delay: 5000,
        media: "https://i.ibb.co/7KJGhQJ/Captura-de-pantalla-2024-06-26-135915.png",
    });

// Flujo de inscripciones
const flowInscripciones = addKeyword('3')
    .addAnswer('Para conocer más información acerca del proceso de admisión te comparto la siguiente imagen☝🏻', {
        delay: 5000,
        media: "https://i.postimg.cc/Jh1BfzrY/408993623-862056865853751-2546998439695152438-n.jpg"
    });

const flowContacto = addKeyword('5')
    .addAnswer('📱 Para contactarnos puedes visitarnos en nuestras redes sociales como: \n*@TecNMRegionS*', {
        delay: 5000,
        media: "https://i.ibb.co/SJyvfr6/imagentec.jpg",
    });

// Flujo para informacion de la institucion
const flowAsesor = addKeyword('6')
    .addAnswer('Para tener una atención personalizada por llamada por favor comunicarse al: \n☎️ *932-324-0640 ext - 135*', {
        delay: 5000
    });

// Flujos adicionales
// Flujo de bienvenida
const flowBienvenida = addKeyword(['Hola', 'hola', 'buenos dias', 'Buenos dias', 'buenas tardes', 'Buenas tardes', 'buenas noches', 'Buenas noches'])
    .addAnswer(`${getSaludo()}. Hola, soy el chat-bot del ITSS 🤖 Bienvenid@ al menú principal. Por favor elige una opción:
    \n*1.* Información sobre nuestras ingenierías
    \n*2.* Información sobre nuestra institución
    \n*3.* Proceso de admisión
    \n*4.* Ubicación
    \n*5.* Contacto
    \n*6.* Hablar con un asesor
    \n*Escribe el número de la opción deseada.*`, {
        delay: 5000
    });

const flowAdios = addKeyword(['Adios', 'adios', 'adiós', 'Adiós', 'Ok', 'ok', 'Gracias', 'gracias'])
    .addAnswer('Hasta luego, que tengas un buen día. #TeamITSS 😎📚', {
        delay: 4000
    });

// Flujo de broma para groserías
const flowInsulto = addKeyword(['Pene', 'pene', 'picho', 'Picho'])
    .addAnswer('Comes 😋. Atte: #TeamITSS. JAJAJA', {
    });

const mainFlow = createFlow([
    flowInformacionCarreras,
    flowInstitucion,
    flowContacto,
    flowUbicacion,
    flowInscripciones,
    flowAsesor,
    flowAdios,
    flowInsulto,
    flowBienvenida
]);


// Función principal para inicializar el bot
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([
        flowInformacionCarreras,
        flowInstitucion,
        flowContacto,
        flowUbicacion,
        flowInscripciones,
        flowAsesor,
        flowAdios,
        flowInsulto,
        flowBienvenida
    ]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};


// Ejecutar la función principal
main();
