import React, { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { Skeleton } from "@material-ui/lab";

import { queries } from "../gql";

const SellPrice = () => {
  const { data: appConfigData } = useQuery(queries.appConfig);
  const currency = appConfigData?.appConfig?.currency;
  console.log("currency", currency);
  const [getSellPrice, { loading, error, data }] = useLazyQuery(
    queries.sellPrice,
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
  const sellPrice = data?.sellPrice?.amount;
  console.log("buyPrice", sellPrice);
  return (
    <>
      {loading && !sellPrice && <Skeleton variant="text" />}
      {error && <p>Sell Price: {error.message}</p>}
      {sellPrice && <p>Sell Price: {sellPrice}</p>}
    </>
  );
};

export default SellPrice;
