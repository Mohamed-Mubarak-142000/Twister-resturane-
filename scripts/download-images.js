const fs = require("fs");
const path = require("path");
const https = require("https");

const menuItems = [
  { id: "pizza-margherita", keyword: "pizza,margherita" },
  { id: "pizza-khodrawat", keyword: "pizza,vegetables" },
  { id: "pizza-mix-cheese", keyword: "pizza,cheese" },
  { id: "pizza-sogo2", keyword: "pizza,sausage" },
  { id: "pizza-romi-peperoni", keyword: "pizza,pepperoni" },
  { id: "pizza-super-supreme", keyword: "pizza,supreme" },
  { id: "pizza-mixed-meats", keyword: "pizza,meat" },
  { id: "pizza-minced-meat", keyword: "pizza,minced" },
  { id: "pizza-crunchy", keyword: "pizza,chicken" },
  { id: "pizza-shawarma-chicken", keyword: "pizza,shawarma" },
  { id: "pizza-mix-chicken", keyword: "pizza,chicken" },
  { id: "pizza-chicken-ranch-bbq", keyword: "pizza,bbq" },
  { id: "pizza-custom", keyword: "pizza" },
  { id: "pizza-twister", keyword: "pizza,spicy" },
  { id: "pizza-sossis", keyword: "pizza,hotdog" },
  { id: "pizza-shrimp", keyword: "pizza,shrimp" },

  { id: "stromboli-crunchy", keyword: "stromboli,chicken" },
  { id: "stromboli-shawarma", keyword: "stromboli,shawarma" },
  { id: "stromboli-fahita", keyword: "stromboli,fajita" },
  { id: "stromboli-mixed-meats", keyword: "stromboli,meat" },
  { id: "stromboli-shrimp", keyword: "stromboli,shrimp" },

  { id: "burger-classic", keyword: "burger,classic" },
  { id: "burger-cheese", keyword: "cheeseburger" },
  { id: "burger-mushroom", keyword: "burger,mushroom" },
  { id: "burger-twister-double", keyword: "burger,double" },

  { id: "souri-plain", keyword: "fries" },
  { id: "souri-pane", keyword: "fries,chicken" },
  { id: "souri-strips", keyword: "fries,strips" },
  { id: "souri-kofta", keyword: "fries,kofta" },

  { id: "crepe-chicken-pane", keyword: "crepe,chicken" },
  { id: "crepe-chicken-zinger", keyword: "crepe,spicy" },
  { id: "crepe-chicken-super-crunchy", keyword: "crepe,crispy" },
  { id: "crepe-chicken-shawarma", keyword: "crepe,shawarma" },
  { id: "crepe-chicken-jalapeno", keyword: "crepe,jalapeno" },
  { id: "crepe-chicken-fry-day", keyword: "crepe,mushroom" },
  { id: "crepe-chicken-cordon-bleu", keyword: "crepe,cordonbleu" },
  { id: "crepe-chicken-shrimp", keyword: "crepe,shrimp" },

  { id: "crepe-meat-sossis", keyword: "crepe,sausage" },
  { id: "crepe-meat-sogo2", keyword: "crepe,meat" },
  { id: "crepe-meat-kofta", keyword: "crepe,kofta" },
  { id: "crepe-meat-burger", keyword: "crepe,burger" },
  { id: "crepe-meat-mix", keyword: "crepe,mixed" },

  { id: "crepe-fries-strips", keyword: "crepe,fries,strips" },
  { id: "crepe-fries-pane", keyword: "crepe,fries,chicken" },
  { id: "crepe-fries-plain", keyword: "crepe,fries" },
  { id: "crepe-fries-cheddar", keyword: "crepe,fries,cheese" },

  { id: "crepe-mix-twister", keyword: "wrap,meat" },
  { id: "crepe-mix-tsunami", keyword: "wrap,chicken" },
  { id: "crepe-mix-raad", keyword: "wrap,crispy" },
  { id: "crepe-mix-everything", keyword: "wrap,food" },
  { id: "crepe-mix-custom", keyword: "wrap,custom" },

  { id: "special-mega-chicken", keyword: "chicken,sandwich" },
  { id: "special-kiss-burger", keyword: "burger,special" },

  { id: "addition-fries", keyword: "frenchfries" },
  { id: "addition-fries-mozza", keyword: "fries,cheese" },
  { id: "addition-fries-crispy", keyword: "fries,crispy" },
];

const downloadDir = path.join(__dirname, "public", "images", "menu");

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          return downloadImage(response.headers.location, filename)
            .then(resolve)
            .catch(reject);
        }

        if (response.statusCode !== 200) {
          return reject(
            new Error(`Failed to get '${url}' (${response.statusCode})`),
          );
        }

        const file = fs.createWriteStream(filename);
        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve();
        });

        file.on("error", (err) => {
          fs.unlink(filename, () => reject(err));
        });
      })
      .on("error", reject);
  });
}

async function main() {
  console.log(`Downloading ${menuItems.length} images...`);

  for (const item of menuItems) {
    const filename = path.join(downloadDir, `${item.id}.jpg`);
    // loremflickr yields a random image for the keyword
    const url = `https://loremflickr.com/800/600/${item.keyword},food/all`;

    try {
      await downloadImage(url, filename);
      console.log(`Downloaded ${item.id}.jpg`);
      await new Promise((r) => setTimeout(r, 500)); // Be polite to the API
    } catch (err) {
      console.error(`Failed to download ${item.id}:`, err.message);
    }
  }
}

main().catch(console.error);
