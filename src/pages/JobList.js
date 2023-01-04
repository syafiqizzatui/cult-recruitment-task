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
import {
  SearchOutlined,
  CarOutlined,
  DollarCircleOutlined,
  UserOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Select,
  Row,
  Col,
  Input,
  Checkbox,
  Divider,
  Avatar,
} from "antd";
const { Search } = Input;

// const { Sider, Content } = Layout;

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [sortJobOption, setSortJobOption] = useState("asc");

  const pageSize = 8;
  const jobsRef = collectionGroup(db, "jobs");

  const sortOption = [
    { value: "asc", label: "Newest" },
    { value: "desc", label: "Oldest" },
  ];

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
  };

  return (
    <div className="main">
      <Row>
        {/* SIDEBAR */}
        <Col xs={24} md={7}>
          <div className="box mb-15">
            <Row gutter={10} align="middle">
              <Col span={12}>
                <h2 className="title title-mb-0">Job Filter</h2>
              </Col>
              <Col span={12} className="text-right">
                <a href="#">Clear All</a>
              </Col>
            </Row>
          </div>

          <div className="box mb-15">
            <Row gutter={10} align="middle">
              <Col span={18}>
                <h4 className="title title-mb-0">Experience Level</h4>
              </Col>
              <Col span={6} className="text-right">
                <a href="#">Clear</a>
              </Col>
              <Col>
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row>
                    <Col span={24}>
                      <Checkbox value="entry">Entry Level</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="intermediate">Intermediate</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="Expert">Expert</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Col>
            </Row>
          </div>

          <div className="box mb-15">
            <Row gutter={10} align="middle">
              <Col span={18}>
                <h4 className="title title-mb-0">Job Type</h4>
              </Col>
              <Col span={6} className="text-right">
                <a href="#">Clear</a>
              </Col>
              <Col>
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row>
                    <Col span={24}>
                      <Checkbox value="fulltime">Full Time</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="Contract">Contract</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="Part Time">Part TIme</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Col>
            </Row>
          </div>

          <div className="box mb-15">
            <Row gutter={10} align="middle">
              <Col span={18}>
                <h4 className="title title-mb-0">Salary</h4>
              </Col>
              <Col span={6} className="text-right">
                <a href="#">Clear</a>
              </Col>
              <Col>
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row>
                    <Col span={24}>
                      <Checkbox value="2000-4000">MYR 2,000 - 4,000</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="4000-6000">MYR 4,000 - 6,000</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="6000-10000">MYR 6,000 - 10,000</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="1000015000">
                        MYR 10,000 - 15,000
                      </Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="15000-25000">
                        MYR 15,000 - 25,000
                      </Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="25000-50000">
                        MYR 25,000 - 50,000
                      </Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="50000+">MYR 50,000 - *</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Col>
            </Row>
          </div>

          <div className="box mb-15">
            <Row gutter={10} align="middle">
              <Col span={24}>
                <h4 className="title title-mb-0">Location</h4>
              </Col>
              <Col>
                <Input
                  placeholder="Search Location"
                  prefix={<SearchOutlined />}
                />
              </Col>
            </Row>
          </div>
        </Col>
        {/* CONTENT */}
        <Col xs={24} md={17}>
          <div className="content-main">
            <div className="box mb-15">
              <Row gutter={10} className="mb-15">
                <Col span={24}>
                  <h2 className="title title-mb-0">Search Job</h2>
                </Col>
                <Col span={19}>
                  <Search placeholder="Search Job" />
                </Col>
                <Col span={5}>
                  <Select
                    defaultValue={sortJobOption}
                    onChange={(e) => {
                      sortJobs(e);
                    }}
                    style={{ width: "100%" }}
                    options={sortOption}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <p className="text-center p-mb-0">8 Jobs Found</p>
                </Col>
              </Row>
            </div>
            <Row gutter={[10, 15]} className="mb-15">
              {jobs.map((job) => {
                return (
                  <Col span={24} key={job.id}>
                    <div className="box job-box">
                      <Row align="middle" className="mb-15">
                        <Col span={2}>
                          <Avatar
                            shape="square"
                            size="large"
                            icon={<UserOutlined />}
                          />
                        </Col>
                        <Col span={18}>
                          <h3 className="title title-mb-0"> {job.JobTitle}</h3>
                          <p className="p-mb-0">{job.CompanyName}</p>
                        </Col>
                        <Col span={4} className="text-right">
                          <Button>
                            <SaveOutlined /> Save Job
                          </Button>
                        </Col>
                      </Row>
                      <p>{job.JobDescription}</p>
                      <Divider />
                      <Row align="middle">
                        <Col span={6}>
                          <CarOutlined /> {job.JobLocation}
                        </Col>
                        <Col span={10}>
                          <DollarCircleOutlined />{" "}
                          {job.SalaryMin + " - " + job.SalaryMax}
                        </Col>
                        <Col span={8} className="text-right">
                          <Button>Apply Now</Button>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                );
              })}
            </Row>

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
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default JobList;
