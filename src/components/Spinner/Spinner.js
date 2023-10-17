import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="loader">
      <div className="spinner-border" role="status" style={{height:"4rem", width:"4rem", color:"#1f487"}}>
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
