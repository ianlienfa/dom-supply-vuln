import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import _ from 'lodash';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


const app = express();
app.use(cookieParser());
app.use(cors());
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

// Catch-all to serve index.html for any other paths (for SPA support)
app.get('/submit', (req, res) => {    
    req.query = req.query.data;    
    var data = JSON.parse(req.query)
    console.log("Data received:", data);  
    if(data['arg1'] === undefined || data['arg2'] === undefined) {
        return res.status(400).json({ message: "No data received" });
    }
    var filedata = fs.readFileSync("./local/local.txt").toString();
    if(filedata === "") {
        filedata = { data: [] };
    }
    else {
        filedata = JSON.parse(filedata);
    }
    filedata['data'].push(JSON.stringify(data));
    console.log(filedata);
    fs.writeFile("./local/local.txt", JSON.stringify(filedata), (err) => {
        if (err) {
            console.error("Error saving data:", err);
            return res.status(500).json({ message: "Error saving data" });
        }
        console.log("Data saved successfully");
        res.json({ message: "Data saved successfully" });
    });
});

app.get('/getlocal', (req, res) => {
    fs.readFile("./local/local.txt", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading data:", err);
            return res.status(500).json({ message: "Error reading data" });
        }
        console.log("Data read successfully");
        // parse data line by line into an array             
        res.json({ message: "Data read successfully", data });
    });
});

app.get('/clear', async (req, res) => {
    // clear the local.txt file
    fs.writeFile("./local/local.txt", "", (err) => {
        if (err) {
            console.error("Error clearing data:", err);
            return res.status(500).json({ message: "Error clearing data" });
        }
        console.log("Data cleared successfully");
        return res.status(200).json({ message: "Data cleared successfully" });
    });
});

app.get('/report', async (req, res) => {
    async function visitSiteWithCookie(url, cookieName, cookieValue) {
        const browser = await puppeteer.launch({ 
            executablePath: '/usr/bin/google-chrome',
            headless: true 
        });
        const page = await browser.newPage();
    
        // Set a cookie before visiting the URL
        await page.setCookie({
            name: cookieName,
            value: cookieValue,
            domain: new URL(url).hostname
        });
    
        // Navigate to the URL
        await page.goto(url, { waitUntil: 'networkidle2' });
    
        // Run JavaScript and interact with the DOM
        const pageTitle = await page.title();
        console.log("Page Title:", pageTitle);
    
        // Retrieve an element’s text after page load
        try {
            const someText = await page.$eval('#content', el => el.innerHTML);
        }
        catch (error) {
            console.error("Error waiting for selector:", error);
            await browser.close();
            return;
        }
        await browser.close();
        return res.status(200).json({ message: "Your friend has taken a look at this website!" });
    }
    
    const url = `http://localhost:${PORT}`;
    const cookieName = 'flag';
    // read the flag from the flag.txt
    const cookieValue = fs.readFileSync("./flag.txt").toString();    
    visitSiteWithCookie(url, cookieName, cookieValue);
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});