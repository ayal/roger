console.log(location.host);

if (!location.host.match('peach')) {
    console.log('redirecting...');
    location.replace('http://ayal.github.io/peachy');
}
