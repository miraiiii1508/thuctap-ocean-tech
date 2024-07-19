import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  addProvinceAction,
  updateProvinceAction,
} from "app/redux/actions/LocationAction";
const useStyles = makeStyles({
  colorStyle: {
    color: "red",
  },
  iconClose: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});
const ProvincesDialog = ({ open, onClose, province }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const defaultValue = {
    code: "",
    name: "",
    area: "",
  };
  const [provinceFormData, setProvinceFormData] = useState(defaultValue);
  const [formStatus, setFormStatus] = useState("");
  useEffect(() => {
    setProvinceFormData(province);
    if (province && province.id) {
      setFormStatus("EDIT");
    } else {
      setFormStatus("ADD");
    }
  }, [province]);
  const handleOnChange = (e) => {
    setProvinceFormData({
      ...provinceFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleClose = () => {
    setProvinceFormData({});
    onClose();
  };
  const handleADdNewProvince = () => {
    dispatch(addProvinceAction(provinceFormData));
  };
  const handUpdateProvince = () => {
    dispatch(updateProvinceAction(provinceFormData));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (formStatus) {
      case "ADD":
        handleADdNewProvince();
        break;
      case "EDIT":
        handUpdateProvince();
        break;
      default:
        console.log("add");
    }
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">
          <span className="mb-20 styleColor">
            {(provinceFormData?.id ? t("general.update") : t("Add")) +
              " " +
              t("Tỉnh/Thành phố")}
          </span>
          <IconButton aria-label="close" className={classes.iconClose}>
            <CloseIcon color="error" onClick={onClose} />
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid className="mb-8" container spacing={1}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-8"
                  name="code"
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Mã Tỉnh/Thành phố
                    </span>
                  }
                  value={provinceFormData.code || ""}
                  onChange={handleOnChange}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["Vui lòng nhập mã Tỉnh/Thành Phố"]}
                  size="small"
                  variant="outlined"
                />
              </Grid>

              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-8"
                  name="name"
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Tên Tỉnh/Thành phố
                    </span>
                  }
                  value={provinceFormData.name || ""}
                  onChange={handleOnChange}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["Vui lòng nhập tên Tỉnh/Thành phố"]}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-8"
                  name="area"
                  type="number"
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Diện tích
                    </span>
                  }
                  value={provinceFormData.area || ""}
                  onChange={handleOnChange}
                  fullWidth
                  validators={["required", "minNumber:0"]}
                  errorMessages={[
                    "Vui lòng nhập diện tích",
                    "Diện tích không được âm",
                  ]}
                  size="small"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            style={{ justifyContent: "center" }}
            spacing={4}
            className="flex flex-end flex-middle"
          >
            <Button variant="contained" color="secondary" onClick={onClose}>
              {t("general.cancel")}
            </Button>
            <Button type="submit" color="primary" variant="contained">
              {provinceFormData?.id ? t("general.update") : t("general.save")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default ProvincesDialog;
