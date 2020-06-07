import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

import { queries, mutations } from "./gql";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

const SelectCurrency = () => {
  // get selected currency from cache
  const {
    data: appConfigData,
    loading: appConfigLoading,
    error: appConfigError,
  } = useQuery(queries.appConfig);
  const currency = appConfigData?.appConfig?.currency;
  if (appConfigError) console.log("appConfigError", appConfigError);
  if (appConfigLoading) console.log("appConfigLoading", appConfigLoading);
  console.log("appConfig.currency", currency);

  // get list of currencies from apollo server coinbase api
  const {
    loading: currenciesLoading,
    error: currenciesError,
    data: currenciesData,
  } = useQuery(queries.currencies);
  const currencies = currenciesData?.currencies;
  if (currenciesError) console.log(currenciesError);
  console.log("currencies", currencies);

  // set selected currency in component state
  const [value, setValue] = useState(currency?.id || "");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // if currency from appConfig resolves and is different from value, set value to currency in appConfig
  useEffect(() => {
    if (currency && value !== currency) {
      setValue(currency);
    }
  }, [currency, value]);
  console.log("value", value);

  // set selected currency in cache using component state
  const [setCurrencyId, { data: mutationData }] = useMutation(
    mutations.setAppConfig,
    {
      variables: { currency: value },
    }
  );
  useEffect(() => {
    if (value) {
      setCurrencyId();
    }
  }, [value, setCurrencyId]);
  console.log("mutationData", mutationData);

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="selectCurrencyLabel">Currency</InputLabel>
      <Select
        labelId="selectCurrencyLabel"
        id="selectCurrency"
        value={value}
        onChange={handleChange}
      >
        {currenciesLoading && !currencies && (
          <MenuItem disabled>Loading...</MenuItem>
        )}
        {currencies &&
          currencies.map((currency) => (
            <MenuItem key={currency.id} value={currency}>
              {`${currency.id} - ${currency.name}`}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default SelectCurrency;
