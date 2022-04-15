const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.get('/', function(req, res){
    let urlToCrawl = req.query.url

    async function scrape(myURL) {
        const browser = await puppeteer.launch({ headless: true });
        console.log("function called 2");
        const page = await browser.newPage();
        await page.goto(myURL);
        let reviewJSON = await page.evaluate(() => {
            let reviewElement = document.body.querySelectorAll('#customerReviews');
            let reviewTemp = Object.values(reviewElement).map(x => {
                let commentHeading = x.querySelector('.review .rightCol h6').textContent
                let commentText = x.querySelector('.review .rightCol h6').textContent
                let comment = {"heading": commentHeading, "text": commentText}
                let name = x.querySelectorAll('.review .leftCol .reviewer dd')[0].textContent
                let date = x.querySelectorAll('.review .leftCol .reviewer dd')[1].textContent
                let reviewNodes = x.querySelectorAll('.review .leftCol .itemReview dt')
                let ratings = {}
                for(let i =0; i<reviewNodes.length; i++){
                    key = x.querySelectorAll('.review .leftCol .itemReview dt')[i].textContent
                    value = x.querySelectorAll('.review .leftCol .itemReview dd')[i].textContent
                    ratings[key] = value
                }
                return {
                    comment: comment,
                    name: name,
                    date: date,
                    rating: ratings
    
                }
            });
            return reviewTemp;
        });
        await browser.close();
        return reviewJSON
    };

    async function mainCaller(urlToCrawl){
        try{
            res.send(await scrape(urlToCrawl));
        }
        catch(e){
            console.log(e)
            res.send("OH NO! SOME ERROR OCCURED")
        }
        finally{
            console.log("Calling process completed")
        }
    }
    
    mainCaller(urlToCrawl)
})
app.listen(port, () => console.log(`app listening on port ${port}!`));