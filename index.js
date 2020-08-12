const puppeteer = require("puppeteer");
const fs = require("fs");

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.olx.com.br/");

//   const titleList = await page.evaluate(() => {
//     const nodeList = document.querySelectorAll(
//       `.grid-item img,
//       .grid-item .Item__PricingContainer-sc-158lq6k-3.fxjGmd span`
//     );
//     const imgArray = [...nodeList];

//     const titleList = imgArray.map((img, span) => {
//       return {
//         src: img.src,
//         alt: img.alt,
//         text: span.textContent,
//       };
//     });

//     return titleList;
//   });

//   fs.writeFile("instagram.json", JSON.stringify(titleList, null, 2), (err) => {
//     if (err) throw new Error("something went wrong");

//     console.log("Well done!");
//   });
//   await browser.close();
// })();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.olx.com.br/");

  const name = await page.$eval(
    ".Item__ImageContainer-sc-158lq6k-1 img",
    (el) => {
      return { src: el.src, alt: el.alt };
    }
  );

  const price = await page.$eval(
    ".Item__PricingContainer-sc-158lq6k-3.fxjGmd",
    (el) => {
      return { text: el.textContent };
    }
  );

  // const name = await page.evaluate(() => {
  //   const nodeList = document.querySelectorAll(".grid-item img");
  //   const imgArray = [...nodeList];
  //   const imgList = imgArray.map(({ src }) => ({ src }));
  //   return imgList;
  // });

  // const price = await page.evaluate(() => {
  //   const nodeList = document.querySelectorAll(
  //     ".Item__PricingContainer-sc-158lq6k-3.fxjGmd"
  //   );
  //   const priceArray = [...nodeList];
  //   const priceList = priceArray.map((el) => {
  //     return { el: el.textContent };
  //   });
  //   return priceList;
  // });

  const product = {
    name,
    price,
  };

  fs.writeFile("instagram.json", JSON.stringify(product, null, 2), (err) => {
    if (err) throw new Error("something went wrong");
  });

  await browser.close();
})();
