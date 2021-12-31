/* eslint-disable prefer-spread */
// Reference from https://github.com/apollographql/react-apollo/tree/2.5.8.
const compose = (...funcs: Function[]) => {
  const functions = funcs.reverse();

  return (...args: any[]) => {
    const [firstFunction, ...restFunctions] = functions;
    let result = firstFunction.apply(null, args);

    restFunctions.forEach((fnc) => {
      result = fnc.call(null, result);
    });

    return result;
  };
};

export default compose;
