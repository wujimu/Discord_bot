const puppeteer = require('puppeteer');
const puppeteerex = require('puppeteer-extra')
puppeteerex.use(require('puppeteer-extra-plugin-stealth')())
const fs = require('fs');
async function start(){

const browser = await puppeteerex.launch({
    //  args: ['--proxy-server=http://192.168.49.1:8000']
    // ,
    // '''--disable-features=site-per-process'
    //  ,
    // args: ['--disable-features=site-per-process', '--no-sandbox', '--lang=en-US', '--disable-extensions', '--start-maximized'],
    // devtools: false,
    // dumpio: true,
     headless: true,
    // defaultViewport: {
    //   width: 1200,
    //   height: 800
    // }
  }).catch(
    console.error
  );

  const page = await browser.newPage().catch(
    console.error
  )


  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en'
  });
  let filtered_resources = ['font'];
  await page.setRequestInterception(true);
  let add_data = fs.readFileSync('./lib/easylist.txt', 'utf8')
  add_data = add_data.split('\n').map(x => x.replace('@ ', ""));
  add_data.sort();
  const filters = [
    'livefyre',
    'moatad',
    'analytics',
    'controltag',
    'chartbeat',
    'googlesyndication',
    'doubleclick',
    'lovelydrum',
    'adnxs',
    'quantserve',
    'apester',
    'rubiconproject',
    'serverbid',
    'spotxchange',
    'openx',
    'springserve'

    // 'category/bundles'
  ];
  page.on('request', (req) => {
    const url = req.url();
    const shouldAbort_all_adds = false;
    //= filters.some((urlPart) => url.includes(urlPart));
    const shouldAbort = filters.some((urlPart) => url.includes(urlPart));
    const shouldAbort_resource = filtered_resources.some((resources) => req.resourceType().includes(resources));
    if (shouldAbort_all_adds || shouldAbort || shouldAbort_resource) {
      req.abort();
    } else {
      req.continue()
    }
  });
 // const ext = '/Users/ckanich/Downloads/uBlock0.chromium'; `--load-extension=${ext}`, `--disable-extensions-except=${ext}`
  // let page1 = [page1, page1];
  // for await (page of page1) {
    // }
  // page.on('response', async (response) => {
  //   const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
  //   if (matches && (matches.length === 2)) {
  //     const extension = matches[1];
  //     // const buffer = await response.buffer();
  //     fs.writeFileSync(`images/images.txt`, matches[0], 'utf8');
  //   }
  // });
return  page;

}


module.exports={start:start};