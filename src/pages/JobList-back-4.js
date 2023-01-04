import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  getDocs,
  collectionGroup,
  query,
  orderBy,
  startAfter,
  limit,
  limitToLast,
  onSnapshot,
  endBefore,
} from "firebase/firestore";
import { Col, Row, Form, Pagination, Container } from "react-bootstrap";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [sortJobOption, setSortJobOption] = useState("asc");

  const pageSize = 2;
  const jobsRef = collectionGroup(db, "jobs");
  const sortOption = [
    { value: "asc", text: "asc" },
    { value: "desc", text: "desc" },
  ];

  useEffect(() => {
    const q = query(
      jobsRef,
      collectionGroup(db, "jobs"),
      orderBy("DatePosted", sortJobOption),
      limit(pageSize)
    );

    const unsubscribe = onSnapshot(q, (documents) => {
      const tempData = [];
      documents.forEach((document) => {
        tempData.push({
          id: document.id,
          ...document.data(),
        });
      });

      setJobs(tempData);
      setLastVisible(documents.docs[documents.docs.length - 1]);
      setFirstVisible(documents.docs[0]);
    });
    return () => unsubscribe();
  }, []);

  // SORTING
  const sortJobs = async (event) => {
    setSortJobOption(event.target.value);
    const q = query(
      jobsRef,
      orderBy("DatePosted", sortJobOption),
      limitToLast(pageSize)
    );
    const documents = await getDocs(q);
    updateState(documents);
    console.log("update: " + sortJobOption);
  };

  const nextPage = async () => {
    const q = query(
      jobsRef,
      orderBy("DatePosted", sortJobOption),
      startAfter(lastVisible.data().DatePosted),
      limit(pageSize)
    );
    const documents = await getDocs(q);
    updateState(documents);
    console.log("next page: " + sortJobOption);
  };

  const previousPage = async () => {
    const q = query(
      jobsRef,
      orderBy("DatePosted", sortJobOption),
      endBefore(firstVisible.data().DatePosted),
      limitToLast(pageSize)
    );
    const documents = await getDocs(q);
    updateState(documents);
    console.log("prev page: " + sortJobOption);
  };

  const updateState = (documents) => {
    if (!documents.empty) {
      const tempData = [];
      documents.forEach((document) => {
        tempData.push({
          id: document.id,
          ...document.data(),
        });
      });
      setJobs(tempData);
    }
    if (documents?.docs[0]) {
      setFirstVisible(documents.docs[0]);
    }
    if (documents?.docs[documents.docs.length - 1]) {
      setLastVisible(documents.docs[documents.docs.length - 1]);
    }
    console.log("updateState: " + sortJobOption);
  };

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
      <Row>
        <Col>
          <Pagination className="float-end">
            <Pagination.Item
              className="shadow-none"
              size="lg"
              onClick={() => {
                previousPage();
              }}
            >
              Previous
            </Pagination.Item>
            <Pagination.Item
              className="shadow-none"
              size="lg"
              onClick={() => {
                nextPage();
              }}
            >
              Next
            </Pagination.Item>
          </Pagination>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Select
            value={sortJobOption}
            onChange={(e) => {
              sortJobs(e);
            }}
          >
            {/* <Form.Select value={sortJobOption} onChange={sortJobs}> */}
            {sortOption.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </Form.Select>
          {sortJobOption}
        </Col>
      </Row>
    </Container>
  );
}

export default JobList;
