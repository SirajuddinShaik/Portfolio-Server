import Learning from "../models/learning.js";
import TodaysLearning from "../models/learning.js";

export const getTodaysLearning = async (req, res) => {
  console.log(req);

  const learnings = await TodaysLearning.find({});
  res.status(200).json({ learnings: learnings });
};

export const addTodaysLearning = async (req, res) => {
  try {
    const { title, description, date, str_date } = req.body;
    const newTodaysLearning = new TodaysLearning({
      title: title,
      description: description,
      date: date,
      str_date: str_date,
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
  const { fromDate, toDate } = req.body;
  var start, end;
  if (fromDate == null || toDate == null) {
    const now = new Date();
    start = new Date(now.setHours(0, 0, 0, 0)); // Set start to 12:00 AM of the current day
    end = new Date(now.setHours(23, 59, 59, 999)); // Set end to 11:59 PM of the current day
    start.setDate(start.getDate() - 5);
  } else {
    start = new Date(fromDate);
    end = new Date(toDate);

    // Set start to 12:00 AM of the fromDate
    start.setHours(0, 0, 0, 0);
    // Set end to 11:59 PM of the toDate
    end.setHours(23, 59, 59, 999);
  }
  console.log(start, end);
  try {
    const docs = await Learning.find({
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: true,
      learnings: [],
    });
  }
};
