import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import _ from 'lodash';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


const app = express();
app.use(cookieParser());
app.use(cors());
// Middleware to parse JSON body
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Request received:', req.url);
    console.log('Request headers cookies:', req.cookies);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
const PORT = 8000;

// Load environment variables from .env file
dotenv.config();

app.use(express.static(path.join(__dirname, '../dist')));

app.post('/report', async (req, res) => {
    const { url } = req.body;
    console.log("URL:", url);

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const visitSiteWithCookie = async (url, cookieName, cookieValue) => {

            const browser = await puppeteer.launch({
                executablePath: '/usr/bin/google-chrome',
                headless: true
            });
            const page = await browser.newPage();

            // Set a cookie before visiting the URL
            console.log("Setting cookie:", cookieName, cookieValue, new URL(url).hostname);
            await page.setCookie({
                name: cookieName,
                value: cookieValue,
                domain: new URL(url).hostname
            });

            // Navigate to the provided URL
            await page.goto(url, { waitUntil: 'networkidle2' });

            // Run JavaScript and interact with the DOM
            const pageTitle = await page.title();
            console.log("Page Title:", pageTitle);

            try {
                const someText = await page.$eval('#content', el => el.innerHTML);
                console.log("Content:", someText);

            } catch (error) {
                console.error("Error retrieving selector:", error);
            }
            await browser.close();
            return { message: `Visited ${url} successfully!` };
        };

        const cookieName = 'flag';
        // Read the flag from flag.txt
        let cookieValue = fs.readFileSync('./flag.txt').toString();
        cookieValue = btoa(cookieValue); 
        console.log('cookieVal', cookieValue); 

        const result = await visitSiteWithCookie(url, cookieName, cookieValue);
        res.status(200).json(result);

    } catch (error) {
        console.error("Error visiting site:", error);
        res.status(500).json({ error: "An error occurred while visiting the site." });
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});