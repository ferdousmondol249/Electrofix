const Payment = require('../Model/paymentModel'); 

const getSalesOverview = async (req, res) => {
  try {
    const salesOverview = await Payment.aggregate([
      {
        $project: {
          amount: 1,
          createdAt: 1,
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
      },
      {
        $group: {
          _id: "$date",
          totalSales: { $sum: "$amount" }, 
        },
      },
      {
        $sort: { _id: 1 }, 
      },
    ]);

    res.status(200).json(salesOverview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching sales overview", error });
  }
};

module.exports = getSalesOverview;
