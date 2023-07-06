import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: "Movie",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ movie: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (movieId) {
  const result = await this.aggregate([
    { $match: { movie: movieId } },
    {
      $group: {
        _id: null,
        AverageRating: { $avg: "$rating" },
        TotalRatings: { $sum: 1 },
      },
    },
  ]);

  try {
    await mongoose.model("Movie").findOneAndUpdate(
      { _id: movieId },
      {
        AverageRating: Math.ceil(result[0]?.AverageRating || 0),
        TotalRatings: result[0]?.TotalRatings || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.movie);
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.movie);
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
