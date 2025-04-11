import express from 'express'
import { nanoid } from 'nanoid'
import URL from '../models/url.models.js'
const generatenewshorturl=async(req,res)=>{
try {
const {redirectURL}=req.body;
const shortId=nanoid(8);
const url=new URL({
shortId,
redirectURL,
visitHistory:[],
});
await url.save();
return res.status(200).json({message:"Fetched shorturl successfully",shortId});
} catch (error) {
return res.status(500).json({message:"Error in fetching shortUrl"});    
}
}

export {generatenewshorturl};