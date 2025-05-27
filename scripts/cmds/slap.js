const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "slap",
    aliases: [],
    version: "1.0",
    author: "Saim",
    countDown: 3,
    role: 0,
    shortDescription: {
      en: "Custom slap with GIF"
    },
    longDescription: {
      en: "Slap someone using a custom line and random slap GIF"
    },
    category: "Fun",
    guide: {
      en: "{pn} @mention"
    }
  },

  onStart: async function ({ message, event }) {
    const mentionIDs = Object.keys(event.mentions);
    if (mentionIDs.length === 0) {
      return message.reply("❌ Please mention someone to slap!");
    }

    const targetID = mentionIDs[0];
    const targetName = event.mentions[targetID];
    const tagText = `@${targetName}`;

    const customText = `😡 Ar kono somoy Sadiyar dike takabi 😡\nEkhon to shudu 1 ta slap dici — pore tore direct mere felbo MC 🤬🤬`;

    // Multiple slap GIF URLs
    const gifURLs = [
      "https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif",
      "https://media.giphy.com/media/Zau0yrl17uzdK/giphy.gif",
      "https://media.giphy.com/media/RXGNsyRb1hDJm/giphy.gif",
      "https://media.giphy.com/media/3XlEk2RxPS1m8/giphy.gif"
    ];

    // Randomly select a GIF URL from the array
    const randomGifURL = gifURLs[Math.floor(Math.random() * gifURLs.length)];

    try {
      const res = await axios.get(randomGifURL, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(res.data, 'binary');
      const fileName = path.join(__dirname, 'slap2.gif');
      fs.writeFileSync(fileName, buffer);

      message.reply({
        body: customText,
        attachment: fs.createReadStream(fileName),
        mentions: [{ id: targetID, tag: tagText }]
      }, () => {
        fs.unlinkSync(fileName);
      });

    } catch (err) {
      message.reply("❌ Slap GIF load korte problem hoise. Try again pore.");
    }
  }
};
