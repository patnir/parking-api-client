import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton.js";
import { API } from "aws-amplify";
import "./NewParking.css";

export default function NewNote() {
  const history = useHistory();
  const [license, setLicense] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return license.length > 0 && totalTime.length > 0 && location.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await createParking({ license, totalTime, location });
      history.push("/");
    } catch (e) {
      // onError(e);
      alert("ERROR!" + e)
      setIsLoading(false);
    }
  }
  
  function createParking(parking) {
    return API.post("parking", "/parking", {
      body: parking
    });
  }

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="license">
          <Form.Control
            value={license}
            type="text"
            size="lg"
            placeholder="license number"
            onChange={(e) => setLicense(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="totalTime">
          <Form.Control
            value={totalTime}
            type="text"
            size="lg"
            placeholder="total time"
            onChange={(e) => setTotalTime(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Control
            value={location}
            type="text"
            size="lg"
            placeholder="location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}