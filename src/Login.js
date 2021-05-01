import React from 'react';

import { GoogleLogin } from 'react-google-login';

var BASE_URL = "/api/v1/job";
var clientId =
 process.env.REACT_APP_GOOGLE_API_KEY;

function Login() {
  const onSuccess = (res) => {
    // console.log('Login Success: currentUser:', res.profileObj);
    var clientId = res.profileObj["googleId"];
    // console.log(res.profileObj["googleId"])
    sendUserDataToServer(clientId);
    
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    
  };
  
  function sendUserDataToServer(userID) {
    const url = BASE_URL + "/userInfo";
    var data = JSON.stringify({"clientId":userID});
  fetch(url, {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json'
  },
  body: data,
})
.then(response => {
  console.log(response);
  return response.json();
})
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
    
  }

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        //cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;