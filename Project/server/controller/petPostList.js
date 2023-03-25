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

const getPetPost = async (req, res) => {
    // return selected option
    const queryBody = req.body;
    const query ={};
    // looking for have pet type or not , != mean we click the type for search
    // ** check if valuse of database is exist then check if select button is choose or not **
    // 
    if (queryBody.hasOwnProperty("province") && queryBody.province !== "- Select Province -"){
        query["profile.province"] = queryBody.province;
    }
    // AND
    if (queryBody.hasOwnProperty("city") && queryBody.city !== "- Select City -"){
        query["profile.city"] = queryBody.city;
    }
    if (queryBody.hasOwnProperty("petType") && queryBody.petType !== "- Select Type -"){
        query["profile.petType"] = queryBody.petType;
    }
    if (queryBody.hasOwnProperty("petAge") && queryBody.petAge !== "- Select Age -"){
        query["profile.petAge"] = queryBody.petAge;
    }
    if (queryBody.hasOwnProperty("petWeight") && queryBody.petWeight !== "- Select Weight -"){
        query["profile.petWeight"] = queryBody.petWeight;

    }
    //console.log(query);
    
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
    res.render("pages/listPetPost", { result: result, fd: formatDate })
    // Display filtered results
    //console.log(result);
}

module.exports = {
    getPetPost
};
