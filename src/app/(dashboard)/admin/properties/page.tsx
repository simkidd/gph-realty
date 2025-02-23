import AdminPropertiesList from "../../components/properties/AdminPropertiesList";
import AdminPropertyHeader from "../../components/properties/AdminPropertyHeader";

const PropertiesPage = () => {
  return (
    <div className="p-6 container mx-auto relative">
      <AdminPropertyHeader />

      <div className="relative">
        <AdminPropertiesList />
      </div>
    </div>
  );
};

export default PropertiesPage;
