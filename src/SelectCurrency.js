import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { TextField, CircularProgress } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { queries, mutations } from "./gql";

const SelectCurrency = () => {
  // get selected currency from cache
  const { data: appConfigData, error: appConfigError } = useQuery(
    queries.appConfig
  );
  const currency = appConfigData?.appConfig?.currency;
  if (appConfigError) console.log("appConfigError", appConfigError);

  // get list of currencies from coinbase API via apollo server
  const {
    loading: currenciesLoading,
    error: currenciesError,
    data: currenciesData
  } = useQuery(queries.currencies);
  const currencies = currenciesData?.currencies || [];
  if (currenciesError) console.log(currenciesError);

  // set selected currency in component state
  const [value, setValue] = useState(currency?.id || "");
  const [inputValue, setInputValue] = useState(currency?.id || "");

  // set open dropdown for autocomplete in component state
  const [open, setOpen] = useState(false);

  // set selected currency in cache using component state
  const [setCurrencyId] = useMutation(mutations.setAppConfig, {
    variables: { currency: value }
  });
  useEffect(() => {
    if (value) {
      setCurrencyId();
    }
  }, [value, setCurrencyId]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="selectCurrency"
      options={currencies}
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={option => option && `${option.id} - ${option.name}`}
      loading={currenciesLoading}
      renderInput={params => (
        <TextField
          {...params}
          label="Currency"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {currenciesLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};

export default SelectCurrency;
