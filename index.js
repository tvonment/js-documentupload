const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const path = require('path');
const formidableMiddleware = require('express-formidable-v2');
const uploadFolder = path.join(__dirname, "tmp");
const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');

const connString = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!connString) throw Error('Azure Storage Connection string not found');

const blobServiceClient = BlobServiceClient.fromConnectionString(connString);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use('/favicon.ico', express.static('favicon.ico'));

app.use(express.urlencoded({ extended: true }))
app.use(formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: uploadFolder,
    multiples: true // req.files to be arrays of files
}));

app.get('/', async (req, res) => {
    res.render("docupload", { title: "Document Upload", user: "testuser" });
})

app.listen(port, () => {
    console.log(`This app is listening at http://localhost:${port}`)
})

app.post('/submit_upload', (req, res) => {
    // Check if multiple files or a single file
    if (!req.files.myUpload.length) {
        const file = req.files.myUpload;
        handleFile(file);
    } else {
        // Multiple files
        for (let file of req.files.myUpload) {
            handleFile(file);
        }
    }

    try {
        // stores the fileName in the database
        return res.status(200).json({
            status: "success",
            message: "File(s) uploaded successfully!!",
        });
    } catch (error) {
        res.json({
            error,
        });
    }
})

function handleFile(file) {
    const fileName = encodeURIComponent(file.name.replace(/\s/g, "-"));
    try {
        const containerClient = blobServiceClient.getContainerClient("test");
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        blockBlobClient.uploadFile(file.path);
        console.log("Uploaded: ", fileName);
        /*fs.unlink(file.path, (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete tmp File successfully.");
        });*/
    } catch (error) {
        console.log(error);
    }
}