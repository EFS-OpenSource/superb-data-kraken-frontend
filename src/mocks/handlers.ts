import { http, HttpResponse } from 'msw';

const handlers = [
  http.post(
    'http://sdk-dev.efs.ai/api/v1.0/organization',
    async () => new HttpResponse('Hello world', { status: 200 })
  ),

  // http.post('http://localhost:3030/order', async () => {
  //   // add a 100ms pause here to give jest a chance to see the "loading" state.
  //   // See https://www.udemy.com/course/react-testing-library/learn/lecture/36703860
  //   //   for more details.
  //   await delay(100);
  //   return HttpResponse.json({ orderNumber: 123455676 }, { status: 201 });
  // }),
];

export default handlers;
