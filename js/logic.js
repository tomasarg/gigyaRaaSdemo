window.onload = function(){
  gigya.accounts.addEventHandlers({
            onLogin:onLoginRaaS,
            onLogout:onLogoutRaaS
  });
  authenticationBuild();
}

function loginUser(action){
  customButtons=
      [{
          "type": "saml",
          "providerName":"One Time Password",
          "idpName":"otp-demo-tomas",
          "iconURL": "img/img-otp-btn.png",
          "lastLoginIconURL":"img/img-otp-btn.png",
          "position":"1"
      }];

      gigya.accounts.showScreenSet({
        screenSet:'Default-RegistrationLogin'
        //containerID:'gigyaContainer'
        //customButtons,
        onBeforeScreenLoad: onBeforeScreenLoad,
        onAfterScreenLoad: onAfterScreenLoad
        startScreen:'gigya-' + action + '-screen'
      });
}

function onLoginRaaS(eventObj) {
    console.log(eventObj);
    authenticationBuild();
}

function onAfterScreenLoad(eventObj) {
  /*if(eventObj.currentScreen==='gigya-complete-registration-screen')
  {
      if(profile.zip!='') {
        $('#gigya-complete-registration-screen input[name="profile.zip"]').parents(".gigya-composite-control").show();
      }

      if(profile.age!='') {
        $('#gigya-complete-registration-screen input[name="profile.age"]').parents(".gigya-composite-control").show();
      }

      //ADD ALL THE OTHER FIELDS IN HERE
  }*/
}

function onBeforeScreenLoad(eventObj) {
  /*if(eventObj.response.errorCode=='206001' && eventObj.response.response.loginProvider=="saml-otp-demo-tomas") {
    if(eventObj.profile.samlData && eventObj.profile.samlData.phone) {
      var phone = eventObj.profile.samlData.phone[0];
      console.log('http://localhost:11080/?mobilePhone=' + phone + '&otpUID=' + eventObj.response.response.UID);
      $.ajax({
          url: 'http://localhost:11080/?mobilePhone=' + phone + '&otpUID=' + eventObj.response.response.UID,
          type: 'GET',
          crossDomain: true,
          dataType: 'json',
          success: function() {
            gigya.accounts.hideScreenSet({
              screenSet:'Default-RegistrationLogin'});
            authenticationBuild();

            //CALL NOTIFY LOGIN TO CREATE SESSION gigya.socialize.notifyLogin(params);


            alert('Accounts Linked');
           },
          error: function() { alert('Failed!'); }
      });




    $.getJSON( "http://localhost:11080", { mobilePhone: phone, otpUID: eventObj.response.response.UID })
        .always(function(data) {

        });
    }
  }*/
}

function onLogoutRaaS(eventObj) {
    console.log(eventObj);
    authenticationBuild();
}

function logoutUser() {
  gigya.accounts.logout();
}

function authenticationBuild() {
    gigya.socialize.getUserInfo({
        callback: function (response) {
            if (response.user.UID) {
                isAuthenticated = true;
                $('#loginSection').hide();
                $('#logoutSection').show();
                $('#userObjectContainer').html(JSON.stringify(response,null, 2));
            } else {
                isAuthenticated = false;
                $('#loginSection').show();
                $('#logoutSection').hide();
                $('#userObjectContainer').html('');
            }
        }
    });
}
