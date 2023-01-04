import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  limitToLast,
  collectionGroup,
  onSnapshot,
  endAt,
} from "firebase/firestore";
import { Col, Row, Form, Pagination, Container } from "react-bootstrap";

function JobList() {
  const pageSize = 2;
  const jobsRef = collectionGroup(db, "jobs");

  const [jobs, setJobs] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);

  useEffect(() => {
    const q = query(
      jobsRef,
      collectionGroup(db, "jobs"),
      orderBy("DatePosted", "desc"),
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

  const nextPage = async () => {
    const q = query(
      jobsRef,
      orderBy("DatePosted", "desc"),
      startAfter(lastVisible.data().DatePosted),
      limit(pageSize)
    );
    const documents = await getDocs(q);
    updateState(documents);
  };

  const previousPage = async () => {
    const q = query(
      jobsRef,
      orderBy("DatePosted", "desc"),
      endAt(firstVisible.data().DatePosted),
      limitToLast(pageSize)
    );
    const documents = await getDocs(q);
    updateState(documents);
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
    console.log("first", firstVisible.data().CompanyName);
    console.log("last", lastVisible.data().CompanyName);
    if (documents?.docs[0]) {
      setFirstVisible(documents.docs[0]);
    }
    if (documents?.docs[documents.docs.length - 1]) {
      setLastVisible(documents.docs[documents.docs.length - 1]);
    }
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
    </Container>
  );
}

export default JobList;
