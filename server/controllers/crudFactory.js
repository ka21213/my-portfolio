// Shared controller functions keep the four CRUD APIs consistent.
export default function crudFactory(Model, label) {
  return {
    
    list: async (req, res) => {
      try {
        const records = await Model.find().sort({ createdAt: -1 });
        return res.json(records);
      } catch (error) {
        console.error(`Error retrieving ${label}:`, error);
        return res.status(500).json({
          message: "Internal server error.",
          error: error.message
        });
      }
    },


    read: async (req, res) => {
      try {
        const record = await Model.findById(req.params.id);
        if (!record) return res.status(404).json({ error: `${label} not found.` });
        res.json(record);
      } catch {
        res.status(400).json({ error: "Invalid record ID." });
      }
    },

    create: async (req, res) => {
      try {
        const record = await Model.create(req.body);
        res.status(201).json(record);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    update: async (req, res) => {
      try {
        const record = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        if (!record) return res.status(404).json({ error: `${label} not found.` });
        res.json(record);
      } catch (error) {
        res.status(400).json({ error: error.message || "Invalid record ID or data." });
      }
    },


  remove: async (req, res) => {
  try {
    const record = await Model.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        error: `${label} not found.`
      });
    }

    return res.status(200).json({
      message: `${label} deleted successfully.`
    });
  } catch (error) {
    console.error(`Error deleting ${label}:`, error);

    return res.status(400).json({
      error: error.message || "Could not delete record."
    });
  }
  },


    removeAll: async (req, res) => {
      try {
        const result = await Model.deleteMany({});
        res.json({ message: `Deleted ${result.deletedCount} ${label} record(s).` });
      } catch {
        res.status(500).json({ error: `Could not delete ${label} records.` });
      }
    }
  };
}
