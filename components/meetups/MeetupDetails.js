import classes from "./MeetupDetails.module.css";

function MeetupDetails({ image, title, address, description }) {
  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
}

export default MeetupDetails;
