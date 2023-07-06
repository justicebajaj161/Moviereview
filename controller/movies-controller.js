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

const postuserrating = async (req, res) => {
    const rating = req.body.ratesubmittion;
    const userId = req.body.myid;
    const movieId = req.body.id;
  
    
    if (!rating) {
      return res.json({ message: "Please provide a rating value" });
    }
  
   
    const existingReview = await Review.findOne({ user: userId, movie: movieId });
    if (existingReview) {
      return res.json({ message: "User has already submitted a review for this movie" });
    }
  
    const review = await new Review({ rating: rating, user: userId, movie: movieId }).save();
    const totalRatings = await Review.find({ movie: movieId });
  
    const ratings = totalRatings.map((singlerating) => {
      return singlerating.rating;
    });
  
    ratings.push(parseInt(rating));
  
    var total = 0;
    for (var i = 0; i < ratings.length; i++) {
      total += ratings[i];
    }
    var avg = total / ratings.length;
  
    const finalaverage = Math.ceil(avg);
  
    const updateAverage = await Movie.findByIdAndUpdate(
      { _id: movieId },
      { AverageRating: finalaverage, TotalRatings: totalRatings.length },
      { new: true }
    );
  
    return res.json({ message: "Rating posted" });
  };
  
  


export {postMovie,getallmovies,getthemoviebyid,postuserrating}