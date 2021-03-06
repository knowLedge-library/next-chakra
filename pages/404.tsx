import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Custom404 = () => {
  const r = useRouter();

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ color: "red" }}> 404 </h3>
      <Button onClick={() => r.back()}>Back</Button>
    </div>
  );
};

export default Custom404;
