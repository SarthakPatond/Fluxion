import GenericManager from "../../components/admin/GenericManager";
import { useSiteContent } from "../../context/SiteContentContext";

const fields = [
  { name: "name", label: "Asset Name" },
  { name: "type", label: "Media Type" },
  { name: "usage", label: "Usage" },
  { name: "url", label: "Asset URL", type: "textarea", long: true },
];

export default function MediaManager() {
  const { content, addItem, updateItem, deleteItem } = useSiteContent();

  return (
    <GenericManager
      title="Media Manager"
      description="Track media records used for homepage visuals, portfolio cards, and supporting assets."
      items={content.mediaItems}
      fields={fields}
      searchKeys={["name", "type", "usage", "url"]}
      onAdd={(payload) => addItem("mediaItems", payload)}
      onUpdate={(id, payload) => updateItem("mediaItems", id, payload)}
      onDelete={(id) => deleteItem("mediaItems", id)}
    />
  );
}
