module.exports = (mongoose, models) => {

  const projectSchema = new mongoose.Schema({
    name: String,
    url: String,
    imgSrc: String,
    date: {type: Date, default: Date.now},
    tags: [String],
    about: String
  });

  models.Project = mongoose.model('Project', projectSchema);
}
