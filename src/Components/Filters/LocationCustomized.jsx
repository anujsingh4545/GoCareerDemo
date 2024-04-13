import * as React from "react";
import PropTypes from "prop-types";
import {useAutocomplete} from "@mui/base/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {styled} from "@mui/material/styles";
import {autocompleteClasses} from "@mui/material/Autocomplete";
import Api from "../../Api/api.json";

const Root = styled("div")(
  ({theme}) => `
  color: ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"};
  font-size: 14px;
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({theme}) => `

  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#rgb(234 179 8)" : "rgb(234 179 8)"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "rgb(234 179 8)" : "rgb(234 179 8)"};
    
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${theme.palette.mode === "dark" ? "rgb(234 179 8)" : "rgba(0,0,0,.85)"};
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const {label, onDelete, ...other} = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({theme}) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgb(234 179 8)"};
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "rgb(234 179 8)" : "rgb(234 179 8)"};
    background-color: ${theme.palette.mode === "dark" ? "rgb(234 179 8)" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 25px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({theme}) => `

  margin: 2px 0 0;
  padding: 0;
  width: 90%;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#ffff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: rgb(234 179 8);
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "rgb(234 179 8)" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export default function CustomizedHook({setLocations, Locations}) {
  const [Refresh, SetRefresh] = React.useState(false);

  let {getRootProps, getInputLabelProps, getInputProps, getTagProps, getListboxProps, getOptionProps, groupedOptions, value, focused, setAnchorEl} = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: Api.locations,
    getOptionLabel: (option) => option,
  });

  React.useEffect(() => {
    if (Locations == "" && value.length > 0) {
      value.splice(0, value.length);
      SetRefresh(!Refresh);
    }
  }, [Locations]);

  React.useEffect(() => {
    setLocations(value);
  }, [value]);

  return (
    <Root>
      <div {...getRootProps()}>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option, index) => (
            <StyledTag label={option} {...getTagProps({index})} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({option, index})}>
              <span>{option}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}
