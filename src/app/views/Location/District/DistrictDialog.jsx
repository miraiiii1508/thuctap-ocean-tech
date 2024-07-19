import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  MenuItem,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type } from "jquery";
import {
  addDistrictAction,
  updateDistrictAction,
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
const DistrictsDialog = ({ open, onClose, district }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const defaultValue = {
    code: "",
    name: "",
    area: "",
    provinceDto: {
      id: "",
    },
  };
  const [districtFormData, setDistrictFormData] = useState(defaultValue);
  const [formStatus, setFormStatus] = useState("");
  const provincesData = useSelector((state) => state.provinces.provinces);
  const dataTable = provincesData.map((province) => ({ ...province }));
  const dispatch = useDispatch();
  useEffect(() => {
    setDistrictFormData(district);
    if (district && district.id) {
      setFormStatus("EDIT");
    } else {
      setFormStatus("ADD");
    }
  }, [district]);
  const handleAddNewDistrict = () => {
    dispatch(addDistrictAction(districtFormData));
  };
  const handleUpdateDistrict = () => {
    dispatch(updateDistrictAction(districtFormData));
  };
  const handleClose = () => {
    setDistrictFormData({});
    onClose();
  };
  const handleSubmit = () => {
    switch (formStatus) {
      case "ADD":
        handleAddNewDistrict();
        break;
      case "EDIT":
        handleUpdateDistrict();
        break;
      default:
        break;
    }
    handleClose();
  };
  const handleOnChange = (e) => {
    setDistrictFormData({
      ...districtFormData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "provinceDto") {
      setDistrictFormData({
        ...districtFormData,
        provinceDto: { id: e.target.value },
      });
    }
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
            {(districtFormData?.id ? t("general.update") : t("Add")) +
              " " +
              t("Quận/Huyện")}
          </span>
          <IconButton aria-label="close" className={classes.iconClose}>
            <CloseIcon color="error" onClick={onClose} />
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid className="mb-8" container spacing={1}>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth={true}>
                  <SelectValidator
                    label={
                      <span>
                        <span className={classes.colorStyle}> * </span>Mã tỉnh
                        thành phố
                      </span>
                    }
                    name="provinceDto"
                    className="w-100"
                    value={districtFormData?.provinceDto?.id || null}
                    onChange={handleOnChange}
                    validators={["required"]}
                    errorMessages={["Vui lòng chọn Tỉnh/Thành phô"]}
                    variant="outlined"
                    size="small"
                  >
                    {dataTable.map((i) => (
                      <MenuItem value={i.id} key={i.id}>
                        {i.name}
                      </MenuItem>
                    ))}
                  </SelectValidator>
                </FormControl>
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  name="code"
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Mã Quận/Huyện
                    </span>
                  }
                  value={districtFormData.code || ""}
                  onChange={handleOnChange}
                  fullWidth
                  margin="dense"
                  validators={["required"]}
                  errorMessages={["Vui lòng chọn Phường/Xã"]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  name="name"
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Tên Quận/Huyện
                    </span>
                  }
                  value={districtFormData.name || ""}
                  onChange={handleOnChange}
                  fullWidth
                  margin="dense"
                  validators={["required"]}
                  errorMessages={["Vui lòng nhập Quận/Huyện"]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  name="area"
                  type="number"
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Diện tích
                    </span>
                  }
                  value={districtFormData.area || ""}
                  onChange={handleOnChange}
                  fullWidth
                  margin="dense"
                  validators={["required", "minNumber:0"]}
                  errorMessages={[
                    "Vui lòng nhập diện tích",
                    "Diện tích không được âm",
                  ]}
                  variant="outlined"
                  size="small"
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
              {districtFormData?.id ? t("general.update") : t("general.save")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};
export default DistrictsDialog;
