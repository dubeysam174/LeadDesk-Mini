import LeadRow from "./LeadRow";

const LeadTable = ({ leads, updateStatus }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">

      <table className="w-full">
      
        <thead className="sticky top-0 bg-slate-100 z-10">

          <tr>

            <th className="p-4 text-left">Name</th>

            <th className="p-4 text-left">Email</th>

            <th className="p-4 text-left">Budget</th>

            <th className="p-4 text-left">Message</th>

            <th className="p-4 text-left">Status</th>

          </tr>

        </thead>

        <tbody>

          {leads.length > 0 ? (
            leads.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                updateStatus={updateStatus}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-8 text-slate-500"
              >
                No Leads Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
};

export default LeadTable;