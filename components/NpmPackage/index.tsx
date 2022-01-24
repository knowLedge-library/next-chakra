/*
 * @Date: 2021-11-20 17:07:01
 * @Creator: Bobo
 * @LastEditors: Bobo
 * @LastEditTime: 2021-11-22 09:08:51
 * @Description: Test package page
 */
import React, { useState } from "react";
import { CosmosSelect } from "@cosmosreverse/cosmos-react";
import { CounterContext, useCounterContext } from "contexts";

const Test: React.FC = () => {
  const { count } = useCounterContext();

  console.log(count, "count");

  // Use Consumer or useCounterContext all ok ~
  return (
    <CounterContext.Consumer>
      {({ count }) => <CosmosSelect todoTitle={`${count}`} />}
    </CounterContext.Consumer>
  );
};

const TestNpmPackage: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider
      value={{
        count,
        setCount,
      }}
    >
      <button onClick={() => setCount((n) => n + 10)}>setCount</button>

      <Test />
    </CounterContext.Provider>
  );
};

export default TestNpmPackage;
