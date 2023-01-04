import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  endBefore,
  limitToLast,
} from "firebase/firestore";
import { Col, Row, Form, Pagination } from "react-bootstrap";

function JobList() {
  const [jobs, setJobs] = useState();
  const [lastVisible, setLastVisible] = useState();
  const [prevVisible, setPrevVisible] = useState();
  const [sortJobOption, setSortJobOption] = useState("desc");

  let pageSize = 1;

  // let sort = "desc";

  const sortOption = [
    { value: "asc", text: "Newest" },
    { value: "desc", text: "Oldest" },
  ];

  let q = query(
    collection(db, "jobs"),
    orderBy("DatePosted", "asc"),
    limit(pageSize)
  );

  const sortJobs = (event) => {
    setSortJobOption(event.target.value);
    q = query(
      collection(db, "jobs"),
      orderBy("DatePosted", sortJobOption),
      limit(pageSize)
    );
  };

  function nextPage(lastVisible) {
    q = query(
      collection(db, "jobs"),
      orderBy("DatePosted", "desc"),
      startAfter(lastVisible),
      limit(pageSize)
    );
  }

  function prevPage(firstVisible) {
    q = query(
      collection(db, "jobs"),
      orderBy("DatePosted", "desc"),
      endBefore(firstVisible),
      limitToLast(pageSize + 1)
    );
  }

  const fetchJobs = async () => {
    const querySnapshot = await getDocs(q);

    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setPrevVisible(querySnapshot.docs[0]);

    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setJobs(items);
    console.log(q);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      {jobs?.map((job) => {
        return (
          <div className="content rounded shadow p-3" key={job.id}>
            <p>Job Title : {job.JobTitle}</p>
            <p>Job Description : {job.JobDescription}</p>
            <p>Company Name : {job.CompanyName}</p>
            <p>Job Location: {job.JobLocation}</p>
            <p>Salary : {job.SalaryMin + " - " + job.SalaryMax}</p>
            <p>Date Posted : {job.DatePosted.toDate().toLocaleDateString()}</p>
          </div>
        );
      })}
      <Row>
        <Col>
          <Form.Select
            value={sortJobOption}
            onChange={(e) => {
              sortJobs(e);
              fetchJobs();
            }}
          >
            {/* <Form.Select value={sortJobOption} onChange={sortJobs}> */}
            {sortOption.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Pagination className="float-end">
            <Pagination.Item
              className="shadow-none"
              size="lg"
              onClick={() => {
                prevPage(prevVisible);
                fetchJobs();
              }}
            >
              Previous
            </Pagination.Item>
            <Pagination.Item
              className="shadow-none"
              size="lg"
              onClick={() => {
                nextPage(lastVisible);
                fetchJobs();
              }}
            >
              Next
            </Pagination.Item>
          </Pagination>
        </Col>
      </Row>
    </div>
  );
}

export default JobList;
