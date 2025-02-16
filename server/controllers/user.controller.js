// import {User} from "../models/user.model.js";

// export const register = async (req,res) => {
//     try {
       
//         const {name, email, password} = req.body; // 
//         if(!name || !email || !password){
//             return res.status(400).json({
//                 success:false,
//                 message:"All fields are required."
//             })
//         }
//         const user = await User.findOne({email});
//         if(user){
//             return res.status(400).json({
//                 success:false,
//                 message:"User already exist with this email."
//             })
//         }
//         await User.create({
//             name,
//             email,
//             password
//         });
//         return res.status(201).json({
//             success:true,
//             message:"Account created successfully."
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Failed to register"
//         })
//     }
// }

// export const login = async (req,res) => {
//     try {
//         const {email, password} = req.body;
//         if(!email || !password){
//             return res.status(400).json({
//                 success:false,
//                 message:"All fields are required."
//             })
//         }
//         console.log("Starting database query...");
        
//         const user = await User.findOne({ email });
        
//         // Log after database query
//         console.log("Database query completed.");

//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }
        
//         // Check if password matches
//         if (user.password !== password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Incorrect email or password"
//             });
//         }

//         // Successful login
//         return res.status(200).json({
//             success: true,
//             message: "Login successful",
//             user
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to login"
//         });
//     }
// }
// // export const logout = async (_,res) => {
// //     try {
// //         return res.status(200).cookie("token", "", {maxAge:0}).json({
// //             message:"Logged out successfully.",
// //             success:true
// //         })
// //     } catch (error) {
// //         console.log(error);
// //         return res.status(500).json({
// //             success:false,
// //             message:"Failed to logout"
// //         }) 
// //     }
// // }
// // export const getUserProfile = async (req,res) => {
// //     try {
// //         const userId = req.id;
// //         const user = await User.findById(userId).select("-password").populate("enrolledCourses");
// //         if(!user){
// //             return res.status(404).json({
// //                 message:"Profile not found",
// //                 success:false
// //             })
// //         }
// //         return res.status(200).json({
// //             success:true,
// //             user
// //         })
// //     } catch (error) {
// //         console.log(error);
// //         return res.status(500).json({
// //             success:false,
// //             message:"Failed to load user"
// //         })
// //     }
// // }
// // export const updateProfile = async (req,res) => {
// //     try {
// //         const userId = req.id;
// //         const {name} = req.body;
// //         const profilePhoto = req.file;

// //         const user = await User.findById(userId);
// //         if(!user){
// //             return res.status(404).json({
// //                 message:"User not found",
// //                 success:false
// //             }) 
// //         }
// //         // extract public id of the old image from the url is it exists;
// //         if(user.photoUrl){
// //             const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
// //             deleteMediaFromCloudinary(publicId);
// //         }

// //         // upload new photo
// //         const cloudResponse = await uploadMedia(profilePhoto.path);
// //         const photoUrl = cloudResponse.secure_url;

// //         const updatedData = {name, photoUrl};
// //         const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

// //         return res.status(200).json({
// //             success:true,
// //             user:updatedUser,
// //             message:"Profile updated successfully."
// //         })

// //     } catch (error) {
// //         console.log(error);
// //         return res.status(500).json({
// //             success:false,
// //             message:"Failed to update profile"
// //         })
// //     }
// // }


import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req,res) => {
    try {
       
        const {name, email, password} = req.body; // patel214
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exist with this email."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password:hashedPassword
        });
        return res.status(201).json({
            success:true,
            message:"Account created successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to register"
        })
    }
}
export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            });
        }
        generateToken(res, user, `Welcome back ${user.name}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}
export const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        }) 
    }
}



export const getUserProfile = async(req,res) => {
    try {
        // we first check that user is looged in or not
        // if not then we cant load his profile page
        // so we make a middleware named isAuthenticated in middlewre folder teel that user is authenticated or not
        // we get user Id from req.id in middleware is Authenticted, we save user id in the req.id
        const userId = req.id;
        const user = await User.findById(userId)//.select("-password").populate("enrolledCourses"); //hume userId se password nhi chahiye so - that & we need enrolled courses so we need that
        // so we populate that
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
     } 
     catch (error) {
        console.error("Error fetching profile:", error); // Log the error
        return res.status(500).json({
            success:false,
            message:"Failed to get user profile"
        })
    }
}
