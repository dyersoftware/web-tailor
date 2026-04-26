import { Link } from "react-router-dom";
import { navigate_paths } from "../../../resources/routes/paths-navigation.routes";

function CardComponent() {
  return (
    <div className="card max-w-96 bg-base-100 card-xs shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Tailor</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="justify-end card-actions">
          <Link
            className="btn btn-primary text-white"
            to={navigate_paths.customers_paths.customers}
          >
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
