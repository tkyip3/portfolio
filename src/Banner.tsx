import "./Banner.scss";

function Banner(props: { id: string | undefined; title: string | undefined }) {
  console.log(props);
  return (
    <section id={props.id} className="banner">
      <div className="banner-bg"></div>
      <div className="banner-title">{props.title} </div>
    </section>
  );
}

export default Banner;
