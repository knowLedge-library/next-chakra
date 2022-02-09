import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Custom500 = () => {
  const r = useRouter();

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ color: "red" }}> Some error by 500 </h3>
      <Button onClick={() => r.back()}>Back</Button>
    </div>
  );
};

export default Custom500;
