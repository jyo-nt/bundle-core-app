import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from '@mui/material/Link';
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import { Package } from "../types/Package";
import "./Search.css";

const Search = () => {
  const [inputText, setInputText] = useState("");
  const [packages, setPackages] = useState<Package[] | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const q = query.get('q');
  
  const search = useCallback(async (query: string) => {
    if (!query) {
      return;
    }

    const url = `http://localhost:8000/package/search?q=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    if (response.status !== 200) {
      setError(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data) {
      setError('No results found!')
    }
    if (!data.length) {
      setError('No results found!')
      return;
    }
    setPackages(data);
  }, []);

  useEffect(() => {
    if (!q) {
      return;
    }
    setPackages([])
    setInputText(q)
    search(q);
  }, [q, search]); // Execute the effect when the id changes

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    setInputText(query);
    setError('')
    setPackages(null)
  };

  const onSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Update the URL using the navigate function
    navigate(`/search?q=${encodeURIComponent(inputText)}`);
    search(inputText);
  };


  return (
    <Grid container spacing={12}>
      <Grid item xs={12} textAlign={'center'}  className="search_results">
          <h1> Bundle Core </h1>
      </Grid>
      <Grid item xs={12} className="search_results">
        <form onSubmit={onSearchSubmit}>
          <Paper
            onSubmit={onSearchSubmit}
            sx={{ p: "12px 4px", display: "flex", alignItems: "center" }}
          >
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider orientation="vertical" />
            <InputBase
              sx={{ lg: 1, flex: 1, pr: '20px', fontSize: '20px' }}
              placeholder="Search for packages"
              inputProps={{ "aria-label": "search google maps" }}
              value={inputText}
              onChange={onInputChange}
              type="search"
              autoFocus
            />
          </Paper>
        </form>
      </Grid>

      <Grid item xs={12} className="search_results">
        { packages?.length ?
            <PackageList packages={packages}/>
          : null
        }
        <div className="error">{error}</div>
      </Grid>
    </Grid>
  );
};

const PackageList = (packages: {packages: Package[]}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader>
        <TableHead sx = {{
              "& th": {
                fontWeight: 'bold',
                fontSize: '14px',
                backgroundColor: "#bbeefd"
              }
            }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>License</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.packages.map((_package) => (
            <PackageItem key={_package.id} package={_package}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

type PackageItemProps = {
  package: Package
}
const PackageItem = (props: PackageItemProps) => {
  const {package: _package} = props;
  const navigate = useNavigate();

  const packageItemClickHandler = (id: number) => {
    navigate(`/package/${id}`);
  }

  return (
    <TableRow
      key={_package.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
      onClick={()=> packageItemClickHandler(_package.id)}
      hover={true}
    >
      <TableCell component="th" scope="row">
        {_package.name}
      </TableCell>
      <TableCell>{_package.category}</TableCell>
      <TableCell>{_package.description}</TableCell>
      <TableCell>
        <LicenseLink license={_package.license} />
      </TableCell>
    </TableRow>

  )
}

export const LicenseLink = (props: Pick<Package, 'license'>) => {
  if(props.license.url)
    return (
      <Link aria-label="license" href={props.license.url} target="_blank" rel="noreferrer">
        {props.license.label}
      </Link>
    )
    else {
      return <span>{props.license.label}</span>;
    }
}
export default Search;
