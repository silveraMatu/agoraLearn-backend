import { application } from "express";

export const generateQuestion = async (req, res) => {
    try {

        const { consulta, modelo, signal, stream } = req.body

        console.log(consulta, modelo);

        (async () => {
            const peticion = await fetch(`http://localhost:11434/api/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: `gemma3`,
                    prompt: `${consulta}`,
                })
            })

            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.setHeader("Transfer-Encoding", "chunked");

            const reader = peticion.body.getReader();
            let decoder = new TextDecoder();
            let chunk = await reader.read();

            let accumulatedJSON = "";

            while (!chunk.done) {
                const texto = decoder.decode(chunk.value, { stream: true });
                accumulatedJSON += texto;

                let startIndex = 0;
                while (startIndex < accumulatedJSON.length) {
                    const startBracketIndex = accumulatedJSON.indexOf("{", startIndex);
                    if (startBracketIndex === -1) break;

                    const endBracketIndex = accumulatedJSON.indexOf("}", startBracketIndex);
                    if (endBracketIndex === -1) break;

                    const jsonString = accumulatedJSON.slice(startBracketIndex, endBracketIndex + 1);

                    try {
                        const responseObject = JSON.parse(jsonString);
                        const responseValue = responseObject.response;
                        res.write(responseValue); // 👉 ya streaméas directo
                    } catch (error) {
                        console.log(error);
                    }

                    startIndex = endBracketIndex + 1;
                }

                accumulatedJSON = accumulatedJSON.slice(startIndex);
                chunk = await reader.read();
            }

            res.end();

        })()
  } catch (error) {
    console.log(error);
  }
};

export const getModels = async (req, res) => {
  try {
    const response = await fetch("http://localhost:11434/api/tags");

    const model = await response.json();

    console.log(response);

    return res.json({ models: model });
  } catch (error) {
    console.log(error);
  }
};