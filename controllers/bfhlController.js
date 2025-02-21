const processData = (req, res) => {
  try {
      const { full_name, dob, email, roll_number, data } = req.body;

      if (!full_name || !dob || !email || !roll_number || !Array.isArray(data)) {
          return res.status(400).json({
              is_success: false,
              message: "Invalid input. Required fields: full_name, dob, email, roll_number, and an array of data.",
          });
      }

      const user_id = `${full_name.split(" ").join("_")}_${dob}`;

      let numbers = [];
      let alphabets = [];

      data.forEach((item) => {
          if (!isNaN(item)) {
              numbers.push(item);
          } else if (typeof item === "string" && item.length === 1 && /[a-zA-Z]/.test(item)) {
              alphabets.push(item);
          }
      });

      const highest_alphabet = alphabets.length
          ? [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1).pop()]
          : [];

      return res.status(200).json({
          is_success: true,
          user_id,
          email,
          roll_number,
          numbers,
          alphabets,
          highest_alphabet,
      });

  } catch (error) {
      return res.status(500).json({
          is_success: false,
          message: "Internal server error",
      });
  }
};

const getOperationCode = (req, res) => {
  return res.status(200).json({ operation_code: 1 });
};

module.exports = { processData, getOperationCode };
