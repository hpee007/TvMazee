import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import useFetchData from "../Hooks/fetchData";
import { Image, Carousel, Row, Col } from "react-bootstrap";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import { ScrollContainer, TvcardB } from "../components";
import Loader from "../utii/loader";

export default function Tvid() {
  const { id } = useParams();
  const { data, error, loading } = useFetchData(
    `/shows/${id}?embed[]=seasons&embed[]=cast`
  );

  const { data: shows } = useFetchData(`/shows`);
  const runningShows = shows?.filter((show) => show.status === `Running`);
  const filterRunningShows = runningShows.filter((show) => show.id != id);
  const endedShows = shows?.filter(
    (show) => show.status === "Ended" && show.rating.average >= 8.7
  );
  console.log(filterRunningShows);

  useEffect(() => {
    document.title = data.name;
  }, [data?.name]);

  return (
    <>
      {error && <p className="mt-5">{error.message}</p>}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="d-lg-flex container p-0">
            <div className="tvidboxA">
              <div className="d-flex align-items-center p-3 bgColorB">
                <div className="d-flex align-items-center gap-2 flex-grow-1">
                  <PiTelevisionSimpleBold size="45px" color="purple" />
                  <div className="d-md-flex align-items-center gap-2">
                    <span className="text-white fs-4 me-2">{data.name}</span>
                    <span className="text-white-50 fs-5">{data.type}</span>
                  </div>
                </div>
                <span className="text-white">
                  {`Rating: ${data?.rating?.average}`}
                </span>
              </div>
              <div className="w-100" style={{ height: "600px" }}>
                <Image
                  src={data?.image?.original}
                  alt={data.name}
                  title={data.name}
                  className="w-100 h-100"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center m-4">
                <div className="d-flex gap-3 align-items-center">
                  <FaBookOpen size="45px" color="purple" />
                  <span className="fs-4 fw-bold colorText">Storyline</span>
                </div>
                <span className="colorText fs-5">{data.premiered}</span>
              </div>
              <hr className="colorText" />
              <p
                dangerouslySetInnerHTML={{
                  __html: data.summary,
                }}
                className="colorText p-3 m-4 text-center text-md-start"
              />
              <div className="mt-4 d-md-flex align-items-center m-3 p-2 bgColor">
                <div className="d-md-flex flex-grow-1 gap-2 align-items-center text-white py-3">
                  <span className="fw-bold me-2">Genre</span>
                  {data?.genres?.map((item, i) => (
                    <span key={i} className="me2">
                      {item}
                    </span>
                  ))}
                </div>
                <span className="text-white fw-bold">
                  status: {data.status}
                </span>
              </div>
              <ScrollContainer heading="seasons">
                {data._embedded?.seasons?.map((season) => (
                  <div key={season.id}>
                    <Image
                      src={season?.image?.original}
                      style={{ width: "250px", height: "300px" }}
                    />
                    <p className="colorText text-center">
                      Season {season.number}
                    </p>
                  </div>
                ))}
              </ScrollContainer>
              <ScrollContainer heading="cast">
                {data._embedded?.cast.map((c, i) => (
                  <div key={i}>
                    <Image
                      src={c.character?.image?.original}
                      alt={c.character.name}
                      className="rounded-circle"
                      style={{ width: "120px", height: "120px" }}
                    />
                    <p className="fs-6 colorText">{c.character?.name}</p>
                  </div>
                ))}
              </ScrollContainer>
            </div>
            <div className="bgColorB py-1 tvidboxB">
              <h1 className="text-white py-3 my-2 text-center fs-4">
                RunningTv
              </h1>
              <Carousel fade>
                {filterRunningShows.slice(0, 10).map((show) => (
                  <Carousel.Item key={show.id}>
                    <Link to={`/tvshow/${show.id}`}>
                      <Image
                        src={show?.image?.original}
                        style={{ width: "100%", height: "400px" }}
                        alt={show.name}
                      />
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel>
              <h1 className="text-white py-2 my-2 text-center fs-4">
                Ended Tv
              </h1>
              <Row className=" gy-3 p-3">
                {endedShows.map((show) => (
                  <Col key={show.id} xs={6}>
                    <TvcardB {...show} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
