import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const Location = EgretLoadable({
  loader: () => import("./Location"),
});
const ViewComponent = withTranslation()(Location);

const LocationRouter = [
  {
    path: ConstantList.ROOT_PATH + "location/menu",
    exact: true,
    component: ViewComponent,
  },
];

export default LocationRouter;
