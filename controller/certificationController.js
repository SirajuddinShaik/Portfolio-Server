import Certification from "../models/certifications.js";
export const getCertifications = async (req, res) => {
  // console.log(req);

  const certifications = await Certification.find({}).sort({
    completeDate: -1,
  });
  res.status(200).json({ certifications: certifications });
};

export const addCertification = async (req, res) => {
  try {
    const {
      name,
      certificate,
      instructor,
      image,
      duration,
      courseLink,
      difficulty,
      completeDate,
      description,
      completionPercentage,
    } = req.body;

    const newCertifications = new Certification({
      name: name,
      certificate: certificate,
      instructor: instructor,
      image:
        "https://raw.githubusercontent.com/SirajuddinShaik/Images/main/certification/" +
        image,
      duration: duration,
      courseLink: courseLink,
      difficulty: difficulty,
      completeDate: completeDate,
      description: description,
      completionPercentage: completionPercentage,
    });
    await newCertifications.save();
    return res.status(200).json({
      success: true,
      message: "Learning Updated successfully",
      response: newCertifications,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    console.log(error);
    res.status(500).json(errors);
  }
};
