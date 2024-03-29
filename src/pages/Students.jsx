import React from "react";
import styled from "styled-components";
import { Heading, PageContainer } from "../components/reusable";
import students_list from "../constants/student-list.json";
import useFetch from "../hooks/useFetch";
import { Spinner } from "../components/reusable";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Students = () => {
  const { pending, error, data } = useFetch(`${BASE_URL}/student`);

  return (
    <PageContainer>
      <Heading>Students</Heading>
      {pending ? (
        <Spinner size={"EXTRA-SMALL"} />
      ) : (
        <StudentsTableContainer>
          {!error && (
            <StudentsTableLayout>
              <StudentsTableColumnLayout style={{ position: "sticky", top: 0 }}>
                <TableHeading>Name</TableHeading>
                <TableHeading>Classroom</TableHeading>
                <TableHeading>Grade</TableHeading>
              </StudentsTableColumnLayout>
              {data.records.map(({ studentName, grade, classroom, _id }) => (
                <StudentsTableColumnLayout data-id={_id}>
                  <TableData>{studentName}</TableData>
                  <TableData>{classroom}</TableData>
                  <TableData>{grade}</TableData>
                </StudentsTableColumnLayout>
              ))}
              {/* <StudentsTableColumnLayout>
            <TableData>John Doe</TableData>
            <TableData>NLT-A</TableData>
            <TableData>100 LEVEL</TableData>
          </StudentsTableColumnLayout> */}
            </StudentsTableLayout>
          )}
        </StudentsTableContainer>
      )}
    </PageContainer>
  );
};

const StudentsTableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-top: 1rem;
  border: 2px solid var(--semi-white);
`;

const StudentsTableLayout = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-auto-rows: max-content;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const StudentsTableColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 280px 220px;

  &:not(:last-child) {
    border-bottom: 2px solid var(--semi-white);
  }
`;

const TableHeading = styled.h3`
  padding: 1rem;
  text-align: center;
  background: var(--semi-white);
  min-width: 120px;

  &:first-child {
    text-align: left;
  }

  &:not(:last-child) {
    border-right: 2px solid var(--background-white);
  }
`;

const TableData = styled.p`
  padding: 1rem;
  text-align: center;
  background: var(--background-white);
  text-transform: uppercase;
  min-width: 120px;

  &:first-child {
    text-align: left;
    text-transform: capitalize;
  }

  &:not(:last-child) {
    border-right: 2px solid var(--semi-white);
  }
`;
export default Students;
