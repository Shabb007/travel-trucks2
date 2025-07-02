import { useState } from "react";
import "./BookingForm.css";

const BookingForm = ({ camperId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.email || !formData.bookingDate) {
      alert("Please fill in all required fields");
      return;
    }

    // Simulate booking submission
    console.log("Booking submitted:", { ...formData, camperId });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: "",
        email: "",
        bookingDate: "",
        comment: "",
      });
    }, 3000);
  };

  return (
    <div className="booking-form">
      <h3>Book your campervan now</h3>
      <p className="booking-subtitle">
        Stay connected! We are always ready to help you.
      </p>

      {showSuccess && (
        <div className="success-message">
          <p>✅ Booking request sent successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="booking-form-fields">
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
        />

        <input
          type="date"
          name="bookingDate"
          placeholder="Booking date*"
          value={formData.bookingDate}
          onChange={handleChange}
          className="form-input"
          required
        />

        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
          className="form-textarea"
          rows="4"
        />

        <button type="submit" className="submit-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
