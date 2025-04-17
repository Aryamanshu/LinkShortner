import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { URI } from "@/source";

// Custom components
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStats from "@/components/DashboardStats";
import LinkActions from "@/components/LinkActions";
import EnhancedLinkTable from "@/components/EnhancedLinkTable";
import AddLinkModal from "@/components/AddLinkModal";
import QRCodeModal from "@/components/QRCodeModal";




export default function Dashboard() {
  const router = useRouter();
  const { slug } = router.query;

  // State
  const [linkData, setLinkData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState("");
  const [selectedShortCode, setSelectedShortCode] = useState(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [userData, setUserData] = useState(null);

  // Set base URL for short links
  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      setBaseUrl(`${origin}/s/`);
    }
  }, []);

  // Fetch user data and links
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URI}/api/getlinks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID: slug }),
      });

      const result = await response.json();

      if (response.ok) {
        setLinkData(result?.data.links || []);
        setUserData({
          username: "User" // You can add more user data here if available
        });
      } else {
        toast.error(result.error || "Failed to fetch links");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("An error occurred while fetching your links");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchUserData();
    }
  }, [slug]);

  // Calculate stats for the dashboard
  const calculateStats = () => {
    if (!linkData || linkData.length === 0) {
      return {
        totalLinks: 0,
        activeLinks: 0,
        totalClicks: 0,
        mostPopular: null
      };
    }

    const activeLinks = linkData.filter(link => link.status === 'active').length;
    const totalClicks = linkData.reduce((sum, link) => sum + (link.clicks || 0), 0);

    // Find most popular link (most clicks)
    let mostPopular = linkData[0];
    linkData.forEach(link => {
      if ((link.clicks || 0) > (mostPopular.clicks || 0)) {
        mostPopular = link;
      }
    });

    return {
      totalLinks: linkData.length,
      activeLinks,
      totalClicks,
      mostPopular
    };
  };

  // Handle adding a new link
  const handleAddLink = async ({ title, link }) => {
    setIsAddingLink(true);

    try {
      const response = await fetch(`${URI}/api/addlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: slug,
          title,
          link,
          status: "active"
        })
      });

      const result = await response.json();

      if (response.ok) {
        setLinkData(result.data.links);
        toast.success("Link added successfully");
        setIsAddLinkModalOpen(false);
      } else {
        toast.error(result.error || "Failed to add link");
      }
    } catch (error) {
      console.error("Error adding link:", error);
      toast.error("An error occurred while adding the link");
    } finally {
      setIsAddingLink(false);
    }
  };

  // Handle copying short URL to clipboard
  const handleCopyShortUrl = (shortCode) => {
    if (!shortCode) return;

    const shortUrl = `${baseUrl}${shortCode}`;
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch(err => {
        console.error('Error copying text:', err);
        toast.error("Failed to copy link");
      });
  };

  // Handle generating QR code
  const handleGenerateQR = (shortCode) => {
    if (!baseUrl || !shortCode) {
      toast.error("No short URL available for QR code");
      return;
    }

    setSelectedShortCode(shortCode);
    setIsQrModalOpen(true);
  };

  // Handle toggling link status (active/inactive)
  const handleToggleStatus = async (linkId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

      const response = await fetch(`${URI}/api/updatelink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: slug,
          linkId: linkId,
          updates: { status: newStatus }
        })
      });

      const result = await response.json();

      if (response.ok) {
        setLinkData(result.data.links);
        toast.success(`Link ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
      } else {
        toast.error(result.error || "Failed to update link status");
      }
    } catch (error) {
      console.error("Error toggling link status:", error);
      toast.error("An error occurred while updating link status");
    }
  };

  // Handle deleting a link
  const handleDeleteLink = async (linkId, linkTitle) => {
    try {
      // Confirm deletion with the user
      if (!confirm(`Are you sure you want to delete the link "${linkTitle}"? This action cannot be undone.`)) {
        return;
      }

      const response = await fetch(`${URI}/api/deletelink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: slug,
          linkId: linkId
        })
      });

      const result = await response.json();

      if (response.ok) {
        setLinkData(result.data.links);
        toast.success("Link deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete link");
      }
    } catch (error) {
      console.error("Error deleting link:", error);
      toast.error("An error occurred while deleting the link");
    }
  };

  return (
    <DashboardLayout title="Dashboard | TinyHost" user={userData}>
      <div className="space-y-8">
        {/* Dashboard Stats */}
        <DashboardStats stats={calculateStats()} />

        {/* Link Actions */}
        <LinkActions onAddLink={() => setIsAddLinkModalOpen(true)} />

        {/* Links Table */}
        <EnhancedLinkTable
          links={linkData}
          isLoading={isLoading}
          onCopy={handleCopyShortUrl}
          onGenerateQR={handleGenerateQR}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteLink}
          baseUrl={baseUrl}
          onAddLink={() => setIsAddLinkModalOpen(true)}
        />
      </div>

      {/* Add Link Modal */}
      <AddLinkModal
        isOpen={isAddLinkModalOpen}
        onClose={() => setIsAddLinkModalOpen(false)}
        onSubmit={handleAddLink}
        isLoading={isAddingLink}
      />

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        url={selectedShortCode ? `${baseUrl}${selectedShortCode}` : ''}
        title="Your Short Link QR Code"
      />
    </DashboardLayout>
  );
}
