


async function update_news(page,news){
    news.length=0;
      filtered_resources = ['font', 'images'];
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en'
      });
      
      
  //     await page.goto(`https://finviz.com/news.ashx`, {
  //       // "waitUntil": "networkidle0",
  //     }).catch(e => console.error("error line 269: ", e));
  // let pg;
  //  pg = await page.evaluate(() =>
  //   Array.from(document.getElementById("news").getElementsByTagName('a')).map(news => ({
  //     news: news.innerText,
  //     link: news.href
  //   }))
  //     ).catch(e => console.error("error", e));
  //     await page.content()
  //       console.log(pg);

 pg = [
{news: "Dow drops 449 points, or 1.3%, Nasdaq sheds 1.3%", link: "https://finance.yahoo.com/news/stock-market-ne…pdates-march-22-2022-114152788-221518266.html"}
,{news: "Asia Stocks to Fall as Bonds Rally, Oil Pares Rise: Markets Wrap", link: "https://www.bloomberg.com/news/articles/2022-0…all-as-bonds-pare-drop-oil-gains-markets-wrap"}
,{news: "Moderna to Seek Authorization of Its Coronavirus Vaccine for Young Children", link: "https://www.nytimes.com/2022/03/23/us/politics…derna-coronavirus-vaccine-young-children.html"}
,{news: "Stock futures rise slightly as Wall Street tries to recover from Wednesday's losses", link: "https://www.cnbc.com/2022/03/23/stock-futures-…-tries-to-recover-from-wednesdays-losses.html"}
,{news: "Nikola confirms start of production of commercial electric truck", link: "http://www.marketwatch.com/news/story/nikola-c…C8296-A7F6-42A8-929F-F103B28D9B36}&siteid=rss"}
,{news: "Asia Stocks to Fall as Bonds Pare Drop; Oil Gains: Markets Wrap", link: "https://www.bloomberg.com/news/articles/2022-0…e-drop-oil-gains-markets-wrap?srnd=markets-vp"}
,{news: "Wall Street bonuses hit new record", link: "https://www.foxbusiness.com/lifestyle/wall-street-bonuses-hit-new-record"}
,{news: "Tommy Bahama parent Oxford Industries beats Q4 view, raises dividend by 31%", link: "http://www.marketwatch.com/news/story/tommy-ba…337EA-61EF-4625-B849-F10AC0A08E51}&siteid=rss"}
,{news: "The stock market hit its COVID low 2 years ago today — Here’s how the performance stacks up", link: "https://www.marketwatch.com/story/its-the-2nd-…tom-heres-how-the-rally-stacks-up-11648049495"}
,{news: "Fed Officials Take Aim at Inflation, Say Ready to Act With Vigor", link: "https://www.bloomberg.com/news/articles/2022-0…n-say-ready-to-act-with-vigor?srnd=markets-vp"}
, {news: "Stocks making the biggest moves after hours: KB Home, Spotify and more", link: "https://www.cnbc.com/2022/03/23/stocks-making-…after-hours-amc-kb-home-spotify-and-more.html"}
, {news: "Fidelity Launches Business Mimicking Hedge-Fund Strategies", link: "https://www.bloomberg.com/news/articles/2022-0…micking-hedge-fund-strategies?srnd=markets-vp"}
, {news: "Global Oil Demand Threatened by China’s Tight Covid Lockdowns", link: "https://www.bloomberg.com/news/articles/2022-0…china-s-tight-covid-lockdowns?srnd=markets-vp"}
, {news: "Oil and gas execs rip Biden for treating industry like an 'enemy'", link: "https://www.foxbusiness.com/politics/oil-gas-execs-joe-biden-russia"}
, {news: "Fed overreacting to inflation is bad for equity markets: Expert", link: "https://video.foxbusiness.com/v/6301636972001"}
, {news: "White House to end free COVID-19 testing, treatment for uninsured Americans", link: "https://www.foxbusiness.com/healthcare/white-house-end-free-covid-test"}
, {news: "Traeger stock falls more than 11% after grilll maker calls for leaner sales this year", link: "http://www.marketwatch.com/news/story/traeger-…0FEBF-40CD-48E4-BB16-33438BDBFE00}&siteid=rss"}
, {news: "Inside a rare US meeting with a Russian general in Moscow", link: "https://www.cnn.com/2022/03/23/politics/us-russia-general-meeting/index.html"}
, {news: "Return of the meme stock? Retail short squeeze targets rally", link: "https://www.reuters.com/business/return-meme-s…etail-short-squeeze-targets-rally-2022-03-23/"}
, {news: "Germany’s leader says a boycott of Russian ene…ould imperil ‘hundreds of thousands of jobs.’", link: "https://www.nytimes.com/2022/03/23/business/olaf-scholz-russia-energy.html"}
, {news: "U.S. stocks close lower Wednesday amid a sharp rise in oil prices and inflation worries", link: "http://www.marketwatch.com/news/story/us-stock…4C13C-238E-4E1E-8644-2D9E13028882}&siteid=rss"}
, {news: "Egypt Turns to IMF Seeking Help for Economy Amid Ukraine Shock", link: "https://www.bloomberg.com/news/articles/2022-0…onomic-shock-from-ukraine-war?srnd=markets-vp"}
, {news: "Biden needs to ‘stop treating’ gas industry like ‘an enemy’: Oil exec.", link: "https://video.foxbusiness.com/v/6301624181001"}
, {news: "Airfare skyrockets as cost of jet fuel takes off", link: "https://www.foxbusiness.com/economy/airfare-skyrockets-as-cost-of-jet-fuel-takes-off"}
, {news: "As war in Ukraine intensifies, Nestlé suspends sales of KitKat, other products in Russia", link: "https://www.foxbusiness.com/lifestyle/war-ukraine-nestle-suspends-sales-some-products-russia"}
, {news: "Oil Stocks Negatively Correlated to Market First Time Since 2001", link: "https://www.bloomberg.com/news/articles/2022-0…-market-first-time-since-2001?srnd=markets-vp"}
, {news: "Russian stock market to resume trading of 33 companies", link: "https://www.foxbusiness.com/markets/russian-stock-market-trading"}
, {news: "Oil futures up sharply, with U.S. prices ending at their highest in over 2 weeks", link: "http://www.marketwatch.com/news/story/oil-futu…A8F06-6724-4798-BEAE-DA020BA6338C}&siteid=rss"}
, {news: "Madeleine Albright, first female US secretary of state, dies", link: "https://www.cnn.com/2022/03/23/politics/madeleine-albright-obituary/index.html"}
, {news: "Gasoline Demand in U.S. Starts to Show Cracks at Unlikely Time", link: "https://www.bloomberg.com/news/articles/2022-0…-show-cracks-at-unlikely-time?srnd=markets-vp"}
, {news: "Ukraine invasion causing record-high fertilizer prices", link: "https://video.foxbusiness.com/v/6301618160001"}
, {news: "Israel-based company helping to evacuate employees in Ukraine", link: "https://video.foxbusiness.com/v/6301619506001"}
, {news: "Gas tax holiday in some states may be slow to reach Americans", link: "https://www.foxbusiness.com/economy/fuel-tax-holiday-gas-prices"}
, {news: "Russian forces have committed war crimes in Ukraine, Blinken says", link: "http://www.marketwatch.com/news/story/russian-…2EEA0-EF6A-4914-90FD-194BA55034E8}&siteid=rss"}
, {news: "Ukrainian refugee shows CNN pictures of their destroyed home", link: "https://www.cnn.com/videos/world/2022/03/23/ukraine-refugee-romania-marquez-pkg-intl-vpx.cnn"}
, {news: "Lloyds Bank to close 60 more branches across UK", link: "https://www.bbc.co.uk/news/uk-scotland-60850239?at_medium=RSS&at_campaign=KARANGA"}
, {news: "Biden’s pursuit of Venezuelan oil is ‘insulting’: North Dakota Petroleum Council president", link: "https://video.foxbusiness.com/v/6301618881001"}
, {news: "Investor describes current market rally, says he's 'absolutely selling'", link: "https://video.foxbusiness.com/v/6301614305001"}
, {news: "Gold futures mark highest settlement in nearly a week", link: "http://www.marketwatch.com/news/story/gold-fut…F6936-55DB-494C-B57C-EC8370BFC165}&siteid=rss"}
, {news: "The bodies of Russian soldiers are piling up i…Ukraine, as Kremlin conceals true toll of war", link: "https://www.cnn.com/2022/03/23/europe/ukraine-…r-russian-soldiers-deaths-cmd-intl/index.html"}
, {news: "Barrick Gold Sees Scope to Grow Zambia Copper Output", link: "https://www.bloomberg.com/news/articles/2022-0…-to-grow-zambia-copper-output?srnd=markets-vp"}
, {news: "Odds of US recession in 2022 much 'higher' vs a year ago, Fmr. Chase chief economist says", link: "https://www.foxbusiness.com/economy/odds-of-us…-vs-a-year-ago-says-fmr-chase-chief-economist"}
, {news: "Sunak’s Tax Cuts Still Leave Britons Facing Living Costs Squeeze", link: "https://www.bloomberg.com/news/articles/2022-0…s-facing-living-costs-squeeze?srnd=markets-vp"}
, {news: "Ghana Prepares Spending Cuts to Meet Budget Deficit Target", link: "https://www.bloomberg.com/news/articles/2022-0…to-meet-budget-deficit-target?srnd=markets-vp"}
, {news: "Biden administration aggravates its prolonged 'war on fossil fuels': Rep. Buddy Carter", link: "https://video.foxbusiness.com/v/6301610132001"}
, {news: "U.K. Treasury to Raise £27 Billion More Tax Despite Sunak’s Tax Cuts", link: "https://www.bloomberg.com/news/articles/2022-0…more-tax-despite-sunak-s-cuts?srnd=markets-vp"}
, {news: "Mercuria Energy Secures $2 Billion Emergency Credit as Traders Squeezed", link: "https://www.bloomberg.com/news/articles/2022-0…cy-credit-as-traders-squeezed?srnd=markets-vp"}
, {news: "Kentanji Brown Jackson tells hearing: 'Diverse… branch bolsters public confidence' in system", link: "http://edition.cnn.com/webview/politics/live-n…anji-brown-jackson-hearing-3-23-22/index.html"}
, {news: "Casino Said to Weigh Sale of Stake in Renewables Firm GreenYellow", link: "https://www.bloomberg.com/news/articles/2022-0…n-renewables-firm-greenyellow?srnd=markets-vp"}
, {news: "Propped Up By Putin, Russian Markets Creak Toward Full Reopening", link: "https://www.bloomberg.com/news/articles/2022-0…s-creak-toward-full-reopening?srnd=markets-vp"}
, {news: "Stocks making the biggest moves midday: GameStop, Adobe, General Mills and more", link: "https://www.cnbc.com/2022/03/23/stocks-making-…ay-gamestop-adobe-general-mills-and-more.html"}
, {news: "Inflation data is putting the Biden admin 'in the tank': Sen. Hagerty", link: "https://video.foxbusiness.com/v/6301611294001"}
, {news: "Airfare skyrockets as cost of jet fuel soars", link: "https://video.foxbusiness.com/v/6301611134001"}
, {news: "Inflation and Russian invasion of Ukraine to take a toll on US economy, Fannie Mae says", link: "https://www.foxbusiness.com/personal-finance/i…n-russian-invasion-ukraine-economy-fannie-mae"}
, {news: "Petro Names Afro-Colombian Environmental Activist Running Mate", link: "https://www.bloomberg.com/news/articles/2022-0…nmental-activist-running-mate?srnd=markets-vp"}
, {news: "Bull Market Consensus in Tatters on Covid-Crash Anniversary", link: "https://www.bloomberg.com/news/articles/2022-0…rs-on-covid-crash-anniversary?srnd=markets-vp"}
, {news: "Dollar climbs, euro weakens, as Biden brings sanctions plan to Europe", link: "https://www.reuters.com/business/improved-risk…odity-prices-help-aussie-hurt-yen-2022-03-23/"}
, {news: "Currencies: The Japanese yen continues to fall…nst U.S. dollar following hawkish Fed remarks", link: "http://www.marketwatch.com/news/story/japanese…05575-04D4-B545-7AFE-B1D1736E1F2A}&siteid=rss"}
, {news: "Putin just made the case for a European army", link: "https://www.cnn.com/2022/03/23/opinions/europe…e-strategic-compass-putin-andelman/index.html"}
, {news: "An Alleged Fraud Uncovered by a Short-Seller Ends in Gunfire", link: "https://www.wsj.com/articles/an-alleged-fraud-…s-in-gunfire-11648051215?mod=rss_markets_main"}
, {news: "US in 'precarious time' as it pertains to chip shortage: Intel CEO", link: "https://video.foxbusiness.com/v/6301602299001"}
, {news: "Varney: Why won’t Biden rebuild US energy production?", link: "https://www.foxbusiness.com/politics/varney-why-wont-biden-rebuild-us-energy-production"}
, {news: "A Key ETF Metric on Wall Street Suggests Fresh Bond-Market Pain", link: "https://www.bloomberg.com/news/articles/2022-0…ggests-fresh-bond-market-pain?srnd=markets-vp"}
, {news: "Dow Industrials Fall, Oil Prices Jump", link: "https://www.wsj.com/articles/global-stocks-markets-dow-update-03-23-2022-11648024172"}
, {news: "Biden is controlled by radical left: Sen. Scott", link: "https://video.foxbusiness.com/v/6301605170001"}
, {news: "Biden needs to ‘cut off, sanction’ Putin in economic war: Kyle Bass", link: "https://video.foxbusiness.com/v/6301588534001"}
, {news: "Putin advisor Anatoly Chubais quits and leaves Russia over Ukraine invasion: reports", link: "http://www.marketwatch.com/news/story/putin-ad…444E3-2A2B-4C38-9800-1C7B913A2148}&siteid=rss"}
, {news: "'Reduced to ashes': Stunning footage shows what's left of Ukrainian city", link: "https://www.cnn.com/videos/world/2022/03/23/mariupol-devastation-video-ukraine-jc-orig.cnn"}
, {news: "Estonia May Build LNG Terminal to Cut Russia Energy Dependence", link: "https://www.bloomberg.com/news/articles/2022-0…-cut-russia-energy-dependence?srnd=markets-vp"}
, {news: "Nvidia's Trillion Dollar Dreams", link: "https://www.wsj.com/articles/nvidias-trillion-dollar-dreams-11648048409?mod=rss_markets_main"}
, {news: "Volatility Roars Back in Muni Market in Worst Quarter Since 1994", link: "https://www.bloomberg.com/news/articles/2022-0…t-in-worst-quarter-since-1994?srnd=markets-vp"}
, {news: "Fmr. Chase economist on outlook for recession", link: "https://video.foxbusiness.com/v/6301603726001"}
, {news: "Putin Wants Europe to Pay for Gas in Rubles", link: "https://www.wsj.com/articles/vladimir-putin-wa…as-in-rubles-11648047487?mod=rss_markets_main"}
, {news: "Wall Street bonuses climb to record $257,500 p…orker last year, New York's fiscal chief says", link: "https://www.cnbc.com/2022/03/23/wall-street-bo…er-last-year-new-yorks-fiscal-chief-says.html"}
, {news: "How Russia Can Blow Up the Uranium Market", link: "https://www.wsj.com/articles/how-russia-can-bl…anium-market-11648046798?mod=rss_markets_main"}
, {news: "IPO Winner Minted in Brazil as Record Aluminum Rally Propels CBA", link: "https://www.bloomberg.com/news/articles/2022-0…rd-aluminum-rally-propels-cba?srnd=markets-vp"}
, {news: "Trafigura, Russia's Key Oil Trading Partner, Raises New Slug of Cash", link: "https://www.wsj.com/articles/trafigura-russias…slug-of-cash-11648046666?mod=rss_markets_main"}
, {news: "Stuart Varney: Why won’t Biden rebuild US energy production?", link: "https://video.foxbusiness.com/v/6301602434001"}
, {news: "EIA reports weekly declines in U.S. crude, gasoline and distillate supplies", link: "http://www.marketwatch.com/news/story/eia-repo…04712-4B5D-4AB1-9F07-1E7E52281E55}&siteid=rss"}
, {news: "Spring Statement: Rishi Sunak vows to cut income tax before 2024 election", link: "https://www.bbc.co.uk/news/uk-politics-60848315?at_medium=RSS&at_campaign=KARANGA"}
, {news: "Lawmakers, Yellen mull freezing Russian gold reserves", link: "https://www.foxbusiness.com/politics/lawmakers-yellen-mull-freezing-russian-gold-reserves"}
, {news: "Boots Bidders Weigh Private Credit for Slice of $5.3 Billion Debt", link: "https://www.bloomberg.com/news/articles/2022-0…for-slice-of-5-3-billion-debt?srnd=markets-vp"}
, {news: "Wall Street is ‘funding’ Russia’s war machine: Hedge fund manager", link: "https://www.foxbusiness.com/markets/wall-street-russias-war-hedge-fund"}
, {news: "U.S. New-Home Sales Declined in February for a Second Month", link: "https://www.bloomberg.com/news/articles/2022-0…n-february-for-a-second-month?srnd=markets-vp"}
, {news: "U.K. Sees Inflation Leaping to 40-Year High of 8.7% This Year", link: "https://www.bloomberg.com/news/articles/2022-0…40-year-high-of-8-7-this-year?srnd=markets-vp"}
, {news: "Tech leads rebound in world stocks despite surging yields", link: "https://www.reuters.com/technology/tech-leads-…rld-stocks-despite-surging-yields-2022-03-23/"}
, {news: "Wall Street pulls back on stocks, Treasury yields dip", link: "https://www.reuters.com/business/global-markets-wrapup-1-2022-03-23/"}
, {news: "Fuel duty cut by 5p a litre to help motorists", link: "https://www.bbc.co.uk/news/business-60850217?at_medium=RSS&at_campaign=KARANGA"}
, {news: "U.K. Says Treasury Will Fund BOE Losses on QE for First Time", link: "https://www.bloomberg.com/news/articles/2022-0…e-losses-on-qe-for-first-time?srnd=markets-vp"}
, {news: "UK growth forecasts slashed due to Ukraine war", link: "https://www.bbc.co.uk/news/business-60846951?at_medium=RSS&at_campaign=KARANGA"}
, {news: "Watch: Beverly Hills Smash-And-Grab Robbers Steal 'Millions' From Jewelry Shop", link: "https://www.zerohedge.com/political/watch-beve…-and-grab-robbers-steal-millions-jewelry-shop"}
, {news: "'Just Trust Us': Politicians Of The World Unite!", link: "https://www.zerohedge.com/political/just-trust-us-politicians-world-unite"}
, {news: "Beijing Invites NTSB To Join Investigation Int…n Crash As Black Box, Human Remains Recovered", link: "https://www.zerohedge.com/markets/beijing-invi…n-china-eastern-crash-black-box-human-remains"}
, {news: "Ukrainian Official Pleads With Chinese Drone Maker To Stop Use By Russian Military", link: "https://www.zerohedge.com/markets/ukrainian-of…chinese-drone-maker-stop-use-russian-military"}
, {news: "Miami Beach Declares State Of Emergency After Spring Break Chaos", link: "https://www.zerohedge.com/political/miami-beac…ares-state-emergency-after-spring-break-chaos"}
, {news: "DOJ To Produce 'Large Volume' Of Classified Ma…e Dossier Source Case: Special Counsel Durham", link: "https://www.zerohedge.com/political/doj-produc…ls-steele-dossier-source-case-special-counsel"}
, {news: "House Dems Want To Stop Oil Inflation By Creat…hin Air, Offering Americans 'Direct Payments'", link: "https://www.zerohedge.com/markets/house-dems-w…-money-out-thin-air-offering-americans-direct"}
, {news: "Watch: Gingrich Says Kamala Harris May Be The Dumbest Person Ever Elected Vice President", link: "https://www.zerohedge.com/political/watch-ging…be-dumbest-person-ever-elected-vice-president"}
, {news: "Bonds, Bullion, Black Gold, & 'Babki' Jump As Stocks Dump", link: "https://www.zerohedge.com/markets/bonds-bullion-black-gold-babki-jump-stocks-dump"}
, {news: "Madeleine Albright, First Female Secretary Of State Under Clinton, Has Died", link: "https://www.zerohedge.com/political/madeleine-…female-secretary-state-under-clinton-has-died"}
        ];

      pg.shift();
     
      let len = pg.length
      const chunk = 4;
   while(pg.length){
     let chuck = chunk;
     const chucks = [];
     while (chuck-- && pg.length) chucks.push(pg.shift());
       news.push(chucks);
          }
return news; 
           
      }



module.exports = {update_news}