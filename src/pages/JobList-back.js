import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Container, Row, Col } from "react-bootstrap";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const firstPageRef = query(
    collection(db, "jobs"),
    orderBy("DatePosted", "desc"),
    limit(2)
  );

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getDocs(firstPageRef);

      setJobs(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchJobs();
  }, []);

  return (
    <Container>
      <Row className="mt-5">
        {jobs.map((job) => {
          return (
            <Col key={job.id}>
              <div className="content rounded shadow p-3">
                <p>Job Title : {job.JobTitle}</p>
                <p>Job Description : {job.JobDescription}</p>
                <p>Company Name : {job.CompanyName}</p>
                <p>Job Location: {job.JobLocation}</p>
                <p>Salary : {job.SalaryMin + " - " + job.SalaryMax}</p>
                <p>
                  Date Posted : {job.DatePosted.toDate().toLocaleDateString()}
                </p>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default JobList;
