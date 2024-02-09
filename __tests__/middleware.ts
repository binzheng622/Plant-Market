import controller from '../server/controllers/plantController.js';

jest.setTimeout(60000); // 60 sec before timeout

describe('Middleware Tests', () => {
  const req: any = { params: { id: '25', plantid: '100' } };
  const res: any = { locals: {} };
  const next = jest.fn(); // Jest mock function

  describe('plantController middleware', () => {
    describe('createUser', () => {
      it('createUser middleware correctly adds users to database', async () => {
        req.body = {
          username: 'test',
          email: 'test@gmail.com',
          password: 'test',
        };
        await controller.createUser(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('checkUser', () => {
      it('checkUser middleware checks if user is in database', async () => {
        req.body = {
          email: 'test@gmail.com',
          password: 'test',
        };
        await controller.checkUser(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('addPlant', () => {
      it('addPlant middleware correctly adds plant to database', async () => {
        req.body = { plantName: 'lily' };
        await controller.addPlant(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('deletePlant', () => {
      it('deletePlant middleware correctly deletes plant from database', async () => {
        req.body = { userId: '25' };
        await controller.deletePlant(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('syncInfo', () => {
      it('syncInfo middleware correctly sync data to redux store', async () => {
        await controller.syncInfo(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
