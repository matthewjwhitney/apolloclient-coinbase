import React, { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { Skeleton } from "@material-ui/lab";

import { queries } from "../gql";

const BuyPrice = () => {
  const { data: appConfigData } = useQuery(queries.appConfig);
  const currency = appConfigData?.appConfig?.currency;
  console.log("currency", currency);
  const [getBuyPrice, { loading, error, data }] = useLazyQuery(
    queries.buyPrice,
    {
      variables: { currency: currency?.id },
      pollInterval: 1000
    }
  );
  useEffect(() => {
    if (currency && currency !== "") {
      getBuyPrice();
    }
  }, [currency, getBuyPrice]);
  const buyPrice = data?.buyPrice?.amount;
  console.log("buyPrice", buyPrice);
  return (
    <>
      {loading && !buyPrice && <Skeleton variant="text" />}
      {buyPrice && <p>Buy Price: {buyPrice}</p>}
      {error && <p>{error.message}</p>}
    </>
  );
};

export default BuyPrice;
