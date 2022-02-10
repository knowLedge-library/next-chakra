import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const SwitchContainer = styled.div<{ isOn: boolean }>(
  {
    width: "60px",
    height: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "50px",
    padding: "0 5px",
    cursor: "pointer",
    transition: "background-color 250ms ease-in-out",
  },
  (props) =>
    props.isOn && {
      justifyContent: "flex-end",
      backgroundColor: "skyblue",
    }
);

export const SwitchHandle = styled(motion.div)({
  width: "20px",
  height: "20px",
  backgroundColor: "white",
  borderRadius: "40px",
});
