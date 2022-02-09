import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { chakra, Flex, Box } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

interface IProps
  extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Character: React.FC<IProps> = (props) => {
  // const json = require("locales/en.json");

  return (
    <>
      <chakra.h3>JSON！</chakra.h3>
      <Flex wrap="wrap">
        {props.characters.results.map((character: any) => (
          <Box p={5} key={character.id}>
            <Image
              src={character.image}
              alt={character.name}
              width="200px"
              height="200px"
            />
            <div>
              <p>{character.name}</p>
              <p>{character.location.name}</p>
            </div>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default Character;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const characters = await res.json();

  if (!characters) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      characters,
      mes: "mes",
    },
  };
};
