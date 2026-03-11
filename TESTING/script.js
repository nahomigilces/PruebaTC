import http from 'k6/http';  
import { check, sleep } from 'k6';  

const users = [  
  { user: 'donero', passwd: 'ewedon' },  
  { user: 'kevinryan', passwd: 'kev02937@' },  
  { user: 'johnd', passwd: 'm38rmF$' },  
  { user: 'derek', passwd: 'jklg*_56' },  
  { user: 'mor_2314', passwd: '83r5^_' },  
];  

export const options = {  
  scenarios: {  
    login_load: {  
      executor: 'ramping-vus',  
      stages: [  
        { duration: '1m', target: 10 },  
        { duration: '2m', target: 10 },  
        { duration: '1m', target: 0 },  
      ],  
    },  
  },  
  thresholds: {  
    'http_req_duration': ['p(95)<500'],  
    'http_req_failed': ['rate<0.01'],  
  },  
};  

export default function () {  
  const user = users[__VU % users.length];  
  const res = http.post(  
    'https://fakestoreapi.com/auth/login',  
    JSON.stringify({ username: user.user, password: user.passwd }),  
    { headers: { 'Content-Type': 'application/json' }, timeout: '60s' }  
  );  
  check(res, {  
    'status is 200': (r) => r.status === 200,  
    'token existe': (r) => r.json('token') !== undefined,  
    'tiempo < 500ms': (r) => r.timings.duration < 500,  
  });  
  sleep(1);  
}