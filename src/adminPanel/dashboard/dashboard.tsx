
import ProductList from "../productList/productList";
const AdminDashboard = () => {
  return (
    <>
      <div className="w-full h-screen overflow-y-scroll">
        <div className="w-full">
         <ProductList/>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
