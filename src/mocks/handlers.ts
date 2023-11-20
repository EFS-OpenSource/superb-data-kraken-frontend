import { http, HttpResponse } from 'msw';

const handlers = [
  http.post('http://sdk-dev.efs.ai/api/v1.0/organization', async () =>
    HttpResponse.json({
      appConfigs: [
        {
          displayName: 'string',
          appType: 'SEARCH',
          path: 'string',
        },
      ],
      company: 'e:fs TechHub GmbH',
      confidentiality: 'INTERNAL',
      description: 'description',
      displayName: 'string',
      name: 'string',
      tags: [
        {
          name: 'string',
        },
      ],
      id: 0,
      owners: 'userId',
    })
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
