import React, { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { Skeleton } from "@material-ui/lab";

import { queries } from "../gql";

const Price = () => {
  const { data: appConfigData } = useQuery(queries.appConfig);
  const currency = appConfigData?.appConfig?.currency;
  console.log("currency", currency);
  const [getSellPrice, { loading, error, data }] = useLazyQuery(
    queries.spotPrice,
    {
      variables: { currency: currency?.id },
      pollInterval: 1000
    }
  );
  useEffect(() => {
    if (currency && currency !== "") {
      getSellPrice();
    }
  }, [currency, getSellPrice]);
  const spotPrice = data?.spotPrice?.amount;
  console.log("spotPrice", spotPrice);
  return (
    <>
      {loading && !spotPrice && <Skeleton variant="text" />}
      {error && <p>Bitcoin Price: {error.message}</p>}
      {spotPrice && <p>Bitcoin Price: {spotPrice}</p>}
    </>
  );
};

export default Price;
