import GenericManager from "../../components/admin/GenericManager";
import { useSiteContent } from "../../context/SiteContentContext";

const fields = [
  { name: "title", label: "Service Title" },
  { name: "category", label: "Category" },
  { name: "icon", label: "Lucide Icon" },
  { name: "description", label: "Description", type: "textarea", long: true },
];

export default function ServicesManager() {
  const { content, addItem, updateItem, deleteItem } = useSiteContent();

  return (
    <GenericManager
      title="Services Manager"
      description="Create and manage the services shown in the public services grid."
      items={content.services}
      fields={fields}
      searchKeys={["title", "category", "description"]}
      createLabel="Add Service"
      entityLabel="Service"
      onAdd={(payload) => addItem("services", payload)}
      onUpdate={(id, payload) => updateItem("services", id, payload)}
      onDelete={(id) => deleteItem("services", id)}
    />
  );
}
