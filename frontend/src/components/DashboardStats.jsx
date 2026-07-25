const DashboardStats = ({ leads }) => {
  const total = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contacted = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const closed = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  const stats = [
    {
      title: "Total Leads",
      value: total,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "New",
      value: newLeads,
      color: "bg-sky-100 text-sky-700",
    },
    {
      title: "Contacted",
      value: contacted,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Closed",
      value: closed,
      color: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl shadow border border-slate-200 p-6"
        >
          <p className="text-slate-500 text-sm">
            {stat.title}
          </p>

          <div
            className={`inline-block mt-4 px-4 py-2 rounded-lg font-bold text-2xl ${stat.color}`}
          >
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;