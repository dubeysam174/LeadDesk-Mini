import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../api/axios";

import DashboardNavbar from "../components/DashboardNavbar";
import SearchBar from "../components/SearchBar";
import LeadTable from "../components/LeadTable";
import DashboardStats from "../components/DashboardStats";

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Leads
  const fetchLeads = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/leads", {
        params: {
          search,
        },
      });

      setLeads(data.leads);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch leads"
      );
    } finally {
      setLoading(false);
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/leads/${id}/status`, {
        status,
      });

      // Update UI instantly
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id
            ? {
                ...lead,
                status,
              }
            : lead
        )
      );

      toast.success("Status updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update status"
      );
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-100">

      <DashboardNavbar />
      <DashboardStats leads={leads} />

<div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-6">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        {loading ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : (
          <LeadTable
            leads={leads}
            updateStatus={updateStatus}
          />
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;