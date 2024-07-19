import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MaterialTable from "material-table";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import { Button, Icon, IconButton, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ProvincesDialog from "./ProvincesDialog";
import { ConfirmationDialog } from "egret";
import {
  deleteProvinceAction,
  getAllProvincesAction,
  searchProvincesAction,
} from "app/redux/actions/LocationAction";
const useStyles = makeStyles({
  widthStyle: {
    width: "200px",
  },
  customStyle: {
    display: "flex",
    justifyContent: "space-between",
  },
  iconButton: {
    padding: "12px 6px",
  },
});
const Provinces = () => {
  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      width: "100",
      cellStyle: {
        padding: "0",
        margin: "0",
      },
      render: (row) => {
        return (
          <>
            <IconButton  className={classes.iconButton}>
              <Icon
                color="primary"
                onClick={() => {
                  handleEdit(row);
                }}
              >
                edit
              </Icon>
            </IconButton>

            <IconButton  className={classes.iconButton}>
              <Icon
                color="error"
                onClick={() => {
                  handleDelete(row);
                }}
              >
                delete
              </Icon>
            </IconButton>
          </>
        );
      },
    },
    { field: "code", title: "Mã Tỉnh" },
    { field: "name", title: "Tên Tỉnh" },
    { field: "area", title: "Diện tích" },
  ];

  const dispatch = useDispatch();
  const provinceState = useSelector((state) => state.provinces);
  const { provinces, reload, success } = provinceState;
  const [showProvincesDialog, setShowProvincesDialog] = useState(false);
  const [rowData, setRowData] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [keywords, setKeywords] = useState("");
  useEffect(() => {
    if (keywords) {
      handleSearchProvinces();
    } else {
      getAllProvinces();
    }
  }, [dispatch, reload, keywords]);
  const { t } = useTranslation();
  const classes = useStyles();
  const dataForTable = provinces.map((province) => ({ ...province }));
  const getAllProvinces = () => {
    dispatch(getAllProvincesAction());
  };
  const handleSearchProvinces = () => {
    dispatch(searchProvincesAction(keywords));
  };
  const handleCloseDialog = () => {
    setShowProvincesDialog(false);
  };
  const handleAddProvince = () => {
    setRowData({});
    setShowProvincesDialog(true);
  };
  const handleEdit = (item) => {
    setShowProvincesDialog(true);
    setRowData(item);
  };
  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };
  const handleDelete = (row) => {
    setRowData(row);
    setShowDeleteDialog(true);
  };
  const handleDialogDelete = () => {
    dispatch(deleteProvinceAction(rowData.id));
    handleCloseDeleteDialog();
  };
  return (
    <div>
      <div className={classes.customStyle}>
        <div>
          <Button
            className="mt-16 mb-16 mr-16 align-bottom"
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleAddProvince}
          >
            {t("Add")}
          </Button>
        </div>

        <div>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                name="search"
                label="Tìm kiếm"
                onChange={(e) => {
                  setKeywords(e.target.value);
                }}
                className={`mb-16 mr-16 align-bottom ${classes.widthStyle}`}
              />
            </Grid>
          </Grid>
        </div>
      </div>

      <MaterialTable
        columns={columns}
        data={dataForTable}
        style={{ backgroundColor: "#fafafa" }}
        options={{
          search: false,
          toolbar: false,
          
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
      {showProvincesDialog && (
        <ProvincesDialog
          open={showProvincesDialog}
          onClose={handleCloseDialog}
          province={rowData}
        />
      )}
      {showDeleteDialog && (
        <ConfirmationDialog
          open={showDeleteDialog}
          onConfirmDialogClose={handleCloseDeleteDialog}
          onYesClick={handleDialogDelete}
          title={t(`xóa tỉnh/thành phố ${rowData?.name}?`)}
          text={t("DeleteConfirm")}
          Yes={t("Yes")}
          No={t("No")}
        ></ConfirmationDialog>
      )}
    </div>
  );
};
export default Provinces;
