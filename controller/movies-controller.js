import Movie from '../Models/movies-schema.js'
import Review from '../Models/reviews-schema.js'


const postMovie=async(req,res)=>{
       

    // example in postman

    // {
    //     "MovieTitle":"Galaxy Man",
    //     "MovieDesc":"very interesting cat fight movie nd atacck from superman",
    //     "MovieMedia":"https://fr.web.img6.acsta.net/pictures/19/12/09/09/26/0965861.jpg"
    
    // }




        console.log(req.body)
        
        const body=req.body
       
        const saveflightdata=await new Movie(body).save();
        console.log('saved')
        res.status(200).json({message:'Event created Successfully'})
    
}
const getallmovies=async(req,res)=>{
    const allmovies = await Movie.find({})
    res.json({message:"Movie Data",allmovies})
}

const getthemoviebyid=async(req,res)=>{
    const id = req.params.id
    const moviedetails=await Movie.findById({_id:id})
    res.json({message:"Movie Data",moviedetails})
}

const postuserrating=async(req,res)=>{
    
    const rating=req.body.ratesubmittion
    const id =req.body.myid
    const movieid=req.body.id
    const review=await new Review( { rating:rating,user:id,movie:movieid} ).save();
    const totalratings=await Review.find({movie:movieid})

    
    const ratings=totalratings.map((singlerating)=>{
        return singlerating.rating
    })
    console.log(ratings)

    ratings.push(parseInt(rating))
    console.log(ratings)

    // const average = ratings => ratings.reduce((a, b) => a + b) / ratings.length;

    var total = 0;
for(var i = 0; i < ratings.length; i++) {
    total += ratings[i];
}
var avg = total / ratings.length;


    console.log(avg);
//     console.log(rating)
const finalaverage=Math.ceil(avg)
 


    
    const updateaaverga=await Movie.findByIdAndUpdate({_id:movieid},{AverageRating:finalaverage,TotalRatings:totalratings.length},{new:true})
   return  res.json({message:"rating posted"})
    
}


export {postMovie,getallmovies,getthemoviebyid,postuserrating}