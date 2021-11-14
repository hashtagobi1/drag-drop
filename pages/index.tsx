import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";

interface IProps {
  data?: any;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  resetServerContext();
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  if (!data) {
    return {
      notfound: true,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      // res,
      data,
    },
  };
};

const Home: any = ({ data }: IProps) => {
  const { info, results: defaultResults } = data;

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (data) {
      setResults(defaultResults);
    } else {
      setResults([]);
    }
  }, [defaultResults, results, data]);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = results;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setResults(items);
    console.log(result);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Drag Drop Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Drag And Drop: Space Bumz Test</h1>
        <h2>Staking Pool:</h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppableID">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {results &&
                  results.slice(0, 5).map((result: any, i) => {
                    return (
                      <Draggable
                        key={result.name}
                        index={i}
                        draggableId={`${result.name}`}
                      >
                        {(provided, snapshot) => (
                          <li
                            className={styles.list}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={styles.card}>
                              <Image
                                alt={result.name}
                                src={result.image}
                                height={100}
                                width={100}
                              />
                              <h3>{result.name}</h3>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </div>
  );
};

export default Home;

// droppableId={result.id}

{
  /* {results &&
          results.map((result: any, index) => {
            return (


                      <div
                   
                      >

                      </div>
                  )}
            );
          })} */
}
