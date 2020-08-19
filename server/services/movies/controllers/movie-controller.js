const { ObjectId } = require("mongodb");
const { checkDataInput } = require("../helpers/validation.js");

class MovieController {
  static async read(req, res, next) {
    try {
      const collection = req.collectionMovies;
      const moviesData = await collection.find().toArray();

      res.status(200).json({
        movies: moviesData,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async readById(req, res, next) {
    try {
      const collection = req.collectionMovies;
      const currentId = req.params.id;
      const moviesData = await collection.findOne({
        _id: ObjectId(currentId)
      });
      res.status(200).json({
        movies: moviesData,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async write(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const collection = req.collectionMovies;

      let checkInput = checkDataInput(req.body);
      if (checkInput[0] === true) {
        res.status(400).json({ error: checkInput[1] });
      } else {
        const newMovie = await collection.insertOne(req.body);
        res.status(201).json({
          message: "success add new movie",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const currentId = req.params.id;
      const collection = req.collectionMovies;

      let checkInput = checkDataInput(req.body);
      if (checkInput[0] === true) {
        res.status(400).json({ error: checkInput[1] });
      } else {
        const updatedData = await collection.updateOne(
          {
            _id: ObjectId(currentId),
          },
          {
            $set: {
              title: title,
              overview: overview,
              poster_path: poster_path,
              popularity: popularity,
              tags: tags,
            },
          }
        );
        res.status(200).json({
          message: "success update movie",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const currentId = req.params.id;
      const collection = req.collectionMovies;

      const deleteData = await collection.deleteOne({
        _id: ObjectId(currentId),
      });

      res.status(200).json({
        message: "success delete movie",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = MovieController;
