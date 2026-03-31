import GenericManager from "../../components/admin/GenericManager";
import { useSiteContent } from "../../context/SiteContentContext";

const fields = [
  { name: "title", label: "Role Title" },
  { name: "location", label: "Location" },
  { name: "type", label: "Employment Type" },
  { name: "summary", label: "Job Description", type: "textarea", long: true },
];

export default function CareerPortal() {
  const { content, addItem, updateItem, deleteItem } = useSiteContent();

  return (
    <GenericManager
      title="Career Portal"
      description="Create and maintain open roles that appear in the careers section."
      items={content.careers}
      fields={fields}
      searchKeys={["title", "location", "summary", "type"]}
      createLabel="Add Role"
      entityLabel="Role"
      onAdd={(payload) => addItem("careers", payload)}
      onUpdate={(id, payload) => updateItem("careers", id, payload)}
      onDelete={(id) => deleteItem("careers", id)}
    />
  );
}
