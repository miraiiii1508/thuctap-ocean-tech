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
  Icon,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Close as CloseIcon } from "@material-ui/icons";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProvincesAction,
  getDistrictByProvinces,
} from "app/redux/actions/LocationAction";
import {
  addEmployeeAction,
  updateEmployeeAction,
} from "app/redux/actions/EmployeesAction";
import MaterialTable from "material-table";
import CertificateDialog from "./CertificateDialog";
import { ConfirmationDialog } from "egret";
const useStyles = makeStyles({
  colorStyle: {
    color: "red",
  },
  iconClose: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  iconButton: {
    padding: "12px 6px",
  },
});
const ManagerEmployeeDialog = ({ open, onClose, employees }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { provinces, districtsByProvince } = useSelector(
    (state) => state.provinces
  );
  const { wardsByDistrict } = useSelector((state) => state.district);
  const [employeeFormData, setEmployeeFormData] = useState({
    code: "",
    name: "",
    email: "",
    age: "",
    phone: "",
    certificates: [],
    provinceId: "",
    districtId: "",
    wardsId: "",
  });
  const dataTable = provinces.map((province) => ({ ...province }));
  const dataDistrict = districtsByProvince.map((district) => ({
    ...district,
  }));
  const dataWards = wardsByDistrict.map((ward) => ({ ...ward }));
  const [openCertificateDialog, setOpenCertificateDialog] = useState(false);
  const [provinceValue, setProvinceValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [certificate, setCertificate] = useState({});
  const [statusForm, setStatusForm] = useState("");
  const [openConfirmCertificateDialog, setOpenConfirmCertificateDialog] =
    useState(false);
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  const formatDateForStorage = (date) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };
  const dataCertificate = employeeFormData.certificates?.map((certificate) => ({
    ...certificate,
    effectiveDate: formatDate(certificate.effectiveDate),
    expirationDate: formatDate(certificate.expirationDate),
  }));
  useEffect(() => {
    if (employees && Object.keys(employees).length > 0) {
      setEmployeeFormData(employees);
      setProvinceValue(employees.provinceId);
      setDistrictValue(employees.districtId);
    }
    if (employees && employees.id) {
      setStatusForm("UPDATE");
    } else {
      setStatusForm("ADD");
    }
  }, [employees]);
  const getProvinceArea = () => {
    dispatch(getAllProvincesAction());
  };

  useEffect(() => {
    getProvinceArea();
  }, []);

  useEffect(() => {
    if (provinceValue) {
      dispatch(getDistrictByProvinces(provinceValue));
    }
  }, [dispatch, provinceValue]);

  useEffect(() => {
    if (districtValue) {
      dispatch({
        type: "TEST",
        payload: districtValue,
      });
    }
  }, [dispatch, districtValue]);
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...employeeFormData };

    if (name === "provinceId") {
      setProvinceValue(value);
      setDistrictValue("");
      updatedFormData = {
        ...updatedFormData,
        provinceId: value,
        districtId: "",
        wardsId: "",
      };
    } else if (name === "districtId") {
      setDistrictValue(value);
      updatedFormData = {
        ...updatedFormData,
        districtId: value,
        wardsId: "",
      };
    } else {
      updatedFormData = {
        ...updatedFormData,
        [name]: value,
      };
    }

    setEmployeeFormData(updatedFormData);
    console.log(employeeFormData.districtId);
  };

  const handleCloseDialog = () => {
    setEmployeeFormData({});
    onClose();
  };

  const handleAddNewEmployees = () => {
    dispatch(addEmployeeAction(employeeFormData));
    handleCloseDialog();
  };

  const handUpdateEmployee = () => {
    dispatch(updateEmployeeAction(employeeFormData));
    handleCloseDialog();
  };

  const handleSubmit = () => {
    switch (statusForm) {
      case "ADD":
        handleAddNewEmployees();
        break;
      case "UPDATE":
        handUpdateEmployee();
        break;
      default:
        break;
    }
  };
  ///Certificate
  const handleOpenCertificateDialog = () => {
    setOpenCertificateDialog(true);
  };
  const handleCloseCertificateDialog = () => {
    setOpenCertificateDialog(false);
    setCertificate({});
  };
  const handleAddCertificate = (data) => {
    setEmployeeFormData({
      ...employeeFormData,
      certificates: [...employeeFormData.certificates, data],
    });
    console.log(certificate);
  };
  const handleUpdateCertificateDialog = (data) => {
    setCertificate({
      ...data,
      effectiveDate: formatDateForStorage(data.effectiveDate),
      expirationDate: formatDateForStorage(data.expirationDate),
    });
    handleOpenCertificateDialog();
  };
  const handleUpdateCertificate = (dataUpdate) => {
    const index = employeeFormData.certificates.findIndex(
      (certificate) => certificate.id === dataUpdate.id
    );
    if (index !== -1) {
      const updatedCertificates = [...employeeFormData.certificates];
      updatedCertificates[index] = dataUpdate;
      setEmployeeFormData({
        ...employeeFormData,
        certificates: updatedCertificates,
      });
    }
  };
  const handleOpenDeleteDialog = (row) => {
    setOpenConfirmCertificateDialog(true);
    setCertificate(row);
  };
  const handleCloseDeleteDialog = () => {
    setOpenConfirmCertificateDialog(false);
    setCertificate({});
  };
  const handleRemoveCertificate = () => {
    const updatedCertificates = employeeFormData.certificates.filter(
      (i) => i.id !== certificate.id
    );
    setEmployeeFormData({
      ...employeeFormData,
      certificates: updatedCertificates,
    });
    handleCloseDeleteDialog();
  };
  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      width: "150",
      cellStyle: {
        padding: "0",
        margin: "0",
      },
      render: (row) => {
        return (
          <>
            <IconButton className={classes.iconButton}>
              <Icon
                color="primary"
                onClick={() => handleUpdateCertificateDialog(row)}
              >
                edit
              </Icon>
            </IconButton>

            <IconButton className={classes.iconButton}>
              <Icon color="error" onClick={() => handleOpenDeleteDialog(row)}>
                delete
              </Icon>
            </IconButton>
          </>
        );
      },
    },
    { field: "code", title: "Mã chứng chỉ" },
    { field: "name", title: "Tên chứng chỉ" },
    { field: "effectiveDate", title: "Ngày đăng ký" },
    { field: "expirationDate", title: "Ngày hết hạn" },
    {
      field: "provinceId",
      title: "Nơi cấp",
      render: (rowData) => (
        <div>
          {rowData.provinceId
            ? provinces.find((value) => value.id === rowData.provinceId)?.name
            : ""}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">
          <span className="mb-20 styleColor">
            {(employeeFormData?.id ? t("general.update") : t("Add")) +
              " " +
              t("Nhân Viên")}
          </span>
          <IconButton aria-label="close" className={classes.iconClose}>
            <CloseIcon color="error" onClick={handleCloseDialog} />
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid className="mb-8" container spacing={1}>
              <Grid item sm={6} xs={6}>
                <TextValidator
                  className="w-100 mb-8"
                  name="code"
                  value={employeeFormData.code || ""}
                  onChange={handleOnchange}
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Mã nhân viên
                    </span>
                  }
                  fullWidth
                  validators={["required", "matchRegexp:^.{6,10}$"]}
                  errorMessages={[
                    "Mã nhân viên không được để trống!",
                    "Mã nhân viên phải có 6-10 kí tự!",
                  ]}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextValidator
                  className="w-100 mb-8"
                  name="name"
                  value={employeeFormData.name || ""}
                  onChange={handleOnchange}
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Họ Và Tên
                    </span>
                  }
                  fullWidth
                  validators={["required"]}
                  errorMessages={["Họ tên không được để trống!"]}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <TextValidator
                  className="w-100 mb-8"
                  name="age"
                  value={employeeFormData.age || ""}
                  type="number"
                  onChange={handleOnchange}
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Tuổi
                    </span>
                  }
                  fullWidth
                  validators={["required", "minNumber:0", "maxNumber:100"]}
                  errorMessages={[
                    "Tuổi không được để trống! ",
                    "Tuổi không được âm!",
                    "Nhập sai tuổi!",
                  ]}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <TextValidator
                  className="w-100 mb-8"
                  name="phone"
                  type="number"
                  value={employeeFormData.phone || ""}
                  onChange={handleOnchange}
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Số điện thoại
                    </span>
                  }
                  fullWidth
                  validators={["required", "matchRegexp:^(09|08|03)[0-9]{8}$"]}
                  errorMessages={[
                    "Số điện thoại không được để trống!",
                    "Số điện thoại không hợp lệ! (VD: 09xxxxxxxx)",
                  ]}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <TextValidator
                  className="w-100 mb-8"
                  name="email"
                  value={employeeFormData.email || ""}
                  onChange={handleOnchange}
                  label={
                    <span>
                      <span className={classes.colorStyle}> * </span>
                      Email
                    </span>
                  }
                  fullWidth
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "Email không được để trống!",
                    "Email không hợp lệ!",
                  ]}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={4} xs={4}>
                <FormControl fullWidth={true}>
                  <SelectValidator
                    label={
                      <span>
                        <span className={classes.colorStyle}> * </span>
                        Tỉnh/Thành Phố
                      </span>
                    }
                    name="provinceId"
                    value={employeeFormData?.provinceId || null}
                    onChange={handleOnchange}
                    validators={["required"]}
                    errorMessages={["Tỉnh/Thành phố không được để trống"]}
                    className="w-100 mb-8"
                    size="small"
                    variant="outlined"
                  >
                    {dataTable.map((province) => (
                      <MenuItem value={province.id} key={province.id}>
                        {province.name}
                      </MenuItem>
                    ))}
                  </SelectValidator>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={4}>
                <FormControl fullWidth={true}>
                  <SelectValidator
                    name="districtId"
                    value={employeeFormData?.districtId || null}
                    onChange={handleOnchange}
                    label={
                      <span>
                        <span className={classes.colorStyle}> * </span>
                        Quận/Huyện
                      </span>
                    }
                    validators={["required"]}
                    errorMessages={["Quận/Huyện không được để trống!"]}
                    className="w-100 mb-8"
                    size="small"
                    variant="outlined"
                  >
                    {dataDistrict.map((district) => (
                      <MenuItem value={district.id} key={district.id}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </SelectValidator>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={4}>
                <FormControl fullWidth={true}>
                  <SelectValidator
                    name="wardsId"
                    value={employeeFormData?.wardsId || null}
                    onChange={handleOnchange}
                    label={
                      <span>
                        <span className={classes.colorStyle}> * </span>
                        Phường/Xã
                      </span>
                    }
                    validators={["required"]}
                    errorMessages={["Phường/Xã không được để trống!"]}
                    className="w-100 mb-8"
                    size="small"
                    variant="outlined"
                  >
                    {dataWards.map((ward) => (
                      <MenuItem value={ward.id} key={ward.id}>
                        {ward.name}
                      </MenuItem>
                    ))}
                  </SelectValidator>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button
                className="mt-8 mb-8"
                variant="contained"
                color="primary"
                onClick={() => {
                  handleOpenCertificateDialog();
                }}
              >
                {"Thêm chứng chỉ"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <MaterialTable
                columns={columns}
                data={dataCertificate}
                options={{
                  search: false,
                  sorting: true,
                  paging: false,
                  filtering: false,
                  toolbar: false,
                  header: true,
                  headerStyle: {
                    backgroundColor: "#358600",
                    color: "#fff",
                  },
                  padding: "dense",
                  maxBodyHeight: "250px",
                  minBodyHeight: "200px",
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: "Không có văn bằng",
                  },
                }}
              />
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
              {employeeFormData?.id ? t("general.update") : t("general.save")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
      {openCertificateDialog && (
        <CertificateDialog
          handleCloseCertificateDialog={handleCloseCertificateDialog}
          certificate={certificate}
          openDialog={openCertificateDialog}
          handleAddCertificate={handleAddCertificate}
          handleUpdateCertificate={handleUpdateCertificate}
        ></CertificateDialog>
      )}
      {openConfirmCertificateDialog && (
        <ConfirmationDialog
          open={openConfirmCertificateDialog}
          onConfirmDialogClose={handleCloseDeleteDialog}
          onYesClick={handleRemoveCertificate}
          title={t(`xóa chứng chỉ ${certificate?.name}?`)}
          text={t("DeleteConfirm")}
          Yes={t("Yes")}
          No={t("No")}
        ></ConfirmationDialog>
      )}
    </div>
  );
};
export default ManagerEmployeeDialog;
