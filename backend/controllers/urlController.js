import Url from "../models/urlModel.js";

export const urlShortner = async(req,res)=>{
    const {originalUrl, customShortCode,validityDays}=req.body;
    try{
        if(!originalUrl){
            return res.status(400).json({error:"Orginal URL is required"});

        }
        try{
            new URL(originalUrl);
        }catch(error){
            return res.status(400).json({error:"Invalid URL format"});
        }

        const expiresAt= new Date();
        expiresAt.setDate(expiresAt.getDate()+(validityDays ||30));

        let shortCode=customShortCode;
        if(!shortCode){
            shortCode=generateShortCode();
        }else{
            if (!/^[a-zA-Z0-9_-]{4,20}$/.test(shortCode)) {
                return res.status(400).json({ 
                    error: 'Short code must be 4-20 characters (letters, numbers, -_)'
                });
            }
        };
        
        const url=new Url({
            originalUrl,
            shortCode,
            expiresAt
        })
        await url.save();
        return res.status(201).json({
            message:"Short url created",
            shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}`,
            originalUrl,
            expiresAt,
            shortCode
        })
        
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const redirectToOrginalUrl = async(req,res)=>{
    const {shortCode}=req.params;
    try{
        const url=await Url.findOneAndUpdate(
            {shortCode},
            {
                $inc:{clicks:1}
            },
            {new:true}
        );
        if (!url) {
            return res.status(404).json({ 
                error: 'URL not found',
                solution: 'Check if the short code is correct'
            });
        }
        if (url.expiresAt && new Date() > url.expiresAt) {
            return res.status(410).json({ 
                error: 'This link has expired',
                action: 'Contact the link owner for a new one'
            });
        }

        res.redirect(301, url.originalUrl);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}