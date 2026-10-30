import "./TopButton.css";

export default function TopButton() {
  const scrollToTop = () => {
    const home = document.getElementById("home");
    if (home) {
      home.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button className="scroll-top-btn show" onClick={scrollToTop}>
      ^
    </button>
  );
}
