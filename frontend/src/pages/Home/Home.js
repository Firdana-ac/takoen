import styled from "styled-components";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside"
import Upload from "./Upload"

import React, { useEffect, useState } from "react";
import Axios from "axios";


function Home() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/upload").then((response) => {
      setUploads(response.data);
    });
  }, []);

  const likePost = (id, key) => {
    var tempLikes = uploads;
    tempLikes[key].likes = tempLikes[key].likes + 1;

    Axios.post("http://localhost:3001/upload/like", {
      userLiking: localStorage.getItem("username"),
      postId: id,
    }).then((response) => {
      setUploads(tempLikes);
    });
  };

  return (
    <Container>
      <Section>
        <Layout>
          <Leftside />
          <Upload />
            <div className="Home">
              {uploads.map((val, key) => {
                return (
                  <div className="Post">
                    <div className="Image">
                      <a cloudName="pedro-machado-inc" publicId={val.image} />
                    </div>
                    <div className="Content">
                      <div className="title">
                        {" "}
                        {val.title} / by @{val.author}
                      </div>
                      <div className="description">{val.description}</div>
                    </div>
                    <div className="Engagement">
                      <a
                        id="likeButton"
                        onClick={() => {
                          likePost(val.id, key);
                        }}
                      />
                      {val.likes}
                    </div>
                  </div>
                );
              })}
            </div>
          <Rightside />
        </Layout>
      </Section>
    </Container>
    
  );
};

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }

  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;


export default Home;
