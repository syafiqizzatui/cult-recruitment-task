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
import { Button, Space, Select, Row, Col } from "antd";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [sortJobOption, setSortJobOption] = useState("asc");

  const pageSize = 8;
  const jobsRef = collectionGroup(db, "jobs");
  const sortOption = [
    { value: "asc", label: "asc" },
    { value: "desc", label: "desc" },
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
  const sortJobs = async (value) => {
    setSortJobOption(value);
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
    <>
      <Row>
        <Col>
          {sortJobOption}
          <Select
            defaultValue={sortJobOption}
            onChange={(e) => {
              sortJobs(e);
            }}
            style={{ width: 120 }}
            options={sortOption}
          />
        </Col>
      </Row>
      <Space size={10} wrap="true" className="spaceWrap">
        {jobs.map((job) => {
          return (
            <div className="jobBox" key={job.id}>
              <p>Job Title : {job.JobTitle}</p>
              <p>Job Description : {job.JobDescription}</p>
              <p>Company Name : {job.CompanyName}</p>
              <p>Job Location: {job.JobLocation}</p>
              <p>Salary : {job.SalaryMin + " - " + job.SalaryMax}</p>
              <p>
                Date Posted : {job.DatePosted.toDate().toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </Space>
      <Row className="pagination">
        <Col span={12}>
          <Button
            type="primary"
            onClick={() => {
              previousPage();
            }}
          >
            Previous
          </Button>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => {
              nextPage();
            }}
          >
            Next
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default JobList;
