import { useState } from "react";
import { addRating } from "../../../lib/actions";

export default function NewRating() {
  const [formData, setFormData] = useState(new FormData());

  const handleChange = (e) => {
    const { name, value } = e.target;
    formData.set(name, value);
    setFormData(new FormData(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRating(formData);
      // Handle success (e.g., clear form, show success message)
    } catch (error) {
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="user_id"
        onChange={handleChange}
        placeholder="User ID"
        required
      />

      {/* Social Fields */}
      <h3>Social</h3>
      <input
        type="text"
        name="social_behaviour"
        onChange={handleChange}
        placeholder="Behaviour"
        required
      />
      <input
        type="text"
        name="social_feedback"
        onChange={handleChange}
        placeholder="Feedback"
        required
      />
      <input
        type="text"
        name="social_presence"
        onChange={handleChange}
        placeholder="Presence"
        required
      />
      <input
        type="text"
        name="social_communication"
        onChange={handleChange}
        placeholder="Communication"
        required
      />
      <input
        type="text"
        name="social_teamwork"
        onChange={handleChange}
        placeholder="Teamwork"
        required
      />
      <input
        type="text"
        name="social_leadership"
        onChange={handleChange}
        placeholder="Leadership"
        required
      />
      <input
        type="text"
        name="social_adaptability"
        onChange={handleChange}
        placeholder="Adaptability"
        required
      />

      {/* KPI Fields */}
      <h3>KPI</h3>
      <input
        type="text"
        name="kpi_Zielerreichung"
        onChange={handleChange}
        placeholder="Zielerreichung"
        required
      />
      <input
        type="text"
        name="kpi_productivity"
        onChange={handleChange}
        placeholder="Productivity"
        required
      />
      <input
        type="text"
        name="kpi_efficiency"
        onChange={handleChange}
        placeholder="Efficiency"
        required
      />
      <input
        type="text"
        name="kpi_innovation"
        onChange={handleChange}
        placeholder="Innovation"
        required
      />
      <input
        type="text"
        name="kpi_qualityOfWork"
        onChange={handleChange}
        placeholder="Quality of Work"
        required
      />
      <input
        type="text"
        name="kpi_punctuality"
        onChange={handleChange}
        placeholder="Punctuality"
        required
      />
      <input
        type="text"
        name="kpi_clientSatisfaction"
        onChange={handleChange}
        placeholder="Client Satisfaction"
        required
      />

      {/* Additional Criteria Fields */}
      <h3>Additional Criteria</h3>
      <input
        type="text"
        name="additionalCriteria_initiative"
        onChange={handleChange}
        placeholder="Initiative"
        required
      />
      <input
        type="text"
        name="additionalCriteria_problemSolving"
        onChange={handleChange}
        placeholder="Problem Solving"
        required
      />
      <input
        type="text"
        name="additionalCriteria_dependability"
        onChange={handleChange}
        placeholder="Dependability"
        required
      />
      <input
        type="text"
        name="additionalCriteria_technicalSkills"
        onChange={handleChange}
        placeholder="Technical Skills"
        required
      />
      <input
        type="text"
        name="additionalCriteria_workEthic"
        onChange={handleChange}
        placeholder="Work Ethic"
        required
      />
      <input
        type="text"
        name="additionalCriteria_decisionMaking"
        onChange={handleChange}
        placeholder="Decision Making"
        required
      />

      <button type="submit">Add Rating</button>
    </form>
  );
}
