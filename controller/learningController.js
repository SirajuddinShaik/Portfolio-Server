import { TodaysLearning, LearningForm, Category } from "../models/learning.js";

export const getTodaysLearning = async (req, res) => {
  // console.log(req);

  const learnings = await TodaysLearning.find({});
  res.status(200).json({ learnings: learnings });
};

export const addTodaysLearning = async (req, res) => {
  try {
    const { title, description, date, str_date, category } = req.body;
    const newTodaysLearning = new TodaysLearning({
      title: title,
      description: description,
      date: date,
      str_date: str_date,
      category: category,
    });
    await newTodaysLearning.save();
    return res.status(200).json({
      success: true,
      message: "Learning Updated successfully",
      response: newTodaysLearning,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    console.log(error);
    res.status(500).json(errors);
  }
};

export const removeTodaysLearning = (req, res) => {
  try {
  } catch (error) {}
};

export const getLearning = async (req, res) => {
  const { category, keyword } = req.body;
  if (!category && !keyword) {
    const now = new Date();
    var start = new Date(now.setHours(0, 0, 0, 0)); // Set start to 12:00 AM of the current day
    var end = new Date(now.setHours(23, 59, 59, 999)); // Set end to 11:59 PM of the current day
    start.setDate(start.getDate() - 5);
    const docs = await TodaysLearning.find({
      date: {
        $gte: start,
        $lte: end,
      },
    });
    // console.log(docs);
    return res.status(200).json({
      success: true,
      learnings: docs.reverse(),
    });
  }

  try {
    const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(escapedKeyword, "i"); // 'i' for case insensitive
    var docs = [];
    if (category === "all") {
      docs = await TodaysLearning.find({
        $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
      });
    } else {
      docs = await TodaysLearning.find({
        category: category,
        $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
      });
    }
    return res.status(200).json({
      success: true,
      learnings: docs.reverse(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      learnings: [],
      message: "Server error",
    });
  }
};

export const getSaveData = async (req, res) => {
  try {
    const formData = await LearningForm.findById("owner");
    const categories = await Category.find({});
    return res.status(200).json({
      success: true,
      saveData: formData,
      categories: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
    });
  }
};

export const setSaveData = async (req, res) => {
  try {
    const { title, description, link, category } = req.body;
    await LearningForm.findByIdAndUpdate("owner", {
      title: title,
      description: description,
      link: link,
      category: category,
    });
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
    });
  }
};
