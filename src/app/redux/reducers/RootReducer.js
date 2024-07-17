import { combineReducers } from "redux";
import DistrictReducer from "./DistrictReducer";
import EcommerceReducer from "./EcommerceReducer";
import LayoutReducer from "./LayoutReducer";
import LoginReducer from "./LoginReducer";
import NotificationReducer from "./NotificationReducer";
import ProvinceReduces from "./ProvinceReduces";
import ScrumBoardReducer from "./ScrumBoardReducer";
import UserReducer from "./UserReducer";
import WardReducer from "./WardReducer";
import EmployeesReducer from "./EmployeesReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  provinces: ProvinceReduces,
  district: DistrictReducer,
  Wards: WardReducer,
  employees: EmployeesReducer,
});

export default RootReducer;
