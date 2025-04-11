import express from 'express';
import { nanoid } from 'nanoid';
import URL from '../models/url.models.js'; // Assuming your URL model path is correct

const generatenewshorturl = async (req, res) => {
  try {
    const { redirectURL } = req.body;

    if (!redirectURL) {
      return res.status(400).json({ message: "Please provide the redirect URL" });
    }

    const shortId = nanoid(8);
    const url = new URL({
      shortId,
      redirectURL,
      visitHistory: [],
    });
    await url.save();
    return res.status(201).json({ message: "Short URL generated successfully", shortId }); // Use 201 for successful creation
  } catch (error) {
    console.error("Error in generating short URL:", error); // Log the error for debugging
    return res.status(500).json({ message: "Error in generating short URL", error: error.message }); // Include error message for client
  }
};

const redirecturl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await URL.findOne({ shortId:shortId });

    if (!url) {
      return res.status(404).json({ message: "Short URL not found", shortId });
    }

    url.visitHistory.push({ timeStamp: Date.now() });
    await url.save();
    res.redirect(200,url.redirectURL);
  } catch (error) {
    console.error("Error in redirecting URL:", error); // Log the error for debugging
    return res.status(500).json({ message: "Error in redirecting URL", error: error.message }); // Include error message for client
  }
};

const getanalytics=async(req,res)=>{
try {
const {shortId}=req.params;
const url = await URL.findOne({ shortId:shortId });
if (!url) {
 return res.status(404).json({ message: "Short URL not found", shortId });
}
return res.status(200).json({analytics :url.visitHistory});
} catch (error) {
    return res.status(500).json({ message: "Error in get analytics URL", error: error.message }); // Include error message for client
}  
}

export { generatenewshorturl, redirecturl ,getanalytics};