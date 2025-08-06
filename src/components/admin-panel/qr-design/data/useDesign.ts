import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import type { Design } from "./type";

type DesignStatus = "available" | "comingSoon" | "unavailable";

export const useDesigns = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const token = Cookies.get("accessToken");
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_BASE_URL
          }/QrCodeDesign/get-all-QrCodeDesign`,
          {
            headers: { Authorization: token },
          }
        );

        const rawDesigns = res.data?.data?.result;

        if (!Array.isArray(rawDesigns)) {
          throw new Error("Invalid design list");
        }

        type RawDesign = {
          _id: string;
          name: string;
          description: string;
          image: string;
          status: string;
          category: string;
          price: number;
        };

        const mappedDesigns: Design[] = rawDesigns.map((item: RawDesign) => ({
          id: item._id,
          name: item.name,
          description: item.description,
          imageUrl: item.image,
          status: item.status?.toLowerCase() as DesignStatus,
          category: item.category,
          price: item.price,
        }));

        setDesigns(mappedDesigns);
        setError(null);
      } catch (err: unknown) {
        console.error("Failed to fetch designs", err);
        setError("Failed to fetch designs");
        setDesigns([]); // Ensure it's always an array
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const availableDesigns = designs.filter(
    (design) => design.status === "available"
  );
  const comingSoonDesigns = designs.filter(
    (design) => design.status === "comingSoon"
  );
  const unavailableDesigns = designs.filter(
    (design) => design.status === "unavailable"
  );

  const addDesign = (newDesign: Partial<Design>) => {
    const design: Design = {
      id: `design-${Date.now()}`,
      name: newDesign.name || "Untitled Design",
      description: newDesign.description || "",
      imageUrl: newDesign.imageUrl || "",
      status: newDesign.status || "available",
      category: newDesign.category || "",
      price: newDesign.price,
    };

    setDesigns((prev) => [...prev, design]);
  };

  const updateDesign = (id: string, updatedData: Partial<Design>) => {
    setDesigns((prev) =>
      prev.map((design) =>
        design.id === id ? { ...design, ...updatedData } : design
      )
    );
  };

  const changeDesignStatus = (id: string, newStatus: DesignStatus) => {
    updateDesign(id, { status: newStatus });
  };

  const removeDesign = (id: string) => {
    setDesigns((prev) => prev.filter((design) => design.id !== id));
  };

  return {
    designs,
    availableDesigns,
    comingSoonDesigns,
    unavailableDesigns,
    addDesign,
    updateDesign,
    changeDesignStatus,
    removeDesign,
    loading,
    error,
  };
};
