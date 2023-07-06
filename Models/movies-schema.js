import mongoose from "mongoose";


const MovieSchema = new mongoose.Schema(
    {
        MovieTitle: {
            type: String,
        },
        MovieDesc: {
            type: String,
        },
        MovieMedia: { type: String },
        TotalRatings: { type: String, ref: "Review" },
        AverageRating:{type:Number , default:0}
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

MovieSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'movie',
    justOne: false,
  });
  
  MovieSchema.pre('remove', async function (next) {
    await this.model('Review').deleteMany({ movie: this._id });
  });




const Movie = mongoose.model('Movie', MovieSchema)

export default Movie