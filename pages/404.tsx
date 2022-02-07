import { useRouter } from "next/router";

const Custom404 = () => {
  const r = useRouter();

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ color: "red" }}> 404 </h3>
      <span onClick={() => r.back()}>back</span>
    </div>
  );
};

export default Custom404;
