import MlPaper from "../models/mlpaper.js";

export const getMlPapers = async (req, res) => {
  const papers = await MlPaper.find({});
  res.status(200).json({ papers: papers });
};

export const addMlPaper = async (req, res) => {
  try {
    const { title, refLink, date, link } = req.body;
    const newMlPaper = new MlPaper({
      title: title,
      refLink: refLink,
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
