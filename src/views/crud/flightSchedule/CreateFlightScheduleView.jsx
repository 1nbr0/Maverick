import React from "react";
import CreateFlightScheduleForm from "../../../components/flightSchedule/CreateFlightScheduleForm";

function CreateFlightScheduleView() {
  return (
    <div className="container mx-auto px-4">
      <section className="section-home-view">
        <CreateFlightScheduleForm />
      </section>
    </div>
  );
}

export default CreateFlightScheduleView;
