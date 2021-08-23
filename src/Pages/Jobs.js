import { Card } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { Container, Form } from 'react-bootstrap';

const Jobs = () => {
  const [location, setLocation] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [jobs, setJobs] = React.useState([]);

  const submit = async (e) => {
    e.preventDefault();
    // const header = {
    //   Authorization: 'token 6f084ed9cbcfdbf09686ac1480666de684cbc87d',
    // };
    try {
      const data = await axios.get(`https://findwork.dev/api/jobs/?location=${location}&search=${title}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: 'Token f655dcce449fbc91773155cb6cc31330fdbea5ee',
        },
      });
      console.log(data);
      setJobs(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container className="cont">
      <Form onSubmit={submit} className="d-flex my-3">
        <Form.Group className="mx-2" controlId="formBasicPassword">
          <Form.Control className="" onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Job title" />
        </Form.Group>

        <Form.Group className="mx-2" controlId="formBasiclocation">
          <Form.Control className="h-100" onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Enter location" />
        </Form.Group>
        <button type="submit" className="btn btn-dark mx-2">Search</button>
      </Form>

      <div className="my-3">
        {jobs && jobs.map((j) => (
          <Card key={j.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{j.location}</Card.Title>
              <Card.Text>
                Some quick
              </Card.Text>
              <button type="button" variant="primary">Go somewhere</button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Jobs;
