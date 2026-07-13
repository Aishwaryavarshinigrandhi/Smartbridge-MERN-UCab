import { useState } from "react";
import { toast } from "react-toastify";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Thanks for reaching out. We will be in touch shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-center">
        <div className="col-lg-5">
          <div className="card border-0 shadow rounded-4 p-4 h-100">
            <h3 className="fw-bold mb-3">Contact Ucab</h3>
            <p className="text-muted">Reach our support team for booking help, partner enquiries, or feedback.</p>
            <ul className="list-unstyled">
              <li className="mb-2"><i className="bi bi-telephone-fill me-2 text-primary"></i> +91 98765 43210</li>
              <li className="mb-2"><i className="bi bi-envelope-fill me-2 text-primary"></i> support@ucab.com</li>
              <li><i className="bi bi-geo-alt-fill me-2 text-primary"></i> Hyderabad, India</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="card border-0 shadow rounded-4 p-4">
            <h4 className="fw-bold mb-4">Send us a message</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" name="message" value={form.message} onChange={handleChange} required />
              </div>
              <button className="btn btn-primary" type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
