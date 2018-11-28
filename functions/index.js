const functions = require('firebase-functions');
var axios = require('axios');


exports.stripeConfirm = functions.database.ref('users/{uid}/stripe_creds/access_token').onCreate( event => {
     console.log(event.data.val());
  return axios.post('https://connect.stripe.com/oauth/token', {
    client_secret:'sk_test_1Cv6nBVNv76yYsbcECLddaYT',
    code: event.data.val(),
    grant_type:'authorization_code'
  }).then( res => {
    event.data.ref.parent.child("account").update(res.data);

  })
    .catch(err =>
           console.error(err)
    );

});

exports.processCharge = functions.database.ref('users/{uid}/tickets/{tid}').onCreate( event => {
  const ticket = event.data.val();

  let url = 'https://api.stripe.com/v1/charges'
  url += '?amount=' + parseFloat(ticket.prices.total)*100
  url += '&currency=cad'
  url += '&source=' + ticket.card.id
//  url += '&destination[amount]=' + parseFloat(ticket.prices.ticket)*100
//  url += '&destination[account]=' + 'acct_1C2pV9K0buRRCMnL' // this needs to be dynamically pulled for prod

  return axios({
    method: 'post',
    url: url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer sk_test_1Cv6nBVNv76yYsbcECLddaYT"
    }
  }).then( res => {
    // write the succesful charge object and new status to user node
    const data_write = {
      charge: res.data,
      status: 'charged'
    }
    event.data.ref.update(data_write);
  }).catch( error => {
    console.log(error)
  })
})
