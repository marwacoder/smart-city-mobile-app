import PaystackWebView from 'react-native-paystack-webview';
import React from 'react';
import {View} from 'react-native';

const Payment = props => {
  const {showPayment, setShowPayment, amount, billingEmail, billingMobile, billingName} = props;

  return (
    <View>
      <View style={{flex: 1}}>
        <PaystackWebView
          buttonText="Pay Now"
          showPayButton={false}
          paystackKey="pk_test_67d300abeff698c1e06e547dc6983f4c9c77d13a"
          amount={parseInt(amount) * 100}
          billingEmail ={billingEmail}
          refNumber={Math.floor((Math.random() * 1000000000) + 1)}
          billingMobile={billingMobile}
          billingName={billingName}
          ActivityIndicatorColor="green"
          SafeAreaViewContainer={{marginTop: 5}}
          SafeAreaViewContainerModal={{marginTop: 5}}
          onCancel={e => {
            // handle response here
            setShowPayment(!showPayment);
          }}
          onSuccess={e => {
            // handle response here
            setShowPayment(!showPayment);
          }}
          autoStart={true}
        />
      </View>
    </View>
  );
};
export default Payment;
