import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
import react from "react";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  /* This is to run the enclosing code only once, avoiding infinite loop 
  because setting a state executes the entire function all over again
  Even if you set it to the same value. (why?)
  Array that is the second argument of useEffect is variable list
  which is guaranteed to be the same if the code changes. Aaand no idea why we are setting it empty here. Null == null I guess?*/
  useEffect(() => {
    setIsLoading(true);
    fetch("https://meetup2-922df-default-rtdb.firebaseio.com/meetups.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }
        setIsLoading(false);
        setLoadedMeetups(meetups);
      })
      .catch();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>All Meetups</h1>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}
export default AllMeetupsPage;
