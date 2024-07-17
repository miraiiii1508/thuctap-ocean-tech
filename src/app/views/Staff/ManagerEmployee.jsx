import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import { useTranslation } from "react-i18next";
import {
  Button,
  Icon,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import {
  deleteEmployeeAction,
  getAllEmployeesAction,
} from "app/redux/actions/EmployeesAction";
import { ConfirmationDialog } from "egret";
import ManagerEmployeeDialog from "./ManagerEmployeeDialog";

const useStyles = makeStyles({
  customStyle: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 10px",
  },
});

const ManagerStaff = () => {
  const dispatch = useDispatch();
  const { employees, reload } = useSelector((state) => state.employees);
  const dataTable = employees.map((employee) => ({ ...employee }));
  const [rowData, setRowData] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDialogEmployee, setShowDialogEmployee] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    getAllEmployee();
  }, [dispatch, reload]);

  const getAllEmployee = () => {
    dispatch(getAllEmployeesAction());
  };

  const handleAddNewEmployee = () => {
    setShowDialogEmployee(true);
    setRowData({});
  };

  const handEditEmployee = (data) => {
    setShowDialogEmployee(true);
    setRowData(data);
  };

  const handleCloseDialogEmployee = () => {
    setShowDialogEmployee(false);
    setRowData({});
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setRowData({});
  };

  const handleOpenDialogDelete = (data) => {
    setShowDeleteDialog(true);
    setRowData(data);
  };

  const handleDialogDelete = () => {
    dispatch(deleteEmployeeAction(rowData.id));
    handleCloseDeleteDialog();
  };

  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(employees);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(excelData, `danh_sach_nhan_vien.xlsx`);
    toast.success("Xuất file thành công!");
  };

  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      width: "100",
      cellStyle: {
        padding: "0",
        margin: "0",
      },
      render: (row) => (
        <>
          <IconButton onClick={() => handEditEmployee(row)}>
            <Icon color="primary">edit</Icon>
          </IconButton>
          <IconButton onClick={() => handleOpenDialogDelete(row)}>
            <Icon color="error">delete</Icon>
          </IconButton>
        </>
      ),
    },
    { field: "code", title: "Mã Nhân Viên" },
    { field: "name", title: "Họ và tên" },
    { field: "age", title: "Tuổi" },
    { field: "email", title: "Email" },
    { field: "phone", title: "Số điện thoại" },
  ];

  const CustomToolbar = (props) => (
    <div className={classes.toolbar}>
      <div>
        <Button
          className="mt-4 mb-16 mr-16 align-bottom"
          variant="contained"
          color="primary"
          size="large"
          onClick={handleAddNewEmployee}
        >
          {t("Add")}
        </Button>
        <Button
          className="mt-4 mb-16 mr-16 align-bottom"
          variant="contained"
          color="primary"
          size="large"
          onClick={handleExportExcel}
        >
          {t("general.exportToExcel")}
        </Button>
      </div>
      <div>
        <MTableToolbar {...props} />
      </div>
    </div>
  );

  return (
    <div>
      <MaterialTable
        columns={columns}
        data={dataTable}
        options={{
          toolbar: true,
          headerStyle: {
            backgroundColor: "#358600",
            color: "#fff",
          },
          minBodyHeight: "569px",
          maxBodyHeight: "569px",
          pageSize: 10,
          rowStyle: (rowData, index) => ({
            backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
          }),
          padding: "dense",
        }}
        components={{
          Toolbar: CustomToolbar,
        }}
        title={null}
        localization={{
          body: {
            emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
          },
          pagination: {
            labelRowsSelect: `Bản ghi`,
            labelDisplayedRows: `{from}-{to} trong {count}`,
            firstTooltip: "Trang đầu",
            previousTooltip: "Trang trước",
            nextTooltip: "Trang tiếp",
            lastTooltip: "Trang cuối",
          },
        }}
      />
      {showDialogEmployee && (
        <ManagerEmployeeDialog
          open={showDialogEmployee}
          onClose={handleCloseDialogEmployee}
          employees={rowData}
        />
      )}
      {showDeleteDialog && (
        <ConfirmationDialog
          open={showDeleteDialog}
          onConfirmDialogClose={handleCloseDeleteDialog}
          onYesClick={handleDialogDelete}
          title={`${t("DeleteEmployee")} ${rowData?.name}?`}
          text={t("DeleteConfirm")}
          Yes={t("Yes")}
          No={t("No")}
        />
      )}
    </div>
  );
};

export default ManagerStaff;
