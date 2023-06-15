import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage({ meetups }) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="React training course NextJS project"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://riwepoau:urJXfmPpBuKw7xVa@cluster0.klmzqfg.mongodb.net/"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const mongoMeetupsRaw = await meetupsCollection.find().toArray();
  const mongoMeetups = mongoMeetupsRaw.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    address: meetup.address,
    image: meetup.image,
    description: meetup.description,
  }));
  const allMeetups = [...mongoMeetups];
  client.close();
  return {
    props: {
      meetups: allMeetups,
    },
  };
}

// export function getServerSideProps() {
//   console.log("getServerSideProps");
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
