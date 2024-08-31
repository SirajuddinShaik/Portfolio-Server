import Project from "../models/project.js";

export const getProjects = async (req, res) => {
  console.log(req);

  const projects = await Project.find({}).sort({ rank: -1 });
  res.status(200).json({ projects: projects });
};

export const addProject = async (req, res) => {
  try {
    console.log(req);
    const { title, imgName, description, link, isBlog, rank, demoLink, date } =
      req.body;
    const existingproject = await Project.findOne({ title: title });
    if (existingproject) {
      errors.emailError = "Email already exists";
      return res.status(400).json(errors);
    }
    const newProject = new Project({
      title: title,
      imgPath:
        "https://raw.githubusercontent.com/SirajuddinShaik/Images/main/project/" +
        imgName,
      description: description,
      link: link,
      isBlog: isBlog,
      rank: rank,
      demoLink: demoLink,
      date: date,
    });
    await newProject.save();
    return res.status(200).json({
      success: true,
      message: "Project registerd successfully",
      response: newProject,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    console.log(error);
    res.status(500).json(errors);
  }
};

export const removeProject = (req, res) => {
  try {
  } catch (error) {}
};
