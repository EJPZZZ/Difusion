const { Configuration, OpenAIApi } = require("openai");

const chat = async (prompt, text) => {
  try {
    // Configuración de OpenAI
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Depuración: Verificar que la API Key se está cargando correctamente
    console.log("Configuración de OpenAI:", configuration);

    const openai = new OpenAIApi(configuration);

    // Llamada a la API de OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: text },
      ],
    });

    return completion.data.choices[0].message.content;
  } catch (err) {
    console.error("Error al conectar con OpenAI:", err);
    return "ERROR";
  }
};

module.exports = chat;
