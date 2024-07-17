import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const Staff = EgretLoadable({
  loader: () => import("./Employee"),
});
const ViewComponent = withTranslation()(Staff);

const StaffRouter = [
  {
    path: ConstantList.ROOT_PATH + "staff/menu",
    exact: true,
    component: ViewComponent,
  },
];

export default StaffRouter;
