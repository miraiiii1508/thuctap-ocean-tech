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
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { Close as CloseIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWardAction,
  updateWardAction,
} from "app/redux/actions/LocationAction";
// import { addWards, updateWards } from "app/redux/actions/WardsActions";

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
const WardsDialog = ({ open, onClose, ward }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const defaultValue = {
    code: "",
    name: "",
    area: "",
    districtDto: {
      id: "",
    },
  };
  const [wardFormData, setWardFormData] = useState({
    defaultValue,
  });
  const [formStatus, setFormStatus] = useState("");
  const dispatch = useDispatch();
  const districts = useSelector((state) => state.district.district);
  const tableData = districts.map((districts) => ({ ...districts }));
  useEffect(() => {
    setWardFormData(ward);
    if (ward && ward.id) {
      setFormStatus("EDIT");
    } else {
      setFormStatus("ADD");
    }
  }, [ward]);

  const handleOnchange = (event) => {
    setWardFormData({
      ...wardFormData,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "districtDto") {
      setWardFormData({
        ...wardFormData,
        districtDto: { id: event.target.value },
      });
    }
  };
  const handleClose = () => {
    setWardFormData({});
    onClose();
  };
  const HandleAddNewWard = () => {
    dispatch(addWardAction(wardFormData));
  };
  const handleUpdateWard = () => {
    dispatch(updateWardAction(wardFormData));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (formStatus) {
      case "ADD":
        HandleAddNewWard();
        break;
      case "EDIT":
        handleUpdateWard();
        break;
      default:
        console.log("test");
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
            {(wardFormData?.id ? t("general.update") : t("Add")) +
              " " +
              t("Phường/Xã")}
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
                        <span className={classes.colorStyle}> * </span>
                        Mã Quận/Huyện
                      </span>
                    }
                    name="districtDto"
                    value={wardFormData?.districtDto?.id || null}
                    onChange={handleOnchange}
                    validators={["required"]}
                    errorMessages={["Vui lòng chọn Quận/Huyện"]}
                    className="w-100 mb-8"
                    size="small"
                    variant="outlined"
                  >
                    {tableData.map((i) => (
                      <MenuItem value={i.id} key={i.id}>
                        {i.name}
                      </MenuItem>
                    ))}
                  </SelectValidator>
                </FormControl>
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-8"
                  name="code"
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Mã Phường/Xã
                    </span>
                  }
                  value={wardFormData.code || ""}
                  onChange={handleOnchange}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["Vui lòng nhập mã Phường/Xã"]}
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
                      Tên Phường/Xã
                    </span>
                  }
                  value={wardFormData.name || ""}
                  onChange={handleOnchange}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["Vui lòng nhập tên Phường/Xã"]}
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
                  value={wardFormData.area || ""}
                  onChange={handleOnchange}
                  fullWidth
                  validators={["minNumber:0"]}
                  errorMessages={["Diện tích không được âm"]}
                  size="small"
                  variant="outlined"
                  inputProps={{
                    step: "0.01",
                  }}
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
              {wardFormData?.id ? t("general.update") : t("general.save")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default WardsDialog;
