import {
  Button,
  Grid,
  Icon,
  IconButton,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { ConfirmationDialog } from "egret";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import WardsDialog from "./WardsDialog";
import {
  deleteWardAction,
  getWardsAction,
  searchWardsAction,
} from "app/redux/actions/LocationAction";

const useStyles = makeStyles({
  widthStyle: {
    width: "200px",
  },
  customStyle: {
    display: "flex",
    justifyContent: "space-between",
  },
});
const Wards = () => {
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
            <IconButton>
              <Icon
                color="primary"
                onClick={() => {
                  handleEdit(row);
                }}
              >
                edit
              </Icon>
            </IconButton>

            <IconButton>
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
    { field: "code", title: "Mã Xã" },
    { field: "name", title: "Tên Xã" },
    { field: "area", title: "Diện tích" },
  ];
  const dispatch = useDispatch();
  const wardState = useSelector((state) => state.Wards);
  const districtState = useSelector((state) => state.district.reload);
  const reloadProvince = useSelector((state) => state.provinces.reload);
  const { wards, reload, success } = wardState;
  const tableData = wards.map((ward) => ({ ...ward }));
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [rowData, setRowData] = useState({});
  const [wardId, setWardId] = useState({});
  const [showWardsDialog, setShowWardsDialog] = useState(false);
  const [keywords, setKeywords] = useState("");
  useEffect(() => {
    if (keywords) {
      searchWards();
    } else {
      getAllWard();
    }
  }, [dispatch, reload, districtState, reloadProvince, keywords]);
  const { t } = useTranslation();
  const classes = useStyles();
  const getAllWard = () => {
    dispatch(getWardsAction());
  };
  const searchWards = () => {
    dispatch(searchWardsAction(keywords));
  };
  const handAddNewWard = () => {
    setRowData({});
    setShowWardsDialog(true);
  };
  const handleEdit = (data) => {
    setRowData(data);
    setShowWardsDialog(true);
  };
  const handleDelete = (row) => {
    setRowData(row);
    setWardId(row.id);
    setConfirmDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setConfirmDeleteDialog(false);
  };
  const handleConfirmDelete = () => {
    dispatch(deleteWardAction(wardId));
    handleCloseDeleteDialog();
  };
  const handleCloseDialog = () => {
    setShowWardsDialog(false);
  };
  return (
    <div>
      <div className={classes.customStyle}>
        <div>
          <Button
            className="mt-4 mb-16 mr-16 align-bottom"
            variant="contained"
            color="primary"
            size="large"
            onClick={handAddNewWard}
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
        data={tableData}
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
      <WardsDialog
        open={showWardsDialog}
        onClose={handleCloseDialog}
        ward={rowData}
      />
      {confirmDeleteDialog && (
        <ConfirmationDialog
          open={confirmDeleteDialog}
          onConfirmDialogClose={handleCloseDeleteDialog}
          onYesClick={handleConfirmDelete}
          title={t(`xóa xã/phường ${rowData?.name}?`)}
          text={t("DeleteConfirm")}
          Yes={t("Yes")}
          No={t("No")}
        ></ConfirmationDialog>
      )}
    </div>
  );
};
export default Wards;
