import { useParams } from "react-router-dom";

const DynamiRestaurant = () => {
  const { id } = useParams();
  console.log(id);
  return <div>DynamiRestaurant</div>;
};

export default DynamiRestaurant;
