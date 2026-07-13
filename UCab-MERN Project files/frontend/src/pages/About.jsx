function About() {
  return (
    <div className="container py-5">
      <div className="row g-4 align-items-center">
        <div className="col-lg-6">
          <h2 className="fw-bold mb-3">About Ucab</h2>
          <p className="text-muted">Ucab is a modern, premium mobility platform designed to make every commute effortless, safe, and transparent. From quick city rides to scheduled trips, our platform connects riders with trusted drivers and a smooth booking experience.</p>
          <p className="text-muted">We combine intuitive technology, robust operations, and thoughtful service to create a ride experience that feels simple from the first tap to the final destination.</p>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow rounded-4 p-4">
            <h5 className="fw-bold mb-3">Why riders love Ucab</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item px-0">Transparent pricing and estimate tools</li>
              <li className="list-group-item px-0">Real-time ride updates and tracking</li>
              <li className="list-group-item px-0">Verified drivers and support coverage</li>
              <li className="list-group-item px-0">Fast booking for daily commute or travel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
