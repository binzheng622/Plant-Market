import request from 'supertest';
const server = 'http://localhost:3000';

describe('Server Endpoints', () => {
  //test response from unknown endpoint
  describe('/unknown', () => {
    describe('GET', () => {
      it('responds with 404 status', () => {
        return request(server)
          .get('/unknown')
          .expect('Content-Type', /text\/html/)
          .expect(404)
          .expect((res) => {
            if (!res.text.includes('Page Not Found')) {
              throw new Error(
                'Expected response body to contain: "Page Not Found"'
              );
            }
          });
      });
    });
  });

  //test response from signup endpoint if user already exist
  describe('/api/signup', () => {
    describe('POST', () => {
      it('responds with 400 status and text content type', () => {
        return request(server)
          .post('/api/signup')
          .send({ username: 'test', email: 'test@gmail.com', password: 'test' })
          .expect('Content-Type', /text\/plain/)
          .expect(400);
      });
    });
  });

  //test response from login endpoint
  describe('/api/login', () => {
    describe('POST', () => {
      it('responds with 200 status and JSON content type', () => {
        return request(server)
          .post('/api/login')
          .send({ email: 'test@gmail.com', password: 'test' })
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });

  //test response from userID endpoint
  describe('/api/:id', () => {
    describe('POST', () => {
      it('responds with 200 status and JSON content type', () => {
        return request(server)
          .post('/api/18')
          .send({ plantName: 'lily' })
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });

  //test response from plantID endpoint
  describe('/api/plant/:plantid', () => {
    describe('DELETE', () => {
      it('responds with 200 status and JSON content type', () => {
        return request(server)
          .delete('/api/plant/100')
          .send({ userId: '18' })
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
});
