import { Link, Outlet, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { fetchEvent } from "../../util/http.js";

export default function EventDetails() {
  let params = useParams();
  let id = params.id

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["event-details", {id}],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && <p style={{textAlign: 'center'}}>Loading data for this event...</p>}
      {isError && <ErrorBlock title="An error occured" message={error.info?.message || "Failed to fetch details for the event."} />}
      {data && (
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt="Event image" />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} {data.time}</time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
