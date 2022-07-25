const fs = require("fs");
const { nasdaq_api_autocomplete_search } = require("./lib/tickers.js");
const express = require("express");
const path = require("path");
require("dotenv").config();
const Discord = require("discord.js");
const Client = new Discord.Client();
const finviz = require("./lib/finviz").finviz;
const market_screen_shot = require("./lib/market_overview.js");
const v8 = require("v8");

const { paging, paging_reaction_filter } = require("./lib/paging.js");
const structuredClone = (obj) => {
  return v8.deserialize(v8.serialize(obj));
};
const PORT = process.env.PORT || 5000;
// const fetch = require("node-fetch");

// const getTrickerData = require("./lib/tickers.js")

(async () => {
  const page1 = await require("./lib/puppeteer_module.js").start();
  const Cash = require("./lib/cash");
  const Freqency = Cash.LFUCache(300);
  const { wakeUpDyno } = require("./lib/wakUpDyno");

  const local_deving = {
    true: "http://localhost:5000/",
    false: "https://rocky-stream-04354.herokuapp.com/",
  };

  let deving = process.env.PORT ? false : true;
  const enviorment = local_deving[deving];
  const TOKEN = deving
    ? "NzQ2ODg3MjA5ODY4ODUzMjUw.X0G26w.mQUgECHvTQxQzmRnnM5f3A9DBT8"
    : "NzQ0MzE3Nzk1NDQ1MjQzOTY2.Xzhd9w.C-h4V5zx_v_dXmK06wgcPKUKSmE";
  const DYNO_URL = enviorment;

  Client.log = require("./lib/logHandler");
  //  require('./lib/eventHandler')(Client);
  Client.commands = require("./lib/commandLoader");
  Client.on("ready", () => {
    console.error(`Logged in as ${Client.user.tag}!`);
  });

  const maxPageLifeTime = 1000 * 60; // close pages older than 60 seconds
  const pageScanFrequency = 1000 * 60; // scan pages every 60 seconds

  const setIntervalAsync = (fn, ms) => {
    fn().then(() => {
      setTimeout(() => setIntervalAsync(fn, ms), ms);
    });
  };

  const closeOldPages = async () => {
    if (browser) {
      for (const page of await browser.pages()) {
        if (!(await page.isClosed())) {
          const pageTimestamp = await page.evaluate(`window.performance.now()`);
          if (pageTimestamp > maxPageLifeTime) {
            await page.close();
          }
        }
      }
    }
  };

  //setIntervalAsync(closeOldPages, pageScanFrequency)

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  let companies = await fs.readFileSync("stock_tickers.txt", "utf8");

  companies = companies
    .split("\n")
    .map((x) => x.replace("\r", "").toLocaleLowerCase());

  const { update_news } = require("./lib/auto_update_news");
  const { update_all_max_pain_tags } = require("./lib/auto_update_cashes.js");
  const news = [];

  filtered_resources = ["font", "images"];
  setTimeout(async () => {
    await update_news(page1, news);
  }, 5000);

  setInterval(async () => {
    await update_news(page1, news);
    await update_all_max_pain_tags(Freqency, page1);
  }, 900000);

  let exchanges = {
    Industry: "NASDAQ",
    NYSE: "NASDAQ",
  };
  const command_functions = {
    "#mx": {
      url: function (symbol) {
        return `https://swaggystocks.com/dashboard/options-max-pain/${symbol}`;
      },

      item: {
        default: ".graph-metadata-item",
        chart: ".chartjs-render-monitor",
      },
      keys: ["chart"],
      item_select: function (str_arr) {
        let ar = command_functions["#mx"].keys;
        for (let str_el of str_arr) {
          let item_catagory = ar.find((x) => x === str_el);

          if (item_catagory) {
            return {
              item_catagory: item_catagory,
              item: command_functions["#mx"].item[item_catagory],
            };
          }
        }

        return {
          item_catagory: "default",
          item: command_functions["#mx"].item["default"],
        };
      },
      modifiers: true,
      goto: async function (symbol, query_str, this_obj, msg) {
        filtered_resources = ["font", "images"];

        const { item_catagory, item } = this_obj.item_select(query_str);
        let cash_ed = Freqency.get(`${symbol}_${item_catagory}`);
        if (cash_ed === -1) {
          await page1
            .goto(this_obj.url(symbol), {
              waitUntil: "networkidle0",
            })
            .catch((e) => {
              console.error("error: ", e);
            });
          let element = await page1
            .evaluate(() => {
              // document.getElementsByClassName()
              return Array.from(document.getElementsByClassName(item));
            })
            .catch((e) => {
              console.error(e);
            });

          await element[0]
            .screenshot({
              path: `public/${symbol}_max_pain_${item_catagory}.png`,
            })
            .catch((e) => {
              console.error("error ", e);
            });

          Freqency.put(
            `${symbol}_${item_catagory}`,
            `${enviorment}${symbol}_max_pain_${item_catagory}.png`
          );
          cash_ed = `${enviorment}${symbol}_max_pain_${item_catagory}.png`;
        }
        //msg.channel.recipient.username msg.channel.recipient
        //  console.log('recipent -->',msg.channel)
        msg.channel
          .send(`${symbol.toUpperCase()}`, {
            files: [cash_ed],
          })
          .then((x) => {})
          .catch((x) => {
            console.error("error", x);
          });
        // return `${enviorment}${symbol}_max_pain_${item_catagory}.png`;
      },
    },
    "#f": {
      modifiers: true,
      goto: async (symbol, query_str, this_obj, msg) => {
        filtered_resources = ["font", "images"];

        await finviz(symbol, query_str, page1, msg);
      },
    },
    "#mo": {
      url: function (symbol = "none") {
        return `https://finviz.com/map.ashx?t=sec_all`;
      },
      item: {
        default: ".chart",
      },
      keys: ["usa", "world"],
      item_select: (str_arr) => {
        let ar = command_functions["#mo"].keys;
        for (let str_el of str_arr) {
          let item_found = ar.find((x) => x === str_el);

          if (item_found) return command_functions["#mo"].item[item_found];
        }
        return command_functions["#mo"].item["default"];
      },
      modifiers: false,
      goto: async (symbol, query_str, this_obj, msg) => {
        await market_screen_shot.goto(page1, symbol, query_str, msg);
      },
    },

    analysis: {
      url: function (exchange, symbol) {
        return `https://www.tradingview.com/symbols/${exchange}-${symbol}/ideas/`;
      },
      item: {
        default: {
          tag: "img",
          attr: "data-src",
        },
      },
      modifiers: true,
      goto: async function (symbol, query_str, this_obj, msg) {
        filtered_resources = ["font", "images"];
        // await page1.setExtraHTTPHeaders({
        //   'Accept-Language': 'en'
        // });
        let symbol_data = await nasdaq_api_autocomplete_search(symbol, page1);
        await page1
          .goto(this_obj.url(symbol_data.exchange, symbol_data.value), {
            waitUntil: "networkidle0",
          })
          .catch((e) => {
            console.error("error line 269: ", e);
          });

        // const watchDog = page.waitForFunction('window.status === "ready"');
        //     await watchDog;

        // await autoScroll(page);

        await page1
          .evaluate(() => {
            return Array.from(
              document.querySelectorAll("*[data-widget-type='idea']")
            ).map((card) => [
              Array.from(
                card.getElementsByClassName("tv-card-stats__time")
              )[0].getAttribute("data-timestamp"),
              Array.from(
                Array.from(
                  card.getElementsByTagName("picture")
                )[0].getElementsByTagName("img")
              )[0].getAttribute("data-src"),
            ]);
          })
          .then((response) => {
            response.sort((a, b) => b[0] - a[0]);
            let news = response;
            news = news.map((x) => x[1]);
            let num_page = 0;
            const num_page_instance = {
              num_page: num_page,
            };

            function pagination_update(updateEmbed, news, num_page_instance) {
              const next = num_page_instance.num_page + 1;
              updateEmbed.setThumbnail(news[next]);
              updateEmbed.setImage(news[num_page_instance.num_page]);
              return updateEmbed;
            }

            function updated_embed_body(embed, news, num_page) {
              embed
                .setImage(news[num_page])
                .setFooter(
                  `page ${num_page + 1} of ${news.length - 1 - num_page}`,
                  `https://images.freeimg.net/rsynced_images/news-97862_1280.png`
                );
              return embed;
            }
            const embed_object = [
              news,
              num_page_instance,
              msg,
              `Result for ${symbol.toUpperCase()}.`,
              paging,
              paging_reaction_filter,
              pagination_update,
              updated_embed_body,
              query_str,
            ];
            const embed = require("./lib/news_embed.js").embed_message(
              embed_object,
              function embed_body([news, num_page_instance], navigation_embed) {
                navigation_embed.setThumbnail(
                  news[num_page_instance.num_page + 1]
                );
                navigation_embed.setImage(news[num_page_instance.num_page]);
              }
            );
          })
          .catch(console.error);

        // await  page1.close().catch(console.error);
      },
    },
    news: {
      url: function () {
        return `https://finviz.com/news.ashx`;
      },
      modifiers: false,
      incrament: 1,
      goto: async function (symbol, query_str, this_obj, msg) {
        let num_page = 0;
        const num_page_instance = {
          num_page: 0,
        };

        const paging_reaction_filter = (reaction, user) =>
          reaction.emoji.name === "➡️" || reaction.emoji.name === "⬅️";
        // news,
        //         num_page_instance,
        //         query_str
        function embed_body(object_embed, navigation_embed) {
          let arr = object_embed.news[object_embed.num_page.num_page];
          arr.forEach((news) => {
            navigation_embed.addField(news.news, `[read more](${news.link})`);
          });
          //if (object_embed.query_str.indexOf("links") != -1) navigation_embed = object_embed.news[object_embed.num_page - 1].map(x => x.link).join(" ")
        }

        function pagination_update(updateEmbed, news, num_page_instance) {
          news[num_page_instance.num_page].forEach((news) => {
            updateEmbed.addField(news.news, `[read more](${news.link})`);
          });
        }

        function updated_embed_body(embed, news, num_page_instance) {
          let contents = news[num_page_instance.num_page];
          embed.fields = [];
          // console.log(contents);
          contents.forEach((item) => {
            embed.addField(item.news, `[read more](${item.link})`);
          });

          embed.setFooter(
            `page ${num_page_instance.num_page + 1} of ${
              news.length - 1 - num_page_instance.num_page
            }`,
            `https://images.freeimg.net/rsynced_images/news-97862_1280.png`
          );
          return embed;
        }

        const embed_object = {
          msg: msg,
          title: `The ThicckRic Times: `,
          news: news,
          num_page: num_page_instance,
          query_str: query_str,
          paging: paging,
          reaction_filter: paging_reaction_filter,
          pagination_update: pagination_update,
          updated_embed_body: updated_embed_body,
        };

        const embed = require("./lib/news_embed.js").embed_message(
          embed_object,
          embed_body
        );
      },
    },
  };

  async function scrape(commands, symbol, query_str, sub_commands, msg) {
    sub_commands.goto(symbol, query_str, sub_commands, msg);
  }

  const dictionary_of_commands = ["#mx", "#mo", "analysis", "news", "#f"];
  const dictionary_of_index_offsets = [9, 15, 9];
  async function filter_and_execute(command, message, sub_commands, msg) {
    message = message.split(" ");

    let index = message.indexOf(command);

    let keywords = message.slice(index + 1);

    let elements = sub_commands.modifiers
      ? keywords.filter((keyword) => companies.includes(keyword))
      : ["none"];
    // Promise return greeting = await Promise.resolve("More than 3, your mum!").catch(e => console.error("error ", e));
    //if(keywords[0] != elements[0]) return await Promise.resolve("").catch(e => console.error("error ", e)); return greeting = await Promise.resolve("have your mum teach you stock symbols").catch(e => console.error("error ", e));
    if (sub_commands.modifiers && elements.length === 0) {
      msg.reply(
        "you seem to be missing something or that symbol might not be supported at this time"
      );
    }

    if (sub_commands.modifiers && elements.length > 3) {
      msg.reply("will not support that many lookups at this time");
    }

    elements.map((stock_symbol) =>
      sub_commands.goto(stock_symbol, message, sub_commands, msg)
    );
  }

  Client.on("message", (msg) => {
    let content = msg.content.toLocaleLowerCase();
    let command = dictionary_of_commands.find((command) =>
      content.includes(command)
    );
    if (command) {
      let sub_commands = command_functions[command];
      filter_and_execute(command, content.trim(), sub_commands, msg);
    }
  });
  Client.login(TOKEN).catch((e) => {
    Client.log.error(e);
    process.exit(1);
  });
  express()
    .use(express.static(path.join(__dirname, "public")))
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .get("/", (req, res) => res.render("pages/index"))
    .listen(PORT, () => {
      //wakeUpDyno(DYNO_URL); // will start once server starts
      console.error(`Listening on ${PORT}`);
    });
})();
