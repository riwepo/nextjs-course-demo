import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetails from "../../components/meetups/MeetupDetails";

function MeetupDetailPage({ meetupData }) {
  return (
    <>
      <Head>
        <title>Meetup detail page</title>
      </Head>
      <MeetupDetails
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://riwepoau:urJXfmPpBuKw7xVa@cluster0.klmzqfg.mongodb.net/"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export async function getStaticPaths() {
  //console.log("getStaticPaths");
  const client = await MongoClient.connect(
    "mongodb+srv://riwepoau:urJXfmPpBuKw7xVa@cluster0.klmzqfg.mongodb.net/"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const mongoMeetupIdsRaw = await meetupsCollection
    .find()
    .project({ _id: 1 })
    .toArray();
  //console.log(mongoMeetupIdsRaw);
  const mongoMeetupIds = mongoMeetupIdsRaw.map((meetup) => ({
    params: { meetupId: meetup._id.toString() },
  }));
  //console.log(mongoMeetupIds);
  return {
    fallback: "blocking",
    paths: mongoMeetupIds,
  };
}

export default MeetupDetailPage;
