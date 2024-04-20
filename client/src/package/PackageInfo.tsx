import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { Package } from "../types/Package";
import IconButton from "@mui/material/IconButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "./PackageInfo.css";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { LicenseLink } from "../search/Search";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
} from "@mui/material";

type Version = {
  version: string;
  download_url: string;
};

type PackageInfoProps = Package & {
  versions: Version[];
};

const PackageInfo = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState<PackageInfoProps | null>(
    null
  );

  useEffect(() => {
    // Fetch package details from the API
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/package/id/${id}`);
        const data = await response.json();
        setPackageDetails(data);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    // Call the fetch function
    fetchPackageDetails();
  }, [id]); // Execute the effect when the id changes

  console.log(packageDetails);
  return (
    <Grid container spacing={12}>
      <Grid item xs={12} textAlign={"center"} className="search_results">
        <h1> Bundle Core </h1>
      </Grid>
      <Grid item xs={12} className="search_results">
        <div>
          <h2>{packageDetails?.name}</h2>
          {packageDetails ? (
            <div>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={2} sx={{ fontWeight: "bold" }}>
                  <p className="package-item-grid">Category</p>
                </Grid>
                <Grid item xs={10}>
                  <p className="package-item-grid">{packageDetails.category}</p>
                </Grid>
                <Grid item xs={2} sx={{ fontWeight: "bold" }}>
                  <p className="package-item-grid">Description</p>
                </Grid>
                <Grid item xs={10}>
                  <p className="package-item-grid">
                    {packageDetails.description}
                  </p>
                </Grid>
                <Grid item xs={2} sx={{ fontWeight: "bold" }}>
                  <p className="package-item-grid">Publication</p>
                </Grid>
                <Grid item xs={10}>
                  <Link href={packageDetails.publication}>
                    <p className="package-item-grid">
                      {packageDetails.publication}
                    </p>
                  </Link>
                </Grid>
                <Grid item xs={2} sx={{ fontWeight: "bold" }}>
                  <p className="package-item-grid">License</p>
                </Grid>
                <Grid item xs={10}>
                  <p className="package-item-grid">
                    <LicenseLink license={packageDetails.license} />
                  </p>
                </Grid>
              </Grid>
              <Grid item xs={12} marginTop={4}>
                <VersionList versions={packageDetails.versions} />
              </Grid>
            </div>
          ) : (
            <p>Loading package details...</p>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

const VersionList = (props: { versions: Version[] }) => {
  const { versions } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedVersion, setSelectedVersion] = React.useState<Version | null>(
    null
  );

  const clickDownloadVersionHandler = (downloadVersion: Version) => {
    setSelectedVersion(downloadVersion);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVersion(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader>
          <TableHead
            sx={{
              "& th": {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#bbeefd",
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>
                Available versions
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {versions.map((verItem) => (
              <TableRow key={verItem.version} hover={true}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "center" }}
                >
                  {verItem.version}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <IconButton
                    aria-label="download url"
                    onClick={() => clickDownloadVersionHandler(verItem)}
                  >
                    <CloudDownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DownloadDialog
        selectedVersion={selectedVersion}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

type SimpleDialogProps = {
  open: boolean;
  selectedVersion: Version | null;
  onClose: () => void;
};
const DownloadDialog = (props: SimpleDialogProps) => {
  const { onClose, open } = props;
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClose = () => {
    onClose();
  };

  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisabled(!regex.test(e.target.value));
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ m: 0, p: 2 }}>
      <DialogTitle id="alert-dialog-title">{"Download"}</DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          sx={{ mb: "20px" }}
          onChange={validateEmail}
        />
        <Button
          variant="contained"
          startIcon={<CloudDownloadIcon />}
          disabled={isDisabled}
          href={
            "https://drive.google.com/uc?export=download&id=13TNNeM0iQ8yowv3Ow0wZZSXgnKnwMG6b"
          }
        >
          Download
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PackageInfo;
