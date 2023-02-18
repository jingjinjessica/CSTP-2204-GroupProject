const User = require("../model/User");
const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const Profile = require("../model/Profile");
const PetPost = require("../model/PetPost");

function formatDate(date) {
    return "Date: " +
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate();
}

const getPost = async (req, res) => {
    // return selected option
    const queryBody = req.body;
    const query ={};
    // looking for have pet type or not , != mean we click the type for search
    if (queryBody.hasOwnProperty("petType") && queryBody.petType !== "any"){
        query["profile.petType"] = queryBody.petType;
    }
    // if (queryBody.hasOwnProperty("province") && queryBody.province !== "any"){
    //     query["profile.province"] = queryBody.;
    // }
    // AND 
    if (queryBody.hasOwnProperty("weight") && queryBody.weight !== "any"){
        query["profile.petWeight"] = queryBody.weight;
    }
    if (queryBody.hasOwnProperty("age") && queryBody.age !== "any"){
        query["profile.petAge"] = queryBody.age;
    }

    //connect 2 tables profiles and petpost
    const result = await PetPost.aggregate([
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
    res.render("pages/list", { result: result, fd: formatDate })
}


module.exports = {
    getPost
};
