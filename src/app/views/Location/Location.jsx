import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "egret";
import { Grid } from "@material-ui/core";
import Provinces from './Provices/Province';
import Districts from './District/District';
import Wards from './Ward/Ward';

const Location =()=>{
    const { t } = useTranslation();
    return (
        <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: t("Dashboard.manage"), path: "/directory/apartment" },
            { name: t("Địa chỉ") },
          ]}
        />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Provinces/>
        </Grid>
        <Grid item xs={4}>
          <Districts/>
        </Grid>
        <Grid item xs={4}>
          <Wards/>
        </Grid>
      </Grid>
    </div>
    )
}
export default Location