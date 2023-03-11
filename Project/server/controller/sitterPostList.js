const User = require("../model/User");
const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const Profile = require("../model/Profile");
const SitterPost = require("../model/PetSitterPost");

function formatDate(date) {
    return "Date: " +
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate();
}

const getSitterPost = async (req, res) => {
    // return selected option
    const queryBody = req.body;
    const query ={};
    // looking for have  or not , != mean we click the type for search
    if (queryBody.hasOwnProperty("province") && queryBody.province !== "- Select Province -"){
        query["profile.province"] = queryBody.province;
    }
    // AND
    if (queryBody.hasOwnProperty("city") && queryBody.city !== "- Select City -"){
        query["profile.city"] = queryBody.city;
    }
    //console.info(query);
    if (queryBody.hasOwnProperty("services") && queryBody.services !== "- Select Services -"){
        query["services"] = queryBody.services;
    }
    //
    if (queryBody.hasOwnProperty("pricemin") && queryBody.pricemin!== ""){
        if(!query.hasOwnProperty("rate")){
            query["rate"] ={};
        }
        query["rate"]["$gte"] =parseFloat(queryBody.pricemin);
    }
    if (queryBody.hasOwnProperty("pricemax") && queryBody.pricemax!== ""){
        if(!query.hasOwnProperty("rate")){
            query["rate"] ={};
        }
        query["rate"]["$lte"] = parseFloat(queryBody.pricemax);
    }
    //console.info(query);
    
    //connect 2 tables profiles and petpost
    const result = await SitterPost.aggregate([
        {
            $lookup: {
                from: "profiles",
                localField: "userID",
                foreignField: "userID",
                as: "profile"
            },   
        },
        {$unwind:"$profile"},
        {$match:query}
    ]);
    // console.info(result[1].profile[0]);
    //console.info(result);
    res.render("pages/listSitterPost", { result: result, fd: formatDate })
}

module.exports = {
    getSitterPost
};