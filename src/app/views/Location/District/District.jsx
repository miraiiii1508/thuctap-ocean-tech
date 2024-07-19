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
import DistrictsDialog from "./DistrictDialog";
import {
  deleteDistrictAction,
  getDistrictsAction,
  searchDistrictsAction,
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
const Districts = () => {
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
            <IconButton className={classes.iconButton}>
              <Icon
                color="primary"
                onClick={() => {
                  handleEdit(row);
                }}
              >
                edit
              </Icon>
            </IconButton>

            <IconButton className={classes.iconButton}>
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
    { field: "code", title: "Mã Huyện" },
    { field: "name", title: "Tên Huyện" },
    { field: "area", title: "Diện tích" },
  ];
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showProvincesDialog, setShowDistrictsDialog] = useState(false);
  const [rowData, setRowData] = useState({});
  const [districtItem, setDistrictItem] = useState("");
  const dispatch = useDispatch();
  const districtState = useSelector((state) => state.district);
  const { district, reload, success } = districtState;
  const reloadProvince = useSelector((state) => state.provinces.reload);
  const [keywords, setKeywords] = useState("");
  useEffect(() => {
    if (keywords) {
      handleSearchDistrict();
    } else {
      getAllDistrict();
    }
  }, [dispatch, reload, reloadProvince, keywords]);
  const { t } = useTranslation();
  const classes = useStyles();
  const dataForTable = district.map((district) => ({ ...district }));
  const getAllDistrict = () => {
    dispatch(getDistrictsAction());
  };
  const handleSearchDistrict = () => {
    dispatch(searchDistrictsAction(keywords));
  };
  const handleAddDistrict = () => {
    setDistrictItem({});
    setShowDistrictsDialog(true);
  };
  const handleEdit = (row) => {
    setDistrictItem(row);
    setShowDistrictsDialog(true);
  };
  const handleCloseDialog = () => {
    setShowDistrictsDialog(false);
  };
  const handleDelete = (row) => {
    setShowDeleteDialog(true);
    setRowData(row);
  };
  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };
  const handleDialogDelete = () => {
    dispatch(deleteDistrictAction(rowData.id));
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
            onClick={handleAddDistrict}
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
        <DistrictsDialog
          open={showProvincesDialog}
          onClose={handleCloseDialog}
          district={districtItem}
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
export default Districts;
