const asyncHandler = require('express-async-handler')
const moment = require('moment')

const User = require('../models/userModel')


exports.createUser =  asyncHandler(async (req, res, next) => {
	const user =await User.create(req.body)
    res.redirect('/')    


})


exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();

    res.render('index', { arr: users, moment: moment });
});


exports.oneUser =  asyncHandler(async(req,res,next)=>{
    const {id} = req.params

    const user = await User.findById(id)

res.render('user/view',{customer:user,moment: moment })

// res.status(200).json({user})

})



exports.updateOneUser = asyncHandler(async(req,res,next)=>{


    const updatedUser = await User.findByIdAndUpdate(req.params.id,
        req.body,
        {new:true,runValidators:true}
    )

if(!updatedUser){
    res.status(404).json({status:"error",data})
}



res.render('user/edit',{user:updatedUser})



})

exports.deleteUser = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    if (!ObjectId.isValid(id)) {
        return next(new ApiError(`Invalid ID format: ${id}`, 400));
      }
      
      const deletedUser = await User.findByIdAndDelete(id )
      
})



