import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});
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
const CertificateDialog = ({
  openDialog,
  certificate,
  handleCloseCertificateDialog,
  handleAddCertificate,
  handleUpdateCertificate,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [certificateFormData, setCertificateFormData] = useState({
    id: "",
    name: "",
    code: "",
    effectiveDate: "",
    expirationDate: "",
    provinceId: "",
  });

  const { provinces } = useSelector((state) => state.provinces);
  const [formData, setFormData] = useState("");
  useEffect(() => {
    setCertificateFormData(certificate);
    if (certificate && certificate.id) {
      setFormData("UPDATE");
    } else {
      setFormData("ADD");
    }
  }, [certificate]);

  const handleClose = () => {
    handleCloseCertificateDialog();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificateFormData({
      ...certificateFormData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    const formattedData = {
      ...certificateFormData,
    };
    switch (formData) {
      case "ADD":
        handleAddCertificate(formattedData);
        toast.success("Thêm chứng chỉ thành công");
        break;
      case "UPDATE":
        handleUpdateCertificate(formattedData);
        toast.success("Sửa chứng chỉ thành công");
        break;
      default:
        break;
    }
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={openDialog}
        aria-labelledby="form-dialog-title"
        onClose={handleClose}
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">
          <span className="mb-20 styleColor">
            {(certificate?.id ? t("general.update") : t("Add")) +
              " " +
              t("Chứng chỉ")}
          </span>
          <IconButton aria-label="close" className={classes.iconClose}>
            <CloseIcon color="error" onClick={handleClose} />
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid className="mb-8" container spacing={1}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  name="code"
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Mã chứng chỉ
                    </span>
                  }
                  value={certificateFormData.code || ""}
                  onChange={handleChange}
                  fullWidth
                  validators={["required", "matchRegexp:^.{6,10}$"]}
                  errorMessages={[
                    "Mã chứng chỉ không được để trống!",
                    "Mã chứng chỉ phải ít 6 chữ số và nhỏ hơn 10 chữ số!",
                  ]}
                  placeholder="Nhập mã"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  className="w-100 mb-16"
                  name="name"
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Tên chứng chỉ
                    </span>
                  }
                  value={certificateFormData.name || ""}
                  onChange={handleChange}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["Tên chứng chỉ không được để trống !"]}
                  placeholder="Nhập Họ và tên"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-10"
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      {"Ngày cấp chứng chỉ"}
                    </span>
                  }
                  onChange={handleChange}
                  type="date"
                  name="effectiveDate"
                  value={certificateFormData.effectiveDate}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["Vui lòng nhập ngày cấp !"]}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextValidator
                  className="w-100 mb-16"
                  name="expirationDate"
                  type="date"
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      {"Ngày chứng chỉ hết hạn"}
                    </span>
                  }
                  value={certificateFormData.expirationDate || ""}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["Vui lòng nhập ngày hết hạn !"]}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <SelectValidator
                    name="provinceId"
                    value={certificateFormData.provinceId || ""}
                    label={
                      <span>
                        <span className={classes.colorStyle}> * </span>
                        Tỉnh/Thành phố
                      </span>
                    }
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["Tỉnh/Thành phố không được để trống"]}
                    className="w-100"
                    variant="outlined"
                    size="small"
                  >
                    {provinces.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </SelectValidator>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            spacing={4}
            style={{ justifyContent: "center" }}
            className="flex flex-end flex-middle"
          >
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit" color="primary" variant="contained">
              {certificate?.id ? t("general.update") : t("general.save")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};
export default CertificateDialog;
