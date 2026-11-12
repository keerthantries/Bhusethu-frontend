import { api } from "./api";

export async function fetchProperties() {
  const res = await api.get("/api/properties");
  return res.data || [];
}

export function displayImage(url) {
  if (!url || !url.includes("/image/upload/")) return url;
  return url.replace("/image/upload/", "/image/upload/e_trim,q_auto,f_auto/");
}

export function toCard(property) {
  const images = (property.images || []).map((img) => displayImage(img.url));
  return {
    id: property.id,
    title: property.title,
    location: property.location || "Location on request",
    type: property.type || "Property",
    price: property.price || "Price on request",
    badge: "Verified",
    image: images[0] || "",
    gallery: images,
    facts: [
      { label: "Type", value: property.type || "—" },
      { label: "Location", value: property.location || "—" },
      { label: "Images", value: String(images.length) },
    ],
    description:
      property.description ||
      "Contact our team for full details, documents and a site visit.",
  };
}
