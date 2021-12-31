const apiaudio = require("apiaudio").default;
// const API_KEY = "ee28ea99e963404e86e324b36ae8faff";

exports.textToSpeech = async (text) => { 
    apiaudio.configure({ apiKey: process.env.API_KEY });
    try {
        const script = await apiaudio.Script.create({ scriptText: text });
        console.log(script);

        const speech = await apiaudio.Speech.create({ scriptId: script["scriptId"], voice: "Aria" });
        console.log(speech);

        const template = "parisianmorning";
        const mastering = await apiaudio.Mastering.create({ scriptId: script["scriptId"], soundTemplate: template });
        console.log("this is " + JSON.stringify(mastering));

        return mastering;

    } catch (err) {
        console.log(err.message);
    }
}