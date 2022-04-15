 # Web Crawler
## API for extracting reviews from https://www.tigerdirect.com



This is a sample application that can be used to extract customer review from [tigerdirect](https://www.tigerdirect.com).
Following two NodeJs packages have been used for this-
- Express
- puppeteer

## Features

- Pass the product URL as parameter in the API 
- You will get all the reviews with a beautifully formatted JSON.
- Can be further enhaced to auto hit the URL and save the JSONs on disk to make a bulk dataset.

## How to USE

This is a NodeJS application so u need to have NodeJS installed on you system

- Download or clone this repository
- Open the directory into VS Code or simple using command prompt
- Run the following command inside the same directory to install the packages-
 npm install   
- Once done run the following command
node app.js
- Now open a browser and visit the following URL- 
-- http://localhost:3000/?url=https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=640254&CatId=3
- And boom you will get the JSON.

**By: Syed Luqman Quadri!**

 
