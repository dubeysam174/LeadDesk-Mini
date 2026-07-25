const LeadRow = ({ lead, updateStatus }) => {
  return (
    <tr className="border-b">

      <td className="p-4">{lead.name}</td>

      <td className="p-4">{lead.email}</td>

      <td className="p-4">{lead.budget}</td>

      <td className="p-4">{lead.message}</td>

      <td className="p-4">
       <select
    value={lead.status}
    onChange={(e)=>updateStatus(lead.id,e.target.value)}
    className={`px-3 py-2 rounded-lg font-medium border outline-none
        ${
            lead.status==="New"
            ?"bg-blue-100 text-blue-700"

            :lead.status==="Contacted"
            ?"bg-yellow-100 text-yellow-700"

            :"bg-green-100 text-green-700"
        }`}
>
    <option value="New">
        New
    </option>

    <option value="Contacted">
        Contacted
    </option>

    <option value="Closed">
        Closed
    </option>

</select>
      </td>

    </tr>
  );
};

export default LeadRow;