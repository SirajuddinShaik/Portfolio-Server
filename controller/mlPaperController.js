import MlPaper from "../models/mlpaper.js";

export const getMlPapers = async (req, res) => {
  console.log(req);

  const learnings = await MlPaper.find({});
  res.status(200).json({ learnings: learnings });
};

export const addMlPaper = async (req, res) => {
  try {
    const { title, description, date, link } = req.body;
    const newMlPaper = new MlPaper({
      title: title,
      description: description,
      date: date,
      link: link,
    });
    await newMlPaper.save();
    return res.status(200).json({
      success: true,
      message: "Paper Added successfully",
      response: newMlPaper,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    console.log(error);
    res.status(500).json(errors);
  }
};
