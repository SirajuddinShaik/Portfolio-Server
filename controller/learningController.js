import {
  TodaysLearning,
  LearningForm,
  Category,
  Test,
} from "../models/learning.js";

export const getTodaysLearning = async (req, res) => {
  // console.log(req);

  const learnings = await TodaysLearning.find({});
  res.status(200).json({ learnings: learnings });
};

export const addTodaysLearning = async (req, res) => {
  try {
    const { title, description, date, str_date, category, link } = req.body;
    const newTodaysLearning = new TodaysLearning({
      title: title,
      description: description,
      date: date,
      link: link,
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
function validateInterviewQuestions(questions) {
  const errors = [];

  questions.forEach((question, index) => {
    switch (question.type) {
      case "mcq":
        if (
          !question.question ||
          !Array.isArray(question.options) ||
          question.options.length === 0 ||
          !question.correct_option ||
          !question.explanation
        ) {
          errors.push(index);
        }
        break;
      case "scenario":
        if (
          !Array.isArray(question.dialogue) ||
          question.dialogue.length === 0 ||
          !question.dialogue.every((d) => d.speaker && d.text)
        ) {
          errors.push(index);
        }
        break;
      case "qa":
        if (!question.question || !question.answer || !question.explanation) {
          errors.push(index);
        }
        break;
      case "true_false":
        if (
          !question.statement ||
          !question.correct_answer ||
          !question.explanation
        ) {
          errors.push(index);
        }
        break;
      case "fill_in_blank":
        if (
          !question.sentence ||
          !question.correct_answer ||
          !question.explanation
        ) {
          errors.push(index);
        }
        break;
      case "coding":
        if (
          !question.problem ||
          !question.expected_solution ||
          !question.explanation
        ) {
          errors.push(index);
        }
        break;
      case "case_study":
        if (!question.scenario || !question.approach) {
          errors.push(index);
        }
        break;
      case "matching":
        if (
          !Array.isArray(question.left_column) ||
          !Array.isArray(question.right_column) ||
          !question.correct_matches ||
          typeof question.correct_matches !== "object"
        ) {
          errors.push(index);
        }
        break;
      default:
        errors.push(index);
    }
  });

  return errors;
}

// Example usage:
const questions = [
  {
    type: "mcq",
    question: "What is the time complexity of a binary search algorithm?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    correct_option: "O(log n)",
    explanation:
      "Binary search operates by dividing the search interval in half, resulting in logarithmic time complexity.",
  },
  {
    type: "mcq",
    question: "What is the time complexity of a binary search algorithm?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    correct_option: "O(log n)",
    explanation:
      "Binary search operates by dividing the search interval in half, resulting in logarithmic time complexity.",
  },
  {
    type: "mcq",
    question: "What is the time complexity of a binary search algorithm?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    correct_option: "O(log n)",
    explanation:
      "Binary search operates by dividing the search interval in half, resulting in logarithmic time complexity.",
  },
  {
    type: "mcq",
    question: "What is the time complexity of a binary search algorithm?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    correct_option: "O(log n)",
    explanation:
      "Binary search operates by dividing the search interval in half, resulting in logarithmic time complexity.",
  },
  {
    type: "mcq",
    question: "What is the time complexity of a binary search algorithm?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    correct_option: "O(log n)",
    explanation:
      "Binary search operates by dividing the search interval in half, resulting in logarithmic time complexity.",
  },
  {
    type: "scenari",
    dialogue: [
      {
        speaker: "interviewer",
        text: "How would you handle missing data in a dataset?",
      },
      {
        speaker: "interviewe",
        text: "I would use imputation techniques or remove rows with missing values.",
      },
    ],
  },
];

// var errors = validateInterviewQuestions(questions);
// errors.forEach((i) => {
//   questions.pop(i);
// });
// console.log(questions.length);
export const addTest = async (req, res) => {
  try {
    const { json_str, description, date } = req.body;
    var json_data = JSON.parse(json_str);

    var daily_practice = json_data.daily_practice;
    var errors = validateInterviewQuestions(json_data.daily_practice);
    if (errors.length != 0) {
      console.log(errors);
      errors.forEach((i) => {
        daily_practice.pop(i);
      });
    }
    const newTest = new Test({
      test: JSON.stringify(daily_practice),
      description: json_data.description,
      date: new Date(),
      completed: false,
      selected: false,
    });
    await newTest.save();
    return res.status(200).json({
      success: true,
      message: "Test added successfully!" + " Errors " + errors.length,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getTest = async (req, res) => {
  try {
    var test = await Test.findOne({ completed: false, selected: true });
    if (test) {
      return res.status(200).json({
        success: true,
        data: {
          id: test.id,
          description: test.description,
          questions: JSON.parse(test.test),
          date: test.date,
        },
      });
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    var test = await Test.findOneAndUpdate(
      { completed: false, selected: false }, // Replace "owner" with the actual owner ID or search criteria
      {
        $set: {
          selected: true,
          date: currentDate,
          str_date: formattedDate,
        },
      }, // Fields to update
      { new: true } // This option returns the modified document
    );
    if (test) {
      return res.status(200).json({
        success: true,
        data: {
          id: test.id,
          description: test.description,
          questions: JSON.parse(test.test),
          date: test.date,
        },
      });
    }

    return res.status(200).json({
      success: false,
      message: "No Tests Available",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
    });
  }
};

export const completeTest = async (req, res) => {
  const { id } = req.body;
  await Test.findOneAndUpdate(
    { _id: id }, // Replace "owner" with the actual owner ID or search criteria
    {
      $set: {
        completed: true,
      },
    }, // Fields to update
    { new: true } // This option returns the modified document
  );
};
