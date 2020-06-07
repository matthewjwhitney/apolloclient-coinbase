import React, { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { Skeleton } from "@material-ui/lab";
import { Typography } from "@material-ui/core";

import { queries } from "./gql";

const Price = () => {
  // get selected currency from cache
  const { data: appConfigData } = useQuery(queries.appConfig);
  const currency = appConfigData?.appConfig?.currency;
  //

  // get spot price of bitcoin using selected currency
  const [getSpotPrice, { loading, error, data }] = useLazyQuery(
    queries.spotPrice,
    {
      variables: { currency: currency?.id },
      pollInterval: 1
    }
  );
  useEffect(() => {
    if (currency && currency !== "") {
      getSpotPrice();
    }
  }, [currency, getSpotPrice]);
  const spotPrice = data?.spotPrice?.amount;
  //

  return (
    <>
      {loading && !spotPrice && <Skeleton width={200} variant="text" />}
      {error && <Typography>Error: {error.message}</Typography>}
      {spotPrice && !loading && (
        <Typography>Bitcoin Price: {spotPrice}</Typography>
      )}
    </>
  );
};

export default Price;
