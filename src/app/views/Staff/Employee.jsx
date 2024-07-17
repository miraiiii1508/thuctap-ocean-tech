import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "egret";
import { Grid } from "@material-ui/core";
import ManagerStaff from "./ManagerEmployee";

const Location = () => {
  const { t } = useTranslation();
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: t("Dashboard.manage"), path: "/directory/apartment" },
            { name: t("Nhân Viên") },
          ]}
        />
      </div>
      <Grid container>
        <ManagerStaff />
      </Grid>
    </div>
  );
};
export default Location;
