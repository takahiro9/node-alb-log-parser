var tap = require('tap');

var parse = require('./index.js')

tap.test('http traffic', function (t) {
  var parsed = parse(
    '2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.000073 0.001048 0.000057 200 200 0 29 "GET http://www.example.com:80/ HTTP/1.1" "curl/7.38.0" - -'
  );
  t.equal(parsed.timestamp, '2015-05-13T23:39:43.945958Z', 'we have timestamp');
  t.equal(parsed.elb, 'my-loadbalancer', 'we have ELB');
  t.equal(parsed.client, '192.168.131.39:2817', 'we have client');
  t.equal(parsed.backend, '10.0.0.1:80', 'we have backend');
  t.equal(parsed.request_processing_time, '0.000073', 'we have request_processing_time');
  t.equal(parsed.backend_processing_time, '0.001048', 'we have backend_processing_time');
  t.equal(parsed.response_processing_time, '0.000057', 'we have response_processing_time');
  t.equal(parsed.elb_status_code, '200', 'we have elb_status_code');
  t.equal(parsed.backend_status_code, '200', 'we have backend_status_code');
  t.equal(parsed.received_bytes, '0', 'we have received_bytes');
  t.equal(parsed.sent_bytes, '29', 'we have sent_bytes');
  t.equal(parsed.request, 'GET http://www.example.com:80/ HTTP/1.1', 'we have request');
  t.equal(parsed.user_agent, 'curl/7.38.0', 'we have user_anget');
  t.equal(parsed.ssl_cipher, '-', 'we have ssl_cipher');
  t.equal(parsed.ssl_protocol, '-', 'we have ssl_protocol');
  t.end();
});

tap.test('https traffic', function (t) {
  var parsed = parse(
    '2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.000086 0.001048 0.001337 200 200 0 57 "GET https://www.example.com:443/ HTTP/1.1" "curl/7.38.0" DHE-RSA-AES128-SHA TLSv1.2'
  );
  t.equal(parsed.timestamp, '2015-05-13T23:39:43.945958Z', 'we have timestamp');
  t.equal(parsed.elb, 'my-loadbalancer', 'we have ELB');
  t.equal(parsed.client, '192.168.131.39:2817', 'we have client');
  t.equal(parsed.backend, '10.0.0.1:80', 'we have backend');
  t.equal(parsed.request_processing_time, '0.000086', 'we have request_processing_time');
  t.equal(parsed.backend_processing_time, '0.001048', 'we have backend_processing_time');
  t.equal(parsed.response_processing_time, '0.001337', 'we have response_processing_time');
  t.equal(parsed.elb_status_code, '200', 'we have elb_status_code');
  t.equal(parsed.backend_status_code, '200', 'we have backend_status_code');
  t.equal(parsed.received_bytes, '0', 'we have received_bytes');
  t.equal(parsed.sent_bytes, '57', 'we have sent_bytes');
  t.equal(parsed.request, 'GET https://www.example.com:443/ HTTP/1.1', 'we have request');
  t.equal(parsed.user_agent, 'curl/7.38.0', 'we have user_anget');
  t.equal(parsed.ssl_cipher, 'DHE-RSA-AES128-SHA', 'we have ssl_cipher');
  t.equal(parsed.ssl_protocol, 'TLSv1.2', 'we have ssl_protocol');
  t.end();
});

tap.test('tcp traffic', function (t) {
  var parsed = parse(
    '2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.001069 0.000028 0.000041 - - 82 305 "- - - " "-" - -'
  );
  t.equal(parsed.timestamp, '2015-05-13T23:39:43.945958Z', 'we have timestamp');
  t.equal(parsed.elb, 'my-loadbalancer', 'we have ELB');
  t.equal(parsed.client, '192.168.131.39:2817', 'we have client');
  t.equal(parsed.backend, '10.0.0.1:80', 'we have backend');
  t.equal(parsed.request_processing_time, '0.001069', 'we have request_processing_time');
  t.equal(parsed.backend_processing_time, '0.000028', 'we have backend_processing_time');
  t.equal(parsed.response_processing_time, '0.000041', 'we have response_processing_time');
  t.equal(parsed.elb_status_code, '-', 'we have elb_status_code');
  t.equal(parsed.backend_status_code, '-', 'we have backend_status_code');
  t.equal(parsed.received_bytes, '82', 'we have received_bytes');
  t.equal(parsed.sent_bytes, '305', 'we have sent_bytes');
  t.equal(parsed.request, '- - - ', 'we have request');
  t.equal(parsed.user_agent, '-', 'we have user_anget');
  t.equal(parsed.ssl_cipher, '-', 'we have ssl_cipher');
  t.equal(parsed.ssl_protocol, '-', 'we have ssl_protocol');
  t.end();
});

tap.test('ssl traffic', function (t) {
  var parsed = parse(
    '2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.001065 0.000015 0.000023 - - 57 502 "- - - " "-" ECDHE-ECDSA-AES128-GCM-SHA256 TLSv1.2'
  );
  t.equal(parsed.timestamp, '2015-05-13T23:39:43.945958Z', 'we have timestamp');
  t.equal(parsed.elb, 'my-loadbalancer', 'we have ELB');
  t.equal(parsed.client, '192.168.131.39:2817', 'we have client');
  t.equal(parsed.backend, '10.0.0.1:80', 'we have backend');
  t.equal(parsed.request_processing_time, '0.001065', 'we have request_processing_time');
  t.equal(parsed.backend_processing_time, '0.000015', 'we have backend_processing_time');
  t.equal(parsed.response_processing_time, '0.000023', 'we have response_processing_time');
  t.equal(parsed.elb_status_code, '-', 'we have elb_status_code');
  t.equal(parsed.backend_status_code, '-', 'we have backend_status_code');
  t.equal(parsed.received_bytes, '57', 'we have received_bytes');
  t.equal(parsed.sent_bytes, '502', 'we have sent_bytes');
  t.equal(parsed.request, '- - - ', 'we have request');
  t.equal(parsed.user_agent, '-', 'we have user_anget');
  t.equal(parsed.ssl_cipher, 'ECDHE-ECDSA-AES128-GCM-SHA256', 'we have ssl_cipher');
  t.equal(parsed.ssl_protocol, 'TLSv1.2', 'we have ssl_protocol');
  t.end();
});